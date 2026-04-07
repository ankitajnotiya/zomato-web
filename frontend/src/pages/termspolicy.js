import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/termspolicy.css';
import Footer from '../footer/footer';
import '../footer/footer.css';
import Header from '../header/header';
import '../header/header.css';
import Chat from '../components/Chat';

export default function Terms() {
  const navigate = useNavigate();

  useEffect(() => {
    // Force scroll to top immediately
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    
    // Multiple attempts to ensure scroll works
    const scrollAttempts = [0, 50, 100, 200];
    scrollAttempts.forEach(delay => {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: delay === 0 ? 'auto' : 'smooth'
        });
      }, delay);
    });
    
    return () => {
      scrollAttempts.forEach(delay => {
        clearTimeout(delay);
      });
    };
  }, []);
  
  // Force scroll reset on component mount
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);
  return (
    <div className="terms-policy-page">
      <Header />
      <main className="terms-main">
        <div className="container">
          <div className="terms-hero">
            <h1>Terms of Use</h1>
            <p>Last updated: October 1, 2025</p>
          </div>

          {/* Back Arrow Button */}
          <div className="terms-back-navigation">
            <button className="terms-back-arrow-btn" onClick={() => navigate(-1)}>
              ←
            </button>
          </div>

          <div className="terms-content">
            <div className="terms-numbered">
              <section className="terms-section">
                <h2>Acceptance of Terms</h2>
                <p>
                  By accessing or using Zomato, you agree to be bound by these terms and conditions. 
                  If you do not agree, please do not use the platform.
                </p>
              </section>

              <section className="terms-section">
                <h2>User Responsibilities</h2>
                <p>
                  You agree to use the service only for lawful purposes and in accordance with 
                  all applicable laws and regulations.
                </p>
              </section>

              <section className="terms-section">
                <h2>Privacy Policy</h2>
                <p>
                  Your privacy is important to us. Please read our Privacy Policy to understand 
                  how we collect, use, and disclose your information.
                </p>
              </section>

              <section className="terms-section">
                <h2>Intellectual Property</h2>
                <p>
                  All content on this website including logos, text, and images is the property 
                  of Zomato and protected by copyright laws.
                </p>
              </section>

              <section className="terms-section">
                <h2>Modification of Terms</h2>
                <p>
                  Zomato reserves the right to update these terms at any time. Continued use 
                  of the platform after changes indicates acceptance of the new terms.
                </p>
              </section>

              <section className="terms-section">
                <h2>Contact Us</h2>
                <p>
                  If you have any questions or concerns regarding these terms, please contact us:
                </p>
                <div className="terms-contact">
                  <h3>Get in Touch</h3>
                  <p><strong>Email:</strong> <a href="mailto:support@zomato.com">support@zomato.com</a></p>
                  <p><strong>Phone:</strong> <a href="tel:1800-123-4567">1800-123-4567</a></p>
                  <p><strong>Address:</strong> Zomato Legal Team, 123 Tech Street, Indore, India 560001</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <Chat />
      {/* <ScrollToTopArrow /> */}
    </div>
  );
}
