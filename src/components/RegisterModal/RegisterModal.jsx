import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onClose, registerUser, setModalOpen }) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    console.log(e.target.value);
    setAvatar(e.target.value);
  };

  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({ name, avatar, email, password });
  };

  const changeModal = (e) => {
    e.preventDefault();
    setModalOpen("login");
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      secondButtonText="or Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      changeModal={changeModal}
    >
      <label className="modal__label">
        Name{""}
        <input
          type="text"
          className="modal__input"
          id="register name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label className="modal__label">
        Avatar URL{""}
        <input
          type="url"
          className="modal__input"
          id="register imageUrl"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
        />
      </label>
      <label className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="register email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="register password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
