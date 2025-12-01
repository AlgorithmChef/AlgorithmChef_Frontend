import React, { useState } from "react";
import { MdRateReview } from "react-icons/md";
import "./style.css";
import { useAuth } from "../../../contexts/AuthContext";
import { makeReview } from "../../../api/Community/recipeReview";

const RecipeReview = ({ onClose, name }) => {
  const { isAuthenticated } = useAuth();
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("로그인 안해서 리뷰 작성 불가");
    }
    const review = {
      name,
      rating,
      content,
    };
    try {
      const response = await makeReview(review);
      if (response) {
        alert("리뷰가 등록되었습니다!");
      } else {
        console.log("리뷰 실패");
      }
    } catch (error) {
      console.error("서버 에라");
      alert("서버 에러로 인한 리뷰 등록 실패");
    } finally {
      onClose();
    }
  };

  return (
    <div className="review-popup-overlay" onClick={onClose}>
      <div
        className="review-popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{ textAlign: "center", fontSize: "40px", color: "#f6910b" }}
        >
          <MdRateReview />
        </div>

        <button className="review-popup-close" onClick={onClose}>
          ×
        </button>

        <div className="review-popup-header">
          <h2 className="review-popup-title">레시피 후기 작성</h2>
        </div>

        <form className="review-popup-form" onSubmit={handleSubmit}>
          <div className="review-popup-input-group">
            <label className="review-popup-label">레시피명</label>
            <input
              type="text"
              className="review-popup-input"
              value={name}
              readOnly
            />
          </div>

          <div className="review-popup-input-group">
            <label className="review-popup-label">평점</label>
            <input
              type="number"
              className="review-popup-input"
              placeholder="0부터 5까지 숫자를 입력하세요"
              min="0"
              max="5"
              step="0.5"
              required
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>

          <div className="review-popup-input-group">
            <label className="review-popup-label">내용</label>
            <textarea
              className="review-popup-textarea"
              placeholder="맛은 어떠셨나요?"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="review-popup-submit-btn">
            등록하기
          </button>
        </form>

        <div className="review-popup-footer">
          <button className="review-popup-cancel-btn" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeReview;
