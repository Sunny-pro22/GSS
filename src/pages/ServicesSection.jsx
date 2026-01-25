import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingGearsBackground from '../components/FloatingGearsBackground';
import ServiceCard from '../components/ServiceCard';
import './ServicesSection.css';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const servicesRef = useRef(null);
  const titleRef = useRef(null);
  const [activeService, setActiveService] = useState(null);

  const services = [
    {
      id: 'seo',
      emoji: '🎯',
      title: 'SEO & Digital Marketing',
      description: 'Comprehensive SEO optimization services to improve search rankings, drive organic traffic, and increase online visibility.',
      features: [
        'Technical SEO Audit & Optimization',
        'Keyword Research & Strategy',
        'On-Page & Off-Page SEO',
        'Local SEO for Businesses',
        'Content Marketing & Link Building',
        'Performance Analytics & Reporting'
      ],
      icon: 'fas fa-chart-line',
      keywords: ['SEO Services', 'Digital Marketing', 'Search Engine Optimization', 'Organic Traffic'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      stats: { projects: '250+', success: '95%', duration: '1-3' }
    },
    {
      id: 'web',
      emoji: '🌐',
      title: 'Web Development',
      description: 'Custom web development creating responsive, high-performance websites that convert visitors into customers.',
      features: [
        'Custom Website Development',
        'WordPress & CMS Solutions',
        'E-commerce Development',
        'Website Redesign & Migration',
        'Speed & Performance Optimization',
        'Ongoing Maintenance & Support'
      ],
      icon: 'fas fa-laptop-code',
      keywords: ['Web Development', 'Website Design', 'E-commerce', 'Responsive Design'],
      image: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      stats: { projects: '300+', success: '98%', duration: '2-4' }
    },
    {
      id: 'app',
      emoji: '📱',
      title: 'Mobile App Development',
      description: 'Professional mobile app development for iOS & Android platforms. Create user-friendly, feature-rich applications.',
      features: [
        'iOS & Android Native Apps',
        'Cross-Platform Development',
        'UI/UX Design & Prototyping',
        'App Store Optimization',
        'API Integration & Backend',
        'Maintenance & Updates'
      ],
      icon: 'fas fa-mobile-alt',
      keywords: ['App Development', 'Mobile Applications', 'iOS', 'Android Apps'],
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      stats: { projects: '150+', success: '96%', duration: '3-6' }
    },
    {
      id: 'google',
      emoji: '🏢',
      title: 'Google Business Optimization',
      description: 'Complete Google Business Profile management to dominate local search results and attract more customers.',
      features: [
        'Google Business Profile Setup',
        'Review Management & Responses',
        'Regular Posting & Updates',
        'Photo & Video Optimization',
        'Local SEO Integration',
        'Insights & Analytics Tracking'
      ],
      icon: 'fab fa-google',
      keywords: ['Google Business', 'Local SEO', 'Google Maps', 'Business Profile'],
      image: 'https://images.unsplash.com/photo-1551836026-d5c2c4c21c93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      stats: { projects: '400+', success: '97%', duration: '1-2' }
    },
    {
      id: 'social',
      emoji: '📊',
      title: 'Social Media Marketing',
      description: 'Strategic social media marketing to build brand presence, engage audiences, and drive conversions.',
      features: [
        'Social Media Strategy & Planning',
        'Content Creation & Management',
        'Paid Social Media Advertising',
        'Community Management',
        'Influencer Marketing',
        'Performance Analytics'
      ],
      icon: 'fas fa-users',
      keywords: ['Social Media Marketing', 'Facebook Ads', 'Instagram Marketing', 'Social Media Management'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      stats: { projects: '200+', success: '94%', duration: 'Ongoing' }
    },
    {
      id: 'ppc',
      emoji: '📢',
      title: 'PPC & Paid Advertising',
      description: 'Data-driven PPC advertising campaigns to generate immediate leads and maximize ROI for your business.',
      features: [
        'Google Ads Management',
        'Facebook & Instagram Ads',
        'Display Advertising',
        'Remarketing Campaigns',
        'Conversion Tracking',
        'ROI Optimization'
      ],
      icon: 'fas fa-bullhorn',
      keywords: ['PPC Services', 'Google Ads', 'Facebook Advertising', 'Paid Marketing'],
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      stats: { projects: '180+', success: '92%', duration: 'Monthly' }
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    // Animate service cards
    gsap.utils.toArray('.service-card-wrapper').forEach((card, i) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: i * 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="services-section" id="services" ref={servicesRef}>
      <FloatingGearsBackground />
      
      <div className="services-container">
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">Our Services</span>
          </div>
          <h2 ref={titleRef} className="section-title">
            Comprehensive <span className="gradient-text">Digital Solutions</span><br />
            for Business Growth
          </h2>
          <p className="section-subtitle">
            As a premier digital marketing agency, we offer end-to-end digital solutions to help businesses achieve their online goals. 
            From SEO and web development to social media marketing and PPC advertising, we provide customized strategies for measurable results.
          </p>
        </div>

        <div className="services-content">
          {/* Services Statistics */}
          <div className="services-stats">
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-content">
                <h3>500+</h3>
                <p>Projects Delivered</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-content">
                <h3>98%</h3>
                <p>Client Satisfaction</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🚀</div>
              <div className="stat-content">
                <h3>50+</h3>
                <p>Expert Team</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-content">
                <h3>24/7</h3>
                <p>Support Available</p>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {services.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                isActive={activeService === service.id}
                onHover={() => setActiveService(service.id)}
                onLeave={() => setActiveService(null)}
              />
            ))}
          </div>

          {/* Why Choose Us */}
          <div className="why-choose-us">
            <div className="why-content">
              <h3>Why Choose BRP Technology?</h3>
              <p>
                We are a leading digital marketing company with a proven track record of 
                delivering exceptional results for businesses across various industries. Our 
                client-centric approach and data-driven strategies set us apart.
              </p>
              
              <div className="advantages">
                <div className="advantage">
                  <div className="advantage-icon">✅</div>
                  <div className="advantage-content">
                    <h4>Google Certified Team</h4>
                    <p>Our professionals are certified by Google in digital marketing and analytics</p>
                  </div>
                </div>
                <div className="advantage">
                  <div className="advantage-icon">📊</div>
                  <div className="advantage-content">
                    <h4>Transparent Reporting</h4>
                    <p>Monthly performance reports with actionable insights and recommendations</p>
                  </div>
                </div>
                <div className="advantage">
                  <div className="advantage-icon">🎯</div>
                  <div className="advantage-content">
                    <h4>Customized Strategies</h4>
                    <p>Tailored solutions based on your business goals and industry requirements</p>
                  </div>
                </div>
                <div className="advantage">
                  <div className="advantage-icon">💼</div>
                  <div className="advantage-content">
                    <h4>Industry Experience</h4>
                    <p>5+ years of experience serving businesses across various industries</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="why-image">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Digital Strategy Session" 
                className="why-visual"
                loading="lazy"
              />
              <div className="image-badge">
                <span className="badge-dot"></span>
                <span>Trusted by 500+ Businesses</span>
              </div>
            </div>
          </div>

          {/* Our Process */}
          <div className="our-process">
            <h3>Our 5-Step Success Process</h3>
            <p className="process-subtitle">
              We follow a systematic approach to ensure your digital marketing success
            </p>
            
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">01</div>
                <div className="step-content">
                  <h4>Discovery & Analysis</h4>
                  <p>Comprehensive audit of your current digital presence, competitor analysis, and goal setting</p>
                </div>
                <div className="step-line"></div>
              </div>
              <div className="process-step">
                <div className="step-number">02</div>
                <div className="step-content">
                  <h4>Strategy Development</h4>
                  <p>Customized digital marketing plan with clear KPIs and timeline</p>
                </div>
                <div className="step-line"></div>
              </div>
              <div className="process-step">
                <div className="step-number">03</div>
                <div className="step-content">
                  <h4>Implementation</h4>
                  <p>Execution of strategies with regular updates and quality assurance</p>
                </div>
                <div className="step-line"></div>
              </div>
              <div className="process-step">
                <div className="step-number">04</div>
                <div className="step-content">
                  <h4>Monitoring & Optimization</h4>
                  <p>Continuous tracking, performance analysis, and strategy refinement</p>
                </div>
                <div className="step-line"></div>
              </div>
              <div className="process-step">
                <div className="step-number">05</div>
                <div className="step-content">
                  <h4>Reporting & Growth</h4>
                  <p>Detailed performance reports and recommendations for scaling</p>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Keywords */}
          <div className="seo-section">
            <h4>Digital Marketing Keywords We Target</h4>
            <div className="keyword-tags">
              <span className="keyword-tag">SEO Services</span>
              <span className="keyword-tag">Digital Marketing Agency</span>
              <span className="keyword-tag">Web Development Company</span>
              <span className="keyword-tag">Google Business Optimization</span>
              <span className="keyword-tag">Social Media Marketing</span>
              <span className="keyword-tag">PPC Advertising Services</span>
              <span className="keyword-tag">E-commerce Development</span>
              <span className="keyword-tag">Mobile App Development</span>
              <span className="keyword-tag">Local SEO Services</span>
              <span className="keyword-tag">Content Marketing Strategy</span>
            </div>
          </div>

          {/* CTA Section */}
          <div className="services-cta">
            <div className="cta-content">
              <h3>Get Your Free Digital Marketing Audit</h3>
              <p>
                Contact us today for a <strong>free comprehensive audit</strong> of your digital presence. 
                Our experts will analyze your website, SEO, social media, and PPC performance to 
                provide actionable insights and growth opportunities.
              </p>
              <div className="cta-buttons">
                <button className="btn-primary" onClick={scrollToContact}>
                  <span>Get Free Audit</span>
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
              </div>
            </div>
            <div className="cta-visual">
              <div className="visual-card">
                <div className="card-header">
                  <div className="card-icon">🎁</div>
                  <h5>Free Audit Includes:</h5>
                </div>
                <ul className="card-list">
                  <li>Website SEO Analysis</li>
                  <li>Competitor Analysis Report</li>
                  <li>Social Media Audit</li>
                  <li>Google Business Review</li>
                  <li>Actionable Recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;