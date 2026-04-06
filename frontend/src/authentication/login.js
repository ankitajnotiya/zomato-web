// src/Login.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import './auth.css'; // Use the auth styles

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
          method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Store user data and token
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        
        // Show success message
        alert('Login successful! Redirecting to home...');
        
        // Redirect to Home after successful login
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Back to Home Icon */}
      <div>
        <Link to="/" className="back-link">
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Home
        </Link>
      </div>

      {/* Login Form */}
      <div className="auth-container login-container">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to your Zomato account and continue ordering</p>
        </div>
        
        {error && (
          <div style={{ 
            color: 'red', 
            marginBottom: '15px', 
            padding: '10px', 
            border: '1px solid red', 
            borderRadius: '5px',
            backgroundColor: '#ffebee'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>
          
          <div className="input-group">
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input 
                type="password" 
                name="password"
                placeholder="Password" 
                value={formData.password}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="forgot-password">
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>

          <button 
            type="submit" 
            className="auth-btn login-btn"
            disabled={loading}
          >
            <FaSignInAlt style={{ marginRight: '8px' }} />
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          <div className="auth-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
