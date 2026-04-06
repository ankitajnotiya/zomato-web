import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import './auth.css';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        // Show success message
        alert('Password reset link has been sent to your email! Please check your email.');
        
        // Redirect to login after successful submission
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Failed to send reset link');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Forgot password error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page-container">
      {/* Back Icon */}
      <div className="top-nav">
        <Link to="/login" className="back-link">
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Login
        </Link>
      </div>

      {/* Forgot Password Form */}
      <div className="auth-container signup-container">
        <div className="auth-header">
          <h2>Forgot Password</h2>
          <p>Enter your email address and we'll send you a link to reset your password</p>
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
        
        {success && (
          <div style={{ 
            color: 'green', 
            marginBottom: '15px', 
            padding: '10px', 
            border: '1px solid green', 
            borderRadius: '5px',
            backgroundColor: '#f0fff0'
          }}>
            Reset link sent successfully! Redirecting to login page...
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                disabled={loading}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="auth-btn signup-btn"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
          
          <div className="auth-link">
            Remember your password? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
