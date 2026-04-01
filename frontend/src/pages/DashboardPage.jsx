import React, { useEffect, useState, useContext } from 'react';
import { getAllQuizzes } from '../api/quiz';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../components/QuizCard.jsx';

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getAllQuizzes();
        setQuizzes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleClick = () => {
    navigate(`/quiz/${quiz.id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b pb-4">
        <h1 className="text-3xl font-bold mb-4 md:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
          QuizWhiz
        </h1>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-gray-700 font-medium">Hi, {user?.username}</span>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-deepBlue font-medium px-4 py-2 hover:underline"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-pink-500 hover:to-purple-500 transition-all duration-300"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      <div className="text-center bg-white rounded-xl p-8 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          What will you{' '}
          <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            master
          </span>{' '}
          today?
        </h2>
        <p className="text-gray-600">Pick a quiz and put your knowledge to the test.</p>
      </div>

      <input
        type="text"
        placeholder="Search quizzes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 mb-8 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
      />

      {loading ? (
        <p className="text-gray-500 text-center">Loading quizzes...</p>
      ) : filteredQuizzes.length === 0 ? (
        <p className="text-gray-500 text-center">No quizzes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}
    </div>
  );
}