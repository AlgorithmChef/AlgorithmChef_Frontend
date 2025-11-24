import React, { useState } from "react";
import "./style.css";

const HEALTH_GOALS = [
  { id: 1, name: "체중 감량" },
  { id: 2, name: "근육 증가" },
  { id: 3, name: "체중 유지" },
  { id: 4, name: "저염 식단" },
  { id: 5, name: "혈압 관리" },
  { id: 6, name: "당뇨 관리" },
  { id: 7, name: "콜레스테롤 관리" },
  { id: 8, name: "채식(비건)" },
  { id: 9, name: "채식(락토-오보)" },
  { id: 10, name: "임산부 식단" },
  { id: 11, name: "키토제닉 (고지방 저탄수화물)" },
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

const SPICE_LEVELS = ["안매움", "보통", "매움"];
const CUISINE_TYPES = ["한식", "중식", "일식", "양식", "기타"];

export const PreferencesPopup = ({ onClose, userData }) => {
  const [healthGoalIds, setHealthGoalIds] = useState([]);
  const [allergyIds, setAllergyIds] = useState([]);
  const [dislikedIngredients, setDislikedIngredients] = useState("");
  const [preferredIngredients, setPreferredIngredients] = useState("");
  const [preferredCuisine, setPreferredCuisine] = useState("");
  const [spiceLevel, setSpiceLevel] = useState("");
  const [allowPushConsumption, setAllowPushConsumption] = useState(true);
  const [allowPushComment, setAllowPushComment] = useState(true);
  const [allowPushNudge, setAllowPushNudge] = useState(true);

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
    setPreferredCuisine((prev) =>
      prev.includes(cuisine) ? prev.filter((item) => item !== cuisine) : [...prev, cuisine]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const preferences = {
      ...userData,
      healthGoalIds,
      allergyIds,
      dislikedIngredients,
      preferredIngredients,
      preferredCuisine,
      spiceLevel,
      allowPushConsumption,
      allowPushComment,
      allowPushNudge,
    };

    // TODO: Backend Integration: Replace with actual API call to save user preferences
    // Example: axios.post(`/api/users/${userData.username}/preferences`, preferences)
    //   .then(() => {
    //     alert("회원가입이 완료되었습니다!");
    //     onClose();
    //   })
    //   .catch(error => {
    //     alert("성향 저장 실패: " + error.response.data.message);
    //   });

    // Simulating saving preferences to localStorage
    console.log("Complete signup with preferences:", preferences);
    localStorage.setItem("userPreferences", JSON.stringify(preferences)); // Store preferences
    alert("회원가입이 완료되었습니다!");
    onClose();
  };

  return (
    <div className="preferences-popup-overlay" onClick={onClose}>
      <div className="preferences-popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="preferences-popup-close" onClick={onClose}>×</button>

        <div className="preferences-popup-header">
          <h2 className="preferences-popup-title">성향 설정</h2>
          <p className="preferences-popup-subtitle">맞춤 추천을 위한 정보를 입력해주세요</p>
        </div>

        <form className="preferences-popup-form" onSubmit={handleSubmit}>
          <div className="preferences-popup-section">
            <label className="preferences-popup-section-label">건강 목표</label>
            <div className="preferences-popup-chips">
              {HEALTH_GOALS.map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  className={`preferences-chip ${healthGoalIds.includes(goal.id) ? "active" : ""}`}
                  onClick={() => toggleHealthGoal(goal.id)}
                >
                  {goal.name}
                </button>
              ))}
            </div>
          </div>

          <div className="preferences-popup-section">
            <label className="preferences-popup-section-label">알레르기</label>
            <div className="preferences-popup-chips">
              {ALLERGIES.map((allergy) => (
                <button
                  key={allergy.id}
                  type="button"
                  className={`preferences-chip ${allergyIds.includes(allergy.id) ? "active" : ""}`}
                  onClick={() => toggleAllergy(allergy.id)}
                >
                  {allergy.name}
                </button>
              ))}
            </div>
          </div>

          <div className="preferences-popup-input-group">
            <label className="preferences-popup-label">싫어하는 재료 (쉼표로 구분)</label>
            <input
              type="text"
              className="preferences-popup-input"
              value={dislikedIngredients}
              onChange={(e) => setDislikedIngredients(e.target.value)}
              placeholder="예: 오이, 가지"
            />
          </div>

          <div className="preferences-popup-input-group">
            <label className="preferences-popup-label">선호하는 재료 (쉼표로 구분)</label>
            <input
              type="text"
              className="preferences-popup-input"
              value={preferredIngredients}
              onChange={(e) => setPreferredIngredients(e.target.value)}
              placeholder="예: 돼지고기, 감자"
            />
          </div>

          <div className="preferences-popup-section">
            <label className="preferences-popup-section-label">선호 요리 (다중 선택)</label>
            
            {/* 중요: chips 클래스로 감싸야 가로로 배치됩니다 */}
            <div className="preferences-popup-chips">
              {CUISINE_TYPES.map((cuisine) => (
                <button
                  key={cuisine}
                  type="button"
                  className={`preferences-chip ${preferredCuisine.includes(cuisine) ? "active" : ""}`}
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
