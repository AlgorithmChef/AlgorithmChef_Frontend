import React from "react";
import { UnifiedHeader } from "../../components/UnifiedHeader";
import { Communitypage } from "./sections/Communitypage";
import "./style.css";

export const CommunityPage = () => {
  return (
    <div className="community-page" data-model-id="1:6">
      <UnifiedHeader />
      <Communitypage />
    </div>
  );
};
