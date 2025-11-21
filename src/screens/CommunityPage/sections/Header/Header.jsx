import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { LoginPopup } from "../../../../components/LoginPopup";
import { SignupPopup } from "../../../../components/SignupPopup";
import { PreferencesPopup } from "../../../../components/PreferencesPopup";
import "./style.css";

export const Header = () => {
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
    <header className="header">
      <div className="header-left-section">
        <Link to="/desktop">
          <img
            className="icon-image"
            alt="Icon image"
            src="https://c.animaapp.com/sjWITF5i/img/iconimage-1.svg"
          />
        </Link>
      </div>

      <Link to="/desktop" className="algorithm-label-link">
        <p className="algorithm-label">
          <span className="text-wrapper">알고리즘 </span>

          <span className="span">셰프</span>
        </p>
      </Link>

      <div className="header-right-section">
        <Link to="/mypage" className="mypage-button">
          <div className="mypage-text">마이페이지</div>
        </Link>
        {isAuthenticated ? (
          <div className="user-info-wrapper">
            <span className="user-name-display">{user?.username}</span>
            <button className="logout-button" onClick={logout}>
              로그아웃
            </button>
          </div>
        ) : (
          <button className="login-button" onClick={() => setShowLoginPopup(true)}>
            <div className="login-text">로그인</div>
          </button>
        )}
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
    </header>
  );
};
