import axios from "axios";
const BACKEND_DOMAIN = "http://localhost:8080/fridge";
export const registerIngredientManual = async (ingredients) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      `${BACKEND_DOMAIN}/ingredient/register/manual`,
      { ingredients },
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

export const updateIngredientInfo = async (ingredient) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch(
      `${BACKEND_DOMAIN}/ingredient/update`,
      ingredient,
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

export const deleteIngredientInfo = async (id) => {
  const token = localStorage.getItem("accessToken");
  try {
    await axios.delete(`${BACKEND_DOMAIN}/ingredient/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    }
    throw error;
  }
};

export const updateIngredients = async (ingredients) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch(
      `${BACKEND_DOMAIN}/ingredients/register/update`,
      ingredients,
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

export const getFridgeIngredients = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/ingredients`, {
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

export const filterFridgeIngredientsByCategory = async (category) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/ingredients`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
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
