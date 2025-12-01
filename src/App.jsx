import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ScrollToTop } from "./components/ScrollToTop";

// ▼▼▼ [수정 1] 껍데기(CommunityContent) 지우고, 알맹이(Communitycontentpage)를 import 하세요!
// 경로가 './screens/Communitycontentpage/Communitycontentpage' 인지
// './screens/sections/Communitycontentpage' 인지 본인 폴더 구조에 맞춰 정확히 적어주세요.
import { Communitycontentpage } from "./screens/CommunityContent/sections/Communitycontentpage";
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

import { CommunityPage } from "./screens/CommunityPage";
import { Desktop } from "./screens/Desktop";
import { MyPage } from "./screens/MyPage";
import { RecipePage } from "./screens/RecipePage";
import { AddIngredientPage } from "./screens/AddIngredientPage";
import { CreatePostPage } from "./screens/CreatePostPage";
import { MenuRecommendationPage } from "./screens/MenuRecommendationPage";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Desktop />,
  },
  {
    path: "/desktop",
    element: <Desktop />,
  },
  {
    path: "/communitypage",
    element: <CommunityPage />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/recipepage/:id",
    element: <RecipePage />,
  },
  {
    // ▼▼▼ [수정 2] 여기서 CommunityContent 대신 Communitycontentpage를 바로 연결!
    path: "/communitycontentpage/:id",
    element: <Communitycontentpage />,
    // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  },
  {
    path: "/addingredient",
    element: <AddIngredientPage />,
  },
  {
    path: "/createpost",
    element: <CreatePostPage />,
  },
  {
    path: "/menurecommendation",
    element: <MenuRecommendationPage />,
  },
]);

export const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router}>
        <ScrollToTop />
      </RouterProvider>
    </AuthProvider>
  );
};
