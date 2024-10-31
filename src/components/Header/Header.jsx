import { Link } from "react-router-dom";
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
      <Link to="/">
        <img className="header__logo" src={logo} alt="header logo" />
      </Link>
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
      <Link className="header__link" to="/profile">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img className="header__avatar" src={avatar} alt="Avatar Image" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
