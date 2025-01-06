import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  isLoggedIn,
  handleCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter((item) => {
    return item.owner === currentUser._id;
  });
  return (
    <div className="clothes__section">
      <div className="clothes__section-header">
        <p className="clothes__section-title">Your items</p>
        <button
          className="clothes__section-add-button"
          type="button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes__section-items">
        {userItems.map((item) => {
          return (
            <ItemCard
              isLoggedIn={isLoggedIn}
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              handleCardLike={handleCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
