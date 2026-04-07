import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/privacypolicy.css';
import Footer from '../footer/footer';
import '../footer/footer.css';
import Header from '../header/header';
import '../header/header.css';
import Chat from '../components/Chat';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="privacy-policy-page">
      <Header />
      <main className="privacy-main">
        <div className="container">
          <div className="privacy-hero">
            <h1>Privacy Policy</h1>
            <p>Last updated: October 1, 2025</p>
          </div>

          {/* Back Arrow Button */}
          <div className="privacy-back-navigation">
            <button className="privacy-back-arrow-btn" onClick={() => navigate(-1)}>
              ←
            </button>
          </div>

          <div className="privacy-content">
            <section className="privacy-section">
              <h2>Introduction</h2>
              <p>
                At Zomato, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, share, and protect your information when you use our platform.
              </p>
            </section>

            <section className="privacy-section">
              <h2>Information We Collect</h2>
              
              <h3>Personal Information</h3>
              <ul>
                <li>Name, email address, phone number</li>
                <li>Delivery address and location data</li>
              </ul>

              <h3>Technical Information</h3>
              <ul>
                <li>IP address and device information</li>
                <li>Browser type and operating system</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>How We Use Your Information</h2>
              <div className="use-cases">
                <div className="use-case">
                  <h3>Service Provision</h3>
                  <p>To process orders, facilitate payments, and deliver food to your location</p>
                </div>
                <div className="use-case">
                  <h3>Personalization</h3>
                  <p>To provide personalized recommendations and improve your experience</p>
                </div>
                <div className="use-case">
                  <h3>Communication</h3>
                  <p>To send order updates, promotional offers, and customer support responses</p>
                </div>
                <div className="use-case">
                  <h3>Security</h3>
                  <p>To prevent fraud and ensure platform security</p>
                </div>
                <div className="use-case">
                  <h3>Analytics</h3>
                  <p>To analyze usage patterns and improve our services</p>
                </div>
              </div>
            </section>


            <section className="privacy-section">
              <h2>Data Security</h2>
              <p>
                We implement industry-standard security measures including:
              </p>
              <ul>
                <li>SSL encryption for data transmission</li>
                <li>Secure payment processing</li>
                <li>Regular security audits</li>
                <li>Access controls and authentication</li>
                <li>Data backup and recovery systems</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>Your Rights</h2>
              <div className="rights-list">
                <div className="right-item">
                  <h3>Access</h3>
                  <p>You can request access to your personal information</p>
                </div>
                <div className="right-item">
                  <h3>Correction</h3>
                  <p>You can update or correct your personal information</p>
                </div>
                <div className="right-item">
                  <h3>Deletion</h3>
                  <p>You can request deletion of your account and data</p>
                </div>

              </div>
            </section>

            <section className="privacy-section">
              <h2>Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. 
                You can control cookie settings through your browser preferences.
              </p>
              
              <h3>Types of Cookies We Use</h3>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
                <li><strong>Performance Cookies:</strong> Help us understand usage patterns</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences</li>
                <li><strong>Marketing Cookies:</strong> Show relevant advertisements</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2>Third-Party Services</h2>
              <p>
                Our platform integrates with third-party services including:
              </p>
              <ul>
                <li>Payment gateways (Razorpay, PayU, etc.)</li>
                <li>Mapping services (Google Maps)</li>
                <li>Analytics providers (Google Analytics)</li>
                <li>Social media platforms</li>
              </ul>
              <p>
                These services have their own privacy policies and data practices.
              </p>
            </section>

            <section className="privacy-section">
              <h2>International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards 
                are in place to protect your data in accordance with applicable data protection laws.
              </p>
            </section>

            <section className="privacy-section">
              <h2>Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or how we handle your information, please contact us:
              </p>
              <div className="contact-info">
                <p><strong>Email:</strong> privacy@zomato.com</p>
                <p><strong>Phone:</strong> 1800-123-4567</p>
                <p><strong>Address:</strong> Zomato Privacy Team, 123 Tech Street, Indore, India 560001</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
      <Chat />
      {/* <ScrollToTopArrow /> */}
    </div>
  );
}
