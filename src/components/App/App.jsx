import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import ClothesSection from "../ClothesSection/ClothesSection";
import Footer from "../Footer/Footer";

import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [modalOpen, setModalOpen] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleCardClick = (card) => {
    setModalOpen("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    console.log("Button is clicked");
    setModalOpen("add-garment");
  };

  const handleProfileAddClick = () => {
    setModalOpen("add-garment");
  };

  const closeModal = () => {
    setModalOpen("");
  };

  function onAddItem({ name, imageUrl, weather }, resetForm) {
    addClothingItem({ name, imageUrl, weather })
      .then((data) => {
        setClothingItems((prevItem) => [data, ...prevItem]);
        closeModal();
        resetForm();
      })
      .catch((err) => console.log(err));
  }

  function onDeleteItem() {
    deleteClothingItem(selectedCard)
      .then((data) => {
        getClothingItems().then((data) => {
          setClothingItems(data);
          closeModal();
        });
      })
      .catch(console.error);
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
    getClothingItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>
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
        <Footer />
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
