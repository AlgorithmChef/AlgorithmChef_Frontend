import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { UnifiedHeader } from "../../components/UnifiedHeader";
import { Recipepage } from "../../components/Recipepage";
import "./style.css";

export const RecipePage = () => {
  const location = useLocation();
  const { id } = useParams();
  const recipe = location.state?.recipe || {
    id: id,
    name: "레시피 이름",
    ingredients: ["닭고기", "양파", "고추장"],
    steps: ["재료 준비", "조리 시작", "완성"],
    description: "레시피 설명이 여기에 표시됩니다.",
    tendencies: ["매콤칼칼"]
  };

  return (
    <div className="recipe-page" data-model-id="199:457">
      <UnifiedHeader />

      <div className="recipepage-nav">
        <div className="recipepage-text-wrapper">
          <div className="recipepage-text">세부 레시피</div>
        </div>
      </div>

      <div className="recipepage-section">
        <div className="recipepage-content">
          <div className="recipepage-wrapper">
            <div className="recipepage-2">{recipe.name}</div>
          </div>

          <div className="recipepage-3">
            {recipe.ingredients.map((ingredient, index) => (
              <Recipepage 
                key={index}
                className="recipepage-usedingredient" 
                text={ingredient}
              />
            ))}
          </div>

          <div className="recipepage-4">
            <div className="recipepage-menuimage" />

            <div className="recipepage-5">
              <div className="recipepage-6">
                <div className="recipepage-7">레시피 설명</div>
              </div>

              <div className="recipepage-8">
                <div className="recipepage-9">{recipe.description || "레시피 설명이 여기에 표시됩니다."}</div>
              </div>
            </div>
          </div>

          <div className="recipepage-10">
            <div className="recipepage-11">
              <div className="recipepage-12">조리 방법</div>
            </div>

            <div className="recipepage-steps">
              {recipe.steps.map((step, index) => (
                <div key={index} className="recipepage-step">
                  <span className="recipepage-step-number">{index + 1}.</span>
                  <span className="recipepage-step-text">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
