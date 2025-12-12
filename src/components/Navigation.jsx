import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../Hooks/useTheme';
import ThemeToggle from './ThemeToggle';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkTheme } = useTheme();
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Prevent scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/services', label: 'Services', icon: '⚙️' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/contact', label: 'Contact', icon: '📞' }
  ];

  return (
    <>
      <header className={`app-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <div className="logo-section">
            <NavLink to="/" className="logo-link" onClick={closeMenu}>
              <div className="logo-gear">
                <div className="gear-teeth-small"></div>
              </div>
              <div>
                <h1 className="logo">BRP TECHNOLOGY</h1>
                <span className="logo-subtitle">PVT LIMITED</span>
              </div>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Header Actions */}
          <div className="desktop-header-actions">
            <ThemeToggle />
            <NavLink to="/contact" className="cta-button">
              Get Started
            </NavLink>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      />

      {/* Mobile Sidebar Menu */}
      <div className={`mobile-sidebar ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-sidebar-header">
          <h2 className="mobile-sidebar-title">Menu</h2>
          <button 
            className="mobile-menu-toggle active"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="mobile-sidebar-content">
          <div className="mobile-nav-links">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="mobile-sidebar-footer">
            <NavLink 
              to="/contact" 
              className="mobile-cta-button"
              onClick={closeMenu}
            >
              Get Started
            </NavLink>
            
            <div className="mobile-theme-toggle">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;