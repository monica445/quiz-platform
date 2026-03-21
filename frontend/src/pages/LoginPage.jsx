import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const { login, loading } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form); 
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-softBlue font-sans">
      <form className="bg-white p-xl rounded-lg shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-deepBlue mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <label className="block mb-1 font-medium text-textPrimary">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-md py-sm mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deepBlue"
          required
        />

        <label className="block mb-1 font-medium text-textPrimary">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-md py-sm mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deepBlue"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-sm rounded-md text-white font-bold ${
            loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-deepBlue hover:bg-blue-800'
          }`}
        >
          {loading ? 'Logging In...' : 'Login'}
        </button>

        <p className="mt-4 text-center text-textSecondary">
            Don't have an account?{' '}
            <Link to="/signup" className="text-orchidPink font-bold hover:underline">
                Sign Up
            </Link>
        </p>     
        
      </form>
    </div>
  );
}