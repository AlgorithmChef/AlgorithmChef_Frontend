import axios from "axios";
const BACKEND_DOMAIN = "http://localhost:8080/api";

/**
 * * @param {Blob} audioBlob - Voice.js에서 녹음된 오디오 Blob 객체
 * @returns {Promise<Array>} - 추천된 레시피 리스트 (List<GeminiRecipeResponse>)
 */
export const recommendByVoice = async (audioBlob) => {
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.error("User ID not found. Please login.");
    throw new Error("로그인이 필요한 서비스입니다.");
  }

  const formData = new FormData();

  formData.append("audio", audioBlob, "voice.webm");

  formData.append("userId", userId);

  try {
    const response = await axios.post(`${BACKEND_DOMAIN}/stt`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("음성 검색 성공, 레시피 개수:", response.data.length);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "음성 검색 요청 실패:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("서버 연결 실패:", error.message);
    }
    throw error;
  }
};
