import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CommunitypageWrapper } from "../../../../components/CommunitypageWrapper";
import "./style.css";
import { getPosts } from "../../../../api/Community/community";
import { useAuth } from "../../../../contexts/AuthContext";

export const Community = () => {
  const [posts, setPosts] = useState([]);
  const { isAuthenticated } = useAuth();

  const [totalPostsCount, setTotalPostsCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인 필요");
      setPosts([]);
      return;
    }
    const fetchData = async () => {
      try {
        const response = await getPosts();

        if (response && Array.isArray(response.posts)) {
          setPosts(response.posts.slice(0, 5));

          setTotalPostsCount(
            response.pageInfo?.totalElements || response.posts.length
          );
        } else {
          console.error("게시글 가져오기 실패: 응답 구조 오류");
          setPosts([]);
          alert("게시글 목록을 불러오는 중 오류가 발생했습니다.");
        }
      } catch (error) {
        console.error("게시글 가져오는 도중 오류 발생", error);
        setPosts([]);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  return (
    <div className="community">
      <Link className="community-header" to="/communitypage">
        <div className="community-header-2">재료 나눔 게시판</div>
      </Link>

      <div className="community-contents">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <CommunitypageWrapper
              key={post.postId}
              postId={post.postId}
              className={
                index === 0
                  ? "communitypage-3"
                  : index === posts.length - 1
                  ? "communitypage-5"
                  : "communitypage-4"
              }
              title={post.title}
              author={post.userId}
              date={post.createdAt}
              category={post.category}
              content={post.content}
            />
          ))
        ) : (
          <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
            {isAuthenticated
              ? "등록된 게시글이 없습니다."
              : "로그인 후 게시글을 볼 수 있습니다."}
          </div>
        )}
      </div>
    </div>
  );
};
