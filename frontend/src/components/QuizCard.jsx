import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizCard({ quiz }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 p-md rounded-lg shadow-sm hover:shadow-md transition hover:scale-[1.02]">
      <h3 className="text-lg text-deepBlue font-semibold mb-sm">
        {quiz.title}
      </h3>

      <p className="text-sm text-textSecondary mb-md">
        {quiz.description}
      </p>

      <button
        onClick={() => navigate(`/quiz/${quiz.id}`)}
        className="bg-deepBlue text-white px-md py-sm rounded-md w-full hover:opacity-90"
      >
        Start Quiz
      </button>
    </div>
  );
}