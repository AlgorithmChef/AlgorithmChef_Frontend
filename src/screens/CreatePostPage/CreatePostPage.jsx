import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { UnifiedHeader } from "../../components/UnifiedHeader";
import "./style.css";

export const CreatePostPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      navigate("/communitypage");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }

    // TODO: Backend Integration: Replace with API call to create a new post
    // Example: axios.post('/api/posts', newPost)
    
    // Get existing posts (mock DB)
    const existingPosts = JSON.parse(localStorage.getItem("communityPosts") || "[]");
    
    // Create new post
    const newPost = {
      id: Date.now(), // Unique ID for the post
      title,
      content,
      author: user.username,
      date: new Date().toISOString().split('T')[0], // Current date
      category: "나눔" // Default category
    };

    // Add to beginning of array (최상단)
    const updatedPosts = [newPost, ...existingPosts];
    localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));

    console.log("Creating post:", newPost);
    navigate("/communitypage");
  };

  return (
    <div className="create-post-page">
      <UnifiedHeader />

      <div className="create-post-content">
        <div className="create-post-title-section">
          <h1 className="create-post-title">새 글 작성</h1>
          <p className="create-post-subtitle">재료 나눔 게시판에 글을 작성하세요</p>
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
