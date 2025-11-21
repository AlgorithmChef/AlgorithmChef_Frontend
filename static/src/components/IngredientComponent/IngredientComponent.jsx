/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const IngredientComponent = ({
  className,
  ingredientImage = "https://c.animaapp.com/sjWITF5i/img/ingredientimage-1.png",
  text = "양파",
  expiryDays = 0,
}) => {
  return (
    <div className={`ingredient-component ${className}`}>
      <div className="ingredient-container">
        <div className="ingredient-header">
          <img
            className="ingredient-image"
            alt="Ingredient image"
            src={ingredientImage}
          />

          <div className="ingredient-name">
            <div className="ingredient-name-text">{text}</div>
          </div>
        </div>

        <div className="ingredient">
          <div className="ingredient-2">유통기한 : {expiryDays}일</div>
        </div>
      </div>
    </div>
  );
};
