import React, { useState } from "react";
import "./style.css";

// 카테고리 상수는 제거하거나, 백엔드 전송용으로 내부에서만 기본값 처리하면 됩니다.

export const AddIngredientPopup = ({ onClose, onAdd }) => {
  const [isReceiptProcessed, setIsReceiptProcessed] = useState(false);
  const [items, setItems] = useState([]);

  // 1단계: 영수증 분석 시뮬레이션
  const handleAnalyzeReceipt = (e) => {
    e.preventDefault();
    console.log("영수증 분석 시작...");

    const mockAnalyzedData = [
      { id: 1, name: "양파", expiryDays: 7 },
      { id: 2, name: "삼겹살", expiryDays: 3 },
      { id: 3, name: "우유", expiryDays: 10 },
      { id: 4, name: "종량제봉투", expiryDays: 0 },
    ];

    setItems(mockAnalyzedData);
    setIsReceiptProcessed(true);
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      name: "",
      expiryDays: ""
    };
    setItems([...items, newItem]);
  };

  const handleFinalSubmit = () => {
    const isValid = items.every(item => item.name && item.expiryDays !== "");
    if (!isValid) {
      alert("모든 재료의 정보를 입력해주세요.");
      return;
    }

    items.forEach(item => {
        onAdd({
            ...item,
            category: "기타", // 백엔드에서 필요하다면 기본값으로 '기타'나 '미분류' 전송
            expiryDays: parseInt(item.expiryDays),
            image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png"
        });
    });

    onClose();
  };

  return (
    <div className="add-ingredient-popup-overlay" onClick={onClose}>
      <div className="add-ingredient-popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="add-ingredient-popup-close" onClick={onClose}>×</button>
        
        <div className="add-ingredient-popup-header">
          <h2 className="add-ingredient-popup-title">
            {isReceiptProcessed ? "분석 결과 확인" : "영수증 등록"}
          </h2>
        </div>

        {!isReceiptProcessed ? (
          <form className="add-ingredient-popup-form" onSubmit={handleAnalyzeReceipt}>
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
        ) : (
          <div className="processed-list-container">
            {/* 카테고리 헤더 삭제 */}
            <div className="processed-list-header">
                <span style={{ flex: 3 }}>재료명</span>
                <span style={{ flex: 1, textAlign: 'center' }}>기한(일)</span>
                <span style={{ width: '28px' }}></span> {/* 삭제버튼 자리 */}
            </div>
            
            <div className="processed-list-body">
              {items.map((item) => (
                <div key={item.id} className="processed-item-row">
                  {/* 카테고리 Select 삭제, 이름 입력창 확장 */}
                  <input
                    type="text"
                    className="item-input name-input"
                    value={item.name}
                    onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                    placeholder="재료명"
                  />
                  
                  <input
                    type="number"
                    className="item-input date-input"
                    value={item.expiryDays}
                    onChange={(e) => handleItemChange(item.id, "expiryDays", e.target.value)}
                    placeholder="일"
                  />
                  <button 
                    className="item-delete-btn" 
                    onClick={() => handleDeleteItem(item.id)}
                    title="삭제"
                  >
                    −
                  </button>
                </div>
              ))}
              
              <button className="add-row-btn" onClick={handleAddItem}>
                + 직접 추가하기
              </button>
            </div>

            <button onClick={handleFinalSubmit} className="add-ingredient-popup-submit-btn">
              {items.length}개 재료 등록하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};