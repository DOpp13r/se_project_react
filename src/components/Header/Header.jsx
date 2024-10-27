import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwtich/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="header logo" />
      <p className="header__data-and-location">
        {" "}
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        className="header__add-button"
        type="button"
        onClick={handleAddClick}
      >
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img className="header__avatar" src={avatar} alt="Terrence Tegegne" />
      </div>
    </header>
  );
}

export default Header;
