import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from './aleart'; // Import the new Alert component

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [alert, setAlert] = useState(null); // State for the alert

  const navigate = useNavigate();
  const { name, email, password } = formData;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      console.log('Registration successful:', res.data);
      localStorage.setItem('token', res.data.token);

      setAlert({ message: 'Registration successful! Redirecting...', type: 'success' });

      setFormData({
        name: "",
        email: "",
        password: ""
      });

      setTimeout(() => {
        navigate('/login')
      }, 2000);

    } catch (err) {
      console.error('Registration failed:', err.response.data);
      setAlert({ message: err.response.data.msg || 'Registration failed. Please try again.', type: 'error' });
    }
  };

  const closeAlert = () => setAlert(null); // Function to dismiss the alert

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center font-sans text-white">
      {alert && <Alert message={alert.message} type={alert.type} onClose={closeAlert} />}
      <div className=" rounded-xl shadow-lg p-10 max-w-sm w-full text-center">
              <img src="/logo.png" alt="Resume Platform Logo" className="h-20 w-20 rounded-full m-auto" />

        <h2 className="text-3xl font-semibold mb-8">Sign Up</h2>
        <form autoComplete='on' onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full p-4 mb-5 rounded-lg border border-gray-700 bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
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
            Register
          </button>
        </form>
        <p className="mt-5 text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;