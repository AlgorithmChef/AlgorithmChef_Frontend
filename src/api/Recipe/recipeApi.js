import axios from "axios";
const BACKEND_DOMAIN = "http://localhost:8080/api/recipes";

export const getRandomRecipe = async (ingredientName) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ingredient: ingredientName,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    }
    throw error;
  }
};

export const getRandomRecipeMultiple = async (ingredients) => {
  const token = localStorage.getItem("accessToken");
  console.log("헤더 값 확인:", `Bearer ${token}`);
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/search-multi`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ingredients: ingredients.join(","),
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("에러 상태 코드:", error.response.status);
      console.log("에러 데이터:", error.response.data);
    }
    throw error;
  }
};
