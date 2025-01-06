import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";
import { useContext } from "react";

function Main({
  weatherData,
  onCardClick,
  clothingItems,
  handleCardLike,
  isLoggedIn,
}) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTempUnit]}&deg; {currentTempUnit} /
          You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
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
                  handleCardLike={handleCardLike}
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
