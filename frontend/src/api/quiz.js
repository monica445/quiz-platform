import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/quizzes';

export const getAllQuizzes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

export const getQuizByID = async (quizId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${quizId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};
