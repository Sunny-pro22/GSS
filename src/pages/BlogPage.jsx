import React from "react";
import './BlogPage.css'; // We'll create this CSS file

const BlogPage = () => {
  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-content">
          <h1 className="blog-title">
            Grow Faster with BRP Technology – Your Digital Growth Partner
          </h1>
          <p className="blog-subtitle">
            We help businesses scale with SEO, Web Development, App Development
            and Digital Marketing that delivers real results.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="blog-container">
        {/* Why Choose Us Section */}
        <section className="blog-section">
          <div className="section-header">
            <h2>Why BRP Technology for Business Growth?</h2>
            <div className="section-divider"></div>
          </div>
          <p className="section-text">
            In today's competitive digital world, having an online presence is not
            enough. BRP Technology builds high-performing digital solutions that
            convert visitors into loyal customers.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>End-to-end Solutions</h3>
              <p>Comprehensive digital growth strategies from start to finish</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Conversion-Focused UI/UX</h3>
              <p>Designs that prioritize user experience and conversion rates</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Data-Driven Strategies</h3>
              <p>Marketing decisions based on analytics and performance data</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Scalable & Secure</h3>
              <p>Robust development that grows with your business needs</p>
            </div>
          </div>

          <div className="services-section">
            <div className="section-header">
              <h3>Our Core Services</h3>
              <div className="section-divider"></div>
            </div>
            
            <div className="service-cards">
              <div className="service-card seo">
                <h4>SEO Optimization</h4>
                <p>Rank higher, get discovered, and drive organic traffic with our proven SEO strategies.</p>
                <ul>
                  <li>Keyword Research</li>
                  <li>Technical SEO</li>
                  <li>Content Strategy</li>
                  <li>Local SEO</li>
                </ul>
              </div>
              
              <div className="service-card web-dev">
                <h4>Web Development</h4>
                <p>Fast, responsive, and conversion-ready websites built with modern technologies.</p>
                <ul>
                  <li>Custom Websites</li>
                  <li>E-commerce Solutions</li>
                  <li>WordPress Development</li>
                  <li>Website Maintenance</li>
                </ul>
              </div>
              
              <div className="service-card app-dev">
                <h4>App Development</h4>
                <p>Powerful mobile apps for better engagement and customer retention.</p>
                <ul>
                  <li>iOS & Android Apps</li>
                  <li>Cross-Platform Development</li>
                  <li>UI/UX Design</li>
                  <li>App Store Optimization</li>
                </ul>
              </div>
              
              <div className="service-card marketing">
                <h4>Digital Marketing</h4>
                <p>Paid ads, content marketing, and social media growth strategies.</p>
                <ul>
                  <li>PPC Advertising</li>
                  <li>Social Media Marketing</li>
                  <li>Content Creation</li>
                  <li>Email Marketing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <div className="section-divider"></div>
          </div>

          <div className="faq-container">
            <div className="faq-item">
              <button className="faq-question">
                How long does SEO take to show results?
                <span className="faq-toggle">+</span>
              </button>
              <div className="faq-answer">
                <p>
                  SEO usually starts showing measurable results within 3–6 months,
                  depending on competition and industry. We provide monthly progress
                  reports to track improvements.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <button className="faq-question">
                Do you develop e-commerce websites and apps?
                <span className="faq-toggle">+</span>
              </button>
              <div className="faq-answer">
                <p>
                  Yes, we build scalable e-commerce platforms and custom mobile apps
                  integrated with payment gateways, inventory management, and CRM systems.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <button className="faq-question">
                Can you manage both SEO and paid marketing?
                <span className="faq-toggle">+</span>
              </button>
              <div className="faq-answer">
                <p>
                  Absolutely! We run integrated campaigns combining SEO and paid marketing
                  to maximize ROI and achieve faster growth for your business.
                </p>
              </div>
            </div>

            <div className="faq-item">
              <button className="faq-question">
                Why should I choose BRP Technology?
                <span className="faq-toggle">+</span>
              </button>
              <div className="faq-answer">
                <p>
                  We focus on measurable growth, transparency, and long-term digital
                  success. Our team combines technical expertise with marketing insights
                  to deliver exceptional results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2>Ready to Grow Your Business?</h2>
            <p>Get a free digital growth audit from BRP Technology today.</p>
            <div className="cta-buttons">
              <a href="/contact" className="cta-button primary">
                Get Free Audit
              </a>
              <a href="tel:+917042576047" className="cta-button secondary">
                <i className="fas fa-phone"></i> Call Now
              </a>
            </div>
            <div className="cta-features">
              <div className="cta-feature">
                <i className="fas fa-check-circle"></i>
                <span>No obligation</span>
              </div>
              <div className="cta-feature">
                <i className="fas fa-check-circle"></i>
                <span>30-minute consultation</span>
              </div>
              <div className="cta-feature">
                <i className="fas fa-check-circle"></i>
                <span>Custom strategy proposal</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPage;