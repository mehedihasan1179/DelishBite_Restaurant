import React, { useState } from 'react';
// Assuming you save the CSS in a file named Navbar.css and import it
import './navbar.css';


const Navbar = () => {
  // State to manage the mobile menu's open/close status
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header>
        <nav>
          <div className="logo logo-fill">DelishBite</div>
          
          {/* Desktop Nav Links */}
          <ul className="nav-links" id="navLinks">
            <li><a to="#">Home</a></li>
            <li><a href="#">Menu</a></li>            
            <li><a href="#">Reservation</a></li>
            <li><a href="#">Reviews</a></li>
            <li><a to="#">Blog</a></li>
            <li><a href="#">Contact</a></li>
          </ul>

          <div className="icons">
            <a href="#" className="search-icon">
              {/* NOTE: You'll need to install and import a React Icon library 
                 (like react-icons) for these to work in a real React app. 
                 For now, I'm keeping the original class names. */}
              <i className="fa-solid fa-magnifying-glass"></i>
            </a>
            <a href="#" className="cart-icon">
              <i className="fa-solid fa-cart-shopping"></i>
            </a>
            <a href="#" className="user-icon">
              <i className="fa-solid fa-user"></i>
            </a>
          </div>

          {/* Hamburger Menu Icon - attaches the toggleMenu function to the click event */}
          <div 
            className="hamburger" 
            id="hamburger" 
            onClick={toggleMenu}
            // Add aria attributes for accessibility
            aria-controls="menuOverlay"
            aria-expanded={isMenuOpen}
          >
            <span id="hamburger-icon">☰</span>
          </div>
        </nav>
      </header>

      {/* Menu overlay for mobile. className is conditionally set based on state. */}
      <div 
        className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} 
        id="menuOverlay"
        // Close menu when clicking the overlay itself
        onClick={toggleMenu} 
      >
        <ul className="nav-links-mobile">
          {/* When an item is clicked, the menu should close */}
          <li><a href="#" onClick={toggleMenu}>Home</a></li>
          <li><a href="#" onClick={toggleMenu}>Menu</a></li>
          <li><a href="#" onClick={toggleMenu}>Order</a></li>
          <li><a href="#" onClick={toggleMenu}>Reservation</a></li>
          <li><a href="#" onClick={toggleMenu}>Reviews</a></li>
          <li><a href="#" onClick={toggleMenu}>Contact</a></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
