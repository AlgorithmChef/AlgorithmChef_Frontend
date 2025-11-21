import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { UnifiedHeader } from "../../components/UnifiedHeader";
import { Community } from "./sections/Community";
import { Footer } from "./sections/Footer";
import { IngredientInventory } from "./sections/IngredientInventory";
import { MenuInventory } from "./sections/MenuInventory";
import "./style.css";

const INITIAL_INGREDIENTS = [
  { id: 1, name: "양파", category: "채소류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-1.png", expiryDays: 5 },
  { id: 2, name: "닭고기", category: "육류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png", expiryDays: 3 },
  { id: 3, name: "고추장", category: "가공류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png", expiryDays: 30 },
  { id: 4, name: "고춧가루", category: "가공류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png", expiryDays: 60 },
  { id: 5, name: "양배추", category: "채소류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png", expiryDays: 7 },
  { id: 6, name: "스테비아", category: "가공류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png", expiryDays: 90 },
  { id: 7, name: "마늘", category: "채소류", image: "https://c.animaapp.com/sjWITF5i/img/ingredientimage-7@2x.png", expiryDays: 14 },
];

export const Desktop = () => {
  const [ingredients, setIngredients] = useState([]);
  const location = useLocation(); // Initialize useLocation

  useEffect(() => {
    // This effect will run on mount and when location changes,
    // ensuring fresh data when returning from AddIngredientPage
    const storedIngredients = JSON.parse(localStorage.getItem("userIngredients") || "[]");
    if (storedIngredients.length > 0) {
      setIngredients(storedIngredients);
    } else {
      setIngredients(INITIAL_INGREDIENTS);
      localStorage.setItem("userIngredients", JSON.stringify(INITIAL_INGREDIENTS));
    }
  }, [location.pathname]); // Re-run when pathname changes

  const handleAddIngredient = (newIngredient) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients, newIngredient];
      localStorage.setItem("userIngredients", JSON.stringify(updatedIngredients));
      // TODO: Backend Integration: Send newIngredient to backend
      console.log("Added ingredient to mock DB:", newIngredient);
      return updatedIngredients;
    });
  };

  const handleAddMultipleIngredients = (newIngredients) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients, ...newIngredients];
      localStorage.setItem("userIngredients", JSON.stringify(updatedIngredients));
      // TODO: Backend Integration: Send newIngredients to backend
      console.log("Added multiple ingredients to mock DB:", newIngredients);
      return updatedIngredients;
    });
  };

  return (
    <div className="desktop" data-model-id="45:2">
      <UnifiedHeader />
      <div className="site-header-name">
        <div className="choose-your-receipt">오늘의 메뉴를 골라보세요</div>
      </div>

      <IngredientInventory 
        ingredients={ingredients} 
        onAddIngredient={handleAddIngredient} 
        onAddMultipleIngredients={handleAddMultipleIngredients}
      />
      <MenuInventory />
      <Community />
      <Footer />
    </div>
  );
};
