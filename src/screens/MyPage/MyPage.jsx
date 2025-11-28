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
import MyPageInfo from "./MyPageInfo";
import FoodTendency from "./FoodTendency";
import UpdatePreference from "../../components/PreferencesPopup/UpdatePreference";
import "./style.css";

import { getUserInfo } from "../../api/userInfo";

export const MyPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [preferences, setPreferences] = useState(null);

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const [showPreferencesPopup, setShowPreferencesPopup] = useState(false);
  const [showFindIdPopup, setShowFindIdPopup] = useState(false);
  const [showFindPasswordPopup, setShowFindPasswordPopup] = useState(false);

  const [showUpdatePreferencePopup, setShowUpdatePreferencePopup] =
    useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const myInfoData = await getUserInfo();
          setPreferences(myInfoData);
          console.log("내 정보 로드 완료:", myInfoData);
        } catch (error) {
          console.error("데이터 불러오기 실패:", error);
        }
      };
      fetchData();
    } else {
      setPreferences(null);
    }
  }, [isAuthenticated]);

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

  const handleSwitchToPreferences = () => {
    setShowSignupPopup(false);
    setShowPreferencesPopup(true);
  };

  const handleSwitchToUpdatePreference = () => {
    setShowUpdatePreferencePopup(true);
  };

  const handleCloseAll = () => {
    setShowLoginPopup(false);
    setShowSignupPopup(false);
    setShowPreferencesPopup(false);
    setShowFindIdPopup(false);
    setShowFindPasswordPopup(false);
    setShowUpdatePreferencePopup(false);
  };

  return (
    <div className="my-page">
      <UnifiedHeader />

      <div className="mypage-nav">
        <div className="mypage-textcontainer">
          <div className="mypage-text">마이 페이지</div>
          <button
            className="mypage-edit-btn"
            onClick={handleSwitchToUpdatePreference}
          >
            취향 설정
          </button>
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
          <div className="mypage-grid-container">
            <div className="mypage-left-col">
              <div className="mypage-card-wrapper">
                <MyPageInfo
                  age={preferences.age}
                  birthDate={
                    preferences.birthDate
                      ? preferences.birthDate.split("T")[0]
                      : ""
                  }
                  id={preferences.userId}
                />
              </div>

              <div className="mypage-card-wrapper simple-card">
                <div className="mypage-card-header">
                  <h3>건강 목표</h3>
                </div>
                <div className="mypage-tendency-list">
                  {preferences.goals && preferences.goals.length > 0 ? (
                    preferences.goals.map((goalName, index) => (
                      <MypageTendency key={index} text={goalName} />
                    ))
                  ) : (
                    <div className="mypage-empty">설정된 목표가 없습니다</div>
                  )}
                </div>
              </div>

              <div className="mypage-card-wrapper simple-card">
                <div className="mypage-card-header">
                  <h3>알레르기</h3>
                </div>
                <div className="mypage-tendency-list">
                  {preferences.allergyList &&
                  preferences.allergyList.length > 0 ? (
                    preferences.allergyList.map((allergyName, index) => (
                      <MypageTendency key={index} text={allergyName} />
                    ))
                  ) : (
                    <div className="mypage-empty">없음</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mypage-right-col">
              <div className="mypage-card-wrapper">
                <FoodTendency
                  dislikedIngredients={preferences.dislikedIngredients}
                  preferredIngredients={preferences.likedIngredients}
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
                    <span
                      className={
                        preferences.allowPushConsumption ? "active" : "inactive"
                      }
                    >
                      {preferences.allowPushConsumption ? "ON" : "OFF"}
                    </span>
                  </div>
                  <div className="mypage-notification-item">
                    <span>댓글 알림</span>
                    <span
                      className={
                        preferences.allowPushComment ? "active" : "inactive"
                      }
                    >
                      {preferences.allowPushComment ? "ON" : "OFF"}
                    </span>
                  </div>
                  <div className="mypage-notification-item">
                    <span>넛지 알림</span>
                    <span
                      className={
                        preferences.allowPushNudge ? "active" : "inactive"
                      }
                    >
                      {preferences.allowPushNudge ? "ON" : "OFF"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mypage-empty-state">
            <p>정보를 불러오는 중이거나 성향 정보가 없습니다.</p>
          </div>
        )}
      </div>

      {showLoginPopup && (
        <LoginPopup
          onClose={handleCloseAll}
          onSwitchToSignup={handleSwitchToSignup}
          onSwitchToFindId={handleSwitchToFindId}
          onSwitchToFindPassword={handleSwitchToFindPassword}
        />
      )}
      {showSignupPopup && (
        <SignupPopup
          onClose={handleCloseAll}
          onSwitchToLogin={handleSwitchToLogin}
          onSwitchToPreferences={handleSwitchToPreferences}
        />
      )}
      {showPreferencesPopup && <PreferencesPopup onClose={handleCloseAll} />}

      {showUpdatePreferencePopup && (
        <UpdatePreference onClose={handleCloseAll} />
      )}

      {showFindIdPopup && (
        <FindId
          onClose={handleCloseAll}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
      {showFindPasswordPopup && (
        <FindPassword
          onClose={handleCloseAll}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </div>
  );
};
