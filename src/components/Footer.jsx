// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BRP Technology</h3>
            <p>
              Transforming businesses with cutting-edge digital marketing solutions. 
              We help you grow your online presence and achieve remarkable digital success.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook" title="Facebook">📘</a>
              <a href="#" aria-label="Twitter" title="Twitter">🐦</a>
              <a href="#" aria-label="Instagram" title="Instagram">📷</a>
              <a href="#" aria-label="LinkedIn" title="LinkedIn">💼</a>
              <a href="#" aria-label="YouTube" title="YouTube">📺</a>
            </div>
            
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#careers">Careers</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Our Services</h4>
            <ul>
              <li><a href="#seo">SEO Services</a></li>
              <li><a href="#smo">SMO Services</a></li>
              <li><a href="#web-design">Web Design</a></li>
              <li><a href="#ppc">PPC Management</a></li>
              <li><a href="#content">Content Marketing</a></li>
              <li><a href="#branding">Branding</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <p>📧 info@brptechnology.com</p>
              <p>📞 +1 (555) 123-4567</p>
              <p>📍 123 Business Ave, Suite 100<br />New York, NY 10001</p>
              <p>🕒 Mon - Fri: 9AM - 6PM EST</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} BRP Technology Pvt Limited. All rights reserved.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
            <a href="#sitemap">Sitemap</a>
          </div>
        </div>
      </div>

      {showBackToTop && (
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          ↑
        </button>
      )}
    </footer>
  );
};

export default Footer;