import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleEditClick, signOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt="Avatar image"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sidebar__button-container">
        <button
          className="sidebar__button"
          type="button"
          onClick={handleEditClick}
        >
          Change profile data
        </button>
        <button className="sidebar__button" type="button" onClick={signOut}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
