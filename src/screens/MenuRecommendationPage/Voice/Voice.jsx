import React, { useState, useRef } from "react";
import { FaMicrophone, FaStop } from "react-icons/fa";
import "./style.css";
import { recommendByVoice } from "../../../api/Stt/sttApi";

const Voice = ({ onClose, onVoiceResult }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        stream.getTracks().forEach((track) => track.stop());

        await handleSendAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("마이크 접근 실패:", error);
      alert("마이크를 사용할 수 없습니다. 권한을 확인해주세요.");
    }
  };

  // 2. 녹음 중단 (버튼 클릭 시)
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop(); // -> onstop 이벤트 발생 -> handleSendAudio 실행
      setIsRecording(false);
    }
  };

  // 3. 서버로 오디오 파일 전송 및 결과 처리
  const handleSendAudio = async (audioBlob) => {
    setIsProcessing(true); // 로딩 UI 표시
    try {
      console.log("오디오 파일 전송 시작...");

      // [API 호출] 오디오 Blob을 서버로 보냄 -> 레시피 리스트 받음
      const recipes = await recommendByVoice(audioBlob);

      console.log("음성 추천 결과:", recipes);

      if (recipes && recipes.length > 0) {
        onVoiceResult(recipes); // 부모에게 레시피 리스트 전달
        onClose(); // 팝업 닫기
      } else {
        alert("음성 인식 결과에 맞는 레시피를 찾지 못했습니다.");
        setIsProcessing(false); // 실패 시 로딩만 끄고 팝업 유지 (재시도 가능하게)
      }
    } catch (error) {
      console.error("음성 검색 실패:", error);
      alert("서버 통신 중 오류가 발생했습니다.");
      onClose();
    }
  };

  return (
    <div className="voice-popup-overlay" onClick={onClose}>
      <div
        className="voice-popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="voice-popup-close" onClick={onClose}>
          &times;
        </button>

        <div className="voice-popup-header">
          <h2 className="voice-popup-title">음성 레시피 검색</h2>
        </div>

        <div
          className="voice-popup-content"
          style={{ textAlign: "center", padding: "40px 0" }}
        >
          {/* 로딩 중 (서버 분석 중) */}
          {isProcessing ? (
            <div style={{ color: "#666" }}>
              <div
                className="voice-loading-spinner"
                style={{ margin: "0 auto 20px" }}
              ></div>
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                AI가 목소리를 듣고 레시피를 찾는 중...
              </p>
            </div>
          ) : (
            /* 녹음 대기/진행 화면 */
            <>
              <div
                style={{
                  fontSize: "60px",
                  color: isRecording ? "#dc3545" : "#f6910b",
                  marginBottom: "20px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onClick={isRecording ? stopRecording : startRecording}
              >
                {/* 녹음 중이면 정지 아이콘, 아니면 마이크 아이콘 */}
                {isRecording ? (
                  <FaStop className="blink-animation" />
                ) : (
                  <FaMicrophone />
                )}
              </div>

              <div style={{ minHeight: "30px" }}>
                <p style={{ fontSize: "18px", color: "#333" }}>
                  {isRecording
                    ? "듣고 있어요... (클릭하면 검색 시작)"
                    : "버튼을 눌러 말씀하세요 (예: 닭고기 요리해줘)"}
                </p>
              </div>
            </>
          )}
        </div>

        {/* 하단 버튼 (로딩 중에는 숨김) */}
        {!isProcessing && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="voice-popup-action-btn"
              onClick={isRecording ? stopRecording : startRecording}
              style={{
                backgroundColor: isRecord ? "#dc3545" : "#f6910b",
                width: "80%",
              }}
            >
              {isRecording ? "녹음 중단 및 검색" : "녹음 시작"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Voice;
