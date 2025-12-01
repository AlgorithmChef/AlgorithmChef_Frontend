import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./style.css";
import ChangePassword from "./ChangePassword/ChangePassword";

export const LoginPopup = ({
  onClose,
  onSwitchToSignup,
  onSwitchToFindId,
  onSwitchToFindPassword,
}) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [viewMode, setViewMode] = useState("login");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(id, password);
    if (result.status === "SUCCESS") {
      console.log("로그인 성공");
      localStorage.setItem("userId", id);
      onClose();
    } else if (result.status === "FORCE_PASSWORD_CHANGE") {
      console.log("임시비빌번호로 로그인 하셨습니다. 바로 번호 수정해주세요");
      setViewMode("changepw");
    } else {
      alert("로그인 실패");
    }
  };

  if (viewMode === "changepw") {
    return (
      <div className="login-popup-overlay" onClick={onClose}>
        <div
          className="login-popup-container"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="login-popup-close" onClick={onClose}>
            ??
          </button>
          <div className="login-popup-header">
            <h2 className="login-popup-title">임시비밀번호 변경</h2>
          </div>
          <ChangePassword onSuccess={() => setViewMode("login")} />
        </div>
      </div>
    );
  }

  return (
    <div className="login-popup-overlay" onClick={onClose}>
      <div
        className="login-popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="login-popup-close" onClick={onClose}>
          x
        </button>

        <div className="login-popup-header">
          <h2 className="login-popup-title">로그인</h2>
        </div>

        <form className="login-popup-form" onSubmit={handleLogin}>
          <div className="login-popup-input-group">
            <label className="login-popup-label">아이디</label>{" "}
            {/* Changed label */}
            <input
              type="text" // Changed type to email
              className="login-popup-input"
              value={id} // Changed value to email
              onChange={(e) => setId(e.target.value)} // Changed onChange to setId
              placeholder="아이디" // Changed placeholder
              required
            />
          </div>

          <div className="login-popup-input-group">
            <label className="login-popup-label">비밀번호</label>
            <input
              type="password"
              className="login-popup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              required
            />
          </div>

          <button type="submit" className="login-popup-submit-btn">
            로그인
          </button>

          <div className="login-popup-footer">
            <span className="login-popup-footer-text">계정이 없으신가요??</span>
            <button
              type="button"
              className="login-popup-signup-btn"
              onClick={onSwitchToSignup}
            >
              회원가입하기
            </button>
          </div>
          <div className="login-popup-footer">
            <span className="login-popup-footer-text">계정찾기</span>
            <button
              type="button"
              className="login-popup-signup-btn"
              onClick={() => {
                console.log("아이디 찾기 버튼 눌림!"); // 1. 이 로그가 뜨는지 확인
                onSwitchToFindId(); // 2. 부모 함수 실행
              }}
            >
              아이디 찾기
            </button>
            <button
              type="button"
              className="login-popup-signup-btn"
              onClick={onSwitchToFindPassword}
            >
              비밀번호 찾기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
