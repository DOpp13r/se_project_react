import "./ItemModal.css";
import closeButton from "../../assets/closeButton.svg";

function ItemModal({ modalOpen, onClose, card }) {
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
        <img src={card.link} alt="" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
