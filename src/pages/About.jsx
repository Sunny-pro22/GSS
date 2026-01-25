import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingGearsBackground from '../components/FloatingGearsBackground';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    gsap.fromTo('.about-content',
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate team members
    gsap.utils.toArray('.team-member').forEach((member, i) => {
      gsap.fromTo(member,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: member,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <section className="about-section" ref={aboutRef}>
      <FloatingGearsBackground />
      
      <div className="about-container">
        <div className="section-header">
          <h2>About BRP Technology</h2>
          <p className="section-subtitle">
            Your Trusted Digital Marketing Partner in Delhi & NCR
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3>Who We Are</h3>
            <p>
              BRP Technology Pvt Ltd is a premier <strong>digital marketing agency based in Delhi</strong> 
              specializing in helping businesses establish and grow their online presence. Founded with 
              the vision to make digital marketing accessible and effective for businesses of all sizes, 
              we combine technical expertise with creative strategies to deliver measurable results.
            </p>
            <p>
              With offices in <strong>Dwarka, Delhi</strong>, we serve clients across India and 
              internationally, providing customized solutions for <strong>SEO</strong>, 
              <strong> web development</strong>, <strong>app development</strong>, and 
              <strong> digital marketing</strong>.
            </p>
            
            <div className="mission-vision">
              <div className="mission">
                <h4>Our Mission</h4>
                <p>
                  To empower businesses with innovative digital solutions that drive growth, 
                  enhance visibility, and maximize ROI through cutting-edge technology and 
                  strategic marketing.
                </p>
              </div>
              <div className="vision">
                <h4>Our Vision</h4>
                <p>
                  To become the most trusted digital partner for businesses seeking to 
                  transform their online presence and achieve sustainable growth in the 
                  digital landscape.
                </p>
              </div>
            </div>
          </div>

          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="BRP Technology Team" 
              className="about-visual"
            />
            <div className="image-stats">
              <div className="image-stat">
                <span className="stat-value">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="image-stat">
                <span className="stat-value">500+</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h3>Our Expertise</h3>
          <p className="team-description">
            Our team comprises certified professionals with expertise in various domains of digital marketing.
          </p>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="member-icon">👨‍💻</div>
              <h4>SEO Specialists</h4>
              <p>Google certified professionals with expertise in technical and local SEO</p>
            </div>
            <div className="team-member">
              <div className="member-icon">🎨</div>
              <h4>Web Developers</h4>
              <p>Experts in modern frameworks and responsive design</p>
            </div>
            <div className="team-member">
              <div className="member-icon">📱</div>
              <h4>App Developers</h4>
              <p>iOS & Android specialists creating user-friendly mobile experiences</p>
            </div>
            <div className="team-member">
              <div className="member-icon">📊</div>
              <h4>Digital Marketers</h4>
              <p>Strategic planners focused on ROI and measurable results</p>
            </div>
          </div>
        </div>

        <div className="why-choose-us">
          <h3>Why Businesses Choose BRP Technology</h3>
          <div className="benefits-grid">
            <div className="benefit">
              <i className="fas fa-map-marker-alt"></i>
              <h4>Local Presence</h4>
              <p>Based in Delhi, we understand local market dynamics and consumer behavior</p>
            </div>
            <div className="benefit">
              <i className="fas fa-chart-line"></i>
              <h4>Proven Results</h4>
              <p>Track record of improving rankings, traffic, and conversions for our clients</p>
            </div>
            <div className="benefit">
              <i className="fas fa-handshake"></i>
              <h4>Transparent Process</h4>
              <p>Monthly reports and regular updates keep you informed about progress</p>
            </div>
            <div className="benefit">
              <i className="fas fa-users"></i>
              <h4>Dedicated Team</h4>
              <p>Get a dedicated account manager and team for personalized attention</p>
            </div>
          </div>
        </div>

        <div className="cta-box">
          <div className="cta-content">
            <h3>Ready to Grow Your Business?</h3>
            <p>
              Partner with Delhi's leading digital marketing agency. Get a free consultation 
              and discover how we can help you achieve your business goals.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              Schedule Free Consultation
            </button>
          </div>
          <div className="cta-info">
            <div className="info-item">
              <i className="fas fa-phone"></i>
              <div>
                <p>Call us today</p>
                <a href="tel:+917042576047">+91 7042576047</a>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-clock"></i>
              <div>
                <p>Working Hours</p>
                <p>Mon-Sat: 9AM - 8PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;