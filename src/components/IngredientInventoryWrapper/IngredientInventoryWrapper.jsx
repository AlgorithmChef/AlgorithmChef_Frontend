/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const IngredientInventoryWrapper = ({ className }) => {
  return (
    <div className={`ingredient-inventory-wrapper ${className}`}>
      <div className="ingredient-inventory-2">나의 냉장고</div>

      <p className="ingredient-inventory-3">
        당신의 냉장고 속 재료는 무엇인가요?
      </p>
    </div>
  );
};
