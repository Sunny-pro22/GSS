// src/pages/Contact.jsx
import React, { useState, useEffect } from 'react';
import './Contact.css';

const Contact = () => {
  useEffect(() => {
    document.title = "Contact Us - BRP Technology | Get in Touch";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get in touch with BRP Technology for digital marketing services. Contact us for SEO, SMO, web design, and more.');
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const offices = [
    {
      city: "New York",
      address: "123 Business Avenue, Suite 100",
      location: "New York, NY 10001",
      phone: "+1 (555) 123-4567",
      icon: "🏢"
    },
    {
      city: "London",
      address: "456 Tech Street, Floor 5",
      location: "London, UK EC2A 4NE",
      phone: "+44 20 7946 0958",
      icon: "🇬🇧"
    },
    {
      city: "Delhi",
      address: "789 Digital Road, Sector 45",
      location: "New Delhi, India 110001",
      phone: "+91 11 2345 6789",
      icon: "🇮🇳"
    }
  ];

  return (
    <>
      <section className="contact-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>Ready to transform your digital presence? Let's start the conversation about your project.</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Let's Talk About Your <span className="text-gradient">Project</span></h2>
              <p>We're here to help you grow your business. Reach out to us and we'll get back to you within 24 hours with a customized solution.</p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">📧</div>
                  <div className="method-details">
                    <h3>Email Us</h3>
                    <p>info@brptechnology.com</p>
                    <p>support@brptechnology.com</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="method-icon">📞</div>
                  <div className="method-details">
                    <h3>Call Us</h3>
                    <p>+1 (555) 123-4567</p>
                    <p>Mon - Fri, 9AM - 6PM EST</p>
                  </div>
                </div>
                
                <div className="contact-method">
                  <div className="method-icon">📍</div>
                  <div className="method-details">
                    <h3>Visit Us</h3>
                    <p>123 Business Ave, Suite 100</p>
                    <p>New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-form-container">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="service">Service Interested In</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service</option>
                    <option value="seo">SEO Services</option>
                    <option value="smo">SMO Services</option>
                    <option value="web-design">Web Design</option>
                    <option value="ppc">PPC Management</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn">
                  Send Message
                  <span>→</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="office-section">
        <div className="container">
          <div className="section-header">
            <h2>Our <span className="text-gradient">Offices</span></h2>
            <p>We're here to serve you across multiple locations</p>
          </div>
          <div className="office-grid">
            {offices.map((office, index) => (
              <div key={index} className="office-card">
                <div className="office-icon">{office.icon}</div>
                <h3>{office.city}</h3>
                <p>{office.address}</p>
                <p>{office.location}</p>
                <p><strong>{office.phone}</strong></p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;