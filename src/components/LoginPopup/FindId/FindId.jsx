import "../style.css"; // 기존 CSS 파일 경로 유지
import { useState } from "react";
import { isNotEmpty } from "../../util/validation";

function FindId({ onClose, onSwitchToLogin }) {
  const [formState, setFormState] = useState({ errors: {} });

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const birthDate = formData.get("birthDate");

    const errors = {};

    if (!isNotEmpty(birthDate)) {
      errors.birthDate = "생년월일을 선택해주세요.";
    }

    if (Object.keys(errors).length > 0) {
      setFormState({ errors });
      return;
    }

    //여기는 나중에 백앤드 로직
    const storedUsersString = localStorage.getItem("registeredUsers");
    if (storedUsersString) {
      try {
        const users = JSON.parse(storedUsersString);

        const foundUser = Array.isArray(users) 
          ? users.find(user => user.email === email && user.birthDate === birthDate)
          : null;

        if (foundUser) {
          alert(`찾은 아이디: ${foundUser.username}`);
          
          setFormState({ errors: {}, success: true, userId: foundUser.username });
        } else {
          alert("입력하신 정보와 일치하는 아이디를 찾을 수 없습니다.");
        }

      } catch (error) {
        console.error("데이터 파싱 에러:", error);
        alert("회원 정보를 불러오는 중 오류가 발생했습니다.");
      }
    } else {
      alert("가입된 회원 정보가 없습니다.");
    }
  }

  return (
    <div className="login-popup-overlay" onClick={onClose}>
      <div className="login-popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="login-popup-close" onClick={onClose}>×</button>
        <div className="login-popup-header">
          <h2 className="login-popup-title">아이디 찾기</h2>
        </div>
        
        <form className="login-popup-form" onSubmit={handleSubmit}>
            <label htmlFor="email" className="login-popup-label">이메일</label>
            <input type="email" placeholder="이메일 입력" className="login-popup-input" name="email" required/>
            
            <label htmlFor="birthDate" className="login-popup-label">생년월일</label>
            <input name="birthDate" type="date" placeholder="생년 입력" className="login-popup-input" required/>
            
            {formState.errors.birthDate && (
                <p style={{color: 'red', fontSize: '12px', marginTop: '4px'}}>{formState.errors.birthDate}</p>
            )}

            <button className="login-popup-submit-btn">
                아이디 찾기
            </button>
        </form>

        <div className="login-popup-footer">
            <span onClick={onSwitchToLogin} className="login-popup-footer-text" style={{marginTop : 5, cursor: 'pointer'}}>
                로그인으로 돌아가기
            </span>
        </div>
      </div>
    </div>
  );
}

export default FindId;