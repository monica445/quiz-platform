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

    if (!attempt) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[200px] gap-3">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-gray-600">Loading results...</p>
            </div>
        );
    }

  return (
    <div className="p-lg">
      <h2 className="text-xl font-bold mb-md">Quiz Results</h2>
      <p className="mb-md">
        Score: {attempt.score} / {attempt.totalQuestions}
      </p>

      <div className="space-y-md">
        {attempt.answers.map((a, idx) => (
          <div key={idx} className="p-sm border rounded">
            <p className="font-semibold">{a.question.questionText}</p>
            <p className={a.isCorrect ? "text-green-600" : "text-red-600"}>
              Your answer: {a.selectedOption}
            </p>
            {!a.isCorrect && (
              <p className="text-blue-600">
                Correct: {a.question.correctOption}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        className="mt-lg px-md py-sm bg-blue-500 text-white rounded"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>
    </div>
  );
}