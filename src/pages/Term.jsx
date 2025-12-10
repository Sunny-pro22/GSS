import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FloatingGearsBackground from '../components/FloatingGearsBackground';
import { useSEO } from '../Hooks/useSEO';
import './Term.css';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: "Terms & Conditions | BRP Technology",
    description: "Read BRP Technology's Terms & Conditions. Understand our service agreements, policies, and legal terms for business partnerships.",
    canonical: "/terms",
    keywords: "BRP Technology terms, service agreement, legal terms, business conditions, terms of service"
  });

  const terms = [
    {
      number: '1',
      title: 'Acceptance of Terms',
      content: 'By accessing and using BRP Technology\'s services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.',
      details: [
        'These terms govern your use of our website and services',
        'Continued use constitutes ongoing acceptance of terms',
        'We reserve the right to modify these terms at any time'
      ]
    },
    {
      number: '2',
      title: 'Services Description',
      content: 'BRP Technology provides digital marketing, SEO optimization, business profile management, and related services as described on our website. We reserve the right to modify, suspend, or discontinue any service at any time.',
      details: [
        'Comprehensive digital business solutions',
        'Service availability may vary by region',
        'Specific service details provided in individual agreements'
      ]
    },
    {
      number: '3',
      title: 'User Responsibilities',
      content: 'You agree to provide accurate information and use our services responsibly.',
      details: [
        'Provide accurate and complete business information',
        'Maintain the confidentiality of your account credentials',
        'Use our services for lawful business purposes only',
        'Not interfere with our services or networks',
        'Comply with all applicable laws and regulations'
      ]
    },
    {
      number: '4',
      title: 'Payment Terms',
      content: 'All fees for services are as specified on our website or in your service agreement. Payments are due according to the billing cycle specified. We reserve the right to suspend services for non-payment.',
      details: [
        'Clear pricing and billing cycles',
        '30-day notice for price changes',
        'Late payment fees may apply',
        'Refund policies specified in service agreements'
      ]
    },
    {
      number: '5',
      title: 'Intellectual Property',
      content: 'All content, trademarks, and data on our website, including software, databases, text, graphics, and logos, are the property of BRP Technology or its licensors and are protected by intellectual property laws.',
      details: [
        'Copyright © 2025-2028 BRP Technology Pvt Limited',
        'Trademarks protected by international law',
        'Content licensed for business use only',
        'No unauthorized copying or distribution'
      ]
    },
    {
      number: '6',
      title: 'Confidentiality',
      content: 'Both parties agree to maintain the confidentiality of all proprietary information received from the other party that is marked as confidential or should reasonably be understood to be confidential.',
      details: [
        'Protection of business strategies and data',
        'Non-disclosure of client information',
        'Confidentiality obligations survive termination',
        'Limited exceptions for legal requirements'
      ]
    },
    {
      number: '7',
      title: 'Limitation of Liability',
      content: 'BRP Technology shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities arising from the use of our services.',
      details: [
        'Maximum liability limited to service fees paid',
        'No liability for third-party services',
        'Client assumes risk of business decisions',
        'Force majeure clause included'
      ]
    },
    {
      number: '8',
      title: 'Indemnification',
      content: 'You agree to indemnify and hold BRP Technology harmless from any claims, damages, liabilities, and expenses arising from your use of our services or violation of these terms.',
      details: [
        'Protection against third-party claims',
        'Coverage includes legal expenses',
        'Prompt notification required',
        'Cooperation in defense required'
      ]
    },
    {
      number: '9',
      title: 'Termination',
      content: 'We may terminate or suspend your access to our services immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.',
      details: [
        'Right to terminate for breach',
        '30-day notice for service changes',
        'Data retention policies apply',
        'Post-termination obligations'
      ]
    },
    {
      number: '10',
      title: 'Governing Law',
      content: 'These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.',
      details: [
        'Jurisdiction in Delaware courts',
        'Choice of law provisions',
        'International clients subject to terms',
        'Legal compliance requirements'
      ]
    },
    {
      number: '11',
      title: 'Dispute Resolution',
      content: 'Any disputes arising from these Terms shall first be resolved through good faith negotiations. If unresolved, disputes shall be submitted to binding arbitration in accordance with the rules of the American Arbitration Association.',
      details: [
        'Mandatory negotiation period',
        'Arbitration in Delaware',
        'Each party bears own costs',
        'Award enforceable in court'
      ]
    },
    {
      number: '12',
      title: 'Changes to Terms',
      content: 'We reserve the right to modify these Terms at any time. We will notify users of significant changes. Continued use of our services after changes constitutes acceptance of the new Terms.',
      details: [
        '30-day notice for material changes',
        'Email notification to clients',
        'Website posting of updates',
        'Continued use constitutes acceptance'
      ]
    },
    {
      number: '13',
      title: 'Force Majeure',
      content: 'We shall not be liable for any failure to perform our obligations due to causes beyond our reasonable control, including natural disasters, war, terrorism, strikes, or government restrictions.',
      details: [
        'Events beyond reasonable control',
        'Extended timelines permitted',
        'Notification requirements',
        'Termination rights for extended events'
      ]
    },
    {
      number: '14',
      title: 'Severability',
      content: 'If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.',
      details: [
        'Invalid provisions severed',
        'Remaining terms enforced',
        'Reformation to achieve intent',
        'No waiver of other provisions'
      ]
    },
    {
      number: '15',
      title: 'Entire Agreement',
      content: 'These Terms constitute the entire agreement between you and BRP Technology regarding our services and supersede all prior agreements and understandings.',
      details: [
        'Complete agreement between parties',
        'Supersedes previous discussions',
        'Written amendments only',
        'Service-specific addendums may apply'
      ]
    }
  ];

  return (
    <section className="terms-page">
      <FloatingGearsBackground />
      
      <div className="terms-container">
        <div className="terms-navigation">
          <h3>Terms Navigation</h3>
          <div className="terms-nav-links">
            {terms.map((term, index) => (
              <a 
                key={index}
                href={`#term-${term.number}`}
                className="terms-nav-link"
              >
                <i className="fas fa-chevron-right"></i>
                {term.number}. {term.title}
              </a>
            ))}
          </div>
        </div>

        <div className="terms-content">
          <div className="terms-header">
            <h1>Terms & Conditions</h1>
            <p>Effective Date: January 1, 2025 | Last Updated: January 1, 2025</p>
          </div>
          
          <div className="terms-note">
            <p><strong>Important:</strong> Please read these Terms & Conditions carefully before using our services. By accessing or using BRP Technology's services, you agree to be bound by these terms.</p>
          </div>

          {terms.map((term, index) => (
            <div 
              key={index} 
              className="terms-card"
              id={`term-${term.number}`}
            >
              <h2 data-number={term.number}>{term.title}</h2>
              <p>{term.content}</p>
              
              {term.details && (
                <>
                  <ul>
                    {term.details.map((detail, detailIndex) => (
                      <li key={detailIndex}>{detail}</li>
                    ))}
                  </ul>
                </>
              )}

              {term.number === '4' && (
                <div className="terms-note">
                  <p><strong>Payment Schedule Example:</strong></p>
                  <table>
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Billing Cycle</th>
                        <th>Payment Terms</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>SEO Services</td>
                        <td>Monthly</td>
                        <td>Net 15 Days</td>
                      </tr>
                      <tr>
                        <td>Digital Marketing</td>
                        <td>Quarterly</td>
                        <td>Net 30 Days</td>
                      </tr>
                      <tr>
                        <td>Consultation</td>
                        <td>One-time</td>
                        <td>Advance Payment</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {term.number === '7' && (
                <div className="terms-note">
                  <p><strong>Limitation Example:</strong> In no event shall BRP Technology's total liability to you for all damages, losses, and causes of action exceed the amount paid by you, if any, for accessing or using our services during the twelve (12) months prior to the claim.</p>
                </div>
              )}
            </div>
          ))}

          <div className="terms-footer">
            <p>
              These Terms & Conditions constitute a legally binding agreement between you and 
              <strong> BRP Technology Pvt Limited</strong>. By using our services, you acknowledge 
              that you have read, understood, and agree to be bound by these terms.
            </p>
            
            <div className="terms-links">
              <Link to="/contact">
                <i className="fas fa-question-circle"></i>
                Questions? Contact Legal Team
              </Link>
              <Link to="/">
                <i className="fas fa-home"></i>
                Back to Home
              </Link>
            </div>

            <div className="terms-legal">
              <h3>Legal Contact Information</h3>
              <p>
                For legal inquiries regarding these Terms & Conditions, please contact our legal department at:
                <br />
                <strong>legal@brptechnology.com</strong> or call <strong>+1 (555) 123-4567</strong>
                <br />
                Business Hours: Monday-Friday, 9:00 AM - 5:00 PM EST
              </p>
              <p>
                For general inquiries, please visit our <Link to="/contact">Contact Page</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Terms;