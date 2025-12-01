import axios from "axios";
const BACKEND_DOMAIN = "http://localhost:8080/board";

export const getPostList = async (page, size, filter) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        size,
        filter: filter || null,
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

export const getPosts = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/posts`, {
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

export const createPost = async (post) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(`${BACKEND_DOMAIN}/post`, post, {
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

export const getPostDetail = async (postId, page, size) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(`${BACKEND_DOMAIN}/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        size,
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

export const createComment = async (postId, comment) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      `${BACKEND_DOMAIN}/post/${postId}/comment`,
      comment,
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

export const getReplies = async (commentId, page) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `${BACKEND_DOMAIN}/comments/${commentId}/replies`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
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

export const updatePost = async (postId, updatedPost) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.put(
      `${BACKEND_DOMAIN}/post/${postId}`,
      updatedPost,
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

export const deletePost = async (postId) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.delete(`${BACKEND_DOMAIN}/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    }
    throw error;
  }
};
