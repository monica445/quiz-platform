import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizCard({ quiz }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
      <h3 className="text-xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        {quiz.title}
      </h3>

      <p className="text-gray-600 mb-5 line-clamp-3">
        {quiz.description}
      </p>

      <button
        onClick={() => navigate(`/quizzes/${quiz.id}`)}
        className="w-full py-2 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
      >
        Start Quiz
      </button>
    </div>
  );
}