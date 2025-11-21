/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export const CommunitypageWrapper = ({ 
  className, 
  postId,
  title = "돼지고기 100g 나눔합니다.", 
  author = "test3User", 
  date = "2025-11-03",
  category = "나눔",
  content = ""
}) => {
  return (
    <Link
      className={`communitypage-wrapper ${className}`}
      to={`/communitycontentpage/${postId}`}
      state={{ post: { id: postId, title, author, date, category, content } }}
    >
      <div className="communitypage-6">
        <div className="communitypage-7">{category}</div>
      </div>

      <div className="communitypage-8">
        <div className="communitypage-9">|</div>

        <div className="communitypage-10">{title}</div>
      </div>

      <div className="communitypage-11">
        <div className="communitypage-12">작성자 :</div>

        <div className="communitypage-13">{author}</div>

        <div className="communitypage-12">작성일 :</div>

        <div className="communitypage-13">{date}</div>
      </div>
    </Link>
  );
};
