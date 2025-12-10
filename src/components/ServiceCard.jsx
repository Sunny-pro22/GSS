import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServiceCard.css';

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ service, index, onHover, onLeave }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 100, opacity: 0, rotationY: 180 },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [index]);

  return (
    <div 
      className={`service-card ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      ref={cardRef}
    >
      <div className="service-card-inner">
        <div className="service-card-front">
          <div className="service-icon">
            <span className="service-emoji">{service.emoji}</span>
          </div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <div className="flip-indicator">Click to learn more →</div>
        </div>
        
        <div className="service-card-back">
          <h3>{service.title}</h3>
          <ul className="service-features">
            {service.features.map((feature, featureIndex) => (
              <li key={featureIndex}>{feature}</li>
            ))}
          </ul>
          <a href="/contact" className="service-cta" onClick={(e) => e.stopPropagation()}>
            Get Started
          </a>
          <div className="flip-indicator">← Click to go back</div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;