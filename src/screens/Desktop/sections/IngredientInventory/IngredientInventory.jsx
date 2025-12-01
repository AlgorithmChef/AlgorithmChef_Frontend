import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IngredientComponent } from "../../../../components/IngredientComponent";
import { IngredientInventoryWrapper } from "../../../../components/IngredientInventoryWrapper";
import { AddIngredientPopup } from "../../../../components/AddIngredientPopup";
import "./style.css";
import { useAuth } from "../../../../contexts/AuthContext";
import {
  filterFridgeIngredientsByCategory,
  getFridgeIngredients,
} from "../../../../api/fridgeApi";
import ReceiptPopup from "../../../../components/AddIngredientPopup/ReceiptPopup";

const CATEGORIES = [
  "전체",
  "육류",
  "가공육",
  "난류",
  "수산물",
  "가공수산물",
  "건어물",
  "젓갈",
  "채소",
  "버섯",
  "유제품",
  "두부류",
  "콩가공품",
  "콩",
  "김치류",
  "절임류",
  "빵류",
  "기타",
  "가공식품",
  "과일",
  "조미료",
  "향신료",
  "곡류",
  "견과",
];
const DEFAULT_IMAGE_URL =
  "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png";

export const IngredientInventory = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const { isAuthenticated } = useAuth();
  const [fridgeIngredients, setFridgeIngredients] = useState([]);

  const fetchData = async () => {
    if (!isAuthenticated) {
      setFridgeIngredients([]);
      return;
    }

    try {
      let ingredientData = null;
      if (selectedCategory && selectedCategory !== "전체") {
        ingredientData = await filterFridgeIngredientsByCategory(
          selectedCategory
        );
      } else {
        ingredientData = await getFridgeIngredients();
      }

      if (ingredientData && ingredientData.ingredients) {
        setFridgeIngredients(ingredientData.ingredients);
      } else {
        setFridgeIngredients([]);
      }
    } catch (error) {
      console.error("재료 데이터 로딩 실패", error);
      setFridgeIngredients([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isAuthenticated, selectedCategory]);

  return (
    <div className="ingredient-inventory">
      <IngredientInventoryWrapper className="ingredient-inventory-header" />
      <div className="ingredient-category-wrapper">
        <button
          className="ingredient-category-button"
          onClick={() => setShowCategoryMenu(!showCategoryMenu)}
        >
          <span className="ingredient-category-text">{selectedCategory}</span>
          <span className="ingredient-category-arrow">
            {showCategoryMenu ? "▲" : "▼"}
          </span>
        </button>
        {showCategoryMenu && (
          <div className="ingredient-category-menu">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`ingredient-category-menu-item ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowCategoryMenu(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="ingredient-inventory-list">
        {fridgeIngredients.length === 0 && (
          <div className="empty-fridge-card">
            <p className="empty-fridge-text">
              냉장고에 등록된 식재료가 없습니다.
            </p>
          </div>
        )}

        {Array.isArray(fridgeIngredients) &&
          fridgeIngredients.map((ingredient) => (
            <IngredientComponent
              key={ingredient.id}
              className="ingredient-component-instance"
              ingredientImage={DEFAULT_IMAGE_URL}
              ingredient={ingredient}
              onUpdate={fetchData}
            />
          ))}

        <Link to="/addingredient" className="add-new-ingredient">
          <div className="add-new-container">
            <div className="add-new-header">
              <div className="add-new-header-text">추가하기</div>
            </div>

            <div className="add-new-section">
              <img
                className="add-new-icon"
                alt="Add new icon"
                src="https://c.animaapp.com/sjWITF5i/img/addnewicon.svg"
              />
            </div>
          </div>
        </Link>

        <button
          className="receipt-register-btn"
          onClick={() => setShowAddPopup(true)}
        >
          <div className="receipt-register-container">
            <div className="receipt-register-text">영수증 등록하기</div>
            <img
              className="receipt-register-icon"
              alt="Receipt icon"
              src="https://c.animaapp.com/sjWITF5i/img/addnewicon.svg"
            />
          </div>
        </button>
      </div>

      {showAddPopup && <ReceiptPopup onClose={() => setShowAddPopup(false)} />}
    </div>
  );
};
