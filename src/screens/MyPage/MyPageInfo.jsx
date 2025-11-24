import React from "react";
import { FaUser, FaBirthdayCake, FaIdCard } from "react-icons/fa";
import "./style.css";

function MyPageInfo({ age, id, birthDate }) {
    return (
        <div className="mypage-info-card">
            <div className="mypage-info-header">
                <h3 className="mypage-info-title">내 정보</h3>
            </div>

            <div className="mypage-info-content">
                
                <div className="info-item">
                    <div className="info-icon-box">
                        <FaUser />
                    </div>
                    <div className="info-text">
                        <span className="info-label">아이디</span>
                        <span className="info-value">{id || "skt2008"}</span>
                    </div>
                </div>

                <div className="info-divider"></div>

                <div className="info-item">
                    <div className="info-icon-box">
                        <FaIdCard />
                    </div>
                    <div className="info-text">
                        <span className="info-label">생년월일</span>
                        <span className="info-value">{birthDate || "2000-01-01"}</span>
                    </div>
                </div>

                <div className="info-divider"></div>

                <div className="info-item">
                    <div className="info-icon-box">
                        <FaBirthdayCake />
                    </div>
                    <div className="info-text">
                        <span className="info-label">나이</span>
                        <span className="info-value">{age ? `${age}세` : "26세"}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default MyPageInfo;