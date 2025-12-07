// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  useEffect(() => {
    document.title = "BRP Technology - Digital Marketing Solutions";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'BRP Technology provides expert SEO, SMO, Web Design, and digital marketing services to boost your online presence.');
    }

    // Add scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, observerOptions);

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: "🚀",
      title: "Proven Results",
      description: "We deliver measurable results that drive business growth and increase ROI.",
      link: "/about"
    },
    {
      icon: "💡",
      title: "Innovative Strategies",
      description: "Stay ahead with cutting-edge digital marketing strategies tailored to your business.",
      link: "/services"
    },
    {
      icon: "🤝",
      title: "Dedicated Support",
      description: "Your success is our priority with 24/7 dedicated support and regular progress updates.",
      link: "/contact"
    }
  ];

  const services = [
    {
      icon: "🔍",
      title: "SEO Optimization",
      description: "Boost your search engine rankings and drive organic traffic with our comprehensive SEO strategies.",
      features: ["Keyword Research", "On-Page Optimization", "Technical SEO", "Content Strategy"]
    },
    {
      icon: "📱",
      title: "Social Media Marketing",
      description: "Enhance your brand presence and engagement across all major social media platforms.",
      features: ["Content Strategy", "Community Management", "Paid Advertising", "Analytics & Reporting"]
    },
    {
      icon: "💻",
      title: "Web Design & Development",
      description: "Create stunning, responsive websites that convert visitors into loyal customers.",
      features: ["UI/UX Design", "Responsive Development", "E-commerce Solutions", "Performance Optimization"]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              🚀 Trusted by 500+ Businesses Worldwide
            </div>
            <h1>Transform Your Digital Presence With Expert Marketing</h1>
            <p>
              We help businesses grow their online presence with cutting-edge SEO, 
              social media marketing, and web design solutions that deliver real results.
            </p>
            <div className="hero-buttons">
              <Link to="/services" className="btn btn-primary">
                Explore Our Services
                <span>→</span>
              </Link>
              <Link to="/contact" className="btn btn-outline" style={{color: 'white', borderColor: 'white'}}>
                Get Free Consultation
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item" data-animate>
                <div className="stat-number">98%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div className="stat-item" data-animate>
                <div className="stat-number">500+</div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item" data-animate>
                <div className="stat-number">5+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item" data-animate>
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header" data-animate>
            <h2>Why Choose <span className="text-gradient">BRP Technology</span></h2>
            <p>We combine expertise with innovation to deliver exceptional results</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card" data-animate>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <Link to={feature.link} className="feature-link">
                  Learn More
                  <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="services-preview">
        <div className="container">
          <div className="section-header" data-animate>
            <h2>Our <span className="text-gradient">Premium Services</span></h2>
            <p>Comprehensive digital marketing solutions tailored to your business needs</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card" data-animate>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <Link to="/services" className="btn btn-outline">
                  Discover More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content" data-animate>
            <h2>Ready to Transform Your Business?</h2>
            <p>
              Join hundreds of successful businesses that have accelerated their growth 
              with our proven digital marketing strategies. Let's build something amazing together.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Start Your Project
                <span>🚀</span>
              </Link>
              <Link to="/about" className="btn btn-outline" style={{color: 'white', borderColor: 'white'}}>
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;