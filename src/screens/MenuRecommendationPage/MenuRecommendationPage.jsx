import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { UnifiedHeader } from "../../components/UnifiedHeader";
import "./style.css";

const MOCK_RECIPES = [
  // TODO: Backend Integration: Replace with API call to fetch all available recipes
  {
    id: 1,
    name: "저당 닭갈비",
    ingredients: ["닭고기", "양파", "고추장", "고춧가루", "양배추", "스테비아", "마늘"],
    steps: ["닭고기 손질 및 양념 재우기", "야채 손질", "볶기"],
    tendencies: ["매콤칼칼", "스트레스 해소", "저당"],
    description: "건강한 저당 닭갈비 레시피",
    image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png"
  },
  {
    id: 2,
    name: "저당 닭볶음탕",
    ingredients: ["닭고기", "감자", "당근", "양파", "고추장"],
    steps: ["닭고기 손질 및 초벌", "양념장 만들기", "끓이기", "채소 넣고 마무리"],
    tendencies: ["매콤칼칼", "저당"],
    description: "매콤한 닭볶음탕",
    image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png"
  },
  {
    id: 3,
    name: "양파 볶음",
    ingredients: ["양파", "간장", "참기름"],
    steps: ["양파 썰기", "볶기", "간장으로 간하기"],
    tendencies: ["담백", "건강식"],
    description: "간단한 양파 볶음",
    image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-1.png"
  },
  {
    id: 4,
    name: "된장찌개",
    ingredients: ["된장", "두부", "양파", "감자", "호박"],
    steps: ["재료 손질", "육수 내기", "된장 풀기", "끓이기"],
    tendencies: ["담백", "건강식"],
    description: "구수한 된장찌개",
    image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png"
  },
  {
    id: 5,
    name: "김치찌개",
    ingredients: ["김치", "돼지고기", "두부", "양파"],
    steps: ["돼지고기 볶기", "김치 넣고 볶기", "물 넣고 끓이기"],
    tendencies: ["매콤칼칼", "스트레스 해소"],
    description: "얼큰한 김치찌개",
    image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png"
  },
  {
    id: 6,
    name: "불고기",
    ingredients: ["소고기", "양파", "당근", "간장", "설탕"],
    steps: ["고기 재우기", "야채 썰기", "볶기"],
    tendencies: ["담백"],
    description: "달콤한 불고기",
    image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png"
  },
  {
    id: 7,
    name: "제육볶음",
    ingredients: ["돼지고기", "양파", "고추장", "고춧가루"],
    steps: ["고기 양념하기", "볶기"],
    tendencies: ["매콤칼칼", "스트레스 해소"],
    description: "매콤한 제육볶음",
    image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png"
  },
  {
    id: 8,
    name: "계란찜",
    ingredients: ["계란", "물", "소금"],
    steps: ["계란 풀기", "물 섞기", "찌기"],
    tendencies: ["담백", "건강식"],
    description: "부드러운 계란찜",
    image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png"
  },
  {
    id: 9,
    name: "비빔밥",
    ingredients: ["밥", "시금치", "당근", "고사리", "고추장"],
    steps: ["나물 볶기", "밥 위에 올리기", "비비기"],
    tendencies: ["건강식"],
    description: "영양 만점 비빔밥",
    image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png"
  },
  {
    id: 10,
    name: "된장국",
    ingredients: ["된장", "두부", "파", "감자"],
    steps: ["육수 내기", "된장 풀기", "재료 넣고 끓이기"],
    tendencies: ["담백", "건강식"],
    description: "구수한 된장국",
    image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png"
  },
  {
    id: 11,
    name: "삼겹살 구이",
    ingredients: ["삼겹살", "소금", "후추"],
    steps: ["삼겹살 굽기", "간하기"],
    tendencies: ["스트레스 해소"],
    description: "고소한 삼겹살",
    image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png"
  },
  {
    id: 12,
    name: "잡채",
    ingredients: ["당면", "시금치", "당근", "양파", "간장"],
    steps: ["당면 삶기", "야채 볶기", "섞기"],
    tendencies: ["담백"],
    description: "맛있는 잡채",
    image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png"
  },
  {
    id: 13,
    name: "순두부찌개",
    ingredients: ["순두부", "고추장", "계란", "파"],
    steps: ["육수 내기", "순두부 넣기", "끓이기"],
    tendencies: ["매콤칼칼", "건강식"],
    description: "얼큰한 순두부찌개",
    image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png"
  },
  {
    id: 14,
    name: "감자조림",
    ingredients: ["감자", "간장", "설탕", "물엿"],
    steps: ["감자 썰기", "조리기", "졸이기"],
    tendencies: ["담백"],
    description: "달콤한 감자조림",
    image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png"
  },
  {
    id: 15,
    name: "떡볶이",
    ingredients: ["떡", "고추장", "어묵", "파"],
    steps: ["육수 내기", "고추장 풀기", "떡 넣고 끓이기"],
    tendencies: ["매콤칼칼", "스트레스 해소"],
    description: "매콤달콤 떡볶이",
    image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png"
  },
];

const RECIPES_PER_PAGE = 12;

export const MenuRecommendationPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [recommendationType, setRecommendationType] = useState(null);
  const scrollContainerRef = useRef(null);

  const handleIngredientBasedRecommendation = async () => {
    // TODO: Backend Integration: Replace with API call to get ingredient-based recommendations
    // Example: const response = await axios.get('/api/recommend/ingredients');
    // setRecipes(response.data);
    setRecommendationType("ingredient");
    setRecipes(MOCK_RECIPES); // Using mock data for now
    setCurrentPage(0);
  };

  const handleTendencyBasedRecommendation = async () => {
    // TODO: Backend Integration: Replace with API call to get tendency-based recommendations
    // Example: const response = await axios.get('/api/recommend/tendencies');
    // setRecipes(response.data);
    setRecommendationType("tendency");
    setRecipes(MOCK_RECIPES); // Using mock data for now
    setCurrentPage(0);
  };

  const handleGeminiSearch = async () => {
    if (!searchQuery.trim()) return;
    
    // TODO: Backend Integration: Integrate with Gemini API via your backend
    // Example: const response = await axios.post('/api/gemini-search', { query: searchQuery });
    // setRecipes(response.data);
    console.log("Searching with Gemini:", searchQuery);
    alert("Gemini API 연동 예정입니다.");
    
    // Mock search results
    const filtered = MOCK_RECIPES.filter(recipe => 
      recipe.name.includes(searchQuery) || 
      recipe.ingredients.some(ing => ing.includes(searchQuery))
    );
    setRecipes(filtered.length > 0 ? filtered : MOCK_RECIPES);
    setRecommendationType("search");
    setCurrentPage(0);
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

  return (
    <div className="menu-recommendation-page">
      <UnifiedHeader />

      <div className="menu-recommendation-content">
        <div className="menu-recommendation-header">
          <h1 className="menu-recommendation-title">메뉴 추천</h1>
          <p className="menu-recommendation-subtitle">AI가 추천하는 맞춤 레시피를 찾아보세요</p>
        </div>

        <div className="menu-search-section">
          <input
            type="text"
            className="menu-search-input"
            placeholder="레시피나 재료를 검색하세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGeminiSearch()}
          />
          <button className="menu-search-btn" onClick={handleGeminiSearch}>
            검색
          </button>
        </div>

        <div className="menu-recommendation-buttons">
          <button 
            className={`menu-recommendation-btn ${recommendationType === "ingredient" ? "active" : ""}`}
            onClick={handleIngredientBasedRecommendation}
          >
            식재료 기반 추천
          </button>
          <button 
            className={`menu-recommendation-btn ${recommendationType === "tendency" ? "active" : ""}`}
            onClick={handleTendencyBasedRecommendation}
          >
            성향 기반 추천
          </button>
        </div>

        {recipes.length > 0 && (
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
                    src={recipe.image}
                    alt={recipe.name}
                    className="menu-recipe-card-image"
                  />
                  <div className="menu-recipe-card-content">
                    <h3 className="menu-recipe-card-title">{recipe.name}</h3>
                    <p className="menu-recipe-card-description">{recipe.description}</p>
                    <div className="menu-recipe-card-tags">
                      {recipe.tendencies.slice(0, 2).map((tendency, index) => (
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

        {recipes.length === 0 && recommendationType && (
          <div className="menu-empty-state">
            <p>추천할 레시피가 없습니다.</p>
            <p>다른 조건으로 검색해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
};
