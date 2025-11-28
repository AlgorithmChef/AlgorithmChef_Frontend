import axios from "axios";
const BACKEND_DOMAIN = "http://localhost:8080/user";

export const makeSurveyApi = async (survey) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(`${BACKEND_DOMAIN}/survey`, survey, {
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

export const getUserInfo = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/mypage`, {
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

export const updateUserTendency = async (newInfo) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch(`${BACKEND_DOMAIN}/survey`, newInfo, {
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
