import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaEnvelope, FaLock, FaCheck } from 'react-icons/fa';
import './auth.css'; 

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Limit phone number to 10 digits
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Registration successful! Please login to continue.');
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page-container">
      <div className="top-nav">
        <Link to="/" className="back-link">
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Home
        </Link>
      </div>

      <div className="auth-container signup-container">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join Zomato and start ordering your favorite food</p>
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
        
        <form onSubmit={handleSignUp} className="auth-form">
          <div className="input-group">
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input 
                type="text" 
                name="name"
                placeholder="Full Name" 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>
          
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

          <div className="input-group">
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input 
                type="tel" 
                name="phone"
                placeholder="Phone Number" 
                value={formData.phone}
                onChange={handleInputChange}
                maxLength="10"
                pattern="[0-9]{10}"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <input 
                type="text" 
                name="address"
                placeholder="Address" 
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to <Link to="/terms">Terms & Conditions</Link>
            </label>
          </div>

          <button 
            type="submit" 
            className="auth-btn signup-btn"
            disabled={loading}
          >
            <FaCheck style={{ marginRight: '8px' }} />
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <div className="auth-link">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}