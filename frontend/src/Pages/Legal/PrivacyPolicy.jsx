import React from 'react';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <div style={{ 
      padding: '40px 20px',
      maxWidth: '1000px',
      margin: '0 auto',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '700',
          color: '#333',
          margin: 0
        }}>
          Privacy Policy
        </h1>
        <Link 
          to="/register"
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff6b4a',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Back to Registration
        </Link>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
      }}>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
          Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>1. Introduction</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            ShopZen ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Influencer Onboarding System. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the platform.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>2. Information We Collect</h2>
          
          <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>2.1 Personal Information</h3>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            We may collect personal information that you voluntarily provide to us when you register on the platform, including but not limited to:
          </p>
          <ul style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '5px' }}>Full name</li>
            <li style={{ marginBottom: '5px' }}>Email address</li>
            <li style={{ marginBottom: '5px' }}>Phone number</li>
            <li style={{ marginBottom: '5px' }}>Gender</li>
            <li style={{ marginBottom: '5px' }}>Location</li>
            <li style={{ marginBottom: '5px' }}>Social media handles and profile information</li>
            <li style={{ marginBottom: '5px' }}>Content category preferences</li>
          </ul>

          <h3 style={{ fontSize: '17px', fontWeight: '600', color: '#333', marginBottom: '10px' }}>2.2 Usage Information</h3>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            We may also collect information about how you access and use our platform, including:
          </p>
          <ul style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '5px' }}>IP address</li>
            <li style={{ marginBottom: '5px' }}>Browser type</li>
            <li style={{ marginBottom: '5px' }}>Device information</li>
            <li style={{ marginBottom: '5px' }}>Pages visited and features used</li>
            <li style={{ marginBottom: '5px' }}>Time and date of your visits</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>3. How We Use Your Information</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            We may use the information we collect for various purposes, including:
          </p>
          <ul style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '5px' }}>Facilitating your registration and maintaining your account</li>
            <li style={{ marginBottom: '5px' }}>Matching you with appropriate brand campaigns</li>
            <li style={{ marginBottom: '5px' }}>Communicating with you about campaigns, updates, and platform changes</li>
            <li style={{ marginBottom: '5px' }}>Analyzing platform usage to improve our services</li>
            <li style={{ marginBottom: '5px' }}>Preventing fraudulent activities and ensuring platform security</li>
            <li style={{ marginBottom: '5px' }}>Complying with legal obligations</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>4. Information Sharing and Disclosure</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            We may share your information in the following situations:
          </p>
          <ul style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '5px' }}>With brands and partners for campaign collaboration purposes</li>
            <li style={{ marginBottom: '5px' }}>With service providers who perform services on our behalf</li>
            <li style={{ marginBottom: '5px' }}>If required by law or in response to valid legal requests</li>
            <li style={{ marginBottom: '5px' }}>In connection with a business transaction such as a merger or acquisition</li>
            <li style={{ marginBottom: '5px' }}>With your consent or at your direction</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>5. Data Security</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>6. Your Rights</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '5px' }}>Accessing your personal information</li>
            <li style={{ marginBottom: '5px' }}>Correcting inaccurate information</li>
            <li style={{ marginBottom: '5px' }}>Deleting your personal information</li>
            <li style={{ marginBottom: '5px' }}>Restricting or objecting to processing</li>
            <li style={{ marginBottom: '5px' }}>Data portability</li>
            <li style={{ marginBottom: '5px' }}>Withdrawing consent</li>
          </ul>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>7. Cookies and Tracking Technologies</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            We use cookies and similar tracking technologies to collect and track information about your browsing activities on our platform. You can control cookies through your browser settings and other tools.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>8. Changes to This Privacy Policy</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last Updated" date and will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to stay informed about how we are protecting your information.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>9. Contact Us</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            If you have questions or concerns about this privacy policy or our practices, please contact us at:
          </p>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444' }}>
            Email: privacy@shopzen.com<br />
            Address: 123 Main Street, City, State, ZIP<br />
            Phone: (555) 123-4567
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy; 