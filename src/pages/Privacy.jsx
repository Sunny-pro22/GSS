import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FloatingGearsBackground from '../components/FloatingGearsBackground';
import './Privacy.css';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="privacy-section">
      <FloatingGearsBackground />
      
      <div className="privacy-container">
        <div className="privacy-header">
          <h1>Privacy Policy</h1>
          <p>Last Updated: January 1, 2025</p>
        </div>
        
        <div className="privacy-content">
          <div className="privacy-card">
            <h2>1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul>
              <li>Name and contact information</li>
              <li>Business information</li>
              <li>Communication preferences</li>
              <li>Website usage data</li>
            </ul>
          </div>

          <div className="privacy-card">
            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide and improve our services</li>
              <li>Communicate with you about our services</li>
              <li>Personalize your experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div className="privacy-card">
            <h2>3. Information Sharing</h2>
            <p>
              We do not sell your personal information. We may share your information with:
            </p>
            <ul>
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your consent</li>
            </ul>
          </div>

          <div className="privacy-card">
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>

          <div className="privacy-card">
            <h2>5. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </div>

          <div className="privacy-card">
            <h2>6. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience, analyze usage, 
              and assist in our marketing efforts.
            </p>
          </div>

          <div className="privacy-card">
            <h2>7. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your 
              own. We ensure appropriate safeguards are in place.
            </p>
          </div>

          <div className="privacy-card">
            <h2>8. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under 18. We do not knowingly collect 
              personal information from children.
            </p>
          </div>

          <div className="privacy-card">
            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any 
              material changes by posting the new policy on our website.
            </p>
          </div>

          <div className="privacy-card">
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@brptechnology.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Business Street, Tech City, TC 12345</li>
            </ul>
          </div>

          <div className="privacy-footer">
            <p>
              By using our services, you acknowledge that you have read and understood this 
              Privacy Policy.
            </p>
            <div className="privacy-links">
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Privacy;