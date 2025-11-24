import React, { useState, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import "./style.css";

// onClose: 팝업 닫기 함수, onSearch: 음성 인식 결과를 부모에게 전달하는 함수
const Voice = ({ onClose, onSearch }) => {
  const [isRecord, setIsRecord] = useState(false);
  const [transcript, setTranscript] = useState("");

  const toggleRecord = () => {
    if (!isRecord) {
      setIsRecord(true);
      setTranscript("닭고기가 들어간 요리 찾아줘"); // 예시: 실제 API 연동 시 이곳에 로직 추가
    } else {
      setIsRecord(false);
    }
  };

  const handleSave = () => {
    if (transcript) {
      onSearch(transcript);
    }
    onClose();
  };

  return (
    <div className="voice-popup-overlay" onClick={onClose}>
      <div className="voice-popup-container" onClick={(e) => e.stopPropagation()}>
        
        <button className="voice-popup-close" onClick={onClose}>
          &times;
        </button>

        <div className="voice-popup-header">
          <h2 className="voice-popup-title">음성 검색</h2>
        </div>

        <div className="voice-popup-content" style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: "50px", color: isRecord ? "#f6910b" : "#ccc", marginBottom: "20px" }}>
            {isRecord ? <FaMicrophone className="blink-animation" /> : <FaMicrophone />}
          </div>
          
          {transcript && <p style={{ fontSize: "18px", fontWeight: "bold" }}>"{transcript}"</p>}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button 
            className="voice-popup-action-btn" 
            onClick={toggleRecord}
            style={{ backgroundColor: isRecord ? "#dc3545" : "#f6910b" }}
          >
            {isRecord ? "녹음 중단" : "녹음 시작"}
          </button>
          
          {!isRecord && transcript && (
            <button className="voice-popup-action-btn" onClick={handleSave}>
              이 결과로 검색하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Voice;