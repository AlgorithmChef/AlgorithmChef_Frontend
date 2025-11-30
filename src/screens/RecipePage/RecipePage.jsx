import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { UnifiedHeader } from "../../components/UnifiedHeader";
import RecipeReview from "./RecipeReview/RecipeReview";
import "./style.css";

export const RecipePage = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const stateRecipe = location.state?.recipe;

  const processIngredients = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === "string") {
      return data
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }
    return [];
  };

  const processSteps = (data) => {
    if (!data) return [];

    let list = [];
    if (Array.isArray(data)) {
      list = data;
    } else if (typeof data === "string") {
      list = data
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item !== "");
    }

    const refinedList = [];
    list.forEach((item) => {
      const matches = item.split(/(\d+\.\s+)/).filter(Boolean);
      if (matches.length > 1) {
        let currentStep = "";
        matches.forEach((fragment) => {
          if (/^\d+\.\s+$/.test(fragment)) {
            if (currentStep) refinedList.push(currentStep.trim());
            currentStep = "";
          } else {
            currentStep += fragment;
          }
        });
        if (currentStep) refinedList.push(currentStep.trim());
      } else {
        refinedList.push(item);
      }
    });

    return refinedList.filter((item) => item.length > 1);
  };

  const recipe = {
    id: stateRecipe?.id || id,
    name: stateRecipe?.name || "레시피 이름 없음",
    description: stateRecipe?.description || "레시피 설명이 없습니다.",
    ingredients: processIngredients(stateRecipe?.ingredients),
    steps: processSteps(stateRecipe?.instructions || stateRecipe?.steps),
  };

  if (!stateRecipe && !id) {
    return (
      <div style={{ textAlign: "center", padding: "100px 0" }}>
        <p>레시피 정보를 불러올 수 없습니다.</p>
        <button onClick={() => navigate(-1)} className="error-back-btn">
          뒤로 가기
        </button>
      </div>
    );
  }

  return (
    <div className="recipe-page">
      <UnifiedHeader />

      <div className="recipe-content-wrapper">
        <div className="back-button-area">
          <button onClick={() => navigate(-1)} className="back-link-btn">
            &lt; 목록으로 돌아가기
          </button>
        </div>

        <div className="recipe-header-section">
          <h1 className="recipe-title">{recipe.name}</h1>

          <div className="ingredients-section">
            {recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ing, index) => (
                <span key={index} className="ingredient-badge">
                  {ing}
                </span>
              ))
            ) : (
              <span style={{ color: "#999" }}>재료 정보가 없습니다.</span>
            )}
          </div>
        </div>

        <div className="description-section">
          <span className="section-label">레시피 소개</span>
          <p className="description-text">{recipe.description}</p>
        </div>

        <div className="steps-section">
          <span className="section-label">조리 순서</span>

          {recipe.steps.length > 0 ? (
            recipe.steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  {step.replace(/^\d+\.\s*/, "")}
                </div>
              </div>
            ))
          ) : (
            <div
              style={{ padding: "20px", textAlign: "center", color: "#888" }}
            >
              조리 방법 데이터가 없습니다.
            </div>
          )}
        </div>

        <div className="button-section">
          <button className="review-btn" onClick={() => setIsReviewOpen(true)}>
            리뷰 남기기
          </button>
        </div>
      </div>

      {isReviewOpen && (
        <RecipeReview
          onClose={() => setIsReviewOpen(false)}
          name={stateRecipe.name}
        />
      )}
    </div>
  );
};
