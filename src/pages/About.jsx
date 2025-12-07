// src/pages/About.jsx
import React, { useEffect } from 'react';
import './About.css';

const About = () => {
  useEffect(() => {
    document.title = "About Us - BRP Technology | Digital Marketing Agency";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about BRP Technology - a leading digital marketing agency specializing in SEO, SMO, and web design services with proven results.');
    }
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Raj Sharma",
      position: "CEO & Founder",
      description: "Digital marketing expert with 10+ years of experience driving business growth through innovative strategies.",
      avatar: "👨‍💼"
    },
    {
      id: 2,
      name: "Priya Patel",
      position: "SEO Director",
      description: "Specialized in search engine optimization strategies that deliver measurable results and ROI.",
      avatar: "👩‍💻"
    },
    {
      id: 3,
      name: "Amit Kumar",
      position: "Web Design Lead",
      description: "Creative designer focused on creating exceptional user experiences that convert visitors to customers.",
      avatar: "🎨"
    },
    {
      id: 4,
      name: "Neha Gupta",
      position: "SMO Manager",
      description: "Social media strategist building engaged communities and driving brand awareness across platforms.",
      avatar: "📱"
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Team Members" },
    { number: "5+", label: "Years Experience" }
  ];

  return (
    <>
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About BRP Technology</h1>
            <p className="hero-subtitle">Driving Digital Success Since 2018</p>
            <p className="hero-description">
              We are a passionate team of digital marketers, developers, and designers dedicated to 
              helping businesses thrive in the digital landscape. Our innovative strategies and 
              cutting-edge technology solutions have helped hundreds of clients achieve remarkable growth.
            </p>
          </div>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To empower businesses with innovative digital solutions that drive sustainable growth, enhance online presence, and deliver measurable ROI through data-driven strategies.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">👁️</div>
              <h3>Our Vision</h3>
              <p>To be the most trusted digital marketing partner for businesses worldwide, recognized for excellence, innovation, and unwavering commitment to client success.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">💎</div>
              <h3>Our Values</h3>
              <p>Integrity, innovation, collaboration, and results-driven approach form the foundation of everything we do at BRP Technology.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our <span className="text-gradient">Team</span></h2>
            <p>The talented professionals behind our success story</p>
          </div>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card">
                <div className="team-avatar">{member.avatar}</div>
                <h3>{member.name}</h3>
                <p className="team-position">{member.position}</p>
                <p className="team-description">{member.description}</p>
                <div className="team-social">
                  <span title="Email">📧</span>
                  <span title="LinkedIn">💼</span>
                  <span title="Twitter">🐦</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our <span className="text-gradient">Story</span></h2>
              <p>
                BRP Technology was founded in 2018 with a simple yet powerful vision: to make 
                world-class digital marketing accessible to businesses of all sizes. What started 
                as a small team of three passionate individuals has grown into a full-service 
                digital agency serving clients across the globe.
              </p>
              <p>
                We believe in building long-term partnerships with our clients, focusing on 
                understanding their unique needs and delivering customized solutions that drive 
                real business growth and sustainable success.
              </p>
              <div className="story-highlights">
                <div className="highlight">
                  <strong>2018</strong>
                  <span>Company Founded</span>
                </div>
                <div className="highlight">
                  <strong>2020</strong>
                  <span>50+ Clients Served</span>
                </div>
                <div className="highlight">
                  <strong>2023</strong>
                  <span>Global Expansion</span>
                </div>
              </div>
            </div>
            <div className="story-image">
              <div className="image-placeholder">
                <span>Our Journey</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;