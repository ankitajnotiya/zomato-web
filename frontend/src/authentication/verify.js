import React from 'react';
// import Header from '../header/header';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function Verify() {
  const navigate = useNavigate();

  const handleVerifyClick = () => {
    navigate('/createpasswrod');
  };

  return (
    <div>
      {/* <Header /> */}

      <div style={{ padding: '20px' }}>
        <Link to="/login" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#333' }}>
          <FaArrowLeft style={{ marginRight: '8px' }} />
        </Link>
      </div>

      <div className="auth-container" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h2>Verify Code</h2>

        <p style={{ fontSize: '16px', marginBottom: '20px', marginTop: '0px' }}>
          Enter the code that has been sent to your email
        </p>

        <input
          type="text"
          placeholder="Enter verification code"
          style={{
            padding: '12px',
            fontSize: '16px',
            marginBottom: '20px',
            width: '94%',
            maxWidth: '450px',
            border: '1px solid #ccc',
            borderRadius: '15px',
          }}
        />

        <button
          onClick={handleVerifyClick}
          style={{
            padding: '12px 24px',
            fontSize: '20px',
            backgroundColor: '#ff6b35',
            color: '#fff',
            border: 'none',
            borderRadius: '15px',
            height: '60px',
            cursor: 'pointer',
          }}
        >
          Verify
        </button>
      </div>
    </div>
  );
}
