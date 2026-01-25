import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceCard.css';

const ServiceCard = ({ service, isActive, onHover, onLeave }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/services/${service.id}`, { state: { service } });
  };

  const getGradientColor = (id) => {
    const gradients = {
      'seo': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'web': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'app': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'google': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'social': 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      'ppc': 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)'
    };
    return gradients[id] || gradients.seo;
  };

  return (
    <div 
      className="service-card-wrapper"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={handleCardClick}
    >
      <div className="service-card">
        {/* Card Header */}
        <div className="card-header">
          <div 
            className="service-icon"
            style={{ background: getGradientColor(service.id) }}
          >
            <span className="service-emoji">{service.emoji}</span>
          </div>
          <h3 className="service-title">{service.title}</h3>
        </div>

        {/* Description */}
        <p className="service-description">
          {service.description}
        </p>

        {/* Features */}
        <div className="service-features">
          <ul className="feature-list">
            {service.features.slice(0, 3).map((feature, index) => (
              <li className="feature-item" key={index}>
                <span className="feature-icon">✓</span>
                <span className="feature-text">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stats & CTA */}
        <div className="card-footer">
          <div className="service-stats">
            <div className="stat-item">
              <div className="stat-value">{service.stats.projects}</div>
              <div className="stat-label">Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{service.stats.success}</div>
              <div className="stat-label">Success</div>
            </div>
          </div>
          
          <button className="card-cta">
            Learn More
            <svg className="arrow-icon" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Hover Effect */}
        <div className="card-hover-effect"></div>
      </div>
    </div>
  );
};

export default ServiceCard;