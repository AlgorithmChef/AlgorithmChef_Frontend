/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const MenuInventoryWrapper = ({ className }) => {
  return (
    <div className={`menu-inventory-wrapper ${className}`}>
      <div className="menu-inventory-label">메뉴 추천</div>

      <p className="menu-inventory-2">
        당신의 성향과 냉장고를 기반으로 메뉴를 추천해드립니다.
      </p>
    </div>
  );
};
