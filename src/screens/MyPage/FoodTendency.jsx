import React from "react";
import { FaFire, FaUtensils, FaHeart, FaBan } from "react-icons/fa";
import "./style.css";

function FoodTendency({ dislikedIngredients, preferredIngredients, preferredCuisine, spiceLevel }) {
  
  const renderTags = (data) => {
    if (!data || data.length === 0) return <span className="empty-text">없음</span>;
    
    const items = typeof data === 'string' ? data.split(',') : data;
    
    return (
      <div className="tags-wrapper">
        {items.map((item, index) => (
          <span key={index} className="tendency-tag">
            {item.trim()}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="food-tendency-card">
      <div className="tendency-header">
        <h3 className="tendency-title">식습관 성향</h3>
      </div>

      <div className="tendency-list">
        
        <div className="tendency-item">
          <div className="tendency-icon-box blue">
            <FaUtensils />
          </div>
          <div className="tendency-text-group">
            <span className="tendency-label">선호하는 요리</span>
            <div className="tendency-tags-container">
                 {renderTags(preferredCuisine)} 
            </div>
          </div>
        </div>

        <div className="tendency-item">
          <div className="tendency-icon-box red">
            <FaFire />
          </div>
          <div className="tendency-text-group">
            <span className="tendency-label">매운맛 단계</span>
            <span className="tendency-value fire-text">{spiceLevel || "보통"}</span>
          </div>
        </div>

        <div className="tendency-item item-wide">
          <div className="tendency-icon-box orange">
            <FaHeart />
          </div>
          <div className="tendency-text-group">
            <span className="tendency-label">좋아하는 재료</span>
            <div className="tendency-tags-container">
                {renderTags(preferredIngredients)}
            </div>
          </div>
        </div>

        <div className="tendency-item item-wide">
          <div className="tendency-icon-box gray">
            <FaBan />
          </div>
          <div className="tendency-text-group">
            <span className="tendency-label">싫어하는 재료</span>
            <div className="tendency-tags-container">
                {renderTags(dislikedIngredients)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default FoodTendency;