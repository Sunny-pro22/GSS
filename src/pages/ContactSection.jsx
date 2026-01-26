import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../Hooks/useTheme';
import FloatingGearsBackground from '../components/FloatingGearsBackground';
import './ContactSection.css';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const contactRef = useRef(null);
  const { isDarkTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
    loading: false
  });

  useEffect(() => {
    gsap.fromTo('.contact-form',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    gsap.fromTo('.contact-info-card',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ 
        submitted: true, 
        error: true, 
        loading: false,
        message: 'Please fill in all required fields.' 
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus({ 
        submitted: true, 
        error: true, 
        loading: false,
        message: 'Please enter a valid email address.' 
      });
      return;
    }

    setFormStatus({ submitted: false, error: false, message: '', loading: true });

    // Create form data for Formspree
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    
    try {
      const response = await fetch('https://formspree.io/f/xeoyljbe', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus({ 
          submitted: true, 
          error: false, 
          loading: false,
          message: 'Thank you! We will contact you within 24 hours.' 
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
        
      } else {
        throw new Error('Form submission failed');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({ 
        submitted: true, 
        error: true, 
        loading: false,
        message: 'Oops! There was a problem. Please try again or contact us directly.' 
      });
    }
  };

  const services = [
    'SEO Services',
    'Web Development',
    'App Development',
    'Digital Marketing',
    'Google Business Optimization',
    'Social Media Management',
    'Other'
  ];

  return (
    <section className="contact-section" ref={contactRef}>
      <FloatingGearsBackground />
      
      <div className="contact-container">
        <div className="section-header">
          <h2>Get In Touch With Us</h2>
          <p className="section-subtitle">
            Ready to grow your business? Contact our digital marketing experts in Delhi for a free consultation.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info-simple">
            <div className="contact-info-card">
              <h3>Contact Information</h3>
              <div className="contact-details-simple">
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4>Our Location</h4>
                    <p>Dwarka, Delhi, India</p>
                    <p className="address-note">Serving clients across Delhi NCR and nationwide</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:team@brptechnology.com">team@brptechnology.com</a>
                    <a href="mailto:sales@brptechnology.com">sales@brptechnology.com</a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4>Phone & WhatsApp</h4>
                    <a href="tel:+917042576047">+(91) 7042576047</a>
                    <a href="https://wa.me/917042576047" className="whatsapp-link">
                      <i className="fab fa-whatsapp"></i> Chat on WhatsApp
                    </a>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h4>Business Hours</h4>
                    <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                    <p>Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="office-image">
                <img 
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="BRP Technology Office" 
                  className="office-visual"
                />
                <div className="office-badge">
                  <span>📍</span>
                  <p>Based in Delhi, Serving Worldwide</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-intro">
                <h3>Send Us a Message</h3>
                <p>Fill out the form below and our digital marketing experts will get back to you within 24 hours.</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="fas fa-user"></i> Your Name *
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    placeholder="Enter your full name" 
                    className="form-input" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={formStatus.loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope"></i> Email Address *
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    placeholder="your@email.com" 
                    className="form-input" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={formStatus.loading}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="fas fa-phone"></i> Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    placeholder="+91 9876543210" 
                    className="form-input" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={formStatus.loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">
                    <i className="fas fa-building"></i> Company Name
                  </label>
                  <input 
                    type="text" 
                    id="company"
                    name="company"
                    placeholder="Your company name" 
                    className="form-input" 
                    value={formData.company}
                    onChange={handleInputChange}
                    disabled={formStatus.loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="service">
                  <i className="fas fa-cogs"></i> Service Interested In
                </label>
                <select 
                  id="service"
                  name="service"
                  className="form-input"
                  value={formData.service}
                  onChange={handleInputChange}
                  disabled={formStatus.loading}
                >
                  <option value="">Select a service</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <i className="fas fa-comment"></i> Your Message *
                </label>
                <textarea 
                  id="message"
                  name="message"
                  placeholder="Tell us about your project, goals, and any specific requirements..." 
                  rows="5" 
                  className="form-input" 
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={formStatus.loading}
                ></textarea>
              </div>

              <div className="form-checkbox">
                <input 
                  type="checkbox" 
                  id="privacy" 
                  name="privacy"
                  required
                  disabled={formStatus.loading}
                />
                <label htmlFor="privacy">
                  I agree to the <Link to="/privacy">Privacy Policy</Link> and allow BRP Technology to contact me regarding my inquiry. *
                </label>
              </div>
              
              {formStatus.submitted && (
                <div className={`form-message ${formStatus.error ? 'error' : 'success'}`}>
                  <i className={`fas ${formStatus.error ? 'fa-exclamation-circle' : 'fa-check-circle'}`}></i>
                  <span>{formStatus.message}</span>
                </div>
              )}
              
              <button 
                type="submit" 
                className="btn btn-primary submit-btn" 
                disabled={formStatus.loading}
              >
                {formStatus.loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Sending Message...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Send Message
                  </>
                )}
              </button>

              <div className="form-note">
                <p>
                  <i className="fas fa-info-circle"></i>
                  We respect your privacy and never share your information with third parties.
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="map-section">
          <div className="map-placeholder">
            <div className="map-content">
              <h3>Our Location in Delhi</h3>
              <p>Visit our office in Dwarka, Delhi for a face-to-face consultation</p>
              <div className="map-info">
                <div className="map-item">
                  <i className="fas fa-subway"></i>
                  <p>Near Dwarka Metro Station</p>
                </div>
                <div className="map-item">
                  <i className="fas fa-parking"></i>
                  <p>Ample Parking Available</p>
                </div>
                <div className="map-item">
                  <i className="fas fa-wheelchair"></i>
                  <p>Wheelchair Accessible</p>
                </div>
              </div>
              <button 
                className="btn btn-secondary"
                onClick={() => window.open('https://maps.google.com/?q=Dwarka+Delhi', '_blank')}
              >
                <i className="fas fa-map-marker-alt"></i> Get Directions
              </button>
            </div>
            <div className="map-visual">
              <div className="map-image">
                <img 
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Dwarka Delhi Location" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
