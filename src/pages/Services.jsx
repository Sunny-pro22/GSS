// src/pages/Services.jsx
import React, { useEffect } from 'react';
import './Services.css';

const Services = () => {
  useEffect(() => {
    document.title = "Our Services - BRP Technology";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our comprehensive digital marketing services including SEO, SMO, Web Design, and PPC management.');
    }
  }, []);

  const services = [
    {
      id: 1,
      title: "SEO Services",
      icon: "🚀",
      description: "Comprehensive search engine optimization strategies to improve your website's visibility and drive organic traffic growth.",
      features: ["Keyword Research & Analysis", "On-Page Optimization", "Technical SEO Audit", "Content Strategy Development", "Link Building Campaigns", "Local SEO Optimization", "Performance Tracking & Reporting"]
    },
    {
      id: 2,
      title: "SMO Services",
      icon: "📱",
      description: "Social media optimization to enhance your brand's social presence and engage with your target audience effectively.",
      features: ["Social Media Strategy", "Content Creation & Curation", "Community Management", "Paid Social Advertising", "Influencer Partnerships", "Analytics & Performance Reporting", "Crisis Management"]
    },
    {
      id: 3,
      title: "Web Design & Development",
      icon: "💻",
      description: "Custom website design and development services focused on creating exceptional user experiences that drive conversions.",
      features: ["Responsive Web Design", "UI/UX Design", "E-commerce Solutions", "WordPress Development", "Website Maintenance", "Performance Optimization", "Security Implementation"]
    },
    {
      id: 4,
      title: "PPC Management",
      icon: "🎯",
      description: "Strategic pay-per-click campaigns to drive targeted traffic and maximize your advertising ROI across platforms.",
      features: ["Google Ads Management", "Facebook & Instagram Ads", "Campaign Strategy & Setup", "Conversion Rate Optimization", "A/B Testing", "ROI Analysis", "Budget Management"]
    }
  ];

  const processSteps = [
    {
      title: "Discovery & Analysis",
      description: "We begin by understanding your business goals, target audience, and current digital presence."
    },
    {
      title: "Strategy Development",
      description: "Our experts create a customized digital marketing strategy tailored to your specific needs."
    },
    {
      title: "Implementation",
      description: "We execute the strategy with precision, using the latest tools and best practices."
    },
    {
      title: "Optimization & Reporting",
      description: "Continuous monitoring, optimization, and detailed reporting to ensure maximum results."
    }
  ];

  return (
    <>
      <section className="services-hero">
        <div className="container">
          <h1>Our Digital Marketing Services</h1>
          <p>Comprehensive solutions designed to drive your business growth and maximize online potential</p>
        </div>
      </section>

      <section className="services-detail">
        <div className="container">
          <div className="services-list">
            {services.map(service => (
              <div key={service.id} className="service-detail-card">
                <div className="service-header">
                  <div className="service-icon-large">{service.icon}</div>
                  <h2>{service.title}</h2>
                </div>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <button className="service-cta">Get Started</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2>Our <span className="text-gradient">Process</span></h2>
            <p>How we deliver exceptional results for your business</p>
          </div>
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;