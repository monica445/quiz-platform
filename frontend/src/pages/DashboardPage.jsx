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
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-lg py-md sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent tracking-tight">
            QuizWhiz
          </h1>
          <div className="flex items-center gap-md">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-textSecondary font-medium hidden sm:block">
                  Hi, <span className="text-textPrimary font-semibold">{user?.username}</span>
                </span>
                <button
                  onClick={logout}
                  className="px-md py-sm rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-sm font-semibold text-textPrimary px-md py-sm rounded-lg hover:bg-softBlue transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-md py-sm rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-lg py-xl">
        <div className="text-center mb-xl">
          <h2 className="text-2xl md:text-4xl font-bold text-textPrimary mb-sm">
            What will you{' '}
            <span className="italic bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              master
            </span>{' '}
            today?
          </h2>
          <p className="text-textSecondary text-md">Pick a quiz and put your knowledge to the test.</p>
        </div>

        <div className="relative mb-xl">
          <svg className="absolute left-md top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search quizzes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-md py-md rounded-lg border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryLight focus:border-transparent text-md text-textSecondary placeholder-gray-400 transition"
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-xl gap-md">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-primaryDark rounded-full animate-spin" />
            <p className="text-textSecondary text-sm">Loading quizzes...</p>
          </div>
        ) : filteredQuizzes.length === 0 ? (
          <div className="text-center py-xl">
            <p className="text-textSecondary text-md">No quizzes found for "{search}".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-lg">
            {filteredQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}