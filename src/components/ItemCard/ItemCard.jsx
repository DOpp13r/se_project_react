import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemCard({
  item,
  onCardClick,
  clothingItems,
  handleCardLike,
  isLoggedIn,
}) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    console.log(item);
    handleCardLike(item);
  };

  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes.includes(currentUser._id);
  console.log(item);
  console.log(isLiked);
  const likeBtnCN = isLiked ? "card__like card__like_active" : "card__like";

  return (
    <li className="card">
      <div className="card__container">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn ? (
          <button
            className={likeBtnCN}
            onClick={handleLike}
            type="button"
          ></button>
        ) : (
          <></>
        )}
      </div>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
