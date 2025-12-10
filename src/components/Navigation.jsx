import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../Hooks/useTHEME';
import ThemeToggle from './ThemeToggle';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className={`app-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="logo-section">
          <NavLink to="/" className="logo-link">
            <div className="logo-gear">
              <div className="gear-teeth-small"></div>
            </div>
            <div>
              <h1 className="logo">BRP TECHNOLOGY</h1>
              <span className="logo-subtitle">PVT LIMITED</span>
            </div>
          </NavLink>
        </div>

        <button 
          className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`navigation ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <NavLink to="/contact" className="cta-button" onClick={() => setIsMenuOpen(false)}>
            Get Started
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navigation;