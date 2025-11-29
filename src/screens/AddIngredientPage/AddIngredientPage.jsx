import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UnifiedHeader } from "../../components/UnifiedHeader";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import "./style.css";
import { useAuth } from "../../contexts/AuthContext";
import {
  registerIngredientManual,
  updateIngredients,
} from "../../api/fridgeApi";
import {
  filterIngredientsByName,
  getIngredientsInfo,
  filterIngredientsByCategory,
} from "../../api/ingredientsApi";

import { AddIngredientPopup } from "../../components/AddIngredientPopup/AddIngredientPopup";

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

export const AddIngredientPage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [previewIngredients, setPreviewIngredients] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 7;
  const [ingredients, setIngredients] = useState([]);
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState(false);

  useEffect(() => {
    setPage(0);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    if (!isAuthenticated) {
      setIngredients([]);
      return;
    }
    const fetchData = async () => {
      let ingredientData = [];
      try {
        if (searchQuery) {
          ingredientData = await filterIngredientsByName(
            page,
            itemsPerPage,
            searchQuery
          );
        } else if (selectedCategory && selectedCategory !== "전체") {
          ingredientData = await filterIngredientsByCategory(
            page,
            itemsPerPage,
            selectedCategory
          );
        } else {
          ingredientData = await getIngredientsInfo(page, itemsPerPage);
        }

        if (ingredientData.content) {
          setIngredients(ingredientData.content);
        } else if (Array.isArray(ingredientData)) {
          setIngredients(ingredientData);
        } else {
          setIngredients([]);
        }
      } catch (error) {
        console.error("재료 데이터 로딩 실패");
      }
    };
    fetchData();
  }, [isAuthenticated, searchQuery, selectedCategory, page]);

  function handlePrev() {
    setPage((prev) => Math.max(prev - 1, 0));
  }
  function handleNext() {
    if (ingredients.length === itemsPerPage) setPage((prev) => prev + 1);
  }

  const toggleIngredient = (ingredient) => {
    setSelectedIngredients((prev) => {
      const exists = prev.find((item) => item.id === ingredient.id);
      if (exists) {
        return prev.filter((item) => item.id !== ingredient.id);
      } else {
        const today = new Date().toISOString().split("T")[0];
        return [
          ...prev,
          {
            ...ingredient,
            purchaseDate: today,
            image: DEFAULT_IMAGE_URL,
          },
        ];
      }
    });
  };

  const handleAddIngredients = async () => {
    if (selectedIngredients.length === 0) {
      alert("추가할 식재료를 선택해주세요.");
      return;
    }

    try {
      // 1차 등록을 통해 서버 계산값(유통기한 등) 가져오기
      const requestData = selectedIngredients.map((item) => ({
        name: item.name,
        purchaseDate: `${item.purchaseDate}T00:00:00`,
      }));

      const response = await registerIngredientManual(requestData);

      if (response && response.ingredients) {
        setPreviewIngredients(response.ingredients);
        setCurrentView("확인"); // 팝업 오픈
      }
    } catch (error) {
      console.error("1차 등록 실패:", error);
      alert("재료 정보를 불러오는 데 실패했습니다.");
    }
  };

  const handleFinalUpdate = async (updatedItems) => {
    try {
      const requestData = {
        ingredients: updatedItems.map((item) => ({
          ingredientId: item.id,
          purchaseDate: `${item.purchaseDate}T00:00:00`,
          expiredDate: item.expiredDate ? `${item.expiredDate}T00:00:00` : null,
        })),
      };

      const result = await updateIngredients(requestData);

      if (result) {
        alert("재료가 성공적으로 저장되었습니다!");
        setSelectedIngredients([]);
        setPreviewIngredients([]);
        setCurrentView(false);
        navigate("/desktop");
      }
    } catch (error) {
      console.error("최종 저장 실패:", error);
      alert("재료 수정에 실패했습니다.");
    }
  };

  if (currentView === "확인") {
    return (
      <AddIngredientPopup
        items={previewIngredients}
        onAdd={handleFinalUpdate}
        onClose={() => setCurrentView(false)}
      />
    );
  }

  return (
    <div className="add-ingredient-page">
      <UnifiedHeader />
      <div className="add-ingredient-content">
        <div className="add-ingredient-title-section">
          <h1 className="add-ingredient-title">식재료 추가</h1>
          <p className="add-ingredient-subtitle">
            냉장고에 추가할 식재료를 선택하세요
          </p>
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
              className={`add-ingredient-category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 가로 스크롤 그리드 */}
        <div className="add-ingredient-grid-wrapper">
          <button className="scroll-arrow-btn left" onClick={handlePrev}>
            <BiSolidLeftArrow />
          </button>

          <div className="add-ingredient-grid" ref={scrollRef}>
            {ingredients.map((ingredient) => {
              const isSelected = selectedIngredients.find(
                (item) => item.id === ingredient.id
              );
              return (
                <button
                  key={ingredient.id}
                  className={`add-ingredient-card ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => toggleIngredient(ingredient)}
                >
                  <img
                    src={DEFAULT_IMAGE_URL}
                    alt={ingredient.name}
                    className="add-ingredient-card-image"
                  />
                  <div className="add-ingredient-card-name">
                    {ingredient.name}
                  </div>
                  <div className="add-ingredient-card-category">
                    {ingredient.category}
                  </div>
                  {isSelected && (
                    <div className="add-ingredient-card-check">✓</div>
                  )}
                </button>
              );
            })}
          </div>

          <button className="scroll-arrow-btn right" onClick={handleNext}>
            <BiSolidRightArrow />
          </button>
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
