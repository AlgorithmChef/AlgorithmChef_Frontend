import React from "react";
import "./style.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left-content">
          <div className="company-container">
            <div className="company-text">알고리즘 셰프</div>
          </div>

          <div className="developer-container">
            <p className="developer-text">
              경기대학교 컴퓨터공학전공
              <br />
              경기대학교 컴퓨터공학전공
              <br />
              경기대학교 컴퓨터공학부
              <br />
              경기대학교 컴퓨터공학전공 오건우
            </p>
          </div>
        </div>

        <div className="footer-right-content">
          <div className="support-container">
            <div className="support-header">
              <div className="support-text">Support</div>
            </div>

            <div className="text-wrapper-8">Contact</div>

            <div className="text-wrapper-8">Support</div>

            <div className="text-wrapper-8">Legal</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
