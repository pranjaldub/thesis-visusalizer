import axios from "axios";

// ⚠️ UPDATE THIS WITH YOUR NGROK URL FROM KAGGLE!
const API_BASE_URL = "https://21fc591e0763.ngrok-free.app/";
// Example: const API_BASE_URL = 'https://abc123.ngrok.io';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${API_BASE_URL}upload_document`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const processRAGPipeline = async (text, query, config) => {
  const response = await api.post("/process", {
    text,
    query,
    config,
  });

  return response.data;
};

export const checkHealth = async () => {
  const response = await api.get("/");
  return response.data;
};

export default api;
