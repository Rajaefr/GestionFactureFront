import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// Login user
const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);  // Store token in localStorage
    return response.data;
  } catch (error) {
    throw error.response?.data || "Login failed. Please try again.";
  }
};


// Register user
const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data; // Return success message
  } catch (error) {
    throw error.response?.data || "Registration failed. Please try again.";
  }
};

// Reset password
const resetPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, { email });
    return response.data; // Return success message
  } catch (error) {
    throw error.response?.data || "Password reset failed. Please try again.";
  }
};


const getCurrentUser = async (token) => {
  try {
    console.log("Sending request to get current user...");
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send JWT token in Authorization header
      }
    });
    console.log("Current user data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get current user error:", error);
    throw error.response?.data || "Failed to fetch user data.";
  }
};

// Confirm password reset
const confirmResetPassword = async (email, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password/confirm`, { email, newPassword });
    return response.data; // Return success message
  } catch (error) {
    throw error.response?.data || "Password reset confirmation failed. Please try again.";
  }
};

const UserServices = {
  login,
  register,
  resetPassword,
  confirmResetPassword,
  getCurrentUser,
};

export default UserServices;
