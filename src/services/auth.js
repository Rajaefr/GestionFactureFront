import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; // Authentication-related endpoints

// Login user
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    localStorage.setItem('authToken', response.data.token); // Save token to localStorage
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

// Register user
export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, email, password });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    throw error;
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, { email });
    return response.data;
  } catch (error) {
    console.error('Password reset failed:', error.response?.data || error.message);
    throw error;
  }
};

// Confirm password reset
export const confirmResetPassword = async (email, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password/confirm`, { email, newPassword });
    return response.data;
  } catch (error) {
    console.error('Password reset confirmation failed:', error.response?.data || error.message);
    throw error;
  }
};
