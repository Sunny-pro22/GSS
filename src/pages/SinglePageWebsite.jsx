import React, { useEffect } from 'react';
import { useSEO } from '../hooks/useSEO';
import FloatingGearsBackground from '../components/FloatingGearsBackground';
import HeroSection from './HomeSection';
import ServicesSection from './ServicesSection';
import AboutSection from './About';
import ContactSection from './ContactSection';
import './SinglePageWebsite.css';

const SinglePageWebsite = () => {
  useSEO({
    title: "BRP Technology | Digital Marketing & SEO Services Company in Delhi",
    description: "BRP Technology Pvt Ltd - Top digital marketing agency in Delhi offering SEO, web development, app development, Google Business optimization & social media marketing services. Grow your business online with our expert solutions.",
    canonical: "/",
    keywords: "digital marketing Delhi, SEO company Delhi, web development Delhi, app development, Google Business optimization, social media marketing, BRP Technology, digital agency Delhi"
  });

  useEffect(() => {
    // Add smooth scrolling to anchor links
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const id = href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    return () => {
      anchorLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="single-page-website">
      <FloatingGearsBackground />
      
      {/* Hero Section */}
      <section id="home" className="page-section hero-section">
        <HeroSection />
      </section>
      
      {/* Services Section */}
      <section id="services" className="page-section services-section">
        <ServicesSection />
      </section>
      
      {/* About Section */}
      <section id="about" className="page-section about-section">
        <AboutSection />
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="page-section contact-section">
        <ContactSection />
      </section>
    </div>
  );
};

export default SinglePageWebsite;