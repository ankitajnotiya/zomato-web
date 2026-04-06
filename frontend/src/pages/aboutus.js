import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/aboutus.css';
import Footer from '../footer/footer';
import '../footer/footer.css';
import Header from '../header/header';
import '../header/header.css';
import Chat from '../components/Chat';
import Arrow, { ScrollToTopArrow } from '../components/Arrow';

export default function AboutUs() {
  const navigate = useNavigate();

  useEffect(() => {
    // Force scroll 
    window.scrollTo(0, 0);
    
    // Double-check after a short delay to ensure it works
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="about-us-page">
      <Header />
      {/* --- HERO SECTION --- */}
      <section className="hero-section">
        <div className="container hero-content">
          <h1 className="hero-title">About <span>Zomato</span></h1>
          <p className="about-hero-subtitle">
            Discovering the best food experiences since 2008. Connecting millions with their favorite food every day.
          </p>
        </div>
      </section>

      <div className="container">
        
        {/* --- TOP NAVIGATION --- */}
<div className="container">
  {/* --- TOP NAVIGATION --- */}
  <div className="top-nav-section" style={{
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center', 
      position: 'relative', 
      padding: '15px 0 10px',
      width: '100%'
  }}>
    <button className="back-arrow-btn" onClick={() => navigate(-1)} style={{
        position: 'absolute',
        left: '0',
        background: 'white',
        border: '2px solid #e23744',
        fontSize: '1.5rem',
        cursor: 'pointer',
        color: '#e23744',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 3px 8px rgba(226, 55, 68, 0.15)',
        transition: 'all 0.3s ease'
    }}>
      ←
    </button>
    
    <h1 style={{
        fontSize: 'clamp(1.3rem, 4vw, 2rem)',
        fontWeight: '800',
        color: '#1c1c1c',
        margin: '0',
        textAlign: 'center',
        letterSpacing: '-0.5px',
        lineHeight: '1.3',
        // padding: '0 50px',
        marginTop: '0px',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        hyphens: 'auto',
        marginLeft: '-15px'
    }}>
      Better Food for <span style={{color: '#e23744'}}>More People</span>
    </h1>
  </div>
</div>
        {/* --- STATS STRIP --- */}
        <div className="stats-strip">
          <div className="stat-card">
            <h3>1.4M+</h3>
            <p>RESTAURANTS</p>
          </div>
          <div className="stat-card">
            <h3>10K+</h3>
            <p>CITIES</p>
          </div>
          <div className="stat-card">
            <h3>50M+</h3>
            <p>ACTIVE USERS</p>
          </div>
          <div className="stat-card">
            <h3>24/7</h3>
            <p>SUPPORT</p>
          </div>
        </div>

        {/* --- STORY SECTION --- */}
        <section className="story-section">
          <h2>Our Story</h2>
          <p>
            Started in 2008, Zomato began as a simple idea to help people discover great food around them. 
            What started in Delhi has now grown into one of the world's leading food delivery and restaurant 
            discovery platforms, connecting millions with their favorite food every day.
          </p>
          <p>
            Our journey has been driven by innovation, customer obsession, and a relentless focus on building 
            a sustainable food ecosystem that benefits everyone - from restaurants to delivery partners to customers.
          </p>
          
          <div className="story-timeline">
            <div className="timeline-item">
              <div className="timeline-year">2008</div>
              <div className="timeline-content">
                <h4>Founded in Delhi</h4>
                <p>Started as a restaurant discovery platform</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2010</div>
              <div className="timeline-content">
                <h4>Expansion Begins</h4>
                <p>Expanded to multiple cities across India</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="features-section">
          <h2 className="section-subtitle">What We Do</h2>
          <div className="features-grid">
            <div className="feature-card-compact">
              <div className="feature-icon">🍽️</div>
              <h3>Restaurant Discovery</h3>
              <p>Find the best restaurants, cafes, and bars in your city with detailed reviews, ratings, and photos.</p>
            </div>
            <div className="feature-card-compact">
              <div className="feature-icon">🚚</div>
              <h3>Food Delivery</h3>
              <p>Order your favorite food from thousands of restaurants and get it delivered to your doorstep.</p>
            </div>
            <div className="feature-card-compact">
              <div className="feature-icon">🍴</div>
              <h3>Dining Out</h3>
              <p>Book tables at your favorite restaurants and enjoy exclusive dining experiences.</p>
            </div>
            <div className="feature-card-compact">
              <div className="feature-icon">💳</div>
              <h3>Payments</h3>
              <p>Seamless payment options with multiple payment methods and secure transactions.</p>
            </div>
            <div className="feature-card-compact">
              <div className="feature-icon">📱</div>
              <h3>Mobile App</h3>
              <p>Order on the go with our user-friendly mobile app available for iOS and Android.</p>
            </div>
            <div className="feature-card-compact">
              <div className="feature-icon">🎯</div>
              <h3>Live Tracking</h3>
              <p>Track your order in real-time from restaurant to your doorstep.</p>
            </div>
          </div>
        </section>

        {/* --- VALUES SECTION --- */}
        <section className="values-section">
          <h2 className="section-subtitle">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">😊</div>
              <h3>Customer Obsession</h3>
              <p>We put our customers first in everything we do, ensuring the best food experience.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>We constantly innovate to improve our services and create new solutions.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Partnership</h3>
              <p>We build strong relationships with restaurants and delivery partners.</p>
            </div>

          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Join Our Journey?</h2>
            <p>Partner with us or explore career opportunities at Zomato</p>
            <div className="cta-buttons">
              <button className="cta-btn cta-btn-primary">Partner With Us</button>
              <button className="cta-btn cta-btn-secondary">View Careers</button>
            </div>
          </div>
        </section>

      </div>
      
      <Footer />
      <Chat />
      <ScrollToTopArrow />
    </div>
  );
}