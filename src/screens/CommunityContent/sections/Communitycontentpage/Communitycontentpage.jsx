import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import "./style.css";
import { HiArrowNarrowLeft } from "react-icons/hi";
import UpdatePost from "./UpdatePost/UpdatePost";
import {
  getPostDetail,
  deletePost,
  updatePost,
  createComment,
  getReplies,
} from "../../../../api/Community/community";

export const Communitycontentpage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const [currentPost, setCurrentPost] = useState(location.state?.post || null);
  const [loading, setLoading] = useState(!location.state?.post);
  const [showUpdatePage, setShowUpdatePage] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [repliesState, setRepliesState] = useState({});

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return String(dateString).substring(0, 10);
  };

  useEffect(() => {
    //게시글의 댓글 가져오는 함수
    const fetchPostData = async () => {
      try {
        if (!currentPost) setLoading(true);

        const response = await getPostDetail(parseInt(id));
        setCurrentPost(response);

        if (response.comments) {
          setComments(response.comments);
        }
      } catch (error) {
        console.error("게시글 로드 실패:", error);
        if (!currentPost) {
          alert("게시글을 불러오는 데 실패했습니다.");
          navigate("/communitypage");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPostData();
    }
  }, [id, navigate]);

  const handleToggleReplies = async (commentId) => {
    const currentState = repliesState[commentId] || {
      list: [],
      page: 0,
      expanded: false,
    };

    if (currentState.expanded) {
      setRepliesState((prev) => ({
        ...prev,
        [commentId]: { ...currentState, expanded: false },
      }));
      return;
    }
    if (currentState.list.length > 0) {
      setRepliesState((prev) => ({
        ...prev,
        [commentId]: { ...currentState, expanded: true },
      }));
      return;
    }
    loadReplies(commentId, 0);
  };

  const loadReplies = async (commentId, page) => {
    try {
      const response = await getReplies(commentId, page);

      let newReplies = [];
      if (Array.isArray(response)) {
        newReplies = response;
      } else if (response && Array.isArray(response.replies)) {
        newReplies = response.replies;
      } else if (response && Array.isArray(response.content)) {
        newReplies = response.content;
      } else {
        newReplies = [];
      }

      setRepliesState((prev) => {
        const prevState = prev[commentId] || { list: [] };
        return {
          ...prev,
          [commentId]: {
            list: page === 0 ? newReplies : [...prevState.list, ...newReplies],
            page: page,
            expanded: true,
            hasMore: newReplies.length >= 20,
          },
        };
      });
    } catch (error) {
      console.error("대댓글 로드 실패:", error);
    }
  };

  const handleDelete = async () => {
    if (!isAuthenticated) return alert("로그인이 필요합니다.");
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deletePost(parseInt(id));
        alert("삭제되었습니다.");
        navigate("/communitypage");
      } catch (error) {
        alert("삭제 실패");
      }
    }
  };

  const handlePostUpdate = async (updatedData) => {
    try {
      const response = await updatePost(parseInt(id), updatedData);
      setCurrentPost((prev) => ({
        ...prev,
        ...updatedData,
        ...(response && typeof response === "object" ? response : {}),
      }));
      alert("게시글이 수정되었습니다.");
      setShowUpdatePage(false);
    } catch (error) {
      alert("수정 실패");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return alert("로그인이 필요합니다.");
    if (!newComment.trim()) return;

    const commentRequest = {
      parentCommentId: replyingTo ? replyingTo.commentId : null,
      content: newComment,
    };

    try {
      await createComment(parseInt(id), commentRequest);

      const updatedPost = await getPostDetail(parseInt(id));
      if (updatedPost.comments) {
        setComments(updatedPost.comments);
      }

      if (replyingTo) {
        loadReplies(replyingTo.commentId, 0);
      }

      setNewComment("");
      setReplyingTo(null);
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
  };

  const renderCommentItem = (comment) => {
    const repliesInfo = repliesState[comment.commentId];
    const isExpanded = repliesInfo?.expanded;

    const rawList = repliesInfo?.list;
    const repliesList = Array.isArray(rawList) ? rawList : [];

    return (
      <div key={comment.commentId} className="comment-wrapper">
        <div className="comment-item">
          <div
            className="comment-header-row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="comment-author" style={{ fontWeight: "bold" }}>
              {comment.userId || comment.author}
            </div>
            <div
              className="comment-date"
              style={{ fontSize: "12px", color: "#999" }}
            >
              {formatDate(comment.createdAt)}
            </div>
          </div>
          <div className="comment-content" style={{ margin: "5px 0" }}>
            {comment.content}
          </div>

          <div
            className="comment-actions"
            style={{ display: "flex", gap: "10px", fontSize: "12px" }}
          >
            {isAuthenticated && (
              <span
                onClick={() => {
                  setReplyingTo(comment);
                  document.querySelector(".comment-input")?.focus();
                }}
                style={{ cursor: "pointer", color: "#666" }}
              >
                답글 달기
              </span>
            )}

            {comment.replyCount > 0 && (
              <span
                onClick={() => handleToggleReplies(comment.commentId)}
                style={{
                  cursor: "pointer",
                  color: "#f6910b",
                  fontWeight: "bold",
                }}
              >
                {isExpanded
                  ? "답글 숨기기"
                  : `답글 ${comment.replyCount}개 보기`}
              </span>
            )}
          </div>
        </div>

        {isExpanded && (
          <div
            className="replies-container"
            style={{
              marginLeft: "20px",
              borderLeft: "2px solid #eee",
              paddingLeft: "10px",
              marginTop: "5px",
            }}
          >
            {repliesList.map((reply) => (
              <div
                key={reply.commentId}
                className="comment-item reply-item"
                style={{ backgroundColor: "#f9f9f9", marginTop: "5px" }}
              >
                <div className="comment-author" style={{ fontSize: "13px" }}>
                  ↳ {reply.userId}
                </div>
                <div className="comment-content" style={{ fontSize: "13px" }}>
                  {reply.content}
                </div>
                <div
                  className="comment-date"
                  style={{ fontSize: "11px", color: "#aaa" }}
                >
                  {formatDate(reply.createdAt)}
                </div>
              </div>
            ))}

            {repliesInfo?.hasMore && (
              <button
                onClick={() =>
                  loadReplies(comment.commentId, repliesInfo.page + 1)
                }
                style={{
                  fontSize: "12px",
                  marginTop: "5px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#f6910b",
                }}
              >
                답글 더보기 👇
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  if (loading) return <div className="communitycontentpage">로딩 중...</div>;
  if (!currentPost)
    return <div className="communitycontentpage">게시글 없음</div>;

  if (showUpdatePage) {
    return (
      <UpdatePost
        post={currentPost}
        onClose={() => setShowUpdatePage(false)}
        onUpdate={handlePostUpdate}
      />
    );
  }

  return (
    <div className="communitycontentpage">
      <div className="div-3">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            width: "100%",
            marginBottom: "15px",
          }}
        >
          <div
            onClick={() => navigate("/communitypage")}
            style={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginRight: "5px",
              padding: "5px",
              minWidth: "60px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                color: "#555",
                marginBottom: "2px",
              }}
            >
              뒤로
            </span>
            <HiArrowNarrowLeft
              size={26}
              color="#333"
              style={{ transform: "scaleX(1.4)" }}
            />
          </div>
          <div className="content-category">
            <img
              className="category-icon"
              src="https://c.animaapp.com/sjWITF5i/img/category-icon.svg"
              alt="icon"
            />
            <div className="content-categorytext">{currentPost.category}</div>
          </div>
        </div>

        <div className="content-header">
          <div className="content-headertext">{currentPost.title}</div>
          {isAuthenticated && (
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="post-action-btn"
                onClick={() => setShowUpdatePage(true)}
              >
                수정
              </button>
              <button className="post-action-btn delete" onClick={handleDelete}>
                삭제
              </button>
            </div>
          )}
        </div>

        <div className="navbar">
          <div className="text-wrapper-6">작성자</div>
          <div className="text-wrapper-6">
            {currentPost.author || currentPost.userId}
          </div>
          <div className="text-wrapper-6">작성일</div>
          <div className="text-wrapper-6">
            {formatDate(currentPost.createdAt)}
          </div>
        </div>

        <div className="content">
          <p className="content-text">{currentPost.content}</p>
        </div>

        {/* 댓글 섹션 */}
        <div className="comments-section">
          <div className="comments-header">
            <h3 className="comments-title">댓글</h3>
          </div>

          <div className="comments-list">
            {comments && comments.length > 0 ? (
              comments.map((comment) => renderCommentItem(comment))
            ) : (
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#999",
                  fontSize: "14px",
                }}
              >
                아직 댓글이 없습니다.
              </div>
            )}
          </div>

          <form className="comment-form" onSubmit={handleCommentSubmit}>
            {replyingTo && (
              <div
                style={{
                  fontSize: "13px",
                  color: "#f6910b",
                  marginBottom: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>@{replyingTo.userId} 님에게 답글 작성 중...</span>
                <button
                  type="button"
                  onClick={() => setReplyingTo(null)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "#666",
                  }}
                >
                  취소
                </button>
              </div>
            )}
            <textarea
              className="comment-input"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder={
                isAuthenticated
                  ? replyingTo
                    ? "답글을 입력하세요..."
                    : "댓글을 입력하세요..."
                  : "로그인 후 댓글 작성 가능"
              }
              disabled={!isAuthenticated}
              rows="3"
            />
            <button
              type="submit"
              className="comment-submit-btn"
              disabled={!isAuthenticated || !newComment.trim()}
            >
              {replyingTo ? "답글 작성" : "댓글 작성"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
