// ServiceDetailModal.js - New component for service details
import React, { useEffect, useRef, useState } from 'react';
import './ServiceDetailModal.css';

const ServiceDetailModal = ({ service, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Sample images for each service (you can add more)
  const serviceImages = {
    seo: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    web: [
      'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    app: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    google: [
      'https://images.unsplash.com/photo-1551836026-d5c2c4c21c93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    social: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    ppc: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ]
  };

  const images = serviceImages[service.id] || [service.image];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset image slider
      setCurrentImage(0);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const scrollToContact = () => {
    onClose();
    const element = document.getElementById('contact');
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="service-modal-overlay" onClick={handleOverlayClick}>
      <div className="service-modal-content" ref={modalRef}>
        {/* Close button */}
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>

        <div className="modal-header">
          <div className="service-icon-large">
            <span className="service-emoji">{service.emoji}</span>
          </div>
          <h2>{service.title}</h2>
          <p className="modal-subtitle">
            {service.description}
          </p>
        </div>

        <div className="modal-body">
          {/* Image Slider */}
          <div className="image-slider">
            <div className="slider-container">
              <img 
                src={images[currentImage]} 
                alt={`${service.title} - Image ${currentImage + 1}`}
                className="slider-image"
              />
              
              {images.length > 1 && (
                <>
                  <button className="slider-btn prev" onClick={prevImage}>
                    ‹
                  </button>
                  <button className="slider-btn next" onClick={nextImage}>
                    ›
                  </button>
                  
                  <div className="slider-dots">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        className={`slider-dot ${index === currentImage ? 'active' : ''}`}
                        onClick={() => setCurrentImage(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Detailed Content */}
          <div className="service-details">
            {/* Features Section */}
            <div className="details-section">
              <h3>Our Expertise</h3>
              <div className="features-grid">
                {service.features.map((feature, index) => (
                  <div key={index} className="feature-item-detailed">
                    <div className="feature-icon">✓</div>
                    <div className="feature-content">
                      <h4>{feature}</h4>
                      <p>Expert implementation with proven results</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div className="details-section">
              <h3>Performance Metrics</h3>
              <div className="stats-grid-detailed">
                <div className="stat-detailed">
                  <div className="stat-value-detailed">{service.stats.projects}</div>
                  <div className="stat-label-detailed">Projects Completed</div>
                  <div className="stat-desc">Across various industries</div>
                </div>
                <div className="stat-detailed">
                  <div className="stat-value-detailed">{service.stats.success}</div>
                  <div className="stat-label-detailed">Success Rate</div>
                  <div className="stat-desc">Client satisfaction</div>
                </div>
                <div className="stat-detailed">
                  <div className="stat-value-detailed">{service.stats.duration}</div>
                  <div className="stat-label-detailed">Average Timeline</div>
                  <div className="stat-desc">From start to results</div>
                </div>
              </div>
            </div>

            {/* Process Section */}
            <div className="details-section">
              <h3>Our Process</h3>
              <div className="process-steps-detailed">
                <div className="process-step-detailed">
                  <div className="step-number">01</div>
                  <div className="step-content">
                    <h4>Consultation & Analysis</h4>
                    <p>We analyze your current digital presence and understand your goals</p>
                  </div>
                </div>
                <div className="process-step-detailed">
                  <div className="step-number">02</div>
                  <div className="step-content">
                    <h4>Strategy Development</h4>
                    <p>Customized plan tailored to your business needs</p>
                  </div>
                </div>
                <div className="process-step-detailed">
                  <div className="step-number">03</div>
                  <div className="step-content">
                    <h4>Implementation</h4>
                    <p>Expert execution with regular updates</p>
                  </div>
                </div>
                <div className="process-step-detailed">
                  <div className="step-number">04</div>
                  <div className="step-content">
                    <h4>Results & Optimization</h4>
                    <p>Continuous monitoring and improvement</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="details-section">
              <h3>Benefits</h3>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <div className="benefit-icon">🚀</div>
                  <h4>Increased Visibility</h4>
                  <p>Get noticed by your target audience</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">💰</div>
                  <h4>Better ROI</h4>
                  <p>Maximize returns on your investment</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">📈</div>
                  <h4>Sustainable Growth</h4>
                  <p>Long-term success strategies</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🏆</div>
                  <h4>Expert Support</h4>
                  <p>Dedicated team of professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="modal-footer">
          <div className="cta-content">
            <h3>Ready to Transform Your Business?</h3>
            <p>Get started with our {service.title.toLowerCase()} services today</p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={scrollToContact}>
                <span>Get Started</span>
                <svg className="btn-arrow" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <a 
                href="tel:+917042576047" 
                className="btn-secondary"
              >
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M20 15.5C18.75 15.5 17.55 15.3 16.43 14.93C16.08 14.82 15.69 14.9 15.41 15.17L13.21 17.37C10.38 15.93 8.06 13.62 6.62 10.79L8.82 8.59C9.1 8.31 9.18 7.92 9.07 7.57C8.7 6.45 8.5 5.25 8.5 4C8.5 3.45 8.05 3 7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.5C21 15.95 20.55 15.5 20 15.5Z" fill="currentColor"/>
                </svg>
                <span>Call +91 7042576047</span>
              </a>
              <a 
                href="https://wa.me/917042576047" 
                className="btn-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="whatsapp-icon" viewBox="0 0 24 24" fill="none">
                  <path d="M19.05 4.91C17.18 3.03 14.69 2 12.04 2C6.54 2 2.03 6.53 2.03 12.03C2.03 13.67 2.42 15.26 3.17 16.67L2.05 22L7.46 20.88C8.85 21.63 10.44 22 12.07 22C17.57 22 22.06 17.5 22.06 12C22.06 9.36 21.03 6.87 19.05 4.91Z" fill="currentColor"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;