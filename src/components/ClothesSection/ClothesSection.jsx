import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
