import axios from "axios";
const BACKEND_DOMAIN = "http://localhost:8080/ingredients";

export const getIngredientsInfo = async (page, size) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(BACKEND_DOMAIN, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
        size: size,
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

export const filterIngredientsByCategory = async (page, size, category) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(BACKEND_DOMAIN, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
        size: size,
        category: category,
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

export const filterIngredientsByName = async (page, size, ingredientName) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(BACKEND_DOMAIN, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page,
        size: size,
        name: ingredientName,
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
