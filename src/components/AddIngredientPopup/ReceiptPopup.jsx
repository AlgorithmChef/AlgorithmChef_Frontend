import { useState } from "react";
import "./style.css";
import AddIngredientPopup from "./AddIngredientPopup";
function ReceiptPopup({ onClose }) {
  const [showAddPopup, setShowAddPopup] = useState(false);
  if (showAddPopup) {
    return (
      <AddIngredientPopup
        onClose={() => setShowAddPopup(false)}
        onAdd={() => console.log("추가할 예정")}
        items={() => console.log("ocr api 돌려서 나온 결과")}
      />
    );
  }
  return (
    <div className="add-ingredient-popup-overlay" onClick={onClose}>
      <div
        className="add-ingredient-popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="add-ingredient-popup-close" onClick={onClose}>
          ×
        </button>
        <div className="add-ingredient-popup-header">
          <h2 className="add-ingredient-popup-title">영수증 등록</h2>
        </div>
        <form
          className="add-ingredient-popup-form"
          onSubmit={handleAnalyzeReceipt}
        >
          <div className="add-ingredient-popup-input-group">
            <label className="add-ingredient-popup-label">영수증 업로드</label>
            <input
              type="file"
              className="add-ingredient-popup-input file-input"
              accept="image/*"
              required
            />
            <p className="helper-text">선명한 영수증 사진을 올려주세요.</p>
          </div>
          <button type="submit" className="add-ingredient-popup-submit-btn">
            분석 시작
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReceiptPopup;
