import axios from "axios";
import { toast } from "react-toastify";


const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000, // Add timeout
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Add response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // This handles true network failures (server down/no internet)
      toast.error("Network error: Please check your connection.");
    }
    return Promise.reject(error);
  }
);

export default API;