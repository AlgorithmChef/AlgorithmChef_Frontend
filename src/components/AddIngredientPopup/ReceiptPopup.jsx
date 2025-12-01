import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import AddIngredientPopup from "./AddIngredientPopup";
import { updateIngredients } from "../../api/fridgeApi";
import { uploadReceipt } from "../../api/Ocr/ocrApi";

function ReceiptPopup({ onClose }) {
  const navigate = useNavigate();

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [ocrResult, setOcrResult] = useState([]);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleAnalyzeReceipt = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("영수증 사진을 선택해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await uploadReceipt(file);
      console.log("OCR 분석 완료:", response);

      if (response && response.items) {
        setOcrResult(response.items);

        if (response.purchaseDate) {
          setPurchaseDate(response.purchaseDate.substring(0, 10));
        }

        setShowAddPopup(true);
      } else {
        alert("분석된 내용이 없습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("분석 실패:", error);
      alert("영수증 분석에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinalRegister = async (updatedItems) => {
    try {
      const requestData = {
        ingredients: updatedItems.map((item) => {
          const validPurchaseDate = item.purchaseDate
            ? item.purchaseDate.substring(0, 10) + "T00:00:00"
            : null;

          const validExpiredDate = item.expiredDate
            ? item.expiredDate.substring(0, 10) + "T00:00:00"
            : null;

          return {
            ingredientId: item.id,
            name: item.candidateName || item.description,
            quantity: item.quantity || 1,
            purchaseDate: validPurchaseDate,
            expiredDate: validExpiredDate,
          };
        }),
      };

      console.log("전송 데이터 확인:", requestData);

      const result = await updateIngredients(requestData);

      if (result) {
        alert("재료가 성공적으로 저장되었습니다!");
        onClose();

        window.location.reload();
      }
    } catch (error) {
      console.error("최종 저장 실패:", error);
      alert("재료 저장에 실패했습니다.");
    }
  };

  if (showAddPopup) {
    return (
      <AddIngredientPopup
        onClose={onClose}
        onBack={() => setShowAddPopup(false)}
        onAdd={handleFinalRegister}
        items={ocrResult}
        baseDate={purchaseDate}
      />
    );
  }

  return (
    <div className="add-ingredient-popup-overlay" onClick={onClose}>
      <div
        className="add-ingredient-popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="add-ingredient-popup-close" onClick={onClose}>
          ×
        </button>
        <div className="add-ingredient-popup-header">
          <h2 className="add-ingredient-popup-title">영수증 등록</h2>
        </div>

        <form
          className="add-ingredient-popup-form"
          onSubmit={handleAnalyzeReceipt}
        >
          <div className="add-ingredient-popup-input-group">
            <label className="add-ingredient-popup-label">영수증 업로드</label>
            <input
              type="file"
              className="add-ingredient-popup-input file-input"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            <p className="helper-text">선명한 영수증 사진을 올려주세요.</p>
          </div>

          <button
            type="submit"
            className="add-ingredient-popup-submit-btn"
            disabled={isLoading}
          >
            {isLoading ? "분석 중..." : "분석 시작"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReceiptPopup;
