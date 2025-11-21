import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { CommunitypageWrapper } from "../../../../components/CommunitypageWrapper";
import { PageButton } from "../../../../components/PageButton";
import "./style.css";

const DEFAULT_POSTS = [
  // TODO: Backend Integration: These would typically be fetched from the backend
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
  { id: 11, title: "버섯 한팩 드려요", author: "mushroom_fan", date: "2025-10-24", category: "나눔", content: "버섯 한팩 가져가세요" },
  { id: 12, title: "파프리카 나눔", author: "veggie_lover", date: "2025-10-23", category: "나눔", content: "파프리카 나눔합니다" },
  { id: 13, title: "두부 2모 나눔해요", author: "tofu_master", date: "2025-10-22", category: "나눔", content: "두부 2모 드립니다" },
  { id: 14, title: "김치 나눔합니다", author: "kimchi_maker", date: "2025-10-21", category: "나눔", content: "김치 나눔해요" },
  { id: 15, title: "된장 새것 드립니다", author: "ferment_pro", date: "2025-10-20", category: "나눔", content: "된장 새것 가져가세요" },
  { id: 16, title: "참기름 나눔", author: "oil_collector", date: "2025-10-19", category: "나눔", content: "참기름 나눔합니다" },
  { id: 17, title: "생선 나눔", author: "fish_lover", date: "2025-10-18", category: "나눔", content: "생선 나눔합니다" },
  { id: 18, title: "쌀 나눔", author: "rice_farmer", date: "2025-10-17", category: "나눔", content: "쌀 나눔해요" },
  { id: 19, title: "과일 나눔", author: "fruit_fan", date: "2025-10-16", category: "나눔", content: "과일 나눔합니다" },
  { id: 20, title: "야채 나눔", author: "veggie_master", date: "2025-10-15", category: "나눔", content: "야채 나눔해요" },
];

const POSTS_PER_PAGE = 10;

export const Communitypage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    // TODO: Backend Integration: Replace with API call to fetch all community posts
    // Example: axios.get('/api/posts').then(response => setAllPosts(response.data));
    
    const storedPosts = JSON.parse(localStorage.getItem("communityPosts") || "[]");
    const combined = [...storedPosts, ...DEFAULT_POSTS];
    setAllPosts(combined);
  }, []);

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다.");
      return;
    }
    navigate("/createpost");
  };

  const totalPages = Math.min(Math.ceil(allPosts.length / POSTS_PER_PAGE), 5);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="communitypage">
      <div className="communitypage-header">
        <div className="div">재료 나눔 게시판</div>
      </div>

      <div className="div-2">
        {currentPosts.map((post, index) => (
          <CommunitypageWrapper 
            key={post.id}
            postId={post.id}
            className={index === 0 ? "communitypage-postheader" : "communitypage-instance"}
            title={post.title}
            author={post.author}
            date={post.date}
            category={post.category}
            content={post.content}
          />
        ))}
        <div className="communitypage-wrapper-2">
          <button onClick={handleCreatePost} className="communitypage-wrapper-3">
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
