import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Footer from "../Footer/Footer";

import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";

import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
    condition: "",
    isDay: true,
  });
  const [modalOpen, setModalOpen] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleCardClick = (card) => {
    setModalOpen("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    console.log("Button is clicked");
    setModalOpen("add-garment");
  };

  const handleLoginClick = () => {
    console.log("Ready to Log In");
    setModalOpen("login");
  };

  const handleSignUpClick = () => {
    console.log("Ready to Sign Up");
    setModalOpen("register");
  };

  const handleEditClick = () => {
    setModalOpen("edit");
  };

  const closeModal = () => {
    setModalOpen("");
  };

  const signOut = () => {
    setIsLoggedIn(false);
    localStorage.clear();
  };

  const navigate = useNavigate();

  function updateUser({ name, avatar }) {
    const token = localStorage.getItem("jwt");
    auth
      .editUser({ name, avatar }, token)
      .then((user) => {
        setCurrentUser(user);
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function logInUser({ email, password }) {
    if (!email || !password) {
      return;
    }
    auth
      .signIn({ email, password })
      .then((data) => {
        auth.getUser(data.token).then((user) => {
          console.log("User Data from Backend:", user);
          setIsLoggedIn(true);
          setCurrentUser(user);
          closeModal();
          navigate("/profile");
          getClothingItems()
            .then((data) => {
              setClothingItems(data.data);
            })
            .catch((err) => {
              console.log("Error fetching clothing items:", err);
              setClothingItems([]);
            });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function registerUser({ name, avatar, email, password }) {
    auth
      .signUp({ name, avatar, email, password })
      .then(() => {
        closeModal();
        logInUser({ email, password });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function onAddItem({ name, imageUrl, weather }, resetForm) {
    const token = localStorage.getItem("jwt");
    console.log("Adding item:", { name, imageUrl, weather }); // Log the input
    addClothingItem({ name, imageUrl, weather }, token)
      .then((data) => {
        console.log("Item added:", data); // Log the API response
        setClothingItems((items) => [...items, data.item]);
        closeModal();
        resetForm();
      })
      .catch((err) => {
        console.error("Error adding item:", err); // Log any errors
      });
  }

  function onDeleteItem() {
    const token = localStorage.getItem("jwt");
    deleteClothingItem(selectedCard, token)
      .then((data) => {
        getClothingItems().then((data) => {
          setClothingItems(data);
          closeModal();
        });
      })
      .catch(console.error);
  }

  function handleCardLike({ id, isLiked }) {
    console.log("Item ID:", id);
    const token = localStorage.getItem("jwt");
    !isLiked
      ? likeClothingItem(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.item : item))
            );
          })
          .catch((err) => console.log(err))
      : dislikeClothingItem(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.item : item))
            );
          })
          .catch((err) => console.log(err));
  }

  const handleToggleSwitchChange = () => {
    if (currentTempUnit === "C") setCurrentTempUnit("F");
    if (currentTempUnit === "F") setCurrentTempUnit("C");

    console.log(currentTempUnit);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        console.log("Fetched clothing items:", data);
        setClothingItems(data.data);
      })
      .catch((err) => {
        console.log("Error fetching clothing items:", err);
        setClothingItems([]);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }
    auth
      .getUser(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        console.log("Current User:", user);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleLoginClick={handleLoginClick}
              handleSignUpClick={handleSignUpClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      handleEditClick={handleEditClick}
                      signOut={signOut}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>

          <AddItemModal
            isOpen={modalOpen === "add-garment"}
            onClose={closeModal}
            onAddItem={onAddItem}
          />
          <ItemModal
            modalOpen={modalOpen}
            card={selectedCard}
            onClose={closeModal}
            onDelete={onDeleteItem}
          />
          <LoginModal
            isOpen={modalOpen === "login"}
            onClose={closeModal}
            setModalOpen={setModalOpen}
            logInUser={logInUser}
          />
          <RegisterModal
            isOpen={modalOpen === "register"}
            onClose={closeModal}
            setModalOpen={setModalOpen}
            registerUser={registerUser}
          />
          <EditProfileModal
            isOpen={modalOpen === "edit"}
            onClose={closeModal}
            setModalOpen={setModalOpen}
            updateUser={updateUser}
          />
        </CurrentTempUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
