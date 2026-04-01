import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizCard({ quiz }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="h-1 rounded-t-lg bg-gradient-to-r from-primary to-accent" />

      <div className="p-lg flex flex-col flex-1">
        <h3 className="text-lg font-bold text-textPrimary mb-sm line-clamp-2">
          {quiz.title}
        </h3>
        <p className="text-sm text-textSecondary mb-lg flex-1 line-clamp-3">
          {quiz.description}
        </p>
        <button
          onClick={() => navigate(`/quizzes/${quiz.id}`)}
          className="w-full py-sm rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          Start Quiz →
        </button>
      </div>
    </div>
  );
}