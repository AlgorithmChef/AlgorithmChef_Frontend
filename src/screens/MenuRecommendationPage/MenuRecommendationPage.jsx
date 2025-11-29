import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { UnifiedHeader } from "../../components/UnifiedHeader";
import "./style.css";
import Voice from "./Voice/Voice";
import { useAuth } from "../../contexts/AuthContext";
import { getFridgeIngredients } from "../../api/fridgeApi";
import {
  getRandomRecipe,
  getRandomRecipeMultiple,
} from "../../api/Recipe/recipeApi";
import {
  recommendExpir,
  recommendPrefer,
  recommendCondition,
} from "../../api/Recipe/geminiRecipeApi";

const RECIPES_PER_PAGE = 12;
const DEFAULT_IMAGE_URL =
  "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png";

export const MenuRecommendationPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fridgeIngredients, setFridgeIngredients] = useState([]);
  const [recommendationType, setRecommendationType] = useState(null);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const scrollContainerRef = useRef(null);
  const { isAuthenticated } = useAuth();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const startVoiceRecognition = () => {
    setIsVoiceMode(true);
  };

  const closeVoicePopup = () => {
    setIsVoiceMode(false);
  };

  const handleVoiceResult = (voiceRecipes) => {
    if (searchQuery) {
      setSearchQuery("");
    }
    if (voiceRecipes && voiceRecipes.length > 0) {
      setSearchQuery("음성 검색 결과");
      setRecipes(voiceRecipes);
      setRecommendationType("voice");
      setCurrentPage(0);
      setShowRecipe(true);
    } else {
      alert("음성 검색 결과에 해당하는 레시피가 없습니다.");
    }
    closeVoicePopup();
  };

  const handleGeminiSearch = async () => {
    if (!isAuthenticated) {
      console.log("인증 안되어 있음");
      return;
    }
    if (!searchQuery) {
      alert("조건을 먼저 입력해주세요");
      return;
    }
    setIsLoading(true);
    setShowRecipe(false);
    setRecommendationType("condition");

    const userId = localStorage.getItem("userId");
    const requestData = {
      userId,
      excludedTitles: [],
      condition: searchQuery,
    };

    try {
      const result = await recommendCondition(requestData);
      if (result && result.length > 0) {
        setRecipes(result);
        setShowRecipe(true);
      } else {
        alert("레시피가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("추천 실패:", error);
      alert("오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetIngredients = async () => {
    setRecommendationType("ingredient");
    setShowRecipe(false);

    try {
      const response = await getFridgeIngredients();
      const ingredientsList = response?.ingredients || [];
      setFridgeIngredients(ingredientsList);

      if (ingredientsList.length === 0) {
        alert(
          "냉장고에 등록된 재료가 없으므로 추천을 진행할 수 없습니다. 재료를 추가해주세요."
        );
        return;
      }
    } catch (error) {
      console.error(
        "API 호출 실패:",
        error.response?.status,
        error.response?.data
      );
      alert("냉장고 재료를 불러오는 데 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleTendencyBasedRecommendation = async () => {
    if (!isAuthenticated) {
      console.log("로그인 하고 오세요!!");
      setRecipes([]);
      return;
    }
    if (searchQuery) {
      setSearchQuery("");
    }
    const userId = localStorage.getItem("userId");
    const requestData = {
      userId,
      excludedTitles: [],
    };
    setRecommendationType("tendency");
    setIsLoading(true);
    setShowRecipe(false);
    try {
      const result = await recommendPrefer(requestData);
      console.log("추천결과", result);
      if (result && result.length > 0) {
        setRecipes(result);
        setShowRecipe(true);
      } else {
        alert("추천 결과가 없습니다.");
      }
    } catch (error) {
      console.error("추천 실패:", error);
      alert("오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);
  const displayedRecipes = recipes.slice(
    currentPage * RECIPES_PER_PAGE,
    (currentPage + 1) * RECIPES_PER_PAGE
  );

  const handleScroll = (direction) => {
    if (direction === "left" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "right" && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleIngredientClick = (ingredientName) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredientName)) {
        return prevSelected.filter((name) => name !== ingredientName);
      } else {
        return [...prevSelected, ingredientName];
      }
    });
  };

  const handleIngredientBasedRecommendation = async () => {
    if (!isAuthenticated) {
      console.log("인증 안되어 있음");
      return;
    }
    if (searchQuery) {
      setSearchQuery("");
    }
    if (selectedIngredients.length === 0) {
      alert("재료를 먼저 선택해주세요.");
      return;
    }

    setIsLoading(true);
    setRecommendationType("ingredient");
    setShowRecipe(false);

    try {
      let result = null;

      if (selectedIngredients.length === 1) {
        console.log("단일 재료 검색:", selectedIngredients[0]);
        result = await getRandomRecipe(selectedIngredients[0]);
      } else {
        console.log("다중 재료 검색:", selectedIngredients);
        result = await getRandomRecipeMultiple(selectedIngredients);
      }

      console.log("서버 응답 데이터:", result);

      if (!result) {
        setRecipes([]);
        alert("해당 재료로 추천할 레시피가 없습니다.");
      } else if (Array.isArray(result)) {
        setRecipes(result);
        setCurrentPage(0);
        setShowRecipe(true);
      } else if (typeof result === "object") {
        setRecipes([result]);
        setCurrentPage(0);
        setShowRecipe(true);
      } else if (typeof result === "string") {
        setRecipes([]);
        alert(result);
      } else {
        setRecipes([]);
        alert("알 수 없는 데이터 형식입니다.");
      }
    } catch (error) {
      console.error("레시피 추천 로직 실패:", error);
      alert("레시피를 불러오는 중 오류가 발생했습니다.");
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpiredIngredientBasedRecommendation = async () => {
    if (!isAuthenticated) {
      console.log("로그인 하고 오세요!!");
      setRecipes([]);
      return;
    }
    if (searchQuery) {
      setSearchQuery("");
    }

    if (fridgeIngredients.length === 0) {
      alert("먼저 '식재료 기반 추천' 버튼을 눌러 냉장고 재료를 불러와주세요.");
      return;
    }

    setIsLoading(true);
    setRecommendationType("expire");
    setShowRecipe(false);

    try {
      const userId = localStorage.getItem("userId");

      const expiredIngredients = fridgeIngredients.filter(
        (ingredient) => ingredient.dday < 3
      );

      if (expiredIngredients.length === 0) {
        alert("유통기한이 3일 이내로 남은 재료가 없습니다.");
        setIsLoading(false);
        return;
      }

      const requestData = {
        userId,
        excludedTitles: [],
        ingredients: expiredIngredients.map((ing) => ing.name),
      };

      const result = await recommendExpir(requestData);

      if (result && result.length > 0) {
        setRecipes(result);
        setShowRecipe(true);
      } else {
        alert("추천된 음식이 없습니다.");
      }
    } catch (error) {
      console.error("레시피 추천 로직 실패:", error);
      alert("레시피를 불러오는 중 오류가 발생했습니다.");
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="menu-recommendation-page">
      <UnifiedHeader />

      <div className="menu-recommendation-content">
        <div className="menu-recommendation-header">
          <h1 className="menu-recommendation-title">메뉴 추천</h1>
          <p className="menu-recommendation-subtitle">
            AI가 추천하는 맞춤 레시피를 찾아보세요
          </p>
        </div>

        <div className="menu-recommendation-buttons">
          <button
            className={`menu-recommendation-btn ${
              recommendationType === "ingredient" ? "active" : ""
            }`}
            onClick={handleGetIngredients}
          >
            식재료 기반 추천
          </button>
          <button
            className={`menu-recommendation-btn ${
              recommendationType === "tendency" ? "active" : ""
            }`}
            onClick={handleTendencyBasedRecommendation}
          >
            성향 기반 추천
          </button>
          <button
            className={`menu-recommendation-btn ${
              recommendationType === "expire" ? "active" : ""
            }`}
            onClick={handleExpiredIngredientBasedRecommendation}
          >
            임박 식재료 추천
          </button>
        </div>

        {recommendationType === "ingredient" && (
          <div className="ingredient-tags-wrapper">
            {" "}
            {fridgeIngredients.map((ingredient) => (
              <button
                key={ingredient.id}
                className={`ingredient-tag-button ${
                  selectedIngredients.includes(ingredient.name)
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleIngredientClick(ingredient.name)}
              >
                {ingredient.name}
              </button>
            ))}
            {fridgeIngredients.length === 0 && (
              <p className="no-ingredients-message">
                냉장고에 등록된 재료가 없습니다.
              </p>
            )}
            <button
              className="search-recipes-button"
              style={{ marginTop: "20px" }}
              disabled={selectedIngredients.length === 0 || isLoading}
              onClick={handleIngredientBasedRecommendation}
            >
              {isLoading ? "추천받는 중..." : "선택된 재료로 레시피 찾기"}
            </button>
          </div>
        )}

        <div className="menu-search-section">
          <label htmlFor="condition" className="menu-condition-label">
            조건
          </label>
          <input
            type="text"
            name="condition"
            className="menu-search-input"
            placeholder="세개 항목 외에 다른 조건이 필요하시면 입력해주세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleGeminiSearch()}
          />

          <button
            className="menu-search-btn"
            onClick={() => handleGeminiSearch()}
          >
            검색
          </button>
          <button className="menu-voice-btn" onClick={startVoiceRecognition}>
            🎤
          </button>
        </div>

        {isLoading && (
          <div className="menu-loading-state">
            <p>AI가 최적의 레시피를 찾고 있습니다...</p>
          </div>
        )}

        {showRecipe && recipes.length > 0 && !isLoading && (
          <div className="menu-recipes-section">
            <div className="menu-recipes-navigation">
              <button
                className="menu-scroll-btn"
                onClick={() => handleScroll("left")}
                disabled={currentPage === 0}
              >
                ←
              </button>
              <span className="menu-page-indicator">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                className="menu-scroll-btn"
                onClick={() => handleScroll("right")}
                disabled={currentPage === totalPages - 1}
              >
                →
              </button>
            </div>

            <div className="menu-recipes-grid" ref={scrollContainerRef}>
              {displayedRecipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  to={`/recipepage/${recipe.id}`}
                  state={{ recipe }}
                  className="menu-recipe-card"
                >
                  <img
                    src={DEFAULT_IMAGE_URL}
                    alt={recipe.name}
                    className="menu-recipe-card-image"
                  />
                  <div className="menu-recipe-card-content">
                    <h3 className="menu-recipe-card-title">{recipe.name}</h3>
                    <p className="menu-recipe-card-description">
                      {recipe.description}
                    </p>
                    <div className="menu-recipe-card-tags">
                      {(recipe.tendencies || [])
                        .slice(0, 2)
                        .map((tendency, index) => (
                          <span key={index} className="menu-recipe-card-tag">
                            {tendency}
                          </span>
                        ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {showRecipe && recipes.length === 0 && !isLoading && (
          <div className="menu-empty-state">
            <p>검색된 레시피가 없습니다.</p>
            <p>다른 조건이나 재료로 검색해보세요.</p>
          </div>
        )}

        {isVoiceMode && (
          <Voice onClose={closeVoicePopup} onVoiceResult={handleVoiceResult} />
        )}
      </div>
    </div>
  );
};
