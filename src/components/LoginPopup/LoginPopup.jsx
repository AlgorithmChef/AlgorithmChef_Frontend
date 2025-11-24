import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./style.css";

export const LoginPopup = ({ onClose, onSwitchToSignup,onSwitchToFindId,onSwitchToFindPassword }) => {
  const [id, setId] = useState(""); // Changed to email
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // TODO: Backend Integration: Replace with actual backend API call for login
    // Example: axios.post('/api/login', { email, password })
    //   .then(response => {
    //     login(response.data.user); // Assuming backend returns user data including username
    //     onClose();
    //   })
    //   .catch(error => {
    //     alert("이메일 또는 비밀번호가 일치하지 않습니다.");
    //   });

    // Simulating backend validation with localStorage
    const mockUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const foundUser = mockUsers.find(
      (u) => u.username === id && u.password === password // Validate by userId
    );

    if (foundUser) {
      const userData = { username: foundUser.username, email: foundUser.email };
      login(userData);
      console.log("Login successful:", userData);
      onClose();
    } else {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="login-popup-overlay" onClick={onClose}>
      <div className="login-popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="login-popup-close" onClick={onClose}>×</button>
        
        <div className="login-popup-header">
          <h2 className="login-popup-title">로그인</h2>
        </div>

        <form className="login-popup-form" onSubmit={handleLogin}>
          <div className="login-popup-input-group">
            <label className="login-popup-label">아이디</label> {/* Changed label */}
            <input
              type="text" // Changed type to email
              className="login-popup-input"
              value={id} // Changed value to email
              onChange={(e) => setId(e.target.value)} // Changed onChange to setId
              placeholder="아이디를  입력하세요" // Changed placeholder
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
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          <button type="submit" className="login-popup-submit-btn">
            로그인
          </button>

          <div className="login-popup-footer">
            <span className="login-popup-footer-text">계정이 없으신가요?</span>
            <button
              type="button"
              className="login-popup-signup-btn"
              onClick={onSwitchToSignup}
            >
              회원가입
            </button>
          </div>
          <div className="login-popup-footer">
            <span className="login-popup-footer-text">계정 찾기</span>
            <button
              type="button"
              className="login-popup-signup-btn"
              onClick={onSwitchToFindId}
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
