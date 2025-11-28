import "../style.css";
import { useState } from "react";
import { isNotEmpty, isEmail } from "../../util/validation";
import { findUserIdApi } from "../../../api/authApi";
import { FaCheckCircle } from "react-icons/fa";

function FindId({ onClose, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [foundId, setFoundId] = useState(null);

  const [errors, setErrors] = useState({
    email: "",
    birthDate: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    let newErrors = {};

    if (!isNotEmpty(email)) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!isEmail(email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }

    if (!isNotEmpty(birthDate)) {
      newErrors.birthDate = "생년월일을 선택해주세요.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    const formattedBirthDate = `${birthDate}T00:00:00`;

    try {
      const result = await findUserIdApi(email, formattedBirthDate);
      if (result && result.userId) {
        setFoundId(result.userId);
      } else {
        alert("일치하는 정보가 없습니다.");
      }
    } catch (error) {
      alert("찾기 실패: 서버 오류가 발생했습니다.");
    }
  };

  const handleInputChange = (setter, field, value) => {
    setter(value);
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  if (foundId) {
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
            <h2 className="login-popup-title">아이디 찾기 성공</h2>
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
              회원님의 아이디를 찾았습니다!
            </p>

            <div
              style={{
                background: "#FFF4E6",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "30px",
              }}
            >
              <h3 style={{ fontSize: "24px", color: "#FF8A00", margin: 0 }}>
                {foundId}
              </h3>
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
          <h2 className="login-popup-title">아이디 찾기</h2>
        </div>

        <form className="login-popup-form" onSubmit={handleSubmit}>
          <div className="login-popup-input-group">
            <label htmlFor="email" className="login-popup-label">
              이메일
            </label>
            <input
              type="email"
              placeholder="이메일을 입력하세요"
              className={`login-popup-input ${
                errors.email ? "input-error" : ""
              }`}
              value={email}
              onChange={(e) =>
                handleInputChange(setEmail, "email", e.target.value)
              }
              name="email"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="login-popup-input-group">
            <label htmlFor="birthDate" className="login-popup-label">
              생년월일
            </label>
            <input
              name="birthDate"
              type="date"
              placeholder="생년월일 입력"
              className={`login-popup-input ${
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

          <button className="login-popup-submit-btn">아이디 찾기</button>
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

export default FindId;
