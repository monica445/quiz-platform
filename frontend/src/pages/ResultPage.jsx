import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getAttemptById } from "../api/attempt";

export default function ResultPage() {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [attempt, setAttempt] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      if (!token) return;
      try {
        const data = await getAttemptById(attemptId, token);
        setAttempt(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResult();
  }, [attemptId, token]);

  if (!attempt) return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-md bg-gray-50">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin" />
      <p className="text-textSecondary text-sm">Loading results...</p>
    </div>
  );

  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-lg py-md shadow-sm">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent tracking-tight">
            QuizWhiz
          </h1>
        </div>
      </div>

      <main className="max-w-2xl mx-auto px-lg py-xl">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-lg mb-lg text-center">
          <p className="text-sm font-semibold text-purple-500 uppercase tracking-wide mb-sm">Your Result</p>
          <div className={`text-5xl font-bold mb-sm`}>
            {percentage}%
          </div>
          <p className="text-textSecondary text-sm mb-md">
            {attempt.score} correct out of {attempt.totalQuestions} questions
          </p>
        </div>

        <h2 className="text-md font-bold text-textPrimary mb-md">Answer Breakdown</h2>
        <div className="space-y-sm mb-xl">
          {attempt.answers.map((a, idx) => (
            <div
              key={idx}
              className={`bg-white border rounded-lg p-md shadow-sm ${
                a.isCorrect ? 'border-green-200' : 'border-red-200'
              }`}
            >
              <div className="flex items-start gap-sm">
                <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  a.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
                }`}>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-textPrimary mb-xs">{a.question.questionText}</p>
                  <p className={`text-sm ${a.isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                    Your answer: {a.selectedOption}
                  </p>
                  {!a.isCorrect && (
                    <p className="text-sm text-textPrimary font-medium mt-xs">
                      Correct: {a.question.correctOption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="w-full py-md rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          ← Back to Dashboard
        </button>
      </main>
    </div>
  );
}