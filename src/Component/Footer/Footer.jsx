import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import './footer.css';
import PrimaryBtn from '../Buttons/PrimaryBtn/PrimaryBtn';
// CORRECT: Import Link from react-router-dom
import { Link } from 'react-router-dom'; 
import Logo from '../Logo/Logo';

// Helper component for footer links
const FooterLink = ({ to, children }) => {
    // If 'to' is undefined or empty, fallback to a standard <a> tag (or skip rendering) 
    // for safety, though it's best to always provide 'to' for internal links.
    if (!to || to.startsWith('#')) {
        return (
            <li>
                <a
                    href={to || '#'} // Use href for non-routed links (like anchors)
                    className="relative text-white text-lg transition duration-400 ease-in-out hover:scale-[1.05] hover:text-[color:var(--primary)]"
                >
                    {children}
                </a>
            </li>
        );
    }
    
    return (
        <li>
            {/* Use the Link component for client-side routing */}
            <Link
                to={to}
                className="relative text-white text-lg transition duration-400 ease-in-out hover:scale-[1.05] hover:text-[color:var(--primary)]"
            >
                {children}
            </Link>
        </li>
    );
};


const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const toggleHasTextClass = useCallback((value) => {
    const input = document.getElementById('newsletterEmail');
    if (input) {
      if (value.trim().length > 0) {
        input.classList.add('has-text');
      } else {
        input.classList.remove('has-text');
      }
    }
  }, []);

  useEffect(() => {
    toggleHasTextClass(email);
  }, [email, toggleHasTextClass]);

  const displayMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
  };

  const hideMessage = () => {
    setMessage('');
    setMessageType(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    hideMessage();

    if (!emailRegex.test(email)) {
      displayMessage('Please enter a valid email address', 'error');
      return;
    }

    // Simulate form submission success
    displayMessage('Thank you for subscribing!', 'success');

    setTimeout(() => {
      setEmail('');
      
      setTimeout(() => {
        hideMessage();
      }, 4000);
    }, 300);
  };

  const footerSections = [
    { title: 'Support', links: [
      { text: 'FAQ', to: '/faq' },
      { text: 'Privacy Policy', to: '/privacy' }, 
      { text: 'Help', to: '/help' },
      { text: 'Contact', to: '/contact' },
    ]},
    { title: 'Links', links: [
      { text: 'Home', to: '/' }, 
      { text: 'Services', to: '#' },
      { text: 'About Us', to: '/about' },
      { text: 'Features', to: '#' },
      { text: 'Contact', to: '/contact' },
    ]},
  ];

  return (
    <>
      <section 
        id="footer" 
        className="bg-[#111] text-white py-12 text-sm"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
            
            <div className="flex flex-col items-center gap-4 text-center px-8">

              <Logo />
              <p className="text-base text-gray-300 mb-2">
                Follow us on social media for the latest updates, special offers,
                and behind-the-scenes glimpses into our kitchen!
              </p>
              
              {/* Social Icons */}
              <div className="flex gap-4">
                {[faFacebookF, faTwitter, faInstagram, faLinkedinIn, faYoutube].map((icon, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="text-white hover:text-[color:var(--primary)] text-xl transition-colors duration-300"
                  >
                    <FontAwesomeIcon icon={icon} />
                  </a>
                ))}
              </div>
            </div>

            {/* Part 2 & 3: Links */}
            {footerSections.map((section, index) => (
              <div key={index} className="flex flex-col items-center gap-4 text-center">
                <h3 
                  className="text-2xl font-bold text-[color:var(--primary)] mb-4"
                >
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-3.5 list-none">
                  {section.links.map((linkItem, linkIndex) => (
                    // Pass the 'to' prop correctly
                    <FooterLink key={linkIndex} to={linkItem.to}>
                      {linkItem.text}
                    </FooterLink>
                  ))}
                </ul>
              </div>
            ))}

            {/* Part 4: Newsletter */}
            <div className="flex flex-col items-center gap-4 text-center px-8">
              <h3 
                className="text-2xl font-bold text-[color:var(--primary)] mb-4"
              >
                Newsletter
              </h3>
              <p className="text-gray-300 text-base mb-4">
                Subscribe to our newsletter to receive exclusive offers, recipes,
                and updates straight to your inbox.
              </p>
              
              {/* Newsletter Form */}
              <form 
                className="newsletter-form w-full max-w-sm md:max-w-none" 
                onSubmit={handleSubmit}
              >
                <div className="form-group relative mb-6">
                  <input
                    type="email"
                    id="newsletterEmail"
                    name="email"
                    placeholder=" "
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-[color:var(--secondary-light)] rounded-lg text-lg bg-[#ecf0f1] text-gray-800 transition-colors focus:outline-none focus:border-[color:var(--hover-primary)]"
                  />
                  <span 
                    className="field-label"
                  >
                    Email Address
                  </span>
                </div>

                <PrimaryBtn className="w-full flex justify-center"
                  type="submit"
                >
                  Subscribe
                </PrimaryBtn>

                <p
                  id="formMessage"
                  className={`mt-4 text-sm font-semibold text-center transition-opacity duration-300 
                    ${messageType === 'success' ? 'text-[color:var(--primary-btn)]' : (messageType === 'error' ? 'text-[color:var(--accent)]' : 'hidden')} 
                    ${message ? 'opacity-100 visible h-auto' : 'opacity-0 invisible h-0 mt-0'}
                  `}
                >
                  {message}
                </p>
              </form>
              
              <div className="text-xs text-gray-500 mt-4 max-w-sm md:max-w-none">
                By subscribing, you agree to our Privacy Policy and consent to
                receive updates from our company.
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Separator */}
      <hr className="border-t border-gray-700" />
      
      {/* Copyright Footer */}
      <footer
        className="text-center py-4 bg-[#111] text-white text-sm"
      >
        <p>&copy; 2025 DelishBite. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Footer;