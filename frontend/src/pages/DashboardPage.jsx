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

  return (
    <div className="bg-white min-h-screen p-lg">

      <div className="flex justify-between items-center mb-lg border-b pb-md">
        <h1 className="text-xl text-deepBlue font-bold">
          Quiz Dashboard
        </h1>

        <div className="flex items-center gap-sm">
          {isAuthenticated ? (
            <>
              <span className="text-md text-textSecondary">
                Hi, {user?.username}
              </span>
              <button
                onClick={logout}
                className="bg-deepBlue text-white px-md py-sm rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-deepBlue px-md py-sm"
              >
                Login
              </button>

              <button
                onClick={() => navigate('/signup')}
                className="bg-orchidPink text-white px-md py-sm rounded-md"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      <input
        type="text"
        placeholder="Search quizzes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-md mb-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-softBlue"
      />

      {loading ? (
        <p className="text-textSecondary">Loading quizzes...</p>
      ) : filteredQuizzes.length === 0 ? (
        <p className="text-textSecondary">No quizzes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {filteredQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      )}
    </div>
  );
}