import "../style.css";
import { useState } from "react";
import { isNotEmpty, isEmail } from "../../util/validation";
import { findPasswordApi } from "../../../api/authApi";
import { FaCheckCircle } from "react-icons/fa";

function FindPassword({ onClose, onSwitchToLogin }) {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [resultMessage, setResultMessage] = useState(null);

  const [errors, setErrors] = useState({
    userId: "",
    email: "",
  });

  const handleSubmit = async (e) => {
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

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const result = await findPasswordApi(userId, email);

      if (result) {
        const message =
          result.tempPassword ||
          result.message ||
          "이메일로 임시 비밀번호가 발송되었습니다.";
        setResultMessage(message);
      } else {
        alert("일치하는 회원 정보가 없습니다.");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert("비밀번호 찾기 실패: 정보를 다시 확인해주세요.");
      }
    }
  };

  const handleInputChange = (setter, field, value) => {
    setter(value);
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  if (resultMessage) {
    return (
      <div className="login-popup-overlay" onClick={onClose}>
        <div
          className="login-popup-container"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="login-popup-close" onClick={onClose}>
            X
          </button>
          <div className="login-popup-header">
            <h2 className="login-popup-title">비밀번호 찾기 성공</h2>
          </div>
          <div style={{ padding: "30px 20px", textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <FaCheckCircle size={60} color="#FF8A00" />
            </div>
            <p
              style={{ marginBottom: "10px", color: "#666", fontSize: "16px" }}
            >
              임시 비밀번호가 발급되었습니다. 이메일을 확인해주세요
            </p>
            <div
              style={{
                background: "#FFF4E6",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "30px",
                wordBreak: "break-all",
              }}
            >
              <h3 style={{ fontSize: "20px", color: "#FF8A00", margin: 0 }}>
                {resultMessage}
              </h3>
            </div>
            <div
              style={{ fontSize: "14px", color: "#888", marginBottom: "20px" }}
            >
              로그인 후 반드시 비밀번호를 변경해주세요.
            </div>
            <button
              className="login-popup-submit-btn"
              onClick={onSwitchToLogin}
            >
              로그인하러 가기
            </button>
          </div>
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
          X
        </button>
        <div className="login-popup-header">
          <h2 className="login-popup-title">비밀번호 찾기</h2>
        </div>

        <form className="login-popup-form" onSubmit={handleSubmit}>
          <div className="login-popup-input-group">
            <label htmlFor="userId" className="login-popup-label">
              아이디
            </label>
            <input
              type="text"
              placeholder="아이디를 입력하세요"
              className={`login-popup-input ${
                errors.userId ? "input-error" : ""
              }`}
              name="userId"
              value={userId}
              onChange={(e) =>
                handleInputChange(setUserId, "userId", e.target.value)
              }
            />
            {errors.userId && (
              <span className="error-message">{errors.userId}</span>
            )}
          </div>

          <div className="login-popup-input-group">
            <label htmlFor="email" className="login-popup-label">
              이메일
            </label>
            <input
              type="text"
              placeholder="이메일을 입력하세요"
              className={`login-popup-input ${
                errors.email ? "input-error" : ""
              }`}
              name="email"
              value={email}
              onChange={(e) =>
                handleInputChange(setEmail, "email", e.target.value)
              }
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <button type="submit" className="login-popup-submit-btn">
            비밀번호 찾기
          </button>
        </form>

        <div className="login-popup-footer">
          <span
            onClick={onSwitchToLogin}
            className="login-popup-footer-text"
            style={{ marginTop: 5, cursor: "pointer" }}
          >
            로그인으로 돌아가기
          </span>
        </div>
      </div>
    </div>
  );
}

export default FindPassword;
