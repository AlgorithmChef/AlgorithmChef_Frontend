import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { LoginPopup } from "../LoginPopup";
import { SignupPopup } from "../SignupPopup";
import { PreferencesPopup } from "../PreferencesPopup";
import "./style.css";

export const UnifiedHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showPreferencesPopup, setShowPreferencesPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
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
      <header className="unified-header">
        <div className="unified-header-left">
          <button 
            className="menu-toggle-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            ☰
          </button>
          {showMenu && (
            <div className="menu-dropdown">
              <Link to="/desktop" className="menu-item" onClick={() => setShowMenu(false)}>
                홈
              </Link>
              <Link to="/menurecommendation" className="menu-item" onClick={() => setShowMenu(false)}>
                메뉴 추천
              </Link>
              <Link to="/communitypage" className="menu-item" onClick={() => setShowMenu(false)}>
                재료 나눔 게시판
              </Link>
              <Link to="/mypage" className="menu-item" onClick={() => setShowMenu(false)}>
                마이페이지
              </Link>
            </div>
          )}
          <Link to="/desktop">
            <img
              className="unified-header-logo"
              alt="Logo"
              src="https://c.animaapp.com/sjWITF5i/img/iconimage-1.svg"
            />
          </Link>
        </div>

        <Link to="/desktop" className="unified-header-center">
          <p className="unified-header-title">
            <span className="title-text-black">알고리즘 </span>
            <span className="title-text-orange">셰프</span>
          </p>
        </Link>

        <div className="unified-header-right">
          <Link to="/mypage" className="unified-mypage-btn">
            <div className="unified-mypage-text">마이페이지</div>
          </Link>
          {isAuthenticated ? (
            <div className="unified-user-info">
              <span className="unified-username">{user?.username}님</span> {/* Added "님" */}
              <button className="unified-logout-btn" onClick={logout}>
                로그아웃
              </button>
            </div>
          ) : (
            <button className="unified-login-btn" onClick={() => setShowLoginPopup(true)}>
              <div className="unified-login-text">로그인</div>
            </button>
          )}
        </div>
      </header>

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
