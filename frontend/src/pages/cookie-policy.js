import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/cookie-policy.css';
import Footer from '../footer/footer';
import '../footer/footer.css';
import Header from '../header/header';
import '../header/header.css';
import Chat from '../components/Chat';

export default function CookiePolicy() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    functional: false,
    performance: false,
    marketing: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Force immediate scroll to top with multiple methods
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Add a small delay to ensure it takes effect
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      // Then apply smooth scrolling for any subsequent navigation
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 100);
    
    return () => {
      // Clean up scroll behavior when component unmounts
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  useEffect(() => {
    // Load saved preferences from localStorage
    const saved = localStorage.getItem('cookiePreferences');
    if (saved) {
      setCookiePreferences(JSON.parse(saved));
    }
  }, []);

  const handlePreferenceChange = (category) => {
    if (category === 'essential') return; // Essential cookies cannot be disabled
    
    setCookiePreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const savePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    alert('Your cookie preferences have been saved!');
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      performance: true,
      marketing: true
    };
    setCookiePreferences(allAccepted);
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
    alert('All cookies have been accepted!');
  };

  const rejectAll = () => {
    const onlyEssential = {
      essential: true,
      functional: false,
      performance: false,
      marketing: false
    };
    setCookiePreferences(onlyEssential);
    localStorage.setItem('cookiePreferences', JSON.stringify(onlyEssential));
    alert('Only essential cookies have been accepted!');
  };

  return (
    <div className="cookie-policy-page" style={{ scrollBehavior: 'auto' }}>
      <Header />
      <main className="cookie-main">
        <div className="container">
          <div className="cookie-hero">
            <h1>Cookie Policy</h1>
            <p>Last updated: October 1, 2025</p>
          </div>

          {/* Back Arrow Button */}
          <div className="cookie-back-navigation">
            <button className="cookie-back-arrow-btn" onClick={() => navigate(-1)}>
              ←
            </button>
          </div>

          <div className="cookie-content">
            <section className="cookie-section">
              <h2>What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device when you visit a website. 
                They help us provide you with a better experience by remembering your preferences, 
                analyzing usage patterns, and personalizing content.
              </p>
            </section>

            <section className="cookie-section">
              <h2>How We Use Cookies</h2>
              <p>
                At Zomato, we use cookies to:
              </p>
              <ul>
                <li>Remember your login information and preferences</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized restaurant recommendations</li>
              </ul>
            </section>

            <section className="cookie-section">
              <h2>Types of Cookies We Use</h2>
              
              <div className="cookie-types">
                <div className="cookie-type">
                  <h3>Essential Cookies</h3>
                  <p>These cookies are necessary for the website to function properly. They enable basic features like page navigation, authentication, and order processing.</p>
                  <div className="cookie-status">
                    <span className="status-badge required">Required</span>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={cookiePreferences.essential}
                        onChange={() => handlePreferenceChange('essential')}
                        disabled
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="cookie-type">
                  <h3>Functional Cookies</h3>
                  <p>These cookies remember your preferences and choices to provide a more personalized experience, such as language settings and favorite restaurants.</p>
                  <div className="cookie-status">
                    <span className="status-badge optional">Optional</span>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={cookiePreferences.functional}
                        onChange={() => handlePreferenceChange('functional')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="cookie-type">
                  <h3>Performance Cookies</h3>
                  <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                  <div className="cookie-status">
                    <span className="status-badge optional">Optional</span>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={cookiePreferences.performance}
                        onChange={() => handlePreferenceChange('performance')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="cookie-type">
                  <h3>Marketing Cookies</h3>
                  <p>These cookies are used to deliver advertisements that are relevant to you and your interests, and to measure the effectiveness of our marketing campaigns.</p>
                  <div className="cookie-status">
                    <span className="status-badge optional">Optional</span>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={cookiePreferences.marketing}
                        onChange={() => handlePreferenceChange('marketing')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <section className="cookie-section">
              <h2>Third-Party Cookies</h2>
              <p>
                We use third-party services that may set their own cookies on your device:
              </p>
              
              <div className="third-party-list">
                <div className="third-party">
                  <h4>Google Analytics</h4>
                  <p>For website analytics and performance monitoring</p>
                </div>
                <div className="third-party">
                  <h4>Google Maps</h4>
                  <p>For location services and restaurant mapping</p>
                </div>
                <div className="third-party">
                  <h4>Payment Gateways</h4>
                  <p>For secure payment processing</p>
                </div>
              </div>
            </section>

            <section className="cookie-section">
              <h2>Managing Your Cookie Preferences</h2>
              <p>
                You can control and manage cookies in several ways:
              </p>
              <ul>
                <li>Use the cookie settings panel on our website</li>
                <li>Adjust your browser settings to block or delete cookies</li>
                <li>Clear cookies from your device at any time</li>
              </ul>
              
              <div className="browser-info">
                <h4>Browser-Specific Instructions:</h4>
                <ul>
                  <li><strong>Chrome:</strong> Settings {'>'} Privacy and security {'>'} Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options {'>'} Privacy & Security {'>'} Cookies and Site Data</li>
                </ul>
              </div>
            </section>

            <section className="cookie-section">
              <h2>Impact of Disabling Cookies</h2>
              <p>
                If you choose to disable cookies, some features of our website may not function properly:
              </p>
              <ul>
                <li>You may need to log in repeatedly</li>
                <li>Personalized recommendations may not work</li>
                <li>Order tracking may be affected</li>
              </ul>
            </section>

            <section className="cookie-section">
              <h2>Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or applicable law. 
                We will notify you of any significant changes by posting the updated policy on our website.
              </p>
            </section>
            <section className="cookie-preferences">
              <h2>Your Cookie Preferences</h2>
              <div className="preferences-actions">
                <button onClick={acceptAll} className="btn btn-primary">Accept All</button>
                <button onClick={rejectAll} className="btn btn-secondary">Reject All</button>
                <button onClick={savePreferences} className="btn btn-success">Save Preferences</button>
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
