import "../style.css"
function FindPassword({ onClose, onSwitchToLogin }) {
    
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const id = formData.get("id"); // input name="id"
  
      // 로컬스토리지에서 비밀번호 찾기 로직
      //나중에 백앤드 로직으로 전환
      //이메일로 임시비밀번호 확인
      const storedUsersString = localStorage.getItem("registeredUsers");
      if (storedUsersString) {
        const users = JSON.parse(storedUsersString);
        const foundUser = Array.isArray(users) 
            ? users.find(user => user.username === id) 
            : null;
  
        if (foundUser) {
          alert(`회원님의 비밀번호는 ${foundUser.password} 입니다.`);
        } else {
          alert("일치하는 회원 정보를 찾을 수 없습니다.");
        }
      } else {
        alert("가입된 회원 정보가 없습니다.");
      }
    };
  
    return (
      <div className="login-popup-overlay" onClick={onClose}>
        <div className="login-popup-container" onClick={(e) => e.stopPropagation()}>
          <button className="login-popup-close" onClick={onClose}>×</button>
          <div className="login-popup-header">
            <h2 className="login-popup-title">비밀번호 찾기</h2>
          </div>
          <form className="login-popup-form" onSubmit={handleSubmit}>
            <label htmlFor="id" className="login-popup-label">아이디</label>
            <input 
              type="text" 
              placeholder="아이디 입력" 
              className="login-popup-input" 
              name="id" 
              required
            />
            
            <button className="login-popup-submit-btn">
               비밀번호 찾기
            </button>
          </form>
  
          <div className="login-popup-footer">
              <span onClick={onSwitchToLogin} className="login-popup-footer-text" style={{marginTop : 5}}>
                  로그인으로 돌아가기
              </span>
          </div>
        </div>
      </div>
    );
  }

export default FindPassword;