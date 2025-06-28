import React from 'react';
import { Link } from 'react-router-dom';

function TermsAndConditions() {
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
          Terms and Conditions
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
            Welcome to ShopZen's Influencer Onboarding System. These Terms and Conditions govern your use of our platform and services as an influencer. By registering and using our platform, you agree to these terms in full. If you disagree with these terms or any part of them, you must not use our platform.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>2. Definitions</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            "Platform" refers to the ShopZen Influencer Onboarding System.
            "Influencer" refers to any individual who registers on our platform to collaborate with brands.
            "Content" refers to any material uploaded or shared by the Influencer on social media platforms.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>3. Registration and Account</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            3.1. To use our platform, you must register and provide accurate information about yourself and your social media presence.
          </p>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            3.2. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </p>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            3.3. You must immediately notify us of any unauthorized use of your account or any other breach of security.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>4. Influencer Responsibilities</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            4.1. You agree to create authentic content that aligns with the brand's guidelines and values.
          </p>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            4.2. You must disclose sponsored content in accordance with applicable laws and regulations, including FTC guidelines.
          </p>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            4.3. You warrant that your content will not infringe upon any third-party rights, including intellectual property rights.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>5. Payment Terms</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            5.1. Payment terms will be specified in individual campaign agreements.
          </p>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            5.2. Payments will be processed within 30 days of successful campaign completion and verification.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>6. Termination</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            6.1. We reserve the right to terminate or suspend your account at any time for violations of these terms or for any other reason at our discretion.
          </p>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            6.2. You may terminate your account at any time by contacting our support team.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>7. Limitation of Liability</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            7.1. To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the platform.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>8. Changes to Terms</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            8.1. We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on the platform.
          </p>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            8.2. Your continued use of the platform after any changes indicates your acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '15px' }}>9. Governing Law</h2>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', marginBottom: '15px' }}>
            9.1. These terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.
          </p>
          <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444' }}>
            9.2. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of [Jurisdiction].
          </p>
        </section>
      </div>
    </div>
  );
}

export default TermsAndConditions; 