import React from "react";
import { UnifiedHeader } from "../../components/UnifiedHeader";
import { Community } from "./sections/Community";
import { Footer } from "./sections/Footer";
import { IngredientInventory } from "./sections/IngredientInventory";
import { MenuInventory } from "./sections/MenuInventory";
import "./style.css";

export const Desktop = () => {
  return (
    <div className="desktop" data-model-id="45:2">
      <UnifiedHeader />
      <div className="site-header-name">
        <div className="choose-your-receipt">오늘의 메뉴를 골라보세요</div>
      </div>

      <IngredientInventory />
      <MenuInventory />
      <Community />
      <Footer />
    </div>
  );
};
