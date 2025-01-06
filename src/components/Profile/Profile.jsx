import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleEditClick,
  signOut,
  handleCardLike,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleEditClick={handleEditClick} signOut={signOut} />
      </section>
      <ClothesSection
        onCardClick={onCardClick}
        handleAddClick={handleAddClick}
        clothingItems={clothingItems}
        handleCardLike={handleCardLike}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default Profile;
