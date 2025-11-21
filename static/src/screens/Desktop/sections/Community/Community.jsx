import React from "react";
import { Link } from "react-router-dom";
import { CommunitypageWrapper } from "../../../../components/CommunitypageWrapper";
import "./style.css";

const MOCK_POSTS = [
  // TODO: Backend Integration: Replace with API call to fetch recent community posts
  { id: 1, title: "돼지고기 100g 나눔합니다.", author: "test3User", date: "2025-11-03", category: "나눔", content: "돼지고기를 너무 많이 샀네요 남는 돼지고기 나눔해요" },
  { id: 2, title: "양파 2개 나눔해요", author: "user123", date: "2025-11-02", category: "나눔", content: "양파 2개 필요하신 분 가져가세요" },
  { id: 3, title: "닭고기 500g 나눔", author: "foodlover", date: "2025-11-01", category: "나눔", content: "신선한 닭고기 나눔합니다" },
  { id: 4, title: "고추장 새것 나눔합니다", author: "chef99", date: "2025-10-31", category: "나눔", content: "개봉 안한 고추장 드립니다" },
  { id: 5, title: "양배추 한통 가져가세요", author: "veggie_fan", date: "2025-10-30", category: "나눔", content: "양배추 한통 나눔해요" },
];

export const Community = () => {
  return (
    <div className="community">
      <Link className="community-header" to="/communitypage">
        <div className="community-header-2">재료 나눔 게시판</div>
      </Link>

      <div className="community-contents">
        {MOCK_POSTS.map((post, index) => (
          <CommunitypageWrapper 
            key={post.id}
            postId={post.id}
            className={index === 0 ? "communitypage-3" : index === MOCK_POSTS.length - 1 ? "communitypage-5" : "communitypage-4"}
            title={post.title}
            author={post.author}
            date={post.date}
            category={post.category}
            content={post.content}
          />
        ))}
      </div>
    </div>
  );
};
