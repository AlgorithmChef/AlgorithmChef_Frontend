import React from "react";
import { MdRateReview } from "react-icons/md";
import "./style.css"; // 앞서 만든 CSS 파일

// 부모 컴포넌트로부터 onClose 함수를 prop으로 받습니다.
const RecipeReview = ({ onClose }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 여기서 백엔드로 리뷰 데이터를 전송하는 로직을 구현합니다.
    alert("리뷰가 등록되었습니다!");
    onClose(); // 등록 후 팝업 닫기
  };

  return (
    // 배경(overlay) 클릭 시 닫기
    <div className="review-popup-overlay" onClick={onClose}>
      {/* 컨테이너 클릭 시에는 닫히지 않도록 이벤트 전파 중단 */}
      <div className="review-popup-container" onClick={(e) => e.stopPropagation()}>
        
        {/* 아이콘 예시 (위치는 CSS에 따라 조정 필요) */}
        <div style={{ textAlign: "center", fontSize: "40px", color: "#f6910b" }}>
             <MdRateReview />
        </div>

        <button className="review-popup-close" onClick={onClose}>×</button>

        <div className="review-popup-header">
          <h2 className="review-popup-title">레시피 후기 작성</h2>
        </div>

        <form className="review-popup-form" onSubmit={handleSubmit}>
          <div className="review-popup-input-group">
            <label className="review-popup-label">제목</label>
            <input 
              type="text" 
              className="review-popup-input" 
              placeholder="후기 제목을 입력하세요" 
              required
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
            />
          </div>

          <div className="review-popup-input-group">
            <label className="review-popup-label">내용</label>
            <textarea 
              className="review-popup-textarea" 
              placeholder="맛은 어떠셨나요?"
              required
            ></textarea>
          </div>

          <button type="submit" className="review-popup-submit-btn">등록하기</button>
        </form>

        <div className="review-popup-footer">
          <button className="review-popup-cancel-btn" onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeReview;