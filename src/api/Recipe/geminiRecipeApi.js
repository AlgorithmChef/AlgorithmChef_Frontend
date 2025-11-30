import axios from "axios";
const BACKEND_DOMAIN = "http://localhost:8080/recipes/recommend";

export const recommendPrefer = async (prefer) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(`${BACKEND_DOMAIN}/prefer`, prefer, {
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

export const recommendCondition = async (condition) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      `${BACKEND_DOMAIN}/condition`,
      condition,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    }
    throw error;
  }
};

export const recommendExpir = async (expire) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(`${BACKEND_DOMAIN}/expir`, expire, {
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
