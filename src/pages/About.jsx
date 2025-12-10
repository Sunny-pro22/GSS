import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSEO } from '../Hooks/useSEO';
import FloatingGearsBackground from '../components/FloatingGearsBackground';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);

  useSEO({
    title: "About BRP Technology - Your Digital Growth Partner",
    description: "Learn about BRP Technology's mission, expertise, and commitment to driving business growth through digital excellence.",
    canonical: "/about",
    keywords: "about BRP Technology, company mission, business expertise, digital solutions team"
  });

  useEffect(() => {
    gsap.fromTo('.about-content',
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section id="about" className="about-page" ref={aboutRef}>
      <FloatingGearsBackground />
      
      <div className="about-container">
        <div className="section-header">
          <h1>About BRP Technology</h1>
          <p>Your Partner in Digital Business Growth</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              At BRP Technology, we specialize in helping businesses establish and grow their 
              digital presence through comprehensive business profile optimization and digital 
              marketing strategies.
            </p>
            <p>
              Our team of experts combines technical expertise with business acumen to deliver 
              measurable results that drive growth and increase online visibility.
            </p>
            
            <div className="business-highlights">
              <div className="highlight-item">
                <h3>🏢 Business Focused</h3>
                <p>Strategies designed to drive real business results and ROI</p>
              </div>
              <div className="highlight-item">
                <h3>📊 Data Driven</h3>
                <p>Decisions based on analytics and performance metrics</p>
              </div>
              <div className="highlight-item">
                <h3>⚡ Results Oriented</h3>
                <p>Focused on delivering measurable growth and success</p>
              </div>
            </div>
          </div>

          <div className="about-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Businesses Served</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">95%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Experts</div>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h2>Our Expertise</h2>
          <div className="expertise-grid">
            <div className="expertise-item">
              <div className="expertise-icon">🎯</div>
              <h3>Digital Strategy</h3>
              <p>Comprehensive digital transformation strategies tailored to your business</p>
            </div>
            <div className="expertise-item">
              <div className="expertise-icon">🔧</div>
              <h3>Technical Excellence</h3>
              <p>Advanced technical solutions for optimal performance and scalability</p>
            </div>
            <div className="expertise-item">
              <div className="expertise-icon">📈</div>
              <h3>Growth Analytics</h3>
              <p>Data-driven insights to track performance and optimize growth</p>
            </div>
            <div className="expertise-item">
              <div className="expertise-icon">🤝</div>
              <h3>Partnership Approach</h3>
              <p>We work as an extension of your team, not just as service providers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;