import React, { useEffect, useRef, useState } from 'react';
import './HomeSection.css';

const HeroSection = () => {
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);

  // SEO Growth Images Slideshow
  const seoGrowthImages = [
    {
      id: 1,
      title: "SEO Growth Chart",
      description: "Organic traffic increased by 240% in 6 months",
      color: "#3b82f6"
    },
    {
      id: 2,
      title: "Keyword Rankings",
      description: "From page 4 to top 3 positions in Google",
      color: "#10b981"
    },
    {
      id: 3,
      title: "Conversion Rate",
      description: "Lead generation up by 180% with optimized SEO",
      color: "#8b5cf6"
    },
    {
      id: 4,
      title: "ROI Analysis",
      description: "300% return on SEO investment",
      color: "#f59e0b"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Auto slide change
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % seoGrowthImages.length);
    }, 4000);

    // Mouse move effect for parallax
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(slideInterval);
    };
  }, [seoGrowthImages.length]);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+917042576047';
  };

  const handleSlideClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero-section" ref={heroRef}>
      {/* Full width background */}
      <div className="hero-background">
        <div className="bg-gradient"></div>
        <div className="bg-grid"></div>
        <div className="bg-dots"></div>
        <div className="bg-blur"></div>
      </div>

      {/* Full width container */}
      <div className="hero-container">
        <div className="hero-content-wrapper">
          <div className="hero-content">
            {/* Left Content */}
            <div className="hero-text-section">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                <span className="badge-text">Premier Digital Agency in Delhi NCR</span>
              </div>

              <h1 className="hero-title">
                Transform Your Business with 
                <span className="gradient-text"> Digital Excellence</span>
              </h1>
              
              <p className="hero-subtitle">
                BRP Technology is a leading <strong>digital marketing agency in Delhi</strong> specializing in 
                <strong> SEO services</strong>, <strong>website development</strong>, <strong>mobile app development</strong>, 
                and <strong>Google Business Profile optimization</strong>. We help businesses achieve exponential growth 
                through innovative digital solutions.
              </p>

              {/* SEO Keywords */}
              <div className="seo-keywords">
                <span className="keyword-tag">#WebDevelopmentDelhi</span>
                <span className="keyword-tag">#SEOServices</span>
                <span className="keyword-tag">#DigitalMarketingAgency</span>
                <span className="keyword-tag">#AppDevelopment</span>
                <span className="keyword-tag">#GoogleBusiness</span>
                <span className="keyword-tag">#BrandingServices</span>
              </div>

              {/* Action Buttons */}
              <div className="hero-buttons">
                <button className="btn-primary" onClick={scrollToServices}>
                  <span className="btn-text">Explore Services</span>
                  <svg className="btn-arrow" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="btn-secondary" onClick={handleCallClick}>
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M20 15.5C18.75 15.5 17.55 15.3 16.43 14.93C16.08 14.82 15.69 14.9 15.41 15.17L13.21 17.37C10.38 15.93 8.06 13.62 6.62 10.79L8.82 8.59C9.1 8.31 9.18 7.92 9.07 7.57C8.7 6.45 8.5 5.25 8.5 4C8.5 3.45 8.05 3 7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.5C21 15.95 20.55 15.5 20 15.5Z" fill="currentColor"/>
                  </svg>
                  <span className="btn-text">+91 7042576047</span>
                </button>
                <a 
                  href="https://wa.me/917042576047" 
                  className="btn-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="none">
                    <path d="M19.05 4.91C17.18 3.03 14.69 2 12.04 2C6.54 2 2.03 6.53 2.03 12.03C2.03 13.67 2.42 15.26 3.17 16.67L2.05 22L7.46 20.88C8.85 21.63 10.44 22 12.07 22C17.57 22 22.06 17.5 22.06 12C22.06 9.36 21.03 6.87 19.05 4.91ZM12.07 20.01C10.67 20.01 9.33 19.64 8.15 18.97L7.85 18.79L4.27 19.72L5.2 16.23L5.02 15.93C4.3 14.67 3.93 13.28 3.93 11.98C3.93 7.59 7.64 3.89 12.04 3.89C14.28 3.89 16.38 4.87 17.85 6.35C19.32 7.83 20.3 9.92 20.3 12.16C20.3 16.56 16.6 20.26 12.07 20.26V20.01ZM16.53 14.21C16.22 14.04 15.38 13.61 15.18 13.53C14.98 13.44 14.84 13.4 14.7 13.71C14.56 14.02 14.06 14.82 13.91 15.01C13.76 15.2 13.61 15.22 13.3 15.05C13 14.88 12.32 14.66 11.52 13.95C10.91 13.42 10.48 12.78 10.33 12.47C10.18 12.16 10.3 11.98 10.45 11.82C10.58 11.67 10.73 11.47 10.88 11.31C11.03 11.15 11.1 11.04 11.22 10.84C11.34 10.64 11.3 10.47 11.23 10.33C11.16 10.19 10.68 8.92 10.48 8.41C10.29 7.93 10.09 7.99 9.94 7.99C9.79 7.99 9.62 7.98 9.45 7.98C9.28 7.98 9.04 8.02 8.83 8.26C8.62 8.5 8 9.11 8 10.26C8 11.41 8.8 12.52 8.94 12.7C9.08 12.88 10.46 14.75 12.55 15.61C13.25 15.9 13.82 16.06 14.29 16.18C15.02 16.35 15.68 16.31 16.18 16.21C16.73 16.1 17.74 15.58 17.97 15.01C18.2 14.44 18.2 13.96 18.13 13.86C18.06 13.76 17.86 13.7 17.56 13.86L16.53 14.21Z" fill="currentColor"/>
                  </svg>
                  <span className="btn-text">WhatsApp</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="trust-indicators">
                <div className="trust-item">
                  <div className="trust-icon-wrapper">
                    <svg className="trust-icon" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="trust-text">
                    <span>Google Certified</span>
                    <span>Partner Agency</span>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon-wrapper">
                    <svg className="trust-icon" viewBox="0 0 24 24" fill="none">
                      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.4 15C20.175 14.15 20.5 13 20.5 12C20.5 11 20.175 9.85 19.4 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.6 15C3.825 14.15 3.5 13 3.5 12C3.5 11 3.825 9.85 4.6 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 4.6C14.15 3.825 13 3.5 12 3.5C11 3.5 9.85 3.825 9 4.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 19.4C14.15 20.175 13 20.5 12 20.5C11 20.5 9.85 20.175 9 19.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="trust-text">
                    <span>5+ Years</span>
                    <span>Experience</span>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon-wrapper">
                    <svg className="trust-icon" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="trust-text">
                    <span>Expert</span>
                    <span>Team</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Experts</span>
                </div>
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support</span>
                </div>
              </div>
            </div>

            {/* Right Visual Section */}
            <div className="hero-visual-section">
              <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
              </div>
              
              {/* SEO Growth Slider */}
              <div className="seo-slider-container">
                <div className="seo-slider">
                  {seoGrowthImages.map((slide, index) => (
                    <div 
                      key={slide.id}
                      className={`seo-slide ${index === currentSlide ? 'active' : ''}`}
                      style={{
                        backgroundColor: slide.color,
                        transform: `translateX(${(index - currentSlide) * 100}%)`
                      }}
                    >
                      <div className="slide-content">
                        <div className="slide-icon">
                          {slide.id === 1 && '📈'}
                          {slide.id === 2 && '🔍'}
                          {slide.id === 3 && '💹'}
                          {slide.id === 4 && '💰'}
                        </div>
                        <h3 className="slide-title">{slide.title}</h3>
                        <p className="slide-description">{slide.description}</p>
                        <div className="slide-progress">
                          <div className="slide-progress-bar">
                            <div 
                              className="slide-progress-fill"
                              style={{
                                width: `${(index === currentSlide ? 100 : 0)}%`,
                                transition: index === currentSlide ? 'width 3s ease' : 'none'
                              }}
                            ></div>
                          </div>
                          <span className="slide-progress-text">Case Study #{slide.id}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Slider Dots */}
                <div className="slider-dots">
                  {seoGrowthImages.map((_, index) => (
                    <button
                      key={index}
                      className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => handleSlideClick(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Digital Dashboard */}
              <div className="dashboard-container" style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
              }}>
                <div className="dashboard-mockup">
                  <div className="dashboard-header">
                    <div className="dashboard-title">Digital Performance Dashboard</div>
                    <div className="dashboard-actions">
                      <div className="action-dot"></div>
                      <div className="action-dot"></div>
                      <div className="action-dot"></div>
                    </div>
                  </div>
                  
                  <div className="dashboard-content">
                    <div className="dashboard-item">
                      <div className="item-icon">📈</div>
                      <div className="item-content">
                        <div className="item-title">SEO Performance</div>
                        <div className="item-progress">
                          <div className="progress-bar" style={{ width: '85%' }}></div>
                          <span className="progress-text">85% Growth</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="dashboard-item">
                      <div className="item-icon">🌐</div>
                      <div className="item-content">
                        <div className="item-title">Website Traffic</div>
                        <div className="item-progress">
                          <div className="progress-bar" style={{ width: '92%' }}></div>
                          <span className="progress-text">92% Increase</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="dashboard-item">
                      <div className="item-icon">📱</div>
                      <div className="item-content">
                        <div className="item-title">Mobile Engagement</div>
                        <div className="item-progress">
                          <div className="progress-bar" style={{ width: '78%' }}></div>
                          <span className="progress-text">78% Users</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="dashboard-item">
                      <div className="item-icon">🎯</div>
                      <div className="item-content">
                        <div className="item-title">Conversion Rate</div>
                        <div className="item-progress">
                          <div className="progress-bar" style={{ width: '95%' }}></div>
                          <span className="progress-text">95% Success</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="dashboard-footer">
                    <div className="footer-stat">
                      <span className="stat-value">250+</span>
                      <span className="stat-label">Clients</span>
                    </div>
                    <div className="footer-stat">
                      <span className="stat-value">99%</span>
                      <span className="stat-label">Uptime</span>
                    </div>
                    <div className="footer-stat">
                      <span className="stat-value">30d</span>
                      <span className="stat-label">Delivery</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="floating-cards">
                <div className="floating-card card-1">
                  <div className="card-icon">🚀</div>
                  <div className="card-content">
                    <div className="card-title">Fast Results</div>
                    <div className="card-subtitle">30 Days Guarantee</div>
                  </div>
                </div>
                
                <div className="floating-card card-2">
                  <div className="card-icon">💎</div>
                  <div className="card-content">
                    <div className="card-title">Premium Quality</div>
                    <div className="card-subtitle">5-Star Service</div>
                  </div>
                </div>
                
                <div className="floating-card card-3">
                  <div className="card-icon">🛡️</div>
                  <div className="card-content">
                    <div className="card-title">Secure Solutions</div>
                    <div className="card-subtitle">GDPR Compliant</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span className="scroll-text">Scroll to explore</span>
      </div>
    </section>
  );
};

export default HeroSection;