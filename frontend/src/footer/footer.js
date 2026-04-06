// src/components/Footer.js
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer" style={{ width: '100vw' }}>
      <div className="footer-wrapper">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section company-info">
            <div className="logo">Zomato</div>
            <p className="company-description">
              Discover the best food, restaurants, and bars near you. Order food delivery 
              and dining experiences from thousands of restaurants nationwide.
            </p>
            <div className="app-buttons">
              <a href="#" className="app-btn app-store">
                <img 
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                alt="App Store" 
                className="store-img"
              />
              </a>
              <a href="#" className="app-btn google-play">
                <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Google Play" 
                className="store-img"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
              <li><NavLink to="/aboutus" className={({ isActive }) => isActive ? "active" : ""}>About Us</NavLink></li>
              <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact Us</NavLink></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li><NavLink to="/support" className={({ isActive }) => isActive ? "active" : ""}>Help Center</NavLink></li>
              <li><NavLink to="/faq" className={({ isActive }) => isActive ? "active" : ""}>FAQ</NavLink></li>
              <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Customer Support</NavLink></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-section">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li><NavLink to="/privacypolicy" className={({ isActive }) => isActive ? "active" : ""}>Privacy and Condition</NavLink></li>
              <li><NavLink to="/termspolicy" className={({ isActive }) => isActive ? "active" : ""}>Terms of Service</NavLink></li>
              <li><NavLink to="/cookie-policy" className={({ isActive }) => isActive ? "active" : ""}>Cookie Policy</NavLink></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2025 Zomato Clone. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
