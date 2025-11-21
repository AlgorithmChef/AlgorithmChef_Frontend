import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./style.css";

export const LoginPopup = ({ onClose, onSwitchToSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // TODO: Backend Integration: Replace with actual backend API call for login
    // Example: axios.post('/api/login', { username, password })
    //   .then(response => {
    //     login(response.data.user);
    //     onClose();
    //   })
    //   .catch(error => {
    //     alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    //   });

    // Simulating backend validation with localStorage
    const mockUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const userData = { username: foundUser.username };
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
            <label className="login-popup-label">아이디</label>
            <input
              type="text"
              className="login-popup-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
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
        </form>
      </div>
    </div>
  );
};
