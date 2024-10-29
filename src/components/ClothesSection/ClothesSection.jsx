import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ handleCardClick }) {
  return (
    <div className="clothes__section">
      <div className="clothes__section-header">
        <p className="clothes__section-title">Your items</p>
        <button className="clothes__section-add-button">+ Add new</button>
      </div>
      <ul className="clothes__section-items">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
