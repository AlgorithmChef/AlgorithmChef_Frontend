import axios from "axios";
const BACKEND_DOMAIN = "http://localhost:8080/recipe/review";

export const makeReview = async (review) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(`${BACKEND_DOMAIN}`, review, {
      headers: {
        Authorization: `Bearer ${token}`,
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
