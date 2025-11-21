import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { CommunitypageWrapper } from "../../../../components/CommunitypageWrapper";
import { PageButton } from "../../../../components/PageButton";
import "./style.css";

const ALL_POSTS = [
  // TODO: Backend Integration: Replace with API call to fetch all community posts
  { id: 1, title: "돼지고기 100g 나눔합니다.", author: "test3User", date: "2025-11-03", category: "나눔", content: "돼지고기를 너무 많이 샀네요 남는 돼지고기 나눔해요" },
  { id: 2, title: "양파 2개 나눔해요", author: "user123", date: "2025-11-02", category: "나눔", content: "양파 2개 필요하신 분 가져가세요" },
  { id: 3, title: "닭고기 500g 나눔", author: "foodlover", date: "2025-11-01", category: "나눔", content: "신선한 닭고기 나눔합니다" },
  { id: 4, title: "고추장 새것 나눔합니다", author: "chef99", date: "2025-10-31", category: "나눔", content: "개봉 안한 고추장 드립니다" },
  { id: 5, title: "양배추 한통 가져가세요", author: "veggie_fan", date: "2025-10-30", category: "나눔", content: "양배추 한통 나눔해요" },
  { id: 6, title: "감자 5개 나눔", author: "potato_lover", date: "2025-10-29", category: "나눔", content: "감자 5개 드립니다" },
  { id: 7, title: "당근 한봉지 드립니다", author: "healthy_eater", date: "2025-10-28", category: "나눔", content: "당근 한봉지 나눔합니다" },
  { id: 8, title: "우유 1L 나눔해요", author: "milk_fan", date: "2025-10-27", category: "나눔", content: "우유 1L 필요하신 분" },
  { id: 9, title: "계란 10개 나눔", author: "egg_master", date: "2025-10-26", category: "나눔", content: "계란 10개 드립니다" },
  { id: 10, title: "토마토 나눔합니다", author: "tomato_grower", date: "2025-10-25", category: "나눔", content: "토마토 나눔해요" },
];

export const Communitycontentpage = () => {
  const location = useLocation();
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [newComment, setNewComment] = useState("");
  
  // Load comments from localStorage for this specific post
  const [comments, setComments] = useState(() => {
    const storedComments = localStorage.getItem(`comments_${id}`);
    return storedComments ? JSON.parse(storedComments) : [];
  });

  const post = location.state?.post || {
    // TODO: Backend Integration: Fetch post details by ID if not available in state
    id: id,
    title: "돼지고기 100g 나눔합니다.",
    author: "test3User",
    date: "2025-11-03",
    category: "나눔",
    content: "돼지고기를 너무 많이 샀네요 남는 돼지고기 나눔해요"
  };

  // Get related posts (2 before and 2 after current post)
  const currentIndex = ALL_POSTS.findIndex(p => p.id === parseInt(id));
  const relatedPosts = [];
  
  // Get 2 posts before
  for (let i = Math.max(0, currentIndex - 2); i < currentIndex; i++) {
    if (ALL_POSTS[i]) relatedPosts.push(ALL_POSTS[i]);
  }
  
  // Get 2 posts after
  for (let i = currentIndex + 1; i <= Math.min(ALL_POSTS.length - 1, currentIndex + 2); i++) {
    if (ALL_POSTS[i]) relatedPosts.push(ALL_POSTS[i]);
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: user.username,
      content: newComment,
      date: new Date().toLocaleString('ko-KR')
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    
    // TODO: Backend Integration: Replace with API call to add a new comment
    // Example: axios.post(`/api/posts/${id}/comments`, comment)
    
    // Save comments to localStorage for this specific post (mock DB)
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
    setNewComment("");
  };


  return (
    <div className="communitycontentpage">
      <Link className="communitycontentpage-wrapper" to="/communitypage">
        <div className="text-wrapper-5">재료 나눔 게시판</div>
      </Link>

      <div className="div-3">
        <div className="content-category">
          <img
            className="category-icon"
            alt="Category icon"
            src="https://c.animaapp.com/sjWITF5i/img/category-icon.svg"
          />

          <div className="content-categorytext">{post.category}</div>
        </div>

        <div className="content-header">
          <div className="content-headertext">{post.title}</div>
        </div>

        <div className="navbar">
          <div className="text-wrapper-6">작성자</div>

          <div className="text-wrapper-6">{post.author}</div>

          <div className="text-wrapper-6">작성일</div>

          <div className="text-wrapper-6">{post.date}</div>
        </div>

        <div className="content">
          <p className="content-text">
            {post.content}
          </p>
        </div>

        <div className="comments-section">
          <div className="comments-header">
            <h3 className="comments-title">댓글 ({comments.length})</h3>
          </div>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-author">{comment.author}</div>
                <div className="comment-content">{comment.content}</div>
                <div className="comment-date">{comment.date}</div>
              </div>
            ))}
          </div>

          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              className="comment-input"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={isAuthenticated ? "댓글을 입력하세요..." : "로그인 후 댓글을 작성할 수 있습니다."}
              disabled={!isAuthenticated}
              rows="3"
            />
            <button 
              type="submit" 
              className="comment-submit-btn"
              disabled={!isAuthenticated || !newComment.trim()}
            >
              댓글 작성
            </button>
          </form>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <div className="div-4">
          <div className="related-posts-header">
            <h3 className="related-posts-title">다른 게시글</h3>
          </div>
          {relatedPosts.map((relatedPost, index) => (
            <CommunitypageWrapper 
              key={relatedPost.id}
              postId={relatedPost.id}
              className={index === 0 ? "design-component-instance-node" : "communitypage-2"}
              title={relatedPost.title}
              author={relatedPost.author}
              date={relatedPost.date}
              category={relatedPost.category}
              content={relatedPost.content}
            />
          ))}
        </div>
      )}
    </div>
  );
};
