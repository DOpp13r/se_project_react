import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import closeButton from "../../assets/closeButton.svg";

function ItemModal({ modalOpen, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = card.owner === currentUser._id;
  return (
    <div className={`modal ${modalOpen === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close modal__close-card"
          type="button"
          onClick={onClose}
        >
          <img
            src={closeButton}
            alt="close"
            className="modal__close-icon modal__close-icon-card"
          />
        </button>
        <img src={card.imageUrl} alt="clothes image" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">
            {card.name}
            {isOwner && (
              <button className="modal__delete-button" onClick={onDelete}>
                Delete item
              </button>
            )}
          </h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
