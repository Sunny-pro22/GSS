// pages/ServiceDetailPage.js
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import './ServiceDetailPage.css';

const ServiceDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (!service) {
      navigate('/');
      return;
    }

    // Animation on page load
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
    );

    gsap.fromTo(imageRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, delay: 0.4 }
    );

    gsap.fromTo('.content-block',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.6 }
    );
  }, [service, navigate]);

  if (!service) return null;

  const handleBack = () => {
    navigate(-1);
  };

  const handleContactClick = () => {
    navigate('/#contact');
  };

  return (
    <div className="service-detail-page">
      {/* Header with gradient background */}
      <header className="service-header">
        <div className="container">
          <button className="back-button" onClick={handleBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Services
          </button>
          
          <div className="header-content">
            <div className="header-text">
              <span className="service-category">Digital Marketing Service</span>
              <h1 ref={titleRef}>{service.title}</h1>
              <p className="service-tagline">{service.description}</p>
              
              <div className="header-stats">
                <div className="header-stat">
                  <span className="stat-value">{service.stats.projects}</span>
                  <span className="stat-label">Projects Delivered</span>
                </div>
                <div className="header-stat">
                  <span className="stat-value">{service.stats.success}</span>
                  <span className="stat-label">Success Rate</span>
                </div>
                <div className="header-stat">
                  <span className="stat-value">{service.stats.duration || 'Custom'}</span>
                  <span className="stat-label">Timeline</span>
                </div>
              </div>
            </div>
            
            <div className="header-image" ref={imageRef}>
              <div className="image-wrapper">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="service-main-image"
                />
                <div className="image-overlay"></div>
                <div className="service-emoji-large">{service.emoji}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="service-content" ref={contentRef}>
        <div className="container">
          {/* Overview Section */}
          <section className="content-block overview-section">
            <h2>Service Overview</h2>
            <div className="overview-content">
              <div className="overview-text">
                <p>
                  As a leading <strong>digital marketing agency in Delhi NCR</strong>, BRP Technology provides 
                  comprehensive {service.title.toLowerCase()} solutions tailored to your business needs. Our 
                  data-driven approach ensures measurable results and sustainable growth for 
                  businesses across various industries in Delhi and surrounding areas.
                </p>
                <p>
                  We combine industry expertise with cutting-edge technology to deliver exceptional 
                  results. Our team of certified professionals works closely with you to understand 
                  your goals and create customized strategies for maximum impact.
                </p>
              </div>
              
              <div className="overview-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">🎯</div>
                  <div className="highlight-content">
                    <h4>Targeted Strategy</h4>
                    <p>Customized approach for Delhi NCR market</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">📊</div>
                  <div className="highlight-content">
                    <h4>Data-Driven Results</h4>
                    <p>Measurable KPIs and performance tracking</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">⚡</div>
                  <div className="highlight-content">
                    <h4>Quick Implementation</h4>
                    <p>Fast deployment with minimal disruption</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features & Benefits */}
          <section className="content-block features-section">
            <h2>Key Features & Benefits</h2>
            <div className="features-grid">
              {service.features.map((feature, index) => (
                <div className="feature-card" key={index}>
                  <div className="feature-number">0{index + 1}</div>
                  <h4>{feature}</h4>
                  <p>
                    Comprehensive implementation with regular monitoring and 
                    optimization to ensure maximum effectiveness for your business.
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Our Approach */}
          <section className="content-block approach-section">
            <h2>Our Strategic Approach</h2>
            <div className="approach-steps">
              <div className="approach-step">
                <div className="step-icon">🔍</div>
                <div className="step-content">
                  <h3>Discovery & Analysis</h3>
                  <p>We begin with a comprehensive audit of your current digital presence, competitor analysis, and goal setting specific to the Delhi market.</p>
                </div>
              </div>
              <div className="approach-step">
                <div className="step-icon">📋</div>
                <div className="step-content">
                  <h3>Strategy Development</h3>
                  <p>Customized plan with clear KPIs, timeline, and deliverables tailored to your business objectives and budget.</p>
                </div>
              </div>
              <div className="approach-step">
                <div className="step-icon">🚀</div>
                <div className="step-content">
                  <h3>Implementation</h3>
                  <p>Expert execution with regular updates, quality assurance, and transparent communication throughout the process.</p>
                </div>
              </div>
              <div className="approach-step">
                <div className="step-icon">📈</div>
                <div className="step-content">
                  <h3>Optimization & Growth</h3>
                  <p>Continuous monitoring, performance analysis, and strategy refinement for sustained growth and ROI maximization.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Target Keywords */}
          <section className="content-block keywords-section">
            <h2>Target Keywords for Delhi Market</h2>
            <div className="keywords-tags">
              {service.keywords.map((keyword, index) => (
                <span className="keyword-tag" key={index}>{keyword}</span>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="content-block cta-section">
            <div className="cta-card">
              <div className="cta-content">
                <h3>Get Started with Our {service.title}</h3>
                <p>
                  Ready to elevate your digital presence in Delhi? Contact us today for a 
                  <strong> free consultation</strong> and customized proposal. Our experts will 
                  analyze your needs and create a tailored strategy for your business growth.
                </p>
                
                <div className="cta-buttons">
                  <button className="btn-primary" onClick={handleContactClick}>
                    <span>Get Free Consultation</span>
                    <svg className="btn-arrow" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  <a href="tel:+917042576047" className="btn-secondary">
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                      <path d="M20 15.5C18.75 15.5 17.55 15.3 16.43 14.93C16.08 14.82 15.69 14.9 15.41 15.17L13.21 17.37C10.38 15.93 8.06 13.62 6.62 10.79L8.82 8.59C9.1 8.31 9.18 7.92 9.07 7.57C8.7 6.45 8.5 5.25 8.5 4C8.5 3.45 8.05 3 7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.5C21 15.95 20.55 15.5 20 15.5Z" fill="currentColor"/>
                    </svg>
                    <span>Call +91 7042576047</span>
                  </a>
                </div>
              </div>
              
              <div className="cta-offer">
                <div className="offer-badge">
                  <span className="badge-icon">🎁</span>
                  <span className="badge-text">Special Offer for Delhi Businesses</span>
                </div>
                <ul className="offer-list">
                  <li>✅ Free Initial Consultation</li>
                  <li>✅ Customized Strategy Report</li>
                  <li>✅ 30-Day Performance Guarantee</li>
                  <li>✅ Dedicated Account Manager</li>
                  <li>✅ Monthly Progress Reports</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Related Services */}
          <section className="content-block related-section">
            <h2>Other Services You Might Like</h2>
            <p className="section-subtitle">
              Explore our other digital marketing services tailored for Delhi businesses
            </p>
            
            <div className="related-services">
              <div className="related-service">
                <div className="related-icon">🎯</div>
                <div className="related-content">
                  <h4>SEO & Digital Marketing</h4>
                  <p>Comprehensive SEO strategies to improve search rankings and drive organic traffic</p>
                  <button 
                    className="related-link"
                    onClick={() => navigate('/services/seo')}
                  >
                    Learn More →
                  </button>
                </div>
              </div>
              
              <div className="related-service">
                <div className="related-icon">🌐</div>
                <div className="related-content">
                  <h4>Web Development</h4>
                  <p>Custom websites and e-commerce solutions for optimal performance</p>
                  <button 
                    className="related-link"
                    onClick={() => navigate('/services/web')}
                  >
                    Learn More →
                  </button>
                </div>
              </div>
              
              <div className="related-service">
                <div className="related-icon">📱</div>
                <div className="related-content">
                  <h4>Mobile App Development</h4>
                  <p>Native and cross-platform mobile applications for iOS & Android</p>
                  <button 
                    className="related-link"
                    onClick={() => navigate('/services/app')}
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ServiceDetailPage;