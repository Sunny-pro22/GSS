import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSEO } from '../Hooks/useSEO';
import FloatingGearsBackground from '../components/FloatingGearsBackground';
import Hero3DScene from '../components/Hero3DScene';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useSEO({
    title: "BRP Technology - Business Growth & Digital Excellence",
    description: "BRP Technology specializes in business profile optimization, digital marketing, and SEO services to drive your business growth.",
    canonical: "/",
    keywords: "BRP Technology, business profile, digital marketing, SEO services, Google Business, digital solutions"
  });

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(ctaRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.3"
    );
  }, []);

  return (
    <section className="home-page" ref={heroRef}>
      <FloatingGearsBackground />
      
      <div className="home-content">
        <div className="home-text">
          <h1 className="home-title" ref={titleRef}>
            Business Growth 
            <span className="gradient-text"> Digital Excellence</span>
          </h1>
          <p className="home-description" ref={subtitleRef}>
            BRP Technology specializes in business profile optimization, digital marketing, 
            and SEO services to drive measurable growth and online presence for your business.
          </p>
          <div className="home-buttons" ref={ctaRef}>
            <Link to="/services" className="btn btn-primary">
              Explore Services
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get Started
            </Link>
          </div>
          
          <div className="home-stats">
            {/* <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Businesses Served</div>
            </div> */}
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
          </div>
        </div>
        
        <div className="home-visual">
          <Hero3DScene />
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-wheel"></div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Home;