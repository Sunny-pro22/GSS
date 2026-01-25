import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { path: '/blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (item) => {
    if (item.id) {
      if (location.pathname === '/' || location.pathname.startsWith('/services/')) {
        const element = document.getElementById(item.id);
        if (element) {
          const headerHeight = headerRef.current?.offsetHeight || 70;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
        if (location.pathname.startsWith('/services/')) {
          navigate(`/#${item.id}`);
        }
      } else {
        navigate(`/#${item.id}`);
      }
      setActiveSection(item.id);
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    } else {
      navigate('/');
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      setActiveSection('');
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      if (location.pathname === '/') {
        const sections = ['home', 'services', 'about', 'contact'];
        const scrollPosition = window.scrollY + 80;
        
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i]);
          if (section && scrollPosition >= section.offsetTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header 
        ref={headerRef}
        className={`app-header ${scrolled ? 'scrolled' : ''}`}
      >
        <div className="header-content">
          {/* Modern Logo */}
          <button 
            className="logo-button" 
            onClick={handleLogoClick}
            aria-label="Go to homepage"
          >
            <div className="logo-mark">
              <div className="logo-inner">
                <span className="logo-letter">B</span>
                <div className="logo-shine"></div>
              </div>
            </div>
            <div className="logo-text">
              <h1 className="logo">BRP TECH</h1>
            </div>
          </button>

          {/* Desktop Navigation - Integrated with CTA */}
          <nav className="desktop-navigation">
            {navItems.map((item) => (
              item.id ? (
                <button
                  key={item.id}
                  className={`nav-link ${activeSection === item.id && location.pathname === '/' ? 'active' : ''}`}
                  onClick={() => handleNavClick(item)}
                  aria-label={`Go to ${item.label}`}
                >
                  <span className="nav-label">{item.label}</span>
                </button>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="nav-label">{item.label}</span>
                </Link>
              )
            ))}
            
            {/* Get Quote Button as part of nav */}
            <button 
              className="nav-cta"
              onClick={() => handleNavClick({ id: 'contact' })}
              aria-label="Get free quote"
            >
              <span>Get Quote</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </nav>

          {/* Contact Icons */}
          <div className="contact-icons">
            <a 
              href="https://wa.me/917042576047" 
              className="contact-icon whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              title="Chat on WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 13.42 2.32 14.77 2.89 16L2 22L8 21.11C9.23 21.68 10.58 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" 
                  fill="currentColor"/>
              </svg>
            </a>
            
            <a 
              href="tel:+917042576047" 
              className="contact-icon phone"
              aria-label="Call us at +91 7042576047"
              title="Call: +91 7042576047"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 15.5C18.8 15.5 17.6 15.3 16.5 14.9C16.1 14.8 15.7 14.9 15.4 15.2L13.2 17.4C10.4 15.9 8.1 13.6 6.6 10.8L8.8 8.6C9.1 8.3 9.2 7.9 9.1 7.5C8.7 6.4 8.5 5.2 8.5 4C8.5 3.4 8.1 3 7.5 3H4C3.4 3 3 3.4 3 4C3 13.4 10.6 21 20 21C20.6 21 21 20.6 21 20V16.5C21 15.9 20.6 15.5 20 15.5Z" 
                  fill="currentColor"/>
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="menu-overlay"
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
          onKeyDown={(e) => e.key === 'Enter' && toggleMenu()}
        />
      )}

      {/* Mobile Menu */}
      <aside 
        ref={menuRef}
        className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-header">
          <div className="mobile-logo">
            <div className="logo-mark">
              <div className="logo-inner">
                <span className="logo-letter">B</span>
              </div>
            </div>
            <div className="logo-text">
              <h2>BRP TECH</h2>
              <span>Digital Solutions</span>
            </div>
          </div>
          <button 
            className="close-menu"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <nav className="mobile-nav">
          {navItems.map((item) => (
            item.id ? (
              <button
                key={item.id}
                className={`mobile-nav-item ${activeSection === item.id && location.pathname === '/' ? 'active' : ''}`}
                onClick={() => handleNavClick(item)}
                aria-current={activeSection === item.id && location.pathname === '/' ? 'page' : undefined}
              >
                <span>{item.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-item ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                onClick={toggleMenu}
              >
                <span>{item.label}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            )
          ))}
          
          <button 
            className="mobile-cta"
            onClick={() => {
              handleNavClick({ id: 'contact' });
              toggleMenu();
            }}
          >
            <span>Get Free Quote</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </nav>

        <div className="mobile-footer">
          <div className="contact-info">
            <h3>Quick Contact</h3>
            <a href="tel:+917042576047" className="contact-link phone">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 15.5C18.8 15.5 17.6 15.3 16.5 14.9C16.1 14.8 15.7 14.9 15.4 15.2L13.2 17.4C10.4 15.9 8.1 13.6 6.6 10.8L8.8 8.6C9.1 8.3 9.2 7.9 9.1 7.5C8.7 6.4 8.5 5.2 8.5 4C8.5 3.4 8.1 3 7.5 3H4C3.4 3 3 3.4 3 4C3 13.4 10.6 21 20 21C20.6 21 21 20.6 21 20V16.5C21 15.9 20.6 15.5 20 15.5Z" 
                  fill="currentColor"/>
              </svg>
              <div>
                <span>Phone</span>
                <strong>+91 7042576047</strong>
              </div>
            </a>
            
            <a href="https://wa.me/917042576047" className="contact-link whatsapp" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.5 2 2 6.5 2 12C2 13.4 2.3 14.8 2.9 16L2 22L8 21.1C9.2 21.7 10.6 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" 
                  fill="currentColor"/>
              </svg>
              <div>
                <span>WhatsApp</span>
                <strong>Chat Now</strong>
              </div>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navigation;