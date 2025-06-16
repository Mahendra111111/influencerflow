import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/images/logo.svg" alt="Logo" className="logo-img" />
        </div>
        <div className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#influencers" className="nav-link">Influencers</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#blog" className="nav-link">Blog</a>
        </div>
        <Link to="/register" className="register-button">
          Register
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-content">
          <h1 className="hero-title">
            Boost your business with <span className="highlight">Influencer Marketing</span>
          </h1>
          <p className="hero-description">
            We connect brands with the perfect influencers to reach your target audience and drive real results. Our proven strategies help businesses grow their online presence.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="primary-button">
              Register Now
            </Link>
            <Link to="/learn-more" className="secondary-button">
              Learn More
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img src="/images/influencer1.png" alt="Influencer" />
        </div>
      </section>

      {/* Top Agency Section */}
      <section className="top-agency-section">
        <h2 className="section-title">Top Influencer Marketing Agency</h2>
        <div className="agency-content">
          <p>We've helped hundreds of brands connect with the right influencers to achieve their marketing goals and drive measurable results.</p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <h2 className="section-title">Our Influencer Marketing Solutions</h2>
        
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              <img src="/images/service-icon1.svg" alt="Influencer Campaigns" />
            </div>
            <h3>Influencer Campaigns</h3>
            <p>Strategic partnerships with influencers that align with your brand values and target audience</p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <img src="/images/service-icon2.svg" alt="Content Creation" />
            </div>
            <h3>Content Creation</h3>
            <p>High-quality, engaging content that resonates with your audience and drives conversions</p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <img src="/images/service-icon3.svg" alt="Performance Analytics" />
            </div>
            <h3>Performance Analytics</h3>
            <p>Detailed reporting and insights to measure campaign success and optimize future strategies</p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <img src="/images/service-icon4.svg" alt="Brand Partnerships" />
            </div>
            <h3>Brand Partnerships</h3>
            <p>Long-term collaborations with influencers to build authentic relationships with your audience</p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <img src="/images/service-icon1.svg" alt="Social Media Management" />
            </div>
            <h3>Social Media Management</h3>
            <p>Comprehensive social media strategies to complement your influencer marketing efforts</p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <img src="/images/service-icon2.svg" alt="Campaign Strategy" />
            </div>
            <h3>Campaign Strategy</h3>
            <p>Custom influencer marketing strategies tailored to your specific business goals</p>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands-section">
        <h2 className="section-title">Trusted By Brands Worldwide</h2>
        <div className="brands-grid">
          <img src="/images/logo1.png" alt="Brand" />
          <img src="/images/logo1 (1).png" alt="Brand" />
          <img src="/images/brand3.svg" alt="Brand" />
          <img src="/images/brand4.svg" alt="Brand" />
          <img src="/images/brand5.svg" alt="Brand" />
          <img src="/images/brand6.svg" alt="Brand" />
        </div>
      </section>

      {/* Featured Influencers Section */}
      <section className="featured-influencers" id="influencers">
        <h2 className="section-title">Our Exclusive Influencers</h2>
        
        <div className="influencers-grid">
          <div className="influencer-card pink">
            <div className="influencer-image">
              <img src="/images/influencer1111.png" alt="Fashion Influencer" />
            </div>
            <div className="influencer-info">
              <h3>EMMA</h3>
              <p>Fashion</p>
            </div>
          </div>

          <div className="influencer-card purple">
            <div className="influencer-image">
              <img src="/images/influencer2222.png" alt="Tech Influencer" />
            </div>
            <div className="influencer-info">
              <h3>ALEX</h3>
              <p>Tech</p>
            </div>
          </div>

          <div className="influencer-card yellow">
            <div className="influencer-image">
              <img src="/images/influencer3.png" alt="Lifestyle Influencer" />
            </div>
            <div className="influencer-info">
              <h3>RYAN</h3>
              <p>Lifestyle</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise Section */}
      <section className="expertise-section">
        <h2 className="section-title">Our Expertise</h2>
        
        <div className="expertise-grid">
          <div className="expertise-card">
            <div className="expertise-image">
              <img src="/images/content marketing.png" alt="Expertise" />
            </div>
            <div className="expertise-content">
              <h3>Influencer Marketing</h3>
              <p>We connect you with the perfect influencers for your brand</p>
            </div>
          </div>

          <div className="expertise-card">
            <div className="expertise-image">
              <img src="/images/content creator.png" alt="Expertise" />
            </div>
            <div className="expertise-content">
              <h3>Content Creation</h3>
              <p>Creative content that engages and converts your audience</p>
            </div>
          </div>

          <div className="expertise-card">
            <div className="expertise-image">
              <img src="/images/content marketing image.png" alt="Expertise" />
            </div>
            <div className="expertise-content">
              <h3>Campaign Management</h3>
              <p>End-to-end management of your influencer marketing campaigns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Strategy Section */}
      <section className="brand-strategy">
        <div className="brand-strategy-content">
          <h2>Boost Your Brand with Our Data-Driven Influencer Marketing Approach</h2>
          <p>Our strategic approach combines data analytics with creative storytelling to deliver campaigns that drive real business results.</p>
          <div className="strategy-stats">
            <div className="stat-item">
              <h3>250+</h3>
              <p>Successful Campaigns</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Influencer Network</p>
            </div>
            <div className="stat-item">
              <h3>95%</h3>
              <p>Client Satisfaction</p>
            </div>
          </div>
        </div>
        <div className="brand-strategy-image">
          <img src="/images/strategy.png" alt="Strategy" />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <h2 className="section-title">Why Choose Our Influencers?</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <img src="/images/service-icon1.svg" alt="Feature" />
            </div>
            <h3>Authentic Engagement</h3>
            <p>Our influencers have genuine connections with their audiences</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/images/service-icon2.svg" alt="Feature" />
            </div>
            <h3>Targeted Reach</h3>
            <p>Access to specific demographics that match your target market</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/images/service-icon3.svg" alt="Feature" />
            </div>
            <h3>Creative Content</h3>
            <p>High-quality content that showcases your brand effectively</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <img src="/images/service-icon4.svg" alt="Feature" />
            </div>
            <h3>Measurable Results</h3>
            <p>Clear metrics to track campaign performance and ROI</p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <h2 className="section-title">Our Influencer Process</h2>
        
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Discovery</h3>
            <p>We learn about your brand, goals, and target audience</p>
          </div>

          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Strategy</h3>
            <p>We develop a custom influencer marketing strategy</p>
          </div>

          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Selection</h3>
            <p>We identify and vet the perfect influencers for your campaign</p>
          </div>

          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Execution</h3>
            <p>We manage the campaign from start to finish</p>
          </div>

          <div className="process-step">
            <div className="step-number">5</div>
            <h3>Analysis</h3>
            <p>We measure results and provide detailed reporting</p>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="platforms-section">
        <h2 className="section-title">Top Social Media Platforms We Work With</h2>
        
        <div className="platforms-grid">
          <div className="platform-card">
            <div className="platform-icon">
              <img src="/images/instagram-small.svg" alt="Instagram" />
            </div>
            <h3>Instagram</h3>
          </div>

          <div className="platform-card">
            <div className="platform-icon">
              <img src="/images/tiktok-small.svg" alt="TikTok" />
            </div>
            <h3>TikTok</h3>
          </div>

          <div className="platform-card">
            <div className="platform-icon">
              <img src="/images/youtube-small.svg" alt="YouTube" />
            </div>
            <h3>YouTube</h3>
          </div>

          <div className="platform-card">
            <div className="platform-icon">
              <img src="/images/twitter.svg" alt="Twitter" />
            </div>
            <h3>Twitter</h3>
          </div>

          <div className="platform-card">
            <div className="platform-icon">
              <img src="/images/facebook-small.svg" alt="Facebook" />
            </div>
            <h3>Facebook</h3>
          </div>

          <div className="platform-card">
            <div className="platform-icon">
              <img src="/images/instagram-small.svg" alt="LinkedIn" />
            </div>
            <h3>LinkedIn</h3>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics-section">
        <h2 className="section-title">Our Impact By Numbers</h2>
        
        <div className="statistics-grid">
          <div className="statistic-card">
            <h3>10M+</h3>
            <p>Audience Reach</p>
          </div>

          <div className="statistic-card">
            <h3>500+</h3>
            <p>Influencers</p>
          </div>

          <div className="statistic-card">
            <h3>300+</h3>
            <p>Brands</p>
          </div>

          <div className="statistic-card">
            <h3>1000+</h3>
            <p>Campaigns</p>
          </div>

          <div className="statistic-card">
            <h3>25+</h3>
            <p>Industries</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2 className="section-title">Testimonials</h2>
        
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"Working with this agency transformed our social media presence. The influencers they connected us with perfectly represented our brand values."</p>
            <div className="testimonial-author">
              <img src="/images/client1.png" alt="Client" />
              <div>
                <h4>Sarah Johnson</h4>
                <p>Marketing Director, Fashion Brand</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p>"The ROI we've seen from our influencer campaigns has exceeded our expectations. Their strategic approach and data-driven insights made all the difference."</p>
            <div className="testimonial-author">
              <img src="/images/client2.png" alt="Client" />
              <div>
                <h4>Michael Chen</h4>
                <p>CEO, Tech Startup</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <p>"Their team's attention to detail and understanding of our brand made the collaboration seamless. We've seen a significant increase in engagement and sales."</p>
            <div className="testimonial-author">
              <img src="/images/client3.png" alt="Client" />
              <div>
                <h4>Emily Rodriguez</h4>
                <p>Brand Manager, Beauty Company</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section" id="blog">
        <h2 className="section-title">Latest Blog</h2>
        
        <div className="blog-grid">
          <div className="blog-card">
            <div className="blog-image">
              <img src="/images/blog1.png" alt="Blog" />
            </div>
            <div className="blog-content">
              <h3>How to Find the Right Influencers for Your Brand</h3>
              <p>Learn the key strategies for identifying influencers who align with your brand values and can effectively reach your target audience.</p>
              <a href="#" className="read-more">Read More</a>
            </div>
          </div>

          <div className="blog-card">
            <div className="blog-image">
              <img src="/images/blog2.png" alt="Blog" />
            </div>
            <div className="blog-content">
              <h3>Measuring ROI in Influencer Marketing Campaigns</h3>
              <p>Discover the metrics and tools you need to accurately measure the return on investment from your influencer marketing efforts.</p>
              <a href="#" className="read-more">Read More</a>
            </div>
          </div>

          <div className="blog-card">
            <div className="blog-image">
              <img src="/images/blog3.png" alt="Blog" />
            </div>
            <div className="blog-content">
              <h3>The Rise of Micro-Influencers in 2023</h3>
              <p>Explore how smaller, niche influencers are driving authentic engagement and why brands are increasingly turning to micro-influencers.</p>
              <a href="#" className="read-more">Read More</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        
        <div className="faq-grid">
          <div className="faq-item">
            <h3>What is influencer marketing?</h3>
            <p>Influencer marketing is a form of social media marketing that uses endorsements and product mentions from individuals who have a dedicated social following and are viewed as experts within their niche.</p>
          </div>

          <div className="faq-item">
            <h3>How do you select influencers for my brand?</h3>
            <p>We select influencers based on your brand values, target audience demographics, campaign goals, and the influencer's engagement metrics, content quality, and authenticity.</p>
          </div>

          <div className="faq-item">
            <h3>How much does influencer marketing cost?</h3>
            <p>Costs vary depending on campaign scope, influencer reach, content requirements, and campaign duration. We offer customized packages to fit different budgets and goals.</p>
          </div>

          <div className="faq-item">
            <h3>How do you measure campaign success?</h3>
            <p>We track key performance indicators such as engagement rates, reach, impressions, click-through rates, conversions, and ROI to measure the success of your campaigns.</p>
          </div>

          <div className="faq-item">
            <h3>How long does a typical campaign last?</h3>
            <p>Campaign duration varies based on your goals, but most campaigns run between 2-8 weeks, with ongoing partnerships extending for months or even years.</p>
          </div>

          <div className="faq-item">
            <h3>Do you work with international influencers?</h3>
            <p>Yes, we have a global network of influencers and can create campaigns targeting specific regions or international audiences based on your needs.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="contact-content">
          <h2>Ready to Get Started?</h2>
          <p>Reach out to us today to discuss how our influencer marketing solutions can help grow your business.</p>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Name" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Company" />
            </div>
            <div className="form-group">
              <textarea placeholder="Message"></textarea>
            </div>
            <button type="submit" className="primary-button">Send Message</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-about">
            <img src="/images/logo.svg" alt="Logo" className="footer-logo" />
            <p>We connect brands with influential content creators to deliver authentic marketing campaigns that drive real results.</p>
            <div className="social-links">
              <a href="#" className="social-link"><img src="/images/instagram-small.svg" alt="Instagram" /></a>
              <a href="#" className="social-link"><img src="/images/twitter.svg" alt="Twitter" /></a>
              <a href="#" className="social-link"><img src="/images/facebook-small.svg" alt="Facebook" /></a>
              <a href="#" className="social-link"><img src="/images/youtube-small.svg" alt="YouTube" /></a>
            </div>
          </div>
          <div className="footer-links">
            <h3>Company</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Case Studies</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Services</h3>
            <ul>
              <li><a href="#">Influencer Marketing</a></li>
              <li><a href="#">Content Creation</a></li>
              <li><a href="#">Campaign Management</a></li>
              <li><a href="#">Analytics & Reporting</a></li>
              <li><a href="#">Strategy Development</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Resources</h3>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Guides</a></li>
              <li><a href="#">Case Studies</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Testimonials</a></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Legal</h3>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">GDPR Compliance</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2023 Influencer Marketing Agency. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage; 