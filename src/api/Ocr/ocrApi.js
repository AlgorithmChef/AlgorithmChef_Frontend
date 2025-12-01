import axios from "axios";
const BACKEND_DOMAIN = "http://localhost:8080/ocr/request";

export const uploadReceipt = async (file) => {
  const token = localStorage.getItem("accessToken");

  const formData = new FormData();
  formData.append("imageFile", file);

  try {
    const response = await axios.post(`${BACKEND_DOMAIN}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("OCR 분석 성공, 항목 수:", response.data.items.length);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "OCR 요청 실패:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("서버 연결 실패:", error.message);
    }
    throw error;
  }
};
