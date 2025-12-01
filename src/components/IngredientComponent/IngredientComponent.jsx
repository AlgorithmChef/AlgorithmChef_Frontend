import React, { useState } from "react";
import "./style.css";
import ChangeIngredientPopup from "../AddIngredientPopup/ChangeIngrdientPopup";

export const IngredientComponent = ({
  className,
  ingredientImage,
  ingredient,
  onUpdate,
}) => {
  const { name, dday } = ingredient;

  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <div
        className={`ingredient-component ${className}`}
        onClick={() => setShowPopup(true)}
        style={{ cursor: "pointer" }}
      >
        <div className="ingredient-container">
          <div className="ingredient-header">
            <img
              className="ingredient-image"
              alt="Ingredient image"
              src={ingredientImage}
            />

            <div className="ingredient-name">
              <div className="ingredient-name-text">{name}</div>
            </div>
          </div>

          <div className="ingredient">
            <div className="ingredient-2">소비기한 : {dday}일</div>
          </div>
        </div>
      </div>

      {showPopup && (
        <ChangeIngredientPopup
          ingredient={ingredient}
          onClose={() => setShowPopup(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
};
