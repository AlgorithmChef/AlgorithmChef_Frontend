import axios from "axios";
const BACKEND_DOMAIN = "http://localhost:8080/auth";

export const loginAPi = async (userId, password) => {
  const response = await axios.post(`${BACKEND_DOMAIN}/login`, {
    userId,
    password,
  });
  return response.data;
};

export const signUpApi = async (newUser) => {
  const response = await axios.post(`${BACKEND_DOMAIN}/signUp`, newUser);
  return response.data;
};

export const findPasswordApi = async (userId, email) => {
  const response = await axios.patch(`${BACKEND_DOMAIN}/findPassword`, {
    userId,
    email,
  });
  return response.data;
};

export const findUserIdApi = async (email, birthDate) => {
  const response = await axios.post(`${BACKEND_DOMAIN}/findUserId`, {
    email,
    birthDate,
  });
  return response.data;
};

export const updateTempPasswordApi = async (password) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.patch(
    `${BACKEND_DOMAIN}/update-tempPassword`,
    { password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
