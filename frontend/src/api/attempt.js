import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/attempts";

export const completeAttempt = async (quizId, answers, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}`,
      { quizId, answers },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

export const getUserAttempts = async (userId, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

export const getAttemptById = async (attemptId, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${attemptId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};