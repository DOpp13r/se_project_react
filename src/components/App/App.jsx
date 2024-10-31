import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [modalOpen, setModalOpen] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  const handleCardClick = (card) => {
    setModalOpen("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setModalOpen("add-garment");
  };

  const closeModal = () => {
    setModalOpen("");
  };

  const onAddItem = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const handleToggleSwitchChange = () => {
    if (currentTempUnit === "C") setCurrentTempUnit("F");
    if (currentTempUnit === "F") setCurrentTempUnit("C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  console.log(currentTempUnit);

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
                <Main weatherData={weatherData} onCardClick={handleCardClick} />
              }
            />
            <Route
              path="/profile"
              element={<Profile onCardClick={handleCardClick} />}
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
        />
        <Footer />
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
