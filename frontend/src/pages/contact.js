import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/myorder.css';
import Footer from '../footer/footer';
import '../footer/footer.css';
import Header from '../header/header';
import '../header/header.css';
import Chat from '../components/Chat';

export default function ContactForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Force scroll to top immediately and override any CSS
    const forceScrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Override any CSS scroll behavior
      document.documentElement.style.scrollBehavior = 'auto';
      document.body.style.scrollBehavior = 'auto';
      
      // Also set scroll position directly
      if (window.pageYOffset !== 0) {
        window.scrollTo(0, 0);
      }
    };
    
    forceScrollToTop();
    
    // Call again after a short delay to ensure it takes effect
    setTimeout(forceScrollToTop, 0);
    setTimeout(forceScrollToTop, 50);
    setTimeout(forceScrollToTop, 100);
    setTimeout(forceScrollToTop, 200);
    
    // Finally set smooth scrolling for future navigation
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.scrollBehavior = 'smooth';
    }, 300);
    
    return () => {
      // Clean up
      document.documentElement.style.scrollBehavior = '';
      document.body.style.scrollBehavior = '';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setError(data.message || 'Failed to submit form');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page" style={{ backgroundColor: '#f8f8f8', scrollBehavior: 'auto' }}>
      <Header />
      {/* 1. Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1>Get in Touch</h1>
            <p>We'd love to hear from you. Our team is here to help and answer any questions you might have.</p>
          </div>
        </div>
      </section>

      {/* 2. Cards Section with Arrow Fix */}
      <section className="contact-info-section" style={{ position: 'relative' }}>
        <div className="container" style={{ position: 'relative' }}>
          
          {/* Back Arrow */}
          <button 
            onClick={() => navigate(-1)} 
            className="back-arrow-btn"
            style={{
              position: 'absolute',
              left: '-70px',    
              top: '65px',      
              background: 'white',
              color: '#e23744',
              border: 'none',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
              fontSize: '20px',
              zIndex: '999',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <FaArrowLeft />
          </button>

          {/* Info Cards Grid */}
          <div className="contact-info-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '20px',
            marginTop: '-40px'
          }}>
            <div className="contact-info-card">
              <div className="contact-icon"><FaPhone /></div>
              <h3>Call Us</h3>
              <p>+91 98765 43210</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon"><FaEnvelope /></div>
              <h3>Email Us</h3>
              <p>support@zomato.com</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon"><FaMapMarkerAlt /></div>
              <h3>Visit Us</h3>
              <p>Indore, India</p>
            </div>
            <div className="contact-info-card">
              <div className="contact-icon"><FaClock /></div>
              <h3>Hours</h3>
              <p>9AM - 6PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Form Section */}
      <section className="contact-form-section" style={{ padding: '40px 0' }}>
        <div className="container">
          <div className="contact-form-wrapper" style={{ 
            maxWidth: '850px', 
            margin: '0 auto', 
            background: 'white', 
            padding: '40px', 
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Send us a Message</h2>
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
            
            {submitted && (
              <div style={{ 
                color: 'green', 
                marginBottom: '15px', 
                padding: '10px', 
                border: '1px solid green', 
                borderRadius: '5px',
                backgroundColor: '#f0fff0'
              }}>
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="form-grid-mobile">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Name" 
                  style={inputStyle} 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Email" 
                  style={inputStyle} 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }} className="form-grid-mobile">
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Phone" 
                  style={inputStyle} 
                  value={formData.phone}
                  onChange={handleChange}
                />
                <input 
                  type="text" 
                  name="subject" 
                  placeholder="Subject" 
                  style={inputStyle} 
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                />
              </div>
              <textarea 
                name="message"
                placeholder="Your Message" 
                rows="5" 
                style={{ ...inputStyle, width: '100%', marginBottom: '20px' }}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button 
                type="submit" 
                className="contact-submit-btn" 
                style={{ 
                  width: '100%', 
                  padding: '15px', 
                  background: '#e23744', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  cursor: 'pointer',
                  opacity: loading ? 0.7 : 1
                }}
                disabled={loading}
              >
                <FaPaperPlane style={{ marginRight: '10px' }} /> 
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Mobile Styles */}
      <style>{`
        html, body {
          scroll-behavior: auto !important;
        }
        
        @media (max-width: 1200px) {
          .back-arrow-btn { left: 15px !important; top: 20px !important; background: rgba(255,255,255,0.9) !important; }
        }
        @media (max-width: 992px) {
          .contact-info-grid { grid-template-columns: repeat(2, 1fr) !important; margin-top: 20px !important; }
          .back-arrow-btn { top: 20px !important; }
        }
        @media (max-width: 600px) {
          .contact-info-grid { grid-template-columns: 1fr !important; margin-top: 0px !important; }
          .form-grid-mobile { grid-template-columns: 1fr !important; }
          .back-arrow-btn { 
            top: 20px !important; 
            left: 15px !important;
            width: 40px !important;
            height: 40px !important;
            font-size: 18px !important;
            margin-top: 20px !important;
            margin-left : -20px !important;
                      }
        }
      `}</style>
      
      <Footer />
      <Chat />
      {/* <ScrollToTopArrow /> */}
    </div>
  );
}

const inputStyle = {
  padding: '14px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontSize: '16px',
  outline: 'none'
};