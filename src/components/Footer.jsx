import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../Hooks/useTheme';
import FloatingGearsBackground from './FloatingGearsBackground';
import ThemeToggle from './ThemeToggle';
import './Footer.css';

const Footer = () => {
  const { isDarkTheme } = useTheme();

  return (
    <footer className="app-footer">
      <FloatingGearsBackground />
      
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="footer-logo-gear">
                <div className="gear-teeth-small"></div>
              </div>
              <div>
                <h2>BRP TECHNOLOGY</h2>
                <span className="logo-subtitle">PVT LIMITED</span>
                <p className="footer-tagline">
                  Helping businesses grow through digital excellence and strategic optimization.
                </p>
              </div>
            </div>
            
            <div className="footer-theme">
              <ThemeToggle />
              <span>Switch to {isDarkTheme ? 'Light' : 'Dark'} Theme</span>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <nav className="footer-nav">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link>
              <Link to="/services" onClick={() => window.scrollTo(0, 0)}>Services</Link>
              <Link to="/about" onClick={() => window.scrollTo(0, 0)}>About Us</Link>
              <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>Contact</Link>
            </nav>
          </div>
          
          <div className="footer-section">
            <h3>Our Services</h3>
            <nav className="footer-nav">
              <Link to="/services" onClick={() => window.scrollTo(0, 0)}>Business Profile Optimization</Link>
              <Link to="/services" onClick={() => window.scrollTo(0, 0)}>SEO Services</Link>
              <Link to="/services" onClick={() => window.scrollTo(0, 0)}>Digital Marketing</Link>
              <Link to="/services" onClick={() => window.scrollTo(0, 0)}>Analytics & Reporting</Link>
            </nav>
          </div>
          
          <div className="footer-section">
            <h3>Legal</h3>
            <nav className="footer-nav">
              <Link to="/terms" onClick={() => window.scrollTo(0, 0)}>Terms & Conditions</Link>
              <Link to="/privacy" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link>
              <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>Service Agreement</Link>
              <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>Cookie Policy</Link>
            </nav>
          </div>
          
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="Visit our LinkedIn"
              >
                <i className="fab fa-linkedin"></i> LinkedIn
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="Visit our Twitter"
              >
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="Visit our Facebook"
              >
                <i className="fab fa-facebook"></i> Facebook
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link"
                aria-label="Visit our Instagram"
              >
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
            
            <div className="contact-info">
              <p><i className="fas fa-phone"></i> +91 7042576047</p>
              <p><i className="fas fa-envelope"></i> team@brptechnology.com</p>
              <p><i className="fas fa-clock"></i> Mon-Fri: 6AM - 11PM EST</p>
              <p><i className="fas fa-map-marker-alt"></i> Dwarka Delhi</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; Copyright 2025-2028 BRP Technology Pvt Limited. All rights reserved.</p>
            <p className="copyright-sub">Business Growth Specialists | Digital Excellence Partners</p>
          </div>
          
          <div className="footer-badges">
            <span className="badge">
              <i className="fas fa-shield-alt"></i> ISO 27001 Certified
            </span>
            <span className="badge">
              <i className="fab fa-google"></i> Google Partner
            </span>
            <span className="badge">
              <i className="fas fa-lock"></i> GDPR Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
