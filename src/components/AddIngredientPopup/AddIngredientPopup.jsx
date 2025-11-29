import React, { useState, useEffect } from "react";
import "./style.css";

const DEFAULT_IMAGE_URL =
  "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png";

export const AddIngredientPopup = ({ onClose, onAdd, items }) => {
  const [editingItems, setEditingItems] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    if (items && items.length > 0) {
      const initializedItems = items.map((item) => ({
        ...item,
        purchaseDate: item.purchaseDate
          ? item.purchaseDate.split("T")[0]
          : today,
        expiredDate: item.expiredDate ? item.expiredDate.split("T")[0] : "",
        image: item.image || DEFAULT_IMAGE_URL,
      }));
      setEditingItems(initializedItems);
    }
  }, [items]);

  const handleItemChange = (id, field, value) => {
    setEditingItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDeleteItem = (id) => {
    setEditingItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFinalSubmit = () => {
    const isValid = editingItems.every(
      (item) => item.name && item.purchaseDate && item.expiredDate
    );

    if (!isValid) {
      alert("모든 재료의 이름, 구매일자, 유통기한을 입력해주세요.");
      return;
    }

    if (editingItems.length === 0) {
      alert("등록할 재료가 없습니다.");
      return;
    }

    onAdd(editingItems);
  };

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
          <h2 className="add-ingredient-popup-title">재료 확인 및 수정</h2>
          <p style={{ color: "#666", marginTop: "5px", fontSize: "14px" }}>
            자동 계산된 유통기한을 확인하고 필요하면 수정해주세요.
          </p>
        </div>

        <div className="processed-list-container">
          <div className="processed-list-header">
            <span style={{ flex: 1.5 }}>재료명</span>
            <span style={{ flex: 1.2, textAlign: "center" }}>구매일자</span>
            <span style={{ flex: 1.2, textAlign: "center" }}>유통기한</span>
            <span style={{ width: "30px" }}></span>
          </div>

          <div className="processed-list-body">
            {editingItems.map((item) => (
              <div key={item.id} className="processed-item-row">
                <input
                  type="text"
                  className="item-input name-input"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(item.id, "name", e.target.value)
                  }
                  placeholder="재료명"
                />

                <input
                  type="date"
                  className="item-input date-input"
                  value={item.purchaseDate}
                  onChange={(e) =>
                    handleItemChange(item.id, "purchaseDate", e.target.value)
                  }
                />

                <input
                  type="date"
                  className="item-input date-input"
                  value={item.expiredDate}
                  onChange={(e) =>
                    handleItemChange(item.id, "expiredDate", e.target.value)
                  }
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
          </div>

          <button
            onClick={handleFinalSubmit}
            className="add-ingredient-popup-submit-btn"
          >
            {editingItems.length}개 재료 저장하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddIngredientPopup;
