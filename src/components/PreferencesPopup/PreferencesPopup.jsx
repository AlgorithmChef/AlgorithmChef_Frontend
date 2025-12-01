import React, { useState, useEffect } from "react";
import "./style.css";
import { getAllergyInfo, getHealthGoalInfo } from "../../api/preferenceApi";
import { makeSurveyApi } from "../../api/userInfo";
import { useNavigate } from "react-router-dom";

const SPICE_LEVELS = ["안매움", "보통", "매움"];
const CUISINE_TYPES = ["한식", "중식", "일식", "양식", "기타"];

export const PreferencesPopup = ({ onClose }) => {
  const [healthGoalIds, setHealthGoalIds] = useState([]);
  const [allergyIds, setAllergyIds] = useState([]);
  const [dislikedIngredients, setDislikedIngredients] = useState("");
  const [likedIngredients, setLikedIngredients] = useState("");
  const [preferredCuisineList, setPreferredCuisineList] = useState([]);
  const [spiceLevel, setSpiceLevel] = useState("");
  const [allowPushConsumption, setAllowPushConsumption] = useState(true);
  const [allowPushComment, setAllowPushComment] = useState(true);
  const [allowPushNudge, setAllowPushNudge] = useState(true);

  const [serverHealthGoals, setServerHealthGoals] = useState([]);
  const [serverAllergies, setServerAllergies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [healthData, allergyData] = await Promise.all([
          getHealthGoalInfo(),
          getAllergyInfo(),
        ]);

        setServerHealthGoals(healthData || []);
        setServerAllergies(allergyData || []);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        alert("목록을 불러오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, []);

  const toggleHealthGoal = (id) => {
    setHealthGoalIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleAllergy = (id) => {
    setAllergyIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleCuisine = (cuisine) => {
    setPreferredCuisineList((prev) =>
      prev.includes(cuisine)
        ? prev.filter((item) => item !== cuisine)
        : [...prev, cuisine]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const surveyData = {
      healthGoalIds,
      allergyIds,
      dislikedIngredients,
      likedIngredients,
      preferredCuisine: preferredCuisineList.join(","),
      spiceLevel,
      allowPushConsumption,
      allowPushComment,
      allowPushNudge,
    };

    console.log("Sending survey data:", surveyData);

    try {
      const result = await makeSurveyApi(surveyData);

      if (result) {
        alert("성향 설정이 완료되었습니다! 가입을 환영합니다.");
        onClose();
        navigate("/desktop");
      }
    } catch (error) {
      console.error("설문 전송 실패:", error);
      alert("저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="preferences-popup-overlay" onClick={onClose}>
      <div
        className="preferences-popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="preferences-popup-close" onClick={onClose}>
          ×
        </button>

        <div className="preferences-popup-header">
          <h2 className="preferences-popup-title">성향 설정</h2>
          <p className="preferences-popup-subtitle">
            맞춤 추천을 위한 정보를 입력해주세요
          </p>
        </div>

        <form className="preferences-popup-form" onSubmit={handleSubmit}>
          <div className="preferences-popup-section">
            <label className="preferences-popup-section-label">건강 목표</label>
            <div className="preferences-popup-chips">
              {serverHealthGoals.length > 0 ? (
                serverHealthGoals.map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    className={`preferences-chip ${
                      healthGoalIds.includes(goal.id) ? "active" : ""
                    }`}
                    onClick={() => toggleHealthGoal(goal.id)}
                  >
                    {goal.name}
                  </button>
                ))
              ) : (
                <p style={{ color: "#999", fontSize: "14px" }}>
                  목록을 불러오는 중...
                </p>
              )}
            </div>
          </div>

          <div className="preferences-popup-section">
            <label className="preferences-popup-section-label">알레르기</label>
            <div className="preferences-popup-chips">
              {serverAllergies.length > 0 ? (
                serverAllergies.map((allergy) => (
                  <button
                    key={allergy.id}
                    type="button"
                    className={`preferences-chip ${
                      allergyIds.includes(allergy.id) ? "active" : ""
                    }`}
                    onClick={() => toggleAllergy(allergy.id)}
                  >
                    {allergy.name}
                  </button>
                ))
              ) : (
                <p style={{ color: "#999", fontSize: "14px" }}>
                  목록을 불러오는 중...
                </p>
              )}
            </div>
          </div>

          <div className="preferences-popup-input-group">
            <label className="preferences-popup-label">
              싫어하는 재료 (쉼표로 구분)
            </label>
            <input
              type="text"
              className="preferences-popup-input"
              value={dislikedIngredients}
              onChange={(e) => setDislikedIngredients(e.target.value)}
              placeholder="예: 오이, 가지"
            />
          </div>

          <div className="preferences-popup-input-group">
            <label className="preferences-popup-label">
              선호하는 재료 (쉼표로 구분)
            </label>
            <input
              type="text"
              className="preferences-popup-input"
              value={likedIngredients}
              onChange={(e) => setLikedIngredients(e.target.value)}
              placeholder="예: 돼지고기, 감자"
            />
          </div>

          <div className="preferences-popup-section">
            <label className="preferences-popup-section-label">
              선호 요리 (다중 선택)
            </label>
            <div className="preferences-popup-chips">
              {CUISINE_TYPES.map((cuisine) => (
                <button
                  key={cuisine}
                  type="button"
                  className={`preferences-chip ${
                    preferredCuisineList.includes(cuisine) ? "active" : ""
                  }`}
                  onClick={() => toggleCuisine(cuisine)}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          <div className="preferences-popup-input-group">
            <label className="preferences-popup-label">매운맛 선호도</label>
            <select
              className="preferences-popup-select"
              value={spiceLevel}
              onChange={(e) => setSpiceLevel(e.target.value)}
              required
            >
              <option value="">선택하세요</option>
              {SPICE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="preferences-popup-section">
            <label className="preferences-popup-section-label">알림 설정</label>
            <div className="preferences-popup-checkboxes">
              <label className="preferences-checkbox-label">
                <input
                  type="checkbox"
                  checked={allowPushConsumption}
                  onChange={(e) => setAllowPushConsumption(e.target.checked)}
                />
                <span>소비 알림</span>
              </label>
              <label className="preferences-checkbox-label">
                <input
                  type="checkbox"
                  checked={allowPushComment}
                  onChange={(e) => setAllowPushComment(e.target.checked)}
                />
                <span>댓글 알림</span>
              </label>
              <label className="preferences-checkbox-label">
                <input
                  type="checkbox"
                  checked={allowPushNudge}
                  onChange={(e) => setAllowPushNudge(e.target.checked)}
                />
                <span>넛지 알림</span>
              </label>
            </div>
          </div>

          <button type="submit" className="preferences-popup-submit-btn">
            완료
          </button>
        </form>
      </div>
    </div>
  );
};
