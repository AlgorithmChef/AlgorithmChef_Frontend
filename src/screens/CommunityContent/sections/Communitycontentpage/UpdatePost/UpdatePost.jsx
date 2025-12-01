import React, { useState } from "react";
import "../style.css";

function UpdatePost({ post, onClose, onUpdate }) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [category, setCategory] = useState(post?.category || "나눔");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }
    const updatedData = {
      title,
      content,
      category,
    };
    onUpdate(updatedData);
  };

  return (
    <div className="communitycontentpage">
      <div className="div-3">
        {/* 헤더 */}
        <div
          style={{
            paddingBottom: "20px",
            borderBottom: "2px solid #f6910b",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#333",
              margin: 0,
            }}
          >
            게시글 수정
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            width: "100%",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label
              style={{ fontWeight: "700", fontSize: "16px", color: "#333" }}
            >
              카테고리
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="communitypage-category-select"
              style={{ width: "100%", padding: "12px" }}
            >
              <option value="나눔">나눔</option>
              <option value="교환">교환</option>
              <option value="판매">판매</option>
              <option value="요청">요청</option>
            </select>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label
              htmlFor="title"
              style={{ fontWeight: "700", fontSize: "16px", color: "#333" }}
            >
              제목
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="comment-input"
              style={{
                width: "100%",
                fontSize: "16px",
                padding: "14px",
                fontWeight: "500",
                boxSizing: "border-box",
              }}
              placeholder="제목을 입력하세요"
            />
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <label
              htmlFor="content"
              style={{ fontWeight: "700", fontSize: "16px", color: "#333" }}
            >
              내용
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="comment-input"
              style={{
                width: "100%",
                minHeight: "400px",
                fontSize: "16px",
                lineHeight: "1.6",
                resize: "none",
                padding: "14px",
                boxSizing: "border-box",
              }}
              placeholder="내용을 입력하세요"
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "14px 30px",
                backgroundColor: "#e0e0e0",
                color: "#333",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              취소
            </button>
            <button
              type="submit"
              className="comment-submit-btn"
              style={{
                fontSize: "16px",
                padding: "14px 30px",
                alignSelf: "auto",
              }}
            >
              수정 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePost;
