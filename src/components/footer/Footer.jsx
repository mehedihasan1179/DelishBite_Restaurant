import React, { useState } from 'react';
import PrimaryButton from '../../pages/PrimaryButton';

// Data Arrays for clean mapping
const socialLinks = [
  { icon: 'fab fa-facebook-f', url: '#' },
  { icon: 'fab fa-twitter', url: '#' },
  { icon: 'fab fa-instagram', url: '#' },
  { icon: 'fab fa-linkedin-in', url: '#' },
  { icon: 'fab fa-youtube', url: '#' },
];

const supportLinks = [
  { label: 'FAQ', url: '#' },
  { label: 'Privacy Policy', url: './service/index.html' },
  { label: 'Help', url: '#' },
  { label: 'Contact', url: '#' },
];

const quickLinks = [
  { label: 'Home', url: '#' },
  { label: 'Services', url: '#' },
  { label: 'About Us', url: '#' },
  { label: 'Features', url: '#' },
  { label: 'Contact', url: '#' },
];


const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Newsletter Form Submission Handler ---
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setMessage('Subscribing...');
    
    // Simulate an API call or submission process
    setTimeout(() => {
      console.log('Newsletter submitted:', email);
      setIsSubmitting(false);
      setMessage(`Thank you for subscribing, ${email}!`);
      setEmail(''); // Clear the input after submission
    }, 1500);
  };
  
  // Helper for the floating label logic
  const isEmailActive = !!email;

  return (
    <section id="footer" className="footer">
      <div className="container">
        <div className="footer-grid">
          
          {/* Part 1: Logo, Social Text, and Icons */}
          <div className="footer-part footer-part1">
            <div className="logo">DelishBite</div>
            <p className="social-text">
              Follow us on social media for the latest updates, special offers,
              and behind-the-scenes glimpses into our kitchen!
            </p>
            <div className="icons">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                  {/* Note: Using the Font Awesome class names */}
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Part 2: Support Links */}
          <div className="footer-part footer-part2">
            <h3>Support</h3>
            <ul className="footer-links">
              {supportLinks.map((link, index) => (
                <li key={index}><a href={link.url}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Part 3: Quick Links */}
          <div className="footer-part footer-part3">
            <h3>Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}><a href={link.url}>{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Part 4: Newsletter */}
          <div className="footer-part footer-part4">
            <h3>Newsletter</h3>
            <p className="newsletter-text">
              Subscribe to our newsletter to receive exclusive offers, recipes,
              and updates straight to your inbox.
            </p>
            
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  placeholder=" "
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // The 'active' class on the input is often needed for floating label styling
                  className={isEmailActive ? 'active' : ''} 
                  disabled={isSubmitting}
                />
                {/* Apply 'active' class to the span for floating label behavior */}
                <span className={`field-label ${isEmailActive ? 'active' : ''}`}>
                  Email Address
                </span>
              </div>

              <PrimaryButton className="primary-btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : 'Subscribe'}
              </PrimaryButton>
            </form>
            
            {/* Submission Message Feedback */}
            {message && <p className="submission-message">{message}</p>}

            <div className="privacy-note">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </div>
          </div>
        </div>
        
        {/* Optional Copyright Section */}
        <div className="copyright">
          &copy; {new Date().getFullYear()} DelishBite. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default Footer;