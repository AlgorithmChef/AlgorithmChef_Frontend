import React, { useState } from "react";
import "./style.css";

const CATEGORIES = ["육류", "채소류", "가공류", "유제품", "기타"];

export const AddIngredientPopup = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("채소류");
  const [expiryDays, setExpiryDays] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name || !expiryDays) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const newIngredient = {
      id: Date.now(),
      name,
      category,
      expiryDays: parseInt(expiryDays),
      image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png"
    };

    // TODO: Send to backend
    console.log("Adding ingredient via receipt:", newIngredient);
    onAdd(newIngredient);
    onClose();
  };

  return (
    <div className="add-ingredient-popup-overlay" onClick={onClose}>
      <div className="add-ingredient-popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="add-ingredient-popup-close" onClick={onClose}>×</button>
        
        <div className="add-ingredient-popup-header">
          <h2 className="add-ingredient-popup-title">식재료 추가</h2>
        </div>

        <form className="add-ingredient-popup-form" onSubmit={handleSubmit}>
          <div className="add-ingredient-popup-input-group">
            <label className="add-ingredient-popup-label">식재료 이름</label>
            <input
              type="text"
              className="add-ingredient-popup-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 양파"
              required
            />
          </div>

          <div className="add-ingredient-popup-input-group">
            <label className="add-ingredient-popup-label">카테고리</label>
            <select
              className="add-ingredient-popup-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="add-ingredient-popup-input-group">
            <label className="add-ingredient-popup-label">유통기한 (일)</label>
            <input
              type="number"
              className="add-ingredient-popup-input"
              value={expiryDays}
              onChange={(e) => setExpiryDays(e.target.value)}
              placeholder="예: 7"
              min="1"
              required
            />
          </div>

          <button type="submit" className="add-ingredient-popup-submit-btn">
            추가하기
          </button>
        </form>
      </div>
    </div>
  );
};
