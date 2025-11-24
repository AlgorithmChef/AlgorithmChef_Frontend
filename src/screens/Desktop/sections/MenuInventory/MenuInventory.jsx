import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuInventoryWrapper } from "../../../../components/MenuInventoryWrapper";
import { Tendency } from "../../../../components/Tendency";
import { UsedIngredient } from "../../../../components/UsedIngredient";
import "./style.css";

const MOCK_RECIPES = [
  {
    id: 1,
    name: "저당 닭갈비",
    ingredients: ["닭고기", "양파", "고추장", "고춧가루", "양배추", "스테비아", "마늘"],
    steps: ["닭고기 손질 및 양념 재우기", "야채 손질", "볶기"],
    tendencies: ["매콤칼칼", "스트레스 해소", "저당"]
  },
  {
    id: 2,
    name: "저당 닭볶음탕",
    ingredients: ["닭고기", "감자", "당근", "양파", "고추장"],
    steps: ["닭고기 손질 및 초벌", "양념장 만들기", "끓이기", "채소 넣고 마무리"],
    tendencies: ["매콤칼칼", "저당"]
  }
];

const AVAILABLE_TENDENCIES = ["매콤칼칼", "스트레스 해소", "저당", "담백", "건강식"];

export const MenuInventory = () => {
  const navigate = useNavigate();
  const [selectedTendencies, setSelectedTendencies] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // TODO: Backend Integration: Fetch user's ingredients and preferences for initial recommendation
  useEffect(() => {
    // Simulate fetching initial ingredient-based recommendations
    // Replace with actual API call to get recommended recipes
    setFilteredRecipes(MOCK_RECIPES.slice(0, 2)); // Show a couple of default recipes
  }, []);

  const toggleTendency = (tendency) => {
    setSelectedTendencies(prev => {
      const newTendencies = prev.includes(tendency) 
        ? prev.filter(t => t !== tendency)
        : [...prev, tendency];
      
      // TODO: Backend Integration: Fetch recipes based on newTendencies
      const updatedRecipes = MOCK_RECIPES.filter(recipe => 
        newTendencies.length === 0 || newTendencies.some(t => recipe.tendencies.includes(t))
      );
      setFilteredRecipes(updatedRecipes.slice(0, 2)); // Limit to 2 for main screen
      return newTendencies;
    });
  };

  return (
    <div className="menu-inventory">
      <div className="menu-inventory-header-wrapper">
        <Link to="/menurecommendation" className="menu-inventory-header-link">
          <MenuInventoryWrapper className="design-component-instance-node-2" />
        </Link>
        <Link to="/menurecommendation" className="menu-more-btn">
          추천받기 →
        </Link>
      </div>
      {/* <div className="tendency-inventory">
        {AVAILABLE_TENDENCIES.map((tendency) => (
          <Tendency
            key={tendency}
            text={tendency}
            isActive={selectedTendencies.includes(tendency)}
            onClick={() => toggleTendency(tendency)}
          />
        ))}
      </div> */}

      {/* <div className="div-6">
        {filteredRecipes.map((recipe) => (
          <Link 
            key={recipe.id} 
            className="recipe" 
            to={`/recipepage/${recipe.id}`}
            state={{ recipe }}
          >
            <div className="recipe-text">
              <div className="recipe-name">
                <div className="recipe-name-text">{recipe.name}</div>
              </div>

              <div className="use-ingredient">
                {recipe.ingredients.map((ingredient, index) => (
                  <UsedIngredient 
                    key={index}
                    className="used-ingredient-instance" 
                    text={ingredient}
                  />
                ))}
              </div>

              <div className="recipe-container">
                <p className="recipe-text-2">
                  {recipe.steps.join('\n')}
                </p>

                <img
                  className="recipe-extension"
                  alt="Recipe extension"
                  src="https://c.animaapp.com/sjWITF5i/img/recipeextensionbutton-1.svg"
                />
              </div>
            </div>
          </Link>
        ))}
      </div> */}
      <div className="menu-empty-state-container" style={{
          textAlign: 'center',
          padding: '60px 0',
          color: '#888',
          backgroundColor: '#f9f9f9',
          borderRadius: '12px',
          margin: '20px 0',
          width: '100%',
          boxSizing: 'border-box'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🍽️</div>
        <p style={{ fontSize: '14px', width : "100%", margin: 0 }}>
          오른쪽의 <strong>'추천받기'</strong> 버튼을 눌러 맛있는 레시피를 만나보세요!
        </p>
      </div>
    </div>
  );
};
