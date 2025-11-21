import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IngredientComponent } from "../../../../components/IngredientComponent";
import { IngredientInventoryWrapper } from "../../../../components/IngredientInventoryWrapper";
import { AddIngredientPopup } from "../../../../components/AddIngredientPopup";
import "./style.css";

const CATEGORIES = ["전체", "육류", "채소류", "가공류", "유제품", "기타"];

const INITIAL_INGREDIENTS = [
  // TODO: Backend Integration: Replace with API call to fetch user's ingredients
  { id: 1, name: "양파", category: "채소류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-1.png", expiryDays: 5 },
  { id: 2, name: "닭고기", category: "육류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png", expiryDays: 3 },
  { id: 3, name: "고추장", category: "가공류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png", expiryDays: 30 },
  { id: 4, name: "고춧가루", category: "가공류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png", expiryDays: 60 },
  { id: 5, name: "양배추", category: "채소류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png", expiryDays: 7 },
  { id: 6, name: "스테비아", category: "가공류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png", expiryDays: 90 },
  { id: 7, name: "마늘", category: "채소류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png", expiryDays: 14 },
];

export const IngredientInventory = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [ingredients, setIngredients] = useState(INITIAL_INGREDIENTS);

  const handleAddIngredient = (newIngredient) => {
    setIngredients([...ingredients, newIngredient]);
  };

  const filteredIngredients = selectedCategory === "전체" 
    ? ingredients 
    : ingredients.filter(item => item.category === selectedCategory);

  return (
    <div className="ingredient-inventory">
      <IngredientInventoryWrapper className="ingredient-inventory-header" />
      <div className="ingredient-category-wrapper">
        <button 
          className="ingredient-category-button"
          onClick={() => setShowCategoryMenu(!showCategoryMenu)}
        >
          <span className="ingredient-category-text">{selectedCategory}</span>
          <span className="ingredient-category-arrow">{showCategoryMenu ? "▲" : "▼"}</span>
        </button>
        {showCategoryMenu && (
          <div className="ingredient-category-menu">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className={`ingredient-category-menu-item ${selectedCategory === category ? "active" : ""}`}
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

      <div className="ingrdient-invnetory">
        {filteredIngredients.map((ingredient) => (
          <IngredientComponent
            key={ingredient.id}
            className="ingredient-component-instance"
            ingredientImage={ingredient.image}
            text={ingredient.name}
            expiryDays={ingredient.expiryDays}
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

        <button className="receipt-register-btn" onClick={() => setShowAddPopup(true)}>
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

      {showAddPopup && (
        <AddIngredientPopup
          onClose={() => setShowAddPopup(false)}
          onAdd={handleAddIngredient}
        />
      )}
    </div>
  );
};
