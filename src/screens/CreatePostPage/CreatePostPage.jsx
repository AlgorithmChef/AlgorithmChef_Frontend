import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { UnifiedHeader } from "../../components/UnifiedHeader";
import "./style.css";
import { createPost } from "../../api/Community/community";

export const CreatePostPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("나눔");

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/communitypage");
    }
  }, [isAuthenticated, navigate]);

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }
    const newPost = {
      category: category,
      title: title,
      content: content,
    };

    try {
      const response = await createPost(newPost);
      if (response) {
        console.log("게시글 작성:", newPost);
        alert(response.message);
        navigate("/communitypage");
      } else {
        alert("게시글 작성 실패");
      }
    } catch (error) {
      console.error("게시글 작성 중 에러:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="create-post-page">
      <UnifiedHeader />

      <div className="create-post-content">
        <div className="create-post-title-section">
          <h1 className="create-post-title">새 글 작성</h1>
          <p className="create-post-subtitle">
            재료 나눔 게시판에 글을 작성하세요
          </p>
        </div>

        <form className="create-post-form" onSubmit={handleSubmit}>
          <div className="create-post-input-group">
            <label className="create-post-label">제목</label>
            <input
              type="text"
              className="create-post-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              required
            />
          </div>
          <div className="create-post-input-group">
            <label className="create-post-label">카테고리</label>
            <select className="create-post-input" onChange={handleCategory}>
              <option value="나눔">나눔</option>
              <option value="교환">교환</option>
              <option value="판매">판매</option>
              <option value="요청">요청</option>
            </select>
          </div>

          <div className="create-post-input-group">
            <label className="create-post-label">내용</label>
            <textarea
              className="create-post-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              rows="10"
              required
            />
          </div>

          <div className="create-post-footer">
            <Link to="/communitypage" className="create-post-cancel-btn">
              취소
            </Link>
            <button type="submit" className="create-post-submit-btn">
              작성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
