import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

export default function SignupPage() {
    const { signup, loading } = useContext(AuthContext);
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signup(form); 
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-softBlue font-sans">
            <form className="bg-white p-xl rounded-lg shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold text-deepBlue mb-6 text-center">Sign Up</h2>

                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

                <label className="block mb-1 font-medium text-textPrimary">Username</label>
                <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full px-md py-sm mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-deepBlue"
                    required
                />

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
                        loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-orchidPink hover:bg-pink-600'
                    }`}
                    >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
                 <p className="mt-4 text-center text-textSecondary">
                    Already have an account?{' '}
                    <Link to="/login" className="text-deepBlue font-bold hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}  