import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSEO } from '../Hooks/useSEO';
import { useTheme } from '../Hooks/useTHEME';
import FloatingGearsBackground from '../components/FloatingGearsBackground';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const contactRef = useRef(null);
  const { isDarkTheme } = useTheme();
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
    loading: false
  });

  useSEO({
    title: "Contact BRP Technology - Get Your Free Business Consultation",
    description: "Contact BRP Technology for business profile optimization, digital marketing, and SEO services. Get a free consultation today.",
    canonical: "/contact",
    keywords: "contact BRP Technology, business consultation, digital marketing services, SEO services contact"
  });

  useEffect(() => {
    gsap.fromTo('.contact-form',
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo('.contact-info',
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
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
    if (!formData.businessName || !formData.email || !formData.service || !formData.message) {
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
    formDataToSend.append('businessName', formData.businessName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone || 'Not provided');
    formDataToSend.append('service', formData.service);
    formDataToSend.append('message', formData.message);
    
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
          message: 'Thank you! We have received your inquiry and will contact you within 2 business hours.' 
        });
        
        // Reset form
        setFormData({
          businessName: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
        
        // Track conversion (if you have analytics)
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'conversion', {
            'send_to': 'AW-123456789/AbC-D_efGhIjKlMnOpQrS',
            'value': 1.0,
            'currency': 'USD'
          });
        }
        
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Form submission failed');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({ 
        submitted: true, 
        error: true, 
        loading: false,
        message: 'Oops! There was a problem submitting your form. Please try again or contact us directly via email/phone.' 
      });
    }
  };

  const services = [
    { value: '', label: 'Select Service Needed *' },
    { value: 'business-profile', label: 'Business Profile Optimization' },
    { value: 'seo', label: 'SEO Services' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'analytics', label: 'Analytics & Reporting' },
    { value: 'local-seo', label: 'Local SEO' },
    { value: 'automation', label: 'Marketing Automation' },
    { value: 'custom', label: 'Custom Solution' }
  ];

  return (
    <section className="contact-page" ref={contactRef}>
      <FloatingGearsBackground />
      
      <div className="contact-container">
        <div className="section-header">
          <h1>Get In Touch</h1>
          <p>Ready to grow your business? Let's connect!</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h2>📍 Business Hours</h2>
              <div className="contact-details">
                <p><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM EST</p>
                <p><strong>Saturday:</strong> 10:00 AM - 2:00 PM EST</p>
                <p><strong>Sunday:</strong> Emergency Support Only</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <h2>📞 Contact Info</h2>
              <div className="contact-details">
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Email:</strong> info@brptechnology.com</p>
                <p><strong>Support:</strong> support@brptechnology.com</p>
                <p><strong>Sales:</strong> sales@brptechnology.com</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h2>🔄 Quick Response</h2>
              <div className="contact-details">
                <p><i className="fas fa-check-circle"></i> We typically respond within 2 business hours</p>
                <p><i className="fas fa-check-circle"></i> 24/7 emergency support available</p>
                <p><i className="fas fa-check-circle"></i> Dedicated account manager assigned</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">
                <i className="fas fa-gift"></i>
              </div>
              <h2>🎯 Free Consultation</h2>
              <div className="contact-details">
                <p><i className="fas fa-star"></i> Free business growth assessment</p>
                <p><i className="fas fa-star"></i> Custom strategy proposal</p>
                <p><i className="fas fa-star"></i> No commitment required</p>
                <p><i className="fas fa-star"></i> 30-minute discovery call</p>
              </div>
            </div>

            <div className="contact-cta">
              <h3>Prefer to Schedule a Call?</h3>
              <p>Book a time that works for you with our calendar</p>
              <a 
                href="https://calendly.com/brptechnology/30min" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
              >
                <i className="fas fa-calendar-alt"></i> Schedule Now
              </a>
            </div>
          </div>

          <div className="contact-form-container">
            <div className="form-header">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we'll get back to you promptly</p>
              <div className="formspree-brand">
                <span>Powered by Formspree</span>
                <i className="fas fa-shield-alt"></i>
                <small>Secure & Spam-Free</small>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              

              <div className="form-group">
                <label htmlFor="businessName">
                  <i className="fas fa-building"></i> Business Name *
                </label>
                <input 
                  type="text" 
                  id="businessName"
                  name="businessName"
                  placeholder="Your Business Name" 
                  className="form-input" 
                  required 
                  value={formData.businessName}
                  onChange={handleInputChange}
                  disabled={formStatus.loading}
                />
              </div>

              <div className="form-row">
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
                
                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="fas fa-phone"></i> Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    placeholder="+1 (555) 123-4567" 
                    className="form-input"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={formStatus.loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="service">
                  <i className="fas fa-cogs"></i> Service Needed *
                </label>
                <select 
                  id="service"
                  name="service" 
                  className="form-input" 
                  required
                  value={formData.service}
                  onChange={handleInputChange}
                  disabled={formStatus.loading}
                >
                  {services.map((service, index) => (
                    <option key={index} value={service.value} disabled={service.value === ''}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <i className="fas fa-comment"></i> Your Business Goals *
                </label>
                <textarea 
                  id="message"
                  name="message"
                  placeholder="Tell us about your business goals, challenges, and what you'd like to achieve..." 
                  rows="6" 
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
                  I agree to the <Link to="/privacy">Privacy Policy</Link> and <Link to="/terms">Terms & Conditions</Link>. *
                </label>
              </div>
                  {formStatus.submitted && (
                <div className={`form-message ${formStatus.error ? 'error' : 'success'}`}>
                  <i className={`fas ${formStatus.error ? 'fa-exclamation-circle' : 'fa-check-circle'}`}></i>
                  <span>{formStatus.message}</span>
                  {!formStatus.error && (
                    <button 
                      type="button" 
                      className="close-message"
                      onClick={() => setFormStatus({ submitted: false, error: false, message: '', loading: false })}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              )}
              <div className="form-footer">
                <p className="form-note">
                  <i className="fas fa-info-circle"></i> Fields marked with * are required
                </p>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={formStatus.loading}
                >
                    
                  {formStatus.loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i> Get Free Consultation
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="contact-alternatives">
              <h3>Other Ways to Connect</h3>
              <div className="alternative-links">
                <a href="mailto:info@brptechnology.com" className="alternative-link">
                  <i className="fas fa-envelope"></i>
                  <span>Email Us Directly</span>
                </a>
                <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="alternative-link">
                  <i className="fab fa-whatsapp"></i>
                  <span>WhatsApp Chat</span>
                </a>
                <a href="tel:+15551234567" className="alternative-link">
                  <i className="fas fa-phone"></i>
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-map">
          <div className="map-placeholder">
            <div className="map-content">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Our Location</h3>
              <p>123 Business Street, Tech City, TC 12345</p>
              <p>United States</p>
              <a 
                href="https://maps.google.com/?q=123+Business+Street,+Tech+City,+TC+12345" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
              >
                <i className="fas fa-directions"></i> Get Directions
              </a>
            </div>
          </div>
          
          <div className="office-hours">
            <h4><i className="fas fa-clock"></i> Office Hours</h4>
            <table>
              <tbody>
                <tr>
                  <td>Monday - Friday</td>
                  <td>9:00 AM - 6:00 PM EST</td>
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td>10:00 AM - 2:00 PM EST</td>
                </tr>
                <tr>
                  <td>Sunday</td>
                  <td>Emergency Support Only</td>
                </tr>
                <tr>
                  <td>Holidays</td>
                  <td>By Appointment Only</td>
                </tr>
              </tbody>
            </table>
            <div className="emergency-contact">
              <p><i className="fas fa-exclamation-triangle"></i> For emergencies outside office hours:</p>
              <a href="tel:+15551234567" className="emergency-link">
                <i className="fas fa-phone"></i> Call Emergency Support
              </a>
            </div>
          </div>
        </div>

        <div className="formspree-instructions">
          <div className="instruction-card">
            <i className="fas fa-bell"></i>
            <h3>Formspree Notifications</h3>
            <p>After submitting the form, you'll:</p>
            <ul>
              <li><i className="fas fa-check-circle"></i> See a confirmation message here</li>
              <li><i className="fas fa-envelope"></i> Receive an email confirmation from Formspree</li>
              <li><i className="fas fa-user-tie"></i> Our team will contact you within 2 business hours</li>
              <li><i className="fas fa-shield-alt"></i> Your data is secure and spam-protected</li>
            </ul>
          </div>
          
          <div className="instruction-card">
            <i className="fas fa-cog"></i>
            <h3>Formspree Dashboard</h3>
            <p>To manage form submissions:</p>
            <ul>
              <li><i className="fas fa-chart-bar"></i> View all submissions in Formspree dashboard</li>
              <li><i className="fas fa-download"></i> Export data to CSV or Excel</li>
              <li><i className="fas fa-filter"></i> Filter and search submissions</li>
              <li><i className="fas fa-bell"></i> Set up email/Slack notifications</li>
            </ul>
            <a 
              href="https://formspree.io/account/submissions" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
            >
              <i className="fas fa-external-link-alt"></i> Go to Formspree Dashboard
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;