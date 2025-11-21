/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LoginPopup } from "../LoginPopup";
import { SignupPopup } from "../SignupPopup";
import { PreferencesPopup } from "../PreferencesPopup";
import "./style.css";

export const DivWrapper = ({ className }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showPreferencesPopup, setShowPreferencesPopup] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleSwitchToSignup = () => {
    setShowLoginPopup(false);
    setShowSignupPopup(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignupPopup(false);
    setShowPreferencesPopup(false);
    setShowLoginPopup(true);
  };

  const handleSwitchToPreferences = (data) => {
    setUserData(data);
    setShowSignupPopup(false);
    setShowPreferencesPopup(true);
  };

  const handleCloseAll = () => {
    setShowLoginPopup(false);
    setShowSignupPopup(false);
    setShowPreferencesPopup(false);
    setUserData(null);
  };

  return (
    <>
      <div className={`div-wrapper ${className}`}>
        <div className="header-left-section">
          <Link to="/desktop">
            <img
              className="none-frame-2"
              alt="None frame"
              src="https://c.animaapp.com/sjWITF5i/img/noneframe-3.svg"
            />
          </Link>
        </div>

        <Link to="/desktop" className="algorithm-label-2-link">
          <p className="algorithm-label-2">
            <span className="text-wrapper-9">알고리즘 </span>

            <span className="text-wrapper-10">셰프</span>
          </p>
        </Link>

        <div className="header-right-section">
          <Link to="/mypage" className="mypage-button-2">
            <div className="mypage-text-2">마이페이지</div>
          </Link>
          {isAuthenticated ? (
            <div className="user-info-wrapper">
              <span className="user-name-display">{user?.username}</span>
              <button className="logout-button-2" onClick={logout}>
                로그아웃
              </button>
            </div>
          ) : (
            <button className="login-button-2" onClick={() => setShowLoginPopup(true)}>
              <div className="login-text-3">로그인</div>
            </button>
          )}
        </div>
      </div>

      {showLoginPopup && (
        <LoginPopup
          onClose={handleCloseAll}
          onSwitchToSignup={handleSwitchToSignup}
        />
      )}

      {showSignupPopup && (
        <SignupPopup
          onClose={handleCloseAll}
          onSwitchToLogin={handleSwitchToLogin}
          onSwitchToPreferences={handleSwitchToPreferences}
        />
      )}

      {showPreferencesPopup && (
        <PreferencesPopup
          onClose={handleCloseAll}
          userData={userData}
        />
      )}
    </>
  );
};
