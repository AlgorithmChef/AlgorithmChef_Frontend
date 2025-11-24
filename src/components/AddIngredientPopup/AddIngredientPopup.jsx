import React, { useState } from "react";
import "./style.css";

const CATEGORIES = ["육류", "채소류", "가공류", "유제품", "기타"];

export const AddIngredientPopup = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("채소류");
  const [expiryDays, setExpiryDays] = useState("");
  
  // 영수증 분석(1단계) 완료 여부를 체크하는 상태
  const [isReceiptProcessed, setIsReceiptProcessed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1단계: 영수증 등록 버튼을 눌렀을 때 (아직 분석 결과가 안 나왔을 때)
    if (!isReceiptProcessed) {
      // TODO: 백엔드로 영수증 이미지를 보내고 분석 결과를 받아오는 로직이 들어갈 자리
      console.log("영수증 분석 시작...");
      
      // [가상 시나리오] 백엔드에서 분석된 결과가 자동으로 채워진다고 가정
      // setName("분석된 양파"); 
      // setExpiryDays("7");
      
      setIsReceiptProcessed(true); // 입력 필드를 보여주도록 상태 변경
      return;
    }
    
    // 2단계: 최종 등록 버튼을 눌렀을 때
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
          <h2 className="add-ingredient-popup-title">영수증 등록</h2>
        </div>

        <form className="add-ingredient-popup-form" onSubmit={handleSubmit}>
          <div className="add-ingredient-popup-input-group">
            <label className="add-ingredient-popup-label">영수증</label>
            <input
              type="file"
              className="add-ingredient-popup-input"
              required={!isReceiptProcessed} // 분석 전에는 필수 입력
              disabled={isReceiptProcessed}  // 분석 후에는 수정 불가 (선택 사항)
            />
          </div>
          
          {/* isReceiptProcessed가 true일 때만 아래 내용 표시 백앤드에서 분석한 결과 표시해주는 곳 사용자 확인용 마음에 안들면 여기서 수정가능 */}
          {isReceiptProcessed && (
            <>
              <div className="add-ingredient-popup-input-group">
                <label className="add-ingredient-popup-label">재료명</label>
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
            </>
          )}

          <button type="submit" className="add-ingredient-popup-submit-btn">
            {isReceiptProcessed ? "최종 등록" : "추가하기"}
          </button>
        </form>
      </div>
    </div>
  );
};