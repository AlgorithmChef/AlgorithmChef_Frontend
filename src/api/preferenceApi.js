import axios from "axios";
const BACKEND_DOMAIN = "http://localhost:8080";

export const getAllergyInfo = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/allergies`, {
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

export const getHealthGoalInfo = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/healthGoals`, {
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
