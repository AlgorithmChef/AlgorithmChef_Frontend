import React, { useState, useEffect } from "react";
import "./style.css";
import { getUserInfo, updateUserTendency } from "../../api/userInfo";
import { getAllergyInfo, getHealthGoalInfo } from "../../api/preferenceApi";

const SPICE_LEVELS = ["안매움", "보통", "매움"];
const CUISINE_TYPES = ["한식", "중식", "일식", "양식", "기타"];

function UpdatePreference({ onClose }) {
  const [healthGoalIds, setHealthGoalIds] = useState([]);
  const [allergyIds, setAllergyIds] = useState([]);

  const [dislikedIngredients, setDislikedIngredients] = useState("");
  const [likedIngredients, setLikedIngredients] = useState("");

  const [preferredCuisineList, setPreferredCuisineList] = useState([]);
  const [spiceLevel, setSpiceLevel] = useState("");

  const [allowPushConsumption, setAllowPushConsumption] = useState(false);
  const [allowPushComment, setAllowPushComment] = useState(false);
  const [allowPushNudge, setAllowPushNudge] = useState(false);

  const [serverHealthGoals, setServerHealthGoals] = useState([]);
  const [serverAllergies, setServerAllergies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [healthData, allergyData, myData] = await Promise.all([
          getHealthGoalInfo(),
          getAllergyInfo(),
          getUserInfo(),
        ]);

        const healthList = healthData || [];
        const allergyList = allergyData || [];

        setServerHealthGoals(healthList);
        setServerAllergies(allergyList);

        if (myData) {
          const myGoalIds = (myData.goals || [])
            .map((name) => healthList.find((h) => h.name === name)?.id)
            .filter((id) => id !== undefined);
          setHealthGoalIds(myGoalIds);

          const myAllergyIds = (myData.allergyList || [])
            .map((name) => allergyList.find((a) => a.name === name)?.id)
            .filter((id) => id !== undefined);
          setAllergyIds(myAllergyIds);

          setDislikedIngredients(myData.dislikedIngredients || "");

          setLikedIngredients(myData.likedIngredients || "");

          setSpiceLevel(myData.spiceLevel || "");

          if (myData.preferredCuisine) {
            setPreferredCuisineList(myData.preferredCuisine.split(","));
          }

          setAllowPushConsumption(myData.allowPushConsumption);
          setAllowPushComment(myData.allowPushComment);
          setAllowPushNudge(myData.allowPushNudge);
        }
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        alert("정보를 불러오는 데 실패했습니다.");
        onClose();
      }
    };

    fetchData();
  }, [onClose]);

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

    const updatedData = {
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

    try {
      const result = await updateUserTendency(updatedData);
      if (result) {
        alert("성향 정보가 수정되었습니다.");
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("수정 실패:", error);
      alert("정보 수정에 실패했습니다.");
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
          <h2 className="preferences-popup-title">성향 수정</h2>
          <p className="preferences-popup-subtitle">
            변경할 내용을 선택해주세요
          </p>
        </div>

        <form className="preferences-popup-form" onSubmit={handleSubmit}>
          <div className="preferences-popup-section">
            <label className="preferences-popup-section-label">건강 목표</label>
            <div className="preferences-popup-chips">
              {serverHealthGoals.map((goal) => (
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
              ))}
            </div>
          </div>

          <div className="preferences-popup-section">
            <label className="preferences-popup-section-label">알레르기</label>
            <div className="preferences-popup-chips">
              {serverAllergies.map((allergy) => (
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
              ))}
            </div>
          </div>

          <div className="preferences-popup-input-group">
            <label className="preferences-popup-label">싫어하는 재료</label>
            <input
              type="text"
              className="preferences-popup-input"
              value={dislikedIngredients}
              onChange={(e) => setDislikedIngredients(e.target.value)}
            />
          </div>

          <div className="preferences-popup-input-group">
            <label className="preferences-popup-label">선호하는 재료</label>
            <input
              type="text"
              className="preferences-popup-input"
              value={likedIngredients}
              onChange={(e) => setLikedIngredients(e.target.value)}
            />
          </div>

          <div className="preferences-popup-section">
            <label className="preferences-popup-section-label">선호 요리</label>
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
            수정 완료
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePreference;
