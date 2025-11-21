/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const Tendency = ({ tendencyContainerClassName, text = "매콤칼칼", isActive = false, onClick }) => {
  return (
    <button 
      className={`tendency ${isActive ? "tendency-active" : ""}`}
      onClick={onClick}
    >
      <div className={`tendency-container ${tendencyContainerClassName}`}>
        <div className="tendency-name">
          <div className="tendency-name-text">{text}</div>
        </div>
      </div>
    </button>
  );
};
