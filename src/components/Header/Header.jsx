import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwtich/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({
  handleAddClick,
  weatherData,
  handleLoginClick,
  isLoggedIn,
  handleSignUpClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);
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

      {isLoggedIn ? (
        <div className="header__container">
          <button
            className="header__add-button"
            type="button"
            onClick={handleAddClick}
          >
            + Add clothes
          </button>

          <Link className="header__link" to="/profile">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              {!currentUser.avatar ? (
                <img
                  className="header__avatar"
                  src={avatar}
                  alt="User Avatar"
                />
              ) : (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="Avatar Image"
                />
              )}
            </div>
          </Link>
        </div>
      ) : (
        <div className="header__container">
          <button
            className="header__button"
            type="button"
            onClick={handleSignUpClick}
          >
            Sign Up
          </button>
          <button
            className="header__button"
            type="button"
            onClick={handleLoginClick}
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
