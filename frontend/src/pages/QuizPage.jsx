import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getQuizByID } from "../api/quiz";
import { completeAttempt } from "../api/attempt";
import { AuthContext } from "../context/AuthContext";

export default function QuizPage() {
  const { token } = useContext(AuthContext);
  const { quizId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const attemptId = location.state?.attemptId;

  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      const data = await getQuizByID(quizId);
      setQuiz(data);
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswer = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => setCurrentQuestion((q) => Math.min(q + 1, quiz.questions.length - 1));
  const handlePrev = () => setCurrentQuestion((q) => Math.max(q - 1, 0));

  const handleSubmit = async () => {
    if (!token) return alert('Login required');

    const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => ({
        questionId: parseInt(questionId),
        selectedOption,
    }));

    try {
        const result = await completeAttempt(quiz.id, formattedAnswers, token);
        navigate(`/results/${result.id}`);
    } catch (err) {
        console.error(err);
        alert('Failed to submit quiz');
    }
    };

  if (!quiz) return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-3">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-gray-600">Loading quiz...</p>
    </div>
    );

  const question = quiz.questions[currentQuestion];

  return (
    <div className="p-lg">
      <h2 className="text-xl font-bold">{quiz.title}</h2>
      <p className="mb-md">{quiz.description}</p>

      <div className="mb-md">
        <h3 className="font-semibold">{question.questionText}</h3>
        {["optionA", "optionB", "optionC", "optionD"].map((opt) => (
          <button
            key={opt}
            className={`block my-sm p-sm border rounded w-full text-left ${
              answers[question.id] === question[opt]
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-white"
            }`}
            onClick={() => handleAnswer(question.id, question[opt])}
          >
            {question[opt]}
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-md">
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className="px-md py-sm border rounded"
        >
          Previous
        </button>

        {currentQuestion < quiz.questions.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-md py-sm bg-blue-500 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-md py-sm bg-green-500 text-white rounded"
          >
            Submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}