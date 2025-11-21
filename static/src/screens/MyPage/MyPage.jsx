import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { UnifiedHeader } from "../../components/UnifiedHeader";
import { LoginPopup } from "../../components/LoginPopup";
import { SignupPopup } from "../../components/SignupPopup";
import { PreferencesPopup } from "../../components/PreferencesPopup";
import { MypageTendency } from "../../components/MypageTendency";
import "./style.css";

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
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [preferences, setPreferences] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showPreferencesPopup, setShowPreferencesPopup] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      // TODO: Backend Integration: Fetch user preferences from backend using user.username
      // Example: axios.get(`/api/users/${user.username}/preferences`).then(response => setPreferences(response.data));
      const stored = localStorage.getItem("userPreferences");
      if (stored) {
        setPreferences(JSON.parse(stored));
      }
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    // Check if we should show login popup from navigation state
    if (location.state?.showLogin) {
      setShowLoginPopup(true);
      // Clear the state
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

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
    <div className="my-page" data-model-id="168:346">
      <UnifiedHeader />

      <div className="mypage-nav">
        <div className="mypage-textcontainer">
          <div className="mypage-text">마이 페이지</div>
        </div>
      </div>

      <div className="mypage-section">
        {!isAuthenticated ? (
          <div className="mypage-login-required">
            <h2 className="mypage-login-title">로그인이 필요합니다</h2>
            <p className="mypage-login-text">마이페이지를 이용하시려면 로그인해주세요.</p>
            <button className="mypage-login-btn" onClick={handleLoginClick}>
              로그인하러 가기
            </button>
          </div>
        ) : preferences ? (
          <>
            <div className="mypage">
              <div className="mypage-wrapper">
                <div className="mypage-2">건강 목표</div>
              </div>
              <div className="mypage-3">
                {getHealthGoalNames().map((goal, index) => (
                  <MypageTendency key={index} text={goal} />
                ))}
              </div>
            </div>

            <div className="mypage">
              <div className="mypage-wrapper">
                <div className="mypage-2">알레르기</div>
              </div>
              <div className="mypage-3">
                {getAllergyNames().length > 0 ? (
                  getAllergyNames().map((allergy, index) => (
                    <MypageTendency key={index} text={allergy} />
                  ))
                ) : (
                  <div className="mypage-empty">없음</div>
                )}
              </div>
            </div>

            <div className="mypage-info-section">
              <div className="mypage-info-item">
                <span className="mypage-info-label">싫어하는 재료:</span>
                <span className="mypage-info-value">{preferences.dislikedIngredients || "없음"}</span>
              </div>
              <div className="mypage-info-item">
                <span className="mypage-info-label">선호하는 재료:</span>
                <span className="mypage-info-value">{preferences.preferredIngredients || "없음"}</span>
              </div>
              <div className="mypage-info-item">
                <span className="mypage-info-label">선호 요리:</span>
                <span className="mypage-info-value">{preferences.preferredCuisine}</span>
              </div>
              <div className="mypage-info-item">
                <span className="mypage-info-label">매운맛 선호도:</span>
                <span className="mypage-info-value">{preferences.spiceLevel}</span>
              </div>
            </div>

            <div className="mypage-notification-section">
              <div className="mypage-wrapper">
                <div className="mypage-2">알림 설정</div>
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
          </>
        ) : (
          <div className="mypage-empty-state">
            <p>저장된 성향 정보가 없습니다.</p>
            <p>회원가입을 통해 성향을 설정해주세요.</p>
          </div>
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
    </div>
  );
};
