import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { UnifiedHeader } from "../../components/UnifiedHeader";
import { LoginPopup } from "../../components/LoginPopup";
import { SignupPopup } from "../../components/SignupPopup";
import { PreferencesPopup } from "../../components/PreferencesPopup";
import { MypageTendency } from "../../components/MypageTendency";
import FindId from "../../components/LoginPopup/FindId/FindId";
import FindPassword from "../../components/LoginPopup/FindPassword/FindPassword";
import "./style.css";
import MyPageInfo from "./MyPageInfo";
import FoodTendency from "./FoodTendency";

const HEALTH_GOALS = [
  { id: 1, name: "체중 감량" },
  { id: 2, name: "근육 증가" },
  { id: 3, name: "건강 유지" },
  { id: 4, name: "면역력 강화" },
  { id: 5, name: "소화 개선" },
];

const ALLERGIES = [
  { id: 1, name: "우유" },
  { id: 2, name: "계란" },
  { id: 3, name: "땅콩" },
  { id: 4, name: "견과류" },
  { id: 5, name: "갑각류" },
  { id: 6, name: "밀" },
  { id: 7, name: "대두" },
];

export const MyPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [preferences, setPreferences] = useState(null);
  
  // 팝업 상태들
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showPreferencesPopup, setShowPreferencesPopup] = useState(false);
  const [showFindIdPopup, setShowFindIdPopup] = useState(false);
  const [showFindPasswordPopup, setShowFindPasswordPopup] = useState(false);
  
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      const stored = localStorage.getItem("userPreferences");
      if (stored) {
        setPreferences(JSON.parse(stored));
      }
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (location.state?.showLogin) {
      setShowLoginPopup(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleLoginClick = () => setShowLoginPopup(true);
  
  const handleSwitchToSignup = () => {
    setShowLoginPopup(false);
    setShowSignupPopup(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignupPopup(false);
    setShowPreferencesPopup(false);
    setShowFindIdPopup(false);
    setShowFindPasswordPopup(false);
    setShowLoginPopup(true);
  };

  const handleSwitchToFindId = () => {
    setShowLoginPopup(false);
    setShowFindIdPopup(true);
  };

  const handleSwitchToFindPassword = () => {
    setShowLoginPopup(false);
    setShowFindPasswordPopup(true);
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
    setShowFindIdPopup(false);
    setShowFindPasswordPopup(false);
    setUserData(null);
  };

  const getHealthGoalNames = () => {
    if (!preferences?.healthGoalIds) return [];
    return preferences.healthGoalIds.map(
      (id) => HEALTH_GOALS.find((goal) => goal.id === id)?.name || ""
    );
  };

  const getAllergyNames = () => {
    if (!preferences?.allergyIds) return [];
    return preferences.allergyIds.map(
      (id) => ALLERGIES.find((allergy) => allergy.id === id)?.name || ""
    );
  };

  return (
    <div className="my-page">
      <UnifiedHeader />

      {/* 헤더 영역 (라인 포함) */}
      <div className="mypage-nav">
        <div className="mypage-textcontainer">
          <div className="mypage-text">마이 페이지</div>
        </div>
      </div>

      <div className="mypage-section">
        {!isAuthenticated ? (
          <div className="mypage-login-required">
            <h2 className="mypage-login-title">로그인이 필요합니다</h2>
            <button className="mypage-login-btn" onClick={handleLoginClick}>
              로그인하러 가기
            </button>
          </div>
        ) : preferences ? (
          
          /* ★ 핵심: 2열 그리드 레이아웃 구조 ★ */
          <div className="mypage-grid-container">
            
            {/* [왼쪽 기둥] 개인정보, 건강목표, 알레르기 */}
            <div className="mypage-left-col">
              
              <div className="mypage-card-wrapper">
                <MyPageInfo age="26" birthDate="2000-01-01" id="skt2008"/>
              </div>

              <div className="mypage-card-wrapper simple-card">
                 <div className="mypage-card-header">
                    <h3>건강 목표</h3>
                 </div>
                 <div className="mypage-tendency-list">
                    {getHealthGoalNames().map((goal, index) => (
                      <MypageTendency key={index} text={goal} />
                    ))}
                 </div>
              </div>

              <div className="mypage-card-wrapper simple-card">
                 <div className="mypage-card-header">
                    <h3>알레르기</h3>
                 </div>
                 <div className="mypage-tendency-list">
                    {getAllergyNames().length > 0 ? (
                      getAllergyNames().map((allergy, index) => (
                        <MypageTendency key={index} text={allergy} />
                      ))
                    ) : (
                      <div className="mypage-empty">없음</div>
                    )}
                 </div>
              </div>
            </div>

            {/* [오른쪽 기둥] 음식성향, 알림설정 */}
            <div className="mypage-right-col">
              
              <div className="mypage-card-wrapper">
                <FoodTendency 
                  dislikedIngredients={preferences.dislikedIngredients}
                  preferredIngredients={preferences.preferredIngredients}
                  preferredCuisine={preferences.preferredCuisine}
                  spiceLevel={preferences.spiceLevel}
                />
              </div>

              <div className="mypage-card-wrapper simple-card">
                <div className="mypage-card-header">
                    <h3>알림 설정</h3>
                </div>
                <div className="mypage-notification-list">
                  <div className="mypage-notification-item">
                    <span>소비 알림</span>
                    <span className={preferences.allowPushConsumption ? "active" : "inactive"}>
                      {preferences.allowPushConsumption ? "ON" : "OFF"}
                    </span>
                  </div>
                  <div className="mypage-notification-item">
                    <span>댓글 알림</span>
                    <span className={preferences.allowPushComment ? "active" : "inactive"}>
                      {preferences.allowPushComment ? "ON" : "OFF"}
                    </span>
                  </div>
                  <div className="mypage-notification-item">
                    <span>넛지 알림</span>
                    <span className={preferences.allowPushNudge ? "active" : "inactive"}>
                      {preferences.allowPushNudge ? "ON" : "OFF"}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <div className="mypage-empty-state">
            <p>성향 정보가 없습니다.</p>
          </div>
        )}
      </div>

      {/* 팝업 렌더링 영역 */}
      {showLoginPopup && <LoginPopup onClose={handleCloseAll} onSwitchToSignup={handleSwitchToSignup} onSwitchToFindId={handleSwitchToFindId} onSwitchToFindPassword={handleSwitchToFindPassword} />}
      {showSignupPopup && <SignupPopup onClose={handleCloseAll} onSwitchToLogin={handleSwitchToLogin} onSwitchToPreferences={handleSwitchToPreferences} />}
      {showPreferencesPopup && <PreferencesPopup onClose={handleCloseAll} userData={userData} />}
      {showFindIdPopup && <FindId onClose={handleCloseAll} onSwitchToLogin={handleSwitchToLogin} />}
      {showFindPasswordPopup && <FindPassword onClose={handleCloseAll} onSwitchToLogin={handleSwitchToLogin} />}
    </div>
  );
};