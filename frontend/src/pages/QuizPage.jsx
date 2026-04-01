import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizByID } from "../api/quiz";
import { completeAttempt } from "../api/attempt";
import { AuthContext } from "../context/AuthContext";

export default function QuizPage() {
  const { token } = useContext(AuthContext);
  const { quizId } = useParams();
  const navigate = useNavigate();
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
    <div className="flex flex-col items-center justify-center min-h-screen gap-md bg-gray-50">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-primaryDark-500 rounded-full animate-spin" />
      <p className="text-textSecondary text-sm">Loading quiz...</p>
    </div>
  );

  const question = quiz.questions[currentQuestion];
  const optionLabels = { optionA: 'A', optionB: 'B', optionC: 'C', optionD: 'D' };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-200 px-lg py-md shadow-sm">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent tracking-tight">
            QuizWhiz
          </h1>
          <span className="text-sm font-medium text-textSecondary">
            {currentQuestion + 1} / {quiz.questions.length}
          </span>
        </div>
      </div>

      <main className="flex-1 flex items-start justify-center px-lg py-xl">
        <div className="w-full max-w-2xl">
          <div className="mb-lg">
            <h2 className="text-xl font-bold text-textPrimary">{quiz.title}</h2>
            <p className="text-sm text-textSecondary mt-xs">{quiz.description}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-lg mb-lg">
            <p className="text-sm font-semibold text-primaryDark-500 uppercase tracking-wide mb-sm">
              Question {currentQuestion + 1}
            </p>
            <h3 className="text-md font-semibold text-textPrimary mb-lg leading-relaxed">
              {question.questionText}
            </h3>

            <div className="space-y-sm">
              {["optionA", "optionB", "optionC", "optionD"].map((opt) => {
                const isSelected = answers[question.id] === question[opt];
                return (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(question.id, question[opt])}
                    className={`w-full text-left px-md py-sm rounded-lg border text-sm font-medium transition-all duration-200 flex items-center gap-md
                      ${isSelected
                        ? 'border-primaryDark-500 bg-gradient-to-r from-primary to-accent text-textPrimary shadow-sm'
                        : 'border-gray-200 bg-white text-textSecondary hover:border-primaryLight hover:bg-gray-50'
                      }`}
                  >
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors
                      ${isSelected
                        ? 'bg-gradient-to-r from-primary to-accent text-white'
                        : 'bg-gray-100 text-gray-500'
                      }`}>
                      {optionLabels[opt]}
                    </span>
                    {question[opt]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="px-lg py-sm rounded-lg text-sm font-semibold border border-gray-200 text-textSecondary bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              ← Previous
            </button>

            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-lg py-sm rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-lg py-sm rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-400 hover:opacity-90 transition-opacity"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}