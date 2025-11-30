import React, { useState } from "react";
import "./style.css";
import { signUpApi } from "../../api/authApi";
import { isEmail, isNotEmpty, isPasswordValid } from "../util/validation";

export const SignupPopup = ({
  onClose,
  onSwitchToLogin,
  onSwitchToPreferences,
}) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [errors, setErrors] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    gender: "",
    birthDate: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!isNotEmpty(userId)) {
      newErrors.userId = "아이디를 입력해주세요.";
    }

    if (!isNotEmpty(email)) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!isEmail(email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }

    if (!isNotEmpty(password)) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (!isPasswordValid(password)) {
      newErrors.password = "영문자, 특수문자 포함 10~20자로 작성해주세요.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    if (!isNotEmpty(gender)) {
      newErrors.gender = "성별을 선택해주세요.";
    }

    if (!isNotEmpty(birthDate)) {
      newErrors.birthDate = "생년월일을 입력해주세요.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const userData = {
      userId,
      password,
      email,
      gender,
      birthDate: `${birthDate}T00:00:00`,
    };
    console.log("Signup attempt:", userData);

    try {
      const result = await signUpApi(userData);

      if (result) {
        console.log("생성된 아이디 : " + result.userId);
        onSwitchToPreferences(userData);
      } else {
        alert("회원가입 실패: 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleInputChange = (setter, field, value) => {
    setter(value);
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="signup-popup-overlay" onClick={onClose}>
      <div
        className="signup-popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="signup-popup-close" onClick={onClose}>
          ×
        </button>

        <div className="signup-popup-header">
          <h2 className="signup-popup-title">회원가입</h2>
        </div>

        <form className="signup-popup-form" onSubmit={handleSignup}>
          <div className="signup-popup-input-group">
            <label className="signup-popup-label">아이디</label>
            <input
              type="text"
              className={`signup-popup-input ${
                errors.userId ? "input-error" : ""
              }`}
              value={userId}
              onChange={(e) =>
                handleInputChange(setUserId, "userId", e.target.value)
              }
              placeholder="아이디를 입력하세요"
            />
            {errors.userId && (
              <span className="error-message">{errors.userId}</span>
            )}
          </div>

          <div className="signup-popup-input-group">
            <label className="signup-popup-label">이메일</label>
            <input
              type="text"
              className={`signup-popup-input ${
                errors.email ? "input-error" : ""
              }`}
              value={email}
              onChange={(e) =>
                handleInputChange(setEmail, "email", e.target.value)
              }
              placeholder="이메일을 입력하세요"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="signup-popup-input-group">
            <label className="signup-popup-label">비밀번호</label>
            <input
              type="password"
              className={`signup-popup-input ${
                errors.password ? "input-error" : ""
              }`}
              value={password}
              onChange={(e) =>
                handleInputChange(setPassword, "password", e.target.value)
              }
              placeholder="비밀번호를 입력하세요"
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <div className="signup-popup-input-group">
            <label className="signup-popup-label">비밀번호 확인</label>
            <input
              type="password"
              className={`signup-popup-input ${
                errors.confirmPassword ? "input-error" : ""
              }`}
              value={confirmPassword}
              onChange={(e) =>
                handleInputChange(
                  setConfirmPassword,
                  "confirmPassword",
                  e.target.value
                )
              }
              placeholder="비밀번호를 다시 입력하세요"
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="signup-popup-input-group">
            <label className="signup-popup-label">성별</label>
            <select
              className={`signup-popup-select ${
                errors.gender ? "input-error" : ""
              }`}
              value={gender}
              onChange={(e) =>
                handleInputChange(setGender, "gender", e.target.value)
              }
            >
              <option value="">선택하세요</option>
              <option value="male">남성</option>
              <option value="female">여성</option>
              <option value="other">기타</option>
            </select>
            {errors.gender && (
              <span className="error-message">{errors.gender}</span>
            )}
          </div>

          <div className="signup-popup-input-group">
            <label className="signup-popup-label">생년월일</label>
            <input
              type="date"
              className={`signup-popup-input ${
                errors.birthDate ? "input-error" : ""
              }`}
              value={birthDate}
              onChange={(e) =>
                handleInputChange(setBirthDate, "birthDate", e.target.value)
              }
            />
            {errors.birthDate && (
              <span className="error-message">{errors.birthDate}</span>
            )}
          </div>

          <button type="submit" className="signup-popup-submit-btn">
            다음
          </button>

          <div className="signup-popup-footer">
            <span className="signup-popup-footer-text">
              이미 계정이 있으신가요?
            </span>
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
