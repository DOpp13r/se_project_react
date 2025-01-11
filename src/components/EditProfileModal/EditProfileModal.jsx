import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onClose, updateUser }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const currentUser = useContext(CurrentUserContext).user;

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    console.log(e.target.value);
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ name, avatar }, formReset);
  };

  useEffect(() => {
    if (currentUser && currentUser.name) {
      setName(currentUser.name);
    } else {
      setName("");
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.avatar) {
      setAvatar(currentUser.avatar);
    } else {
      setAvatar("");
    }
  }, [currentUser]);

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Save Changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="edit name">
        Name{""}
        <input
          type="text"
          className="modal__input"
          id="registerName"
          name="editName"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__label" htmlFor="avatar">
        Avatar URL{""}
        <input
          type="url"
          className="modal__input"
          id="editimageUrl"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
