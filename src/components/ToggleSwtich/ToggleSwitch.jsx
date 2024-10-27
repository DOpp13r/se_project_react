import React, { useState } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  const [currentTempUnit, handleToggleSwitchChange] = useState("C");

  const handleChange = (e) => {
    if (currentTempUnit === "C") handleToggleSwitchChange("F");
    if (currentTempUnit === "F") handleToggleSwitchChange("C");
  };

  console.log(currentTempUnit);

  return (
    <label className="toggle__switch">
      <input
        className="toggle__switch-box"
        type="checkbox"
        onChange={handleChange}
      />
      <span
        className={
          currentTempUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp-F ${
          currentTempUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          currentTempUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
