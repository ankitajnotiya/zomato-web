import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/faq.css';
import Footer from '../footer/footer';
import '../footer/footer.css';
import Header from '../header/header';
import '../header/header.css';
import Chat from '../components/Chat';

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'ordering', name: 'Ordering & Delivery' },
    { id: 'payment', name: 'Payment' },
    { id: 'account', name: 'Account & Profile' },
    { id: 'restaurant', name: 'Restaurant Partners' },
    { id: 'technical', name: 'Technical Issues' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'ordering',
      question: "How do I place my first order?",
      answer: "Simply enter your location, browse restaurants, select items, add to cart, and proceed to checkout. You'll need to provide delivery details and choose a payment method."
    },
    {
      id: 2,
      category: 'ordering',
      question: "Can I schedule an order for later?",
      answer: "Yes! You can schedule orders up to 7 days in advance. Select the 'Schedule' option during checkout and choose your preferred date and time."
    },
    {
      id: 3,
      category: 'ordering',
      question: "What is the minimum order value?",
      answer: "Minimum order value varies by restaurant and location. It's usually displayed on the restaurant page and in your cart before checkout."
    },
    {
      id: 4,
      category: 'ordering',
      question: "How long does delivery take?",
      answer: "Delivery time depends on restaurant preparation time, distance, and traffic. Estimated delivery time is shown before you place your order."
    },
    {
      id: 5,
      category: 'payment',
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, net banking, UPI, digital wallets (Paytm, PhonePe, Amazon Pay), and cash on delivery in select areas."
    },
    {
      id: 6,
      category: 'payment',
      question: "Is it safe to save my card details?",
      answer: "Yes, we use industry-standard encryption and secure payment gateways. Your card details are tokenized and stored securely."
    },
    {
      id: 7,
      category: 'payment',
      question: "Can I get a refund?",
      answer: "Refunds are processed based on the issue type. For payment failures, refunds are automatic. For order issues, contact customer support for assistance."
    },
    {
      id: 8,
      category: 'account',
      question: "How do I create an account?",
      answer: "Click 'Sign Up' and enter your email or phone number. You'll receive an OTP to verify your account. You can also sign up using Google or Facebook."
    },
    {
      id: 9,
      category: 'account',
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page, enter your email/phone, and follow the instructions sent to you to reset your password."
    },
    {
      id: 10,
      category: 'account',
      question: "Can I change my phone number?",
      answer: "Yes, go to Account Settings > Personal Information > Edit Phone Number. You'll need to verify the new number with an OTP."
    },
    {
      id: 11,
      category: 'restaurant',
      question: "How do I list my restaurant on Zomato?",
      answer: "Visit our partner portal or call our business team. We'll guide you through the onboarding process and help you set up your restaurant profile."
    },
    {
      id: 12,
      category: 'restaurant',
      question: "What are the commission rates?",
      answer: "Commission rates vary based on restaurant type, location, and partnership model. Contact our business team for detailed information."
    },
    {
      id: 13,
      category: 'technical',
      question: "The app is not working properly. What should I do?",
      answer: "Try clearing cache, updating the app, or restarting your device. If issues persist, contact our technical support team."
    },
    {
      id: 14,
      category: 'technical',
      question: "Why can't I see restaurants in my area?",
      answer: "Check your location settings and ensure you've granted location permissions. Also verify that we deliver to your area by entering your PIN code."
    }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="faq-page">
      <Header />
      <main className="faq-main">
        <div className="container">
          <div className="faq-hero">
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to common questions about Zomato</p>
          </div>

          {/* FAQ Back Arrow Button */}
          <div className="faq-back-navigation">
            <button className="faq-back-arrow-btn" onClick={() => navigate(-1)}>
              ←
            </button>
          </div>

          <div className="faq-content">
            <section className="category-tabs">
              <div className="tabs-container">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`tab-button ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </section>

            <section className="faq-list">
              <div className="faq-count">
                <p>{filteredFaqs.length} questions found</p>
              </div>
              
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map(faq => (
                  <div key={faq.id} className={`faq-item ${expandedFaq === faq.id ? 'active' : ''}`}>
                    <div 
                      className="faq-question"
                      onClick={() => toggleFaq(faq.id)}
                    >
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
                ))
              ) : (
                <div className="no-results">
                  <p>No questions found in this category.</p>
                </div>
              )}
            </section>

            <section className="help-section">
              <div className="help-card">
                <h2>Still have questions?</h2>
                <p>Can't find what you're looking for? Our support team is here to help.</p>
                <div className="help-actions">
                  <a href="/support" className="help-btn primary">Visit Help Center</a>
                  <a href="/contact" className="help-btn secondary">Contact Us</a>
                </div>
              </div>
            </section>

            <section className="popular-topics">
              <h2>Popular Topics</h2>
              <div className="topics-grid">
                <div className="topic-card">
                  <h3>First Order Guide</h3>
                  <p>Learn how to place your first order</p>
                  <a href="/support" className="topic-link">Learn More →</a>
                </div>
                <div className="topic-card">
                  <h3>Tracking Orders</h3>
                  <p>Track your order in real-time</p>
                  <a href="/support" className="topic-link">Learn More →</a>
                </div>
                <div className="topic-card">
                  <h3>Cancellation Policy</h3>
                  <p>Understand our cancellation terms</p>
                  <a href="/termspolicy" className="topic-link">Learn More →</a>
                </div>
                <div className="topic-card">
                  <h3>Refund Process</h3>
                  <p>How refunds are processed</p>
                  <a href="/support" className="topic-link">Learn More →</a>
                </div>
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
