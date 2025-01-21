import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";

const LoginModal = ({ isOpen, onClose, logInUser, setModalOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    logInUser({ email, password });
  };

  const changeModal = (e) => {
    e.preventDefault();
    setModalOpen("register");
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      secondButtonText="or Register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      changeModal={changeModal}
    >
      <label className="modal__label" htmlFor="email">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="password">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
