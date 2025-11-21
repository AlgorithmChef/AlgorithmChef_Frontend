/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const PageButton = ({ className, text = "1", isActive = false, onClick }) => {
  return (
    <button 
      className={`page-button ${className} ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <div className="element">{text}</div>
    </button>
  );
};
