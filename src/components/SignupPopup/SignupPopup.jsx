import React, { useState } from "react";
import "./style.css";

export const SignupPopup = ({ onClose, onSwitchToLogin, onSwitchToPreferences }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // TODO: Backend Integration: Replace with actual backend API call for signup
    // Example: axios.post('/api/signup', userData)
    //   .then(response => {
    //     onSwitchToPreferences(response.data.user); // Pass user data from backend
    //   })
    //   .catch(error => {
    //     alert("회원가입 실패: " + error.response.data.message);
    //   });

    // Simulating backend validation and storage with localStorage
    const mockUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    
    // Check if email already exists
    if (mockUsers.find((u) => u.email === email)) { // Check for duplicate email
      alert("이미 존재하는 이메일입니다.");
      return;
    }

    const userData = { username, email, password, gender, birthDate };
    mockUsers.push(userData);
    localStorage.setItem("registeredUsers", JSON.stringify(mockUsers));
    
    console.log("Signup attempt:", userData);
    
    // Move to preferences popup
    onSwitchToPreferences(userData);
  };

  return (
    <div className="signup-popup-overlay" onClick={onClose}>
      <div className="signup-popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="signup-popup-close" onClick={onClose}>×</button>
        
        <div className="signup-popup-header">
          <h2 className="signup-popup-title">회원가입</h2>
        </div>

        <form className="signup-popup-form" onSubmit={handleSignup}>
          <div className="signup-popup-input-group">
            <label className="signup-popup-label">아이디</label>
            <input
              type="text"
              className="signup-popup-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력하세요"
              required
            />
          </div>

          <div className="signup-popup-input-group">
            <label className="signup-popup-label">이메일</label>
            <input
              type="email"
              className="signup-popup-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>

          <div className="signup-popup-input-group">
            <label className="signup-popup-label">비밀번호</label>
            <input
              type="password"
              className="signup-popup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>

          <div className="signup-popup-input-group">
            <label className="signup-popup-label">비밀번호 확인</label>
            <input
              type="password"
              className="signup-popup-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </div>

          <div className="signup-popup-input-group">
            <label className="signup-popup-label">성별</label>
            <select
              className="signup-popup-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">선택하세요</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div className="signup-popup-input-group">
            <label className="signup-popup-label">생년월일</label>
            <input
              type="date"
              className="signup-popup-input"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-popup-submit-btn">
            다음
          </button>

          <div className="signup-popup-footer">
            <span className="signup-popup-footer-text">이미 계정이 있으신가요?</span>
            <button
              type="button"
              className="signup-popup-login-btn"
              onClick={onSwitchToLogin}
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
