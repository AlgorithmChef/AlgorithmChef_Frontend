import React, { useState } from "react";
import "./style.css";
import {
  updateIngredientInfo,
  deleteIngredientInfo,
} from "../../api/fridgeApi";

function ChangeIngredientPopup({ ingredient, onClose, onUpdate }) {
  if (!ingredient) return null;

  const { id, name, purchaseDate, expiredDate } = ingredient;

  const formattedPurchaseDate = purchaseDate ? purchaseDate.split("T")[0] : "";
  const formattedExpiredDate = expiredDate ? expiredDate.split("T")[0] : "";

  const [newPurchaseDate, setNewPurchaseDate] = useState(formattedPurchaseDate);
  const [newExpiredDate, setNewExpiredDate] = useState(formattedExpiredDate);
  const handleUpdate = async () => {
    if (!newPurchaseDate || !newExpiredDate) {
      alert("구매일자와 유통기한을 모두 입력해주세요.");
      return;
    }

    try {
      const updateData = {
        ingredientId: id,
        purchasedDate: `${newPurchaseDate}T00:00:00`,
        expiredDate: `${newExpiredDate}T00:00:00`,
      };

      const response = await updateIngredientInfo(updateData);

      if (response) {
        console.log("수정 응답:", response);

        const msg = response.message || "수정되었습니다";
        alert(`${name}의 정보가 ${msg}.`);

        if (onUpdate) onUpdate();
        onClose();
      }
    } catch (error) {
      console.error("수정 실패:", error);
      const errorMsg = error.response?.data || "정보 수정에 실패했습니다.";
      alert(errorMsg);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`정말로 ${name}을(를) 삭제하시겠습니까?`)) {
      return;
    }

    try {
      const result = await deleteIngredientInfo(id);

      if (result) {
        console.log("삭제 요청 ID:", id);
        alert(`${name}이(가) 삭제되었습니다.`);

        if (onUpdate) onUpdate();
        onClose();
      }
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="add-ingredient-popup-overlay" onClick={onClose}>
      <div
        className="add-ingredient-popup-container change-popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="add-ingredient-popup-close" onClick={onClose}>
          ×
        </button>

        <div className="add-ingredient-popup-header">
          <h2 className="add-ingredient-popup-title">재료 정보 수정</h2>
          <p className="popup-subtitle">{name}</p>
        </div>

        <div className="change-popup-body">
          <div className="input-group">
            <label className="input-label">재료명</label>
            <input
              type="text"
              className="add-ingredient-popup-input disabled-input"
              value={name}
              disabled
            />
          </div>

          <div className="input-group">
            <label className="input-label">구매일자</label>
            <input
              type="date"
              className="add-ingredient-popup-input"
              value={newPurchaseDate}
              onChange={(e) => setNewPurchaseDate(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">유통기한</label>
            <input
              type="date"
              className="add-ingredient-popup-input"
              value={newExpiredDate}
              onChange={(e) => setNewExpiredDate(e.target.value)}
            />
          </div>
        </div>

        <div className="change-popup-footer">
          <button className="btn-delete" onClick={handleDelete}>
            삭제하기
          </button>
          <button className="btn-update" onClick={handleUpdate}>
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangeIngredientPopup;
