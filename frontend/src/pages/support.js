import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/support.css';
import Footer from '../footer/footer';
import '../footer/footer.css';
import Header from '../header/header';
import '../header/header.css';
import Chat from '../components/Chat';
import Arrow, { ScrollToTopArrow } from '../components/Arrow';

export default function Support() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // First, immediately scroll to top without animation
    window.scrollTo(0, 0);
    // Then apply smooth scrolling for any subsequent navigation
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      // Clean up scroll behavior when component unmounts
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const faqs = [
    { id: 1, question: "How do I place an order?", answer: "Simply browse restaurants, select your favorite dishes, add them to cart, and proceed to checkout. Enter your delivery details and payment information to complete your order." },
    { id: 2, question: "What payment methods are accepted?", answer: "We accept credit/debit cards, net banking, UPI, digital wallets like Paytm and PhonePe, and cash on delivery in select areas." },
    { id: 3, question: "How can I track my order?", answer: "Once your order is confirmed, you can track it in real-time through our app. You'll see when the restaurant starts preparing, when the delivery partner picks up, and when it's arriving." },
    { id: 4, question: "What if my order is late?", answer: "If your order is significantly delayed, you can check the real-time tracking for updates. For further assistance, contact our customer support team." },
    { id: 5, question: "How do I cancel my order?", answer: "You can cancel your order from the order history page if the restaurant hasn't started preparing it yet. Once preparation begins, cancellation may not be possible." },
    { id: 6, question: "How do I report an issue with my order?", answer: "Go to your order history, select the problematic order, and use the 'Report Issue' option. You can also contact our 24/7 customer support for immediate assistance." }
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="support-page">
      <Header />
      <div className="support-hero">
        <div className="container">
          <h1>Help Center</h1>
          <p>We're here to help you with any questions or concerns</p>
        </div>
      </div>

      <div className="container">
        <section className="contact-options">
          <div className="contact-options-header">
            <button className="back-arrow-btn" onClick={() => navigate(-1)}>
              ←
            </button>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3>Call Us</h3>
              <p>24/7 Customer Support</p>
              <a href="tel:1800-123-4567" className="contact-link">1800-123-4567</a>
            </div>
            <div className="contact-card">
              <div className="contact-icon">💬</div>
              <h3>Live Chat</h3>
              <p>Chat with our support team</p>
              <button className="contact-btn">Start Chat</button>
            </div>
            <div className="contact-card">
              <div className="contact-icon">✉️</div>
              <h3>Email Support</h3>
              <p>Response within 24 hours</p>
              <a href="mailto:support@zomato.com" className="contact-link">support@zomato.com</a>
            </div>
          </div>
        </section>

        <div className="support-main-content">
          <section className="faq-section">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map(faq => (
                <div key={faq.id} className={`faq-item ${expandedFaq === faq.id ? 'active' : ''}`}>
                  <div className="faq-question" onClick={() => toggleFaq(faq.id)}>
                    <h3>{faq.question}</h3>
                    <span className={`faq-toggle ${expandedFaq === faq.id ? 'active' : ''}`}>
                      {expandedFaq === faq.id ? '−' : '+'}
                    </span>
                  </div>
                  {expandedFaq === faq.id && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="support-form-section">
            <h2 className="section-title">Still need help?</h2>
            <p className="section-subtitle">Fill out the form below and we'll get back to you soon.</p>
            <form className="help-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Issue Type</label>
                <select required>
                  <option value="">Select an issue</option>
                  <option value="order">Order Related</option>
                  <option value="payment">Payment Issue</option>
                  <option value="delivery">Delivery Problem</option>
                  <option value="account">Account Issue</option>
                </select>
              </div>
              <div className="form-group">
                <label>Describe your issue</label>
                <textarea rows="4" placeholder="How can we help?"></textarea>
              </div>
              <button type="submit" className="submit-btn" style={{marginTop: '20px'}}>Submit Request</button>
            </form>
          </section>
        </div>
      </div>
      
      <Footer />
      <Chat />
      <ScrollToTopArrow />
    </div>
  );
}