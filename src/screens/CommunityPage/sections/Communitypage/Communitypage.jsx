import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { CommunitypageWrapper } from "../../../../components/CommunitypageWrapper";
import { PageButton } from "../../../../components/PageButton";
import "./style.css";
import { getPostList } from "../../../../api/Community/community";

const CATEGORIES = ["전체", "나눔", "교환", "판매", "요청"];
const POSTS_PER_PAGE = 20;
export const Communitypage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const [allPosts, setAllPosts] = useState([]);
  const [category, setCategory] = useState("전체");

  useEffect(() => {
    setCurrentPage(0);
  }, category);
  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인 필요");
      setAllPosts([]);
      return;
    }
    const fetchData = async () => {
      const selectedCategory = category === "전체" ? null : category;
      try {
        const response = await getPostList(
          currentPage,
          POSTS_PER_PAGE,
          selectedCategory
        );
        console.log(response);
        if (response && response.posts.length > 0) {
          console.log("첫 번째 게시글:", response.posts[0]);
          setAllPosts(response.posts);
        } else {
          alert("게시글 가져오기 실패");
        }
      } catch (error) {
        console.error("게시글 가쟈오는 도중 오류 발생", error);
      }
    };
    fetchData();
  }, [category, isAuthenticated]);

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }
    navigate("/createpost");
  };

  const totalPages = Math.min(Math.ceil(allPosts.length / POSTS_PER_PAGE), 5);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  return (
    <div className="communitypage">
      <div className="communitypage-header">
        <div className="div">재료 나눔 게시판</div>
      </div>
      <div className="communitypage-filter-wrapper">
        <label htmlFor="category">카테고리</label>
        <select
          name="category"
          className="communitypage-category-select"
          value={category}
          onChange={handleCategory}
        >
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="div-2">
        {allPosts.map((post, index) => (
          <CommunitypageWrapper
            key={post.id}
            postId={post.id || post.postId}
            className={
              index === 0
                ? "communitypage-postheader"
                : "communitypage-instance"
            }
            title={post.title}
            author={post.userId}
            date={post.createdAt}
            category={post.category}
            content={post.content}
          />
        ))}
        <div className="communitypage-wrapper-2">
          <button
            onClick={handleCreatePost}
            className="communitypage-wrapper-3"
          >
            <div className="text-wrapper-2">새로운 글 작성하기</div>
          </button>
        </div>
      </div>

      <div className="communitypage-nav">
        <button
          className="page-nav-arrow"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img
            className="img"
            alt="Left arrow"
            src="https://c.animaapp.com/sjWITF5i/img/left-allow-1.svg"
          />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PageButton
            key={page}
            className="page-button-container"
            text={String(page)}
            isActive={currentPage === page}
            onClick={() => handlePageChange(page)}
          />
        ))}

        <button
          className="page-nav-arrow"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img
            className="img"
            alt="Right arrow"
            src="https://c.animaapp.com/sjWITF5i/img/right-allow-1.svg"
          />
        </button>
      </div>
    </div>
  );
};
