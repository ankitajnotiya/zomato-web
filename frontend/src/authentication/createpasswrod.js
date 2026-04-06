import React, { useState } from 'react';
// import Header from '../header/header';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './auth.css';

export default function CreatePassword() {
  const [showPopup, setShowPopup] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = () => {
    setShowPopup(true);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      {/* <Header /> */}

      <div style={{ padding: '20px' }}>
        <Link to="/login" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#333' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
        </Link>
      </div>

      <div className="create-password-container">
        <h2>Create New Password</h2>
        <p>Enter your new password and confirm to reset your password</p>

        <div className="password-wrapper">
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder="New Password"
            className="password-input"
          />
          <span
            className="toggle-icon"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="password-wrapper">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            className="password-input"
          />
          <span
            className="toggle-icon"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h1>Password Updated Successfully</h1>
            <img
              src="assets/success-icon.jpg"
              alt="Success"
              className="success-image"
            />
            <button className="back-btn" onClick={handleBackToLogin}>Back to Login</button>
          </div>
        </div>
      )}
    </div>
  );
}
