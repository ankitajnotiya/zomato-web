import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleMobileDropdown = () => {
    setShowMobileDropdown(!showMobileDropdown);
  };

  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="header-content">
          {/* Logo */}
          <div className="logo-section">
            <div
              className="logo"
              onClick={() => navigate('/')}
            >
              Zomato
            </div>
          </div>

          {/* Navigation */}
          <nav className="main-nav">
            <ul className="nav-links">
              <li>
                <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/aboutus" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/myorder" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                  My Order
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Right Actions */}
          <div className="header-actions">
            {/* Search Input */}
            <div className="header-search">
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
            
            {/* Profile Icon */}
            <Link to="/signup" className="profile-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
            
            {/* Three Dots Menu  */}
            <div className="mobile-three-dots" onClick={toggleMobileDropdown}>
              <div className="mobile-dot"></div>
              <div className="mobile-dot"></div>
              <div className="mobile-dot"></div>
              
              {/* Mobile Dropdown */}
              {showMobileDropdown && (
                <div className="mobile-dropdown">
                  <Link to="/" className="mobile-dropdown-item">
                    Home
                  </Link>
                  <Link to="/aboutus" className="mobile-dropdown-item">
                    About Us
                  </Link>
                  <Link to="/contact" className="mobile-dropdown-item">
                    Contact
                  </Link>
                  <Link to="/myorder" className="mobile-dropdown-item">
                    My Order
                  </Link>
                </div>
              )}
            </div>
            
            {/* Mobile Menu Toggle */}
            <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {showMobileMenu && (
        <div className="mobile-nav">
          <div className="mobile-nav-content">
            <ul className="mobile-nav-links">
              <li>
                <NavLink to="/" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/aboutus" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/myorder" onClick={toggleMobileMenu} className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}>
                  My Order
                </NavLink>
              </li>
              <li>
                <Link to="/signup" onClick={toggleMobileMenu} className="mobile-signup-btn">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
