import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ScrollToTop } from "./components/ScrollToTop"; // Import ScrollToTop
import { CommunityContent } from "./screens/CommunityContent";
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
    path: "/communitycontentpage/:id",
    element: <CommunityContent />,
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
  }
]);

export const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router}>
        <ScrollToTop /> {/* Render ScrollToTop inside RouterProvider */}
      </RouterProvider>
    </AuthProvider>
  );
};
