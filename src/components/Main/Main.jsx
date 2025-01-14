import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import { useContext } from "react";

function Main({
  weatherData,
  onCardClick,
  clothingItems,
  onCardLike,
  isLoggedIn,
}) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  // Check if `weatherData` is defined and has a `type` property
  if (!weatherData || !weatherData.type) {
    return <p>Loading weather data...</p>;
  }

  // Check if `clothingItems` is a valid array
  if (!Array.isArray(clothingItems)) {
    return <p>Loading clothing items...</p>;
  }

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTempUnit]}&deg; {currentTempUnit} /
          You may want to wear:
        </p>
        <ul className="cards__list">
          {Array.isArray(clothingItems) &&
            clothingItems
              .filter((item) => item && item.weather)
              .filter((item) => {
                return item.weather === weatherData.type;
              })
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={onCardClick}
                    clothingItems={clothingItems}
                    onCardLike={onCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                );
              })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
