import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // Base URL for your backend API
});

// Add an interceptor to include the Authorization header with the token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
