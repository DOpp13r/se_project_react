import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} />
      <p className="header__data-and-location">DATE, LOCATION</p>
      <button className="header__add-button">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">NAME</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
