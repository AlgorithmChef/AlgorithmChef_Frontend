/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const MypageTendency = ({ className, text = "매콤칼칼" }) => {
  return (
    <div className={`mypage-tendency ${className}`}>
      <div className="tendency-name-wrapper">
        <div className="tendency-name-text-wrapper">
          <div className="tendency-name-text-2">{text}</div>
        </div>
      </div>
    </div>
  );
};
