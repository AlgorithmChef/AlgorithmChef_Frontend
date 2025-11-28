import { useState } from "react";
import "../style.css";
import { isPasswordValid } from "../../util/validation";
import { updateTempPasswordApi } from "../../../api/authApi";

function ChangePassword({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  async function handleChangePassword(e) {
    e.preventDefault();

    let newErrors = {};

    if (!isPasswordValid(password)) {
      newErrors.password =
        "영문자, 특수문자 포함 최소 10자 ~ 최대 20자로 입력해주세요.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const result = await updateTempPasswordApi(password);

      if (result) {
        alert(result.message || "비밀번호가 성공적으로 변경되었습니다.");

        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error("비밀번호 변경 에러:", error);
      alert("비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  const handleInputChange = (setter, field, value) => {
    setter(value);
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <form className="login-popup-form" onSubmit={handleChangePassword}>
      <div className="login-popup-input-group">
        <label htmlFor="password" className="login-popup-label">
          새 비밀번호
        </label>
        <input
          className={`login-popup-input ${
            errors.password ? "input-error" : ""
          }`}
          type="password"
          value={password}
          onChange={(e) =>
            handleInputChange(setPassword, "password", e.target.value)
          }
          required
          name="password"
          placeholder="영문, 특수문자 포함 10~20자"
        />
        {errors.password && (
          <span className="error-message">{errors.password}</span>
        )}
      </div>

      <div className="login-popup-input-group">
        <label htmlFor="confirmPassword" className="login-popup-label">
          새 비밀번호 확인
        </label>
        <input
          className={`login-popup-input ${
            errors.confirmPassword ? "input-error" : ""
          }`}
          type="password"
          value={confirmPassword}
          onChange={(e) =>
            handleInputChange(
              setConfirmPassword,
              "confirmPassword",
              e.target.value
            )
          }
          required
          name="confirmPassword"
          placeholder="비밀번호 확인"
        />
        {errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>

      <button type="submit" className="login-popup-submit-btn">
        변경 완료
      </button>
    </form>
  );
}

export default ChangePassword;
