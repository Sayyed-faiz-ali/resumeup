import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { email, password } = formData;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login data to the backend API endpoint
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);

      console.log('Login successful:', res.data);
      // Store the JWT token in local storage
      localStorage.setItem('token', res.data.token);

      // Redirect to the dashboard after a successful login
      navigate('/dashboard');

    } catch (err) {
      console.error('Login failed:', err.response.data);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center font-sans text-white">
      <div className=" rounded-xl shadow-lg p-10 max-w-sm w-full text-center">
                      <img src="/logo.png" alt="Resume Platform Logo" className="h-20 w-20 rounded-full m-auto" />

        <h2 className="text-3xl  font-semibold mb-8">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-4 mb-5 rounded-lg border border-gray-700 bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            placeholder="Password"
            className="w-full p-4 mb-5 rounded-lg border border-gray-700 bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
          <button
            type="submit"
            className="w-full p-4 rounded-lg font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-opacity"
          >
            Login
          </button>
          <p className="mt-5 text-sm text-gray-400">
                   Don't have account?{' '}
                   <Link to="/" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
                     Register
                   </Link>
                 </p>
        </form>
      </div>
    </div>
  );
}

export default Login;