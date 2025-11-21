import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoginPopup } from "../../../../components/LoginPopup";
import { SignupPopup } from "../../../../components/SignupPopup";
import "./style.css";

export const HeaderWrapper = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const handleSwitchToSignup = () => {
    setShowLoginPopup(false);
    setShowSignupPopup(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignupPopup(false);
    setShowLoginPopup(true);
  };

  return (
    <header className="header-wrapper">
      <div className="icon-image-wrapper">
        <Link to="/desktop">
          <img
            className="icon-image-2"
            alt="Icon image"
            src="https://c.animaapp.com/sjWITF5i/img/iconimage-1.svg"
          />
        </Link>
      </div>

      <Link to="/desktop">
        <p className="p">
          <span className="text-wrapper-3">알고리즘 </span>

          <span className="text-wrapper-4">셰프</span>
        </p>
      </Link>

      <div className="login-button-wrapper">
        <button className="login-text-wrapper" onClick={() => setShowLoginPopup(true)}>
          <div className="login-text-2">로그인</div>
        </button>
      </div>

      {showLoginPopup && (
        <LoginPopup
          onClose={() => setShowLoginPopup(false)}
          onSwitchToSignup={handleSwitchToSignup}
        />
      )}

      {showSignupPopup && (
        <SignupPopup
          onClose={() => setShowSignupPopup(false)}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </header>
  );
};
