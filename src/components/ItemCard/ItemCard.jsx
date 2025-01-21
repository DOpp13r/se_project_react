import "./ItemCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useState, useEffect, useContext } from "react";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const [isLiked, setIsLiked] = useState(
    item.likes.some((id) => id === currentUser?.user?._id)
  );

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: isLiked })
      .then(() => {
        setIsLiked(!isLiked);
      })
      .catch((err) => {
        console.error("Error toggling like:", err);
      });
  };

  const itemLikeButtonClassName = isLiked
    ? "card__like card__like_active"
    : "card__like";

  return (
    <li className="card">
      <div className="card__container">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn ? (
          <button
            className={itemLikeButtonClassName}
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
