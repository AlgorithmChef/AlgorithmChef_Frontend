import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UnifiedHeader } from "../../components/UnifiedHeader";
import "./style.css";

const CATEGORIES = ["전체", "육류", "채소류", "가공류", "유제품", "기타"];

const MOCK_INGREDIENT_DATABASE = [
  // TODO: Backend Integration: Replace with API call to fetch all available ingredients from DB
  { id: 1, name: "양파", category: "채소류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-1.png" },
  { id: 2, name: "닭고기", category: "육류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png" },
  { id: 3, name: "돼지고기", category: "육류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png" },
  { id: 4, name: "소고기", category: "육류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png" },
  { id: 5, name: "고추장", category: "가공류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png" },
  { id: 6, name: "고춧가루", category: "가공류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png" },
  { id: 7, name: "된장", category: "가공류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png" },
  { id: 8, name: "간장", category: "가공류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png" },
  { id: 9, name: "양배추", category: "채소류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png" },
  { id: 10, name: "당근", category: "채소류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png" },
  { id: 11, name: "감자", category: "채소류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png" },
  { id: 12, name: "마늘", category: "채소류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png" },
  { id: 13, name: "우유", category: "유제품", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png" },
  { id: 14, name: "치즈", category: "유제품", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png" },
  { id: 15, name: "요거트", category: "유제품", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png" },
  { id: 16, name: "계란", category: "기타", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png" },
];

export const AddIngredientPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const filteredIngredients = MOCK_INGREDIENT_DATABASE.filter((ingredient) => {
    const matchesCategory = selectedCategory === "전체" || ingredient.category === selectedCategory;
    const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) => {
      const exists = prev.find((item) => item.id === ingredient.id);
      if (exists) {
        return prev.filter((item) => item.id !== ingredient.id);
      } else {
        return [...prev, { ...ingredient, expiryDays: 7 }];
      }
    });
  };

  const handleAddIngredients = () => {
    // TODO: Send selected ingredients to backend
    console.log("Adding ingredients:", selectedIngredients);
    navigate("/desktop");
  };

  return (
    <div className="add-ingredient-page">
      <UnifiedHeader />

      <div className="add-ingredient-content">
        <div className="add-ingredient-title-section">
          <h1 className="add-ingredient-title">식재료 추가</h1>
          <p className="add-ingredient-subtitle">냉장고에 추가할 식재료를 선택하세요</p>
        </div>

        <div className="add-ingredient-search-section">
          <input
            type="text"
            className="add-ingredient-search-input"
            placeholder="식재료 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="add-ingredient-category-section">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`add-ingredient-category-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="add-ingredient-grid">
          {filteredIngredients.map((ingredient) => {
            const isSelected = selectedIngredients.find((item) => item.id === ingredient.id);
            return (
              <button
                key={ingredient.id}
                className={`add-ingredient-card ${isSelected ? "selected" : ""}`}
                onClick={() => toggleIngredient(ingredient)}
              >
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className="add-ingredient-card-image"
                />
                <div className="add-ingredient-card-name">{ingredient.name}</div>
                <div className="add-ingredient-card-category">{ingredient.category}</div>
                {isSelected && (
                  <div className="add-ingredient-card-check">✓</div>
                )}
              </button>
            );
          })}
        </div>

        <div className="add-ingredient-footer">
          <div className="add-ingredient-selected-count">
            선택된 식재료: {selectedIngredients.length}개
          </div>
          <div className="add-ingredient-footer-buttons">
            <Link to="/desktop" className="add-ingredient-cancel-btn">
              취소
            </Link>
            <button
              className="add-ingredient-submit-btn"
              onClick={handleAddIngredients}
              disabled={selectedIngredients.length === 0}
            >
              추가하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
