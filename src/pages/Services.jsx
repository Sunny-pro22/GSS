import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSEO } from '../Hooks/useSEO';
import FloatingGearsBackground from '../components/FloatingGearsBackground';
import ServiceCard from '../components/ServiceCard';
import Services3DScene from '../components/Services3DScene';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const servicesRef = useRef(null);
  const titleRef = useRef(null);
  const modelRef = useRef(null);
  const [hoveredService, setHoveredService] = useState(null);

  useSEO({
    title: "Our Services | BRP Technology - Business Growth Solutions",
    description: "Comprehensive digital marketing, SEO, business profile optimization, and analytics services to grow your business.",
    canonical: "/services",
    keywords: "digital marketing services, SEO services, business optimization, analytics, BRP Technology"
  });

  const services = [
    {
      emoji: '📈',
      title: 'Business Profile Optimization',
      description: 'Maximize your online presence with optimized business profiles across all platforms.',
      features: ['Google Business Profile', 'Social Media Profiles', 'Local Directory Listings', 'Review Management'],
      model: 'profile'
    },
    {
      emoji: '🔍',
      title: 'SEO Services',
      description: 'Improve search engine rankings and drive organic traffic to your website.',
      features: ['Keyword Research', 'On-Page Optimization', 'Technical SEO', 'Content Strategy'],
      model: 'seo'
    },
    {
      emoji: '📱',
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to grow your online presence.',
      features: ['Social Media Marketing', 'PPC Advertising', 'Email Campaigns', 'Content Marketing'],
      model: 'marketing'
    },
    {
      emoji: '📊',
      title: 'Analytics & Reporting',
      description: 'Data-driven insights to measure performance and optimize strategies.',
      features: ['Performance Tracking', 'Custom Dashboards', 'ROI Analysis', 'Competitor Insights'],
      model: 'growth'
    },
    {
      emoji: '🎯',
      title: 'Local SEO',
      description: 'Dominate local search results and attract customers in your area.',
      features: ['Local Listings', 'Map Optimization', 'Local Reviews', 'Geo-Targeted Content'],
      model: 'seo'
    },
    {
      emoji: '⚡',
      title: 'Marketing Automation',
      description: 'Streamline your marketing efforts with automated workflows and systems.',
      features: ['CRM Integration', 'Lead Nurturing', 'Workflow Automation', 'Performance Analytics'],
      model: 'marketing'
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );

    // Animate model container
    gsap.fromTo(modelRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: modelRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <section className="services-page" ref={servicesRef}>
      <FloatingGearsBackground />
      
      <div className="services-container">
        <div className="section-header">
          <h1 ref={titleRef}>Our Business Services</h1>
          <p>Comprehensive digital solutions to grow your business and online presence</p>
        </div>

        <div className="services-layout">
          <div className="services-model-container" ref={modelRef}>
            <div className="services-3d-scene">
              <Services3DScene activeModel={hoveredService} />
            </div>
            <div className="model-info">
              <h3>Interactive 3D Visualization</h3>
              <p>Hover over services to see interactive models representing our solutions</p>
            </div>
          </div>

          <div className="services-cards-container">
            <div className="services-grid">
              {services.map((service, index) => (
                <ServiceCard 
                  key={index} 
                  service={service} 
                  index={index}
                  onHover={() => setHoveredService(service.model)}
                  onLeave={() => setHoveredService(null)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="services-cta">
          <h2>Ready to Transform Your Business?</h2>
          <p>Get a free consultation and discover how our services can drive your growth</p>
          <a href="/contact" className="btn btn-primary">Get Free Consultation</a>
        </div>
      </div>
    </section>
  );
};

export default Services;