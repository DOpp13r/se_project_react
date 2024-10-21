import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [modalOpen, setModalOpen] = useState();
  const [selectedCard, setSelectedCard] = useState({});

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

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        modalOpen={modalOpen}
        onClose={closeModal}
      >
        <label className="modal__label" htmlFor="name">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label className="modal__label" htmlFor="imageUrl">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type: </legend>
          <label className="modal__label modal__label_type_radio" htmlFor="hot">
            <input
              type="radio"
              className="modal__input modal__radio-input"
              id="hot"
              name="weather"
            />
            Hot
          </label>
          <label
            className="modal__label modal__label_type_radio"
            htmlFor="warm"
          >
            <input
              type="radio"
              className="modal__input modal__radio-input"
              id="warm"
              name="weather"
            />
            Warm
          </label>

          <label
            className="modal__label modal__label_type_radio"
            htmlFor="cold"
          >
            <input
              type="radio"
              className="modal__input modal__radio-input"
              id="cold"
              name="weather"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        modalOpen={modalOpen}
        card={selectedCard}
        onClose={closeModal}
      />
      <Footer />
    </div>
  );
}

export default App;
