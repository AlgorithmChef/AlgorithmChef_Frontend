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
      console.log("?α??? ????");
      localStorage.setItem("userId", id);
      onClose();
    } else if (result.status === "FORCE_PASSWORD_CHANGE") {
      console.log("????й?? ?????????.");
      setViewMode("changepw");
    } else {
      alert("?α??? ????: ????? ??й???? ??????????.");
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
            <h2 className="login-popup-title">????й?? ????</h2>
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
          ??
        </button>

        <div className="login-popup-header">
          <h2 className="login-popup-title">?α????</h2>
        </div>

        <form className="login-popup-form" onSubmit={handleLogin}>
          <div className="login-popup-input-group">
            <label className="login-popup-label">?????????</label>{" "}
            {/* Changed label */}
            <input
              type="text" // Changed type to email
              className="login-popup-input"
              value={id} // Changed value to email
              onChange={(e) => setId(e.target.value)} // Changed onChange to setId
              placeholder="???????????  ???????????????" // Changed placeholder
              required
            />
          </div>

          <div className="login-popup-input-group">
            <label className="login-popup-label">????????</label>
            <input
              type="password"
              className="login-popup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="?????????? ???????????????"
              required
            />
          </div>

          <button type="submit" className="login-popup-submit-btn">
            ?α????
          </button>

          <div className="login-popup-footer">
            <span className="login-popup-footer-text">
              ??????? ???????????????
            </span>
            <button
              type="button"
              className="login-popup-signup-btn"
              onClick={onSwitchToSignup}
            >
              ???????????
            </button>
          </div>
          <div className="login-popup-footer">
            <span className="login-popup-footer-text">???? ???</span>
            <button
              type="button"
              className="login-popup-signup-btn"
              onClick={() => {
                console.log("아이디 찾기 버튼 눌림!"); // 1. 이 로그가 뜨는지 확인
                onSwitchToFindId(); // 2. 부모 함수 실행
              }}
            >
              ????????? ???
            </button>
            <button
              type="button"
              className="login-popup-signup-btn"
              onClick={onSwitchToFindPassword}
            >
              ??й?? ???
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
