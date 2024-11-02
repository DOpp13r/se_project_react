import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ onCardClick, clothingItems, handleAddClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <ClothesSection
        onCardClick={onCardClick}
        onClick={handleAddClick}
        clothingItems={clothingItems}
      />
    </div>
  );
}

export default Profile;
