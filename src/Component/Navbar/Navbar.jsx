import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCartShopping,
  faUser,
  faXmark,
  faCartFlatbed,
  faCreditCard,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../Logo/Logo";
import SecondaryBtn from "../Buttons/SecondaryBtn/SecondaryBtn";
import "./navbar.css";
import "../../index.css";
import { Link, useLocation } from "react-router-dom";
import { mockMenuData } from "../../data/mockMenuData";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// --- Desktop NavLink Component (MODIFIED) ---
const NavLink = ({ to, children, submenu }) => {
  const isDropdown = submenu && submenu.length > 0;

  // Standard NavLink styling
  const linkClassName = "text-white hover:[color:var(--hover-primary)] font-medium inline-block relative transition duration-300 hover:scale-110 hover:-translate-y-0.5";

  return (
    <li className={`relative group ${isDropdown ? '' : ''}`}>
      <Link
        to={to || '#'}
        className={linkClassName}
      >
        {children}
        {/* Add a caret for dropdown visual cue */}
        {isDropdown && (
          <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-sm transition-transform duration-300 group-hover:rotate-180" />
        )}
        <span className="absolute bottom-1 left-0 w-full h-px bg-[color:var(--hover-primary)] origin-center transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
      </Link>

      {/* Dropdown Menu for Desktop */}
      {isDropdown && (
        <div 
          className="absolute hidden group-hover:block top-full left-1/2 transform -translate-x-1/2 w-40 bg-neutral-900 shadow-xl rounded-md overflow-hidden z-50"
          style={{ minWidth: '10rem' }}
        >
          <ul className="py-2">
            {submenu.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="block px-4 py-2 text-md text-white hover:bg-[color:var(--hover-primary)] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};


const NavLinkMobile = ({ to, children, onClose, isToggle = false, onClick, isOpen = false }) => {
  if (isToggle) {
    return (
      <li className="w-full">
        <button
          onClick={onClick}
          className="w-full flex justify-center items-center gap-2 text-white hover:text-yellow-400 font-medium text-2xl transition-colors duration-300 p-2"
        >
          {children}
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className="text-xl" />
        </button>
      </li>
    );
  }

  return (
    <li>
      <Link
        to={to}
        onClick={onClose}
        className="text-white hover:text-yellow-400 font-medium text-2xl transition-colors duration-300"
      >
        {children}
      </Link>
    </li>
  );
};


const Navbar = ({ cartItems, setCartItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false); 
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/cart") {
      setIsCartModalOpen(false);
    }
  }, [location.pathname]);

  const toggleMenu = (e) => {
    if (e) e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
    setIsResourcesOpen(false); 
  };

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setIsResourcesOpen(false); 
  }, []);

  const toggleResources = (e) => {
    if (e) e.preventDefault();
    setIsResourcesOpen((prev) => !prev);
  };

  const toggleCartModal = (e) => {
    if (e) e.preventDefault();
    if (location.pathname !== "/cart") {
      setIsCartModalOpen((prev) => !prev);
    }
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const addToCart = useCallback(
    (item) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(
          (cartItem) => cartItem.name === item.name
        );
        if (existingItem) {
          return prevItems.map((cartItem) =>
            cartItem.name === item.name
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        }
        return [...prevItems, { ...item, quantity: 1 }];
      });
    },
    []
  );

  const removeFromCart = useCallback((name) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.name !== name)
    );
  }, []);

  const updateCartQuantity = useCallback((name, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.name === name ? { ...item, quantity } : item
      )
    );
  }, []);


  useEffect(() => {
    const handleOutsideClick = (e) => {
      const menu = document.getElementById("menuOverlay");
      const hamburger = document.getElementById("hamburger");
      const cartModal = document.getElementById("cartModal");
      const cartIcon = document.getElementById("cartIcon");

      if (
        isMenuOpen &&
        menu &&
        hamburger &&
        !menu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        closeMenu();
      }

      if (
        isCartModalOpen &&
        cartModal &&
        !cartModal.contains(e.target) &&
        !cartIcon.contains(e.target)
      ) {
        closeCartModal();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMenuOpen, isCartModalOpen, closeMenu]);

  const totalCartItems = cartItems.length;

  useEffect(() => {
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateCartQuantity = updateCartQuantity;

    return () => {
      delete window.addToCart;
      window.removeFromCart;
      window.updateCartQuantity;
    };
  }, [addToCart, removeFromCart, updateCartQuantity]);


  const resourcesSubmenu = [
    { label: "Services", to: "/services" },
    { label: "Blog", to: "/blog" },
    { label: "Reviews", to: "/reviews" },
  ];

  return (
    <header>
      <nav className="bg-black flex justify-between items-center fixed top-0 w-full z-50 px-8 py-4 shadow-lg">
        <Logo />

        <ul className="hidden md:flex list-none gap-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/about">About</NavLink>         
          <NavLink to="/" submenu={resourcesSubmenu}>
            Resources
          </NavLink>
          <NavLink to="/reservation">Reservation</NavLink>
        </ul>

        <div className="hidden md:flex text-xl gap-5 items-center">
          <a
            href="#"
            className="text-primary-dark hover:text-[var(--hover-primary)] transition-colors"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </a>
          <a
            href="#"
            className="text-primary-dark hover:text-[var(--hover-primary)] transition-colors"
          >
            <FontAwesomeIcon icon={faUser} />
          </a>
          <div id="cartIcon" className="relative">
            <a
              href="#"
              className="text-primary-dark hover:text-[var(--hover-primary)] transition-colors z-10"
              onClick={toggleCartModal}
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </a>
            <span
              id="cart-ribbon"
              className="absolute top-[-8px] right-[-8px] w-5 h-5 rounded-full bg-red-600 flex justify-center items-center z-0"
            >
              <span
                id="cart-item-count"
                className="text-white text-xs font-semibold"
              >
                {totalCartItems}
              </span>
            </span>
          </div>
        </div>

        <div
          id="hamburger"
          className="cursor-pointer h-9 w-9 rounded-full flex text-white text-center bg-orange-500 md:hidden justify-center items-center active:scale-90 transition-transform duration-100 z-50"
          onClick={toggleMenu}
        >
          <span id="hamburger-icon" className="text-xl leading-none">
            {isMenuOpen ? "✖" : "☰"}
          </span>
        </div>
      </nav>

      <div
        id="menuOverlay"
        className={`fixed top-0 left-0 w-full h-full backdrop-blur-md bg-black/40 z-40 ${
          isMenuOpen ? "flex" : "hidden"
        }`}
      >
        <ul
          className={`nav-links-mobile fixed top-0 right-0 w-4/5 h-full bg-[#111] text-white flex flex-col justify-center items-center gap-4 pt-20 pb-10 overflow-y-auto transform transition-all duration-400 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Primary Links */}
          <NavLinkMobile to="/" onClose={closeMenu}>Home</NavLinkMobile>
          <NavLinkMobile to="/menu" onClose={closeMenu}>Menu</NavLinkMobile>
          <NavLinkMobile to="/about" onClose={closeMenu}>About</NavLinkMobile>
          <NavLinkMobile
            isToggle={true}
            onClick={toggleResources}
            isOpen={isResourcesOpen}
          >
            Resources
          </NavLinkMobile>
          <NavLinkMobile to="/reservation" onClose={closeMenu}>Reservation</NavLinkMobile>

          <div 
            className={`w-2/5 transition-all duration-300 ease-in-out overflow-hidden ${
              isResourcesOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
            }`}
          >
            <ul className="flex flex-col items-start gap-4 p-3 bg-neutral-800 rounded-lg w-full">
              <li>
                <Link to="/services" onClick={closeMenu} className="text-xl text-gray-300 hover:text-white block pl-4">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" onClick={closeMenu} className="text-xl text-gray-300 hover:text-white block pl-4">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/reviews" onClick={closeMenu} className="text-xl text-gray-300 hover:text-white block pl-4">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
        </ul>
      </div>

      {isCartModalOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[1000] ${
            isCartModalOpen ? "" : "hidden"
          }`}
          onClick={closeCartModal}
        >
          <div
            id="cartModal"
            className="bg-white rounded-lg absolute top-20 right-6 overflow-hidden shadow-2xl w-[350px] min-h-[500px] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between bg-transparent items-center p-4 border-b-2 border-[#ffd2ad]">
              <h3 className="text-2xl text-[var(--text-primary-dark)] font-semibold">
                Your Cart
              </h3>
              <button
                onClick={closeCartModal}
                className="bg-[var(--text-primary-dark)] text-white text-md p-1 rounded-md border border-[var(--text-primary-dark)] cursor-pointer transition-colors duration-300 hover:bg-transparent hover:border hover:border-[var(--text-primary-dark)] hover:text-[var(--text-primary-dark)] z-10"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-4 overflow-y-auto">
              {cartItems.length === 0 ? (
                <>
                  <DotLottieReact
                    src="https://lottie.host/1fd3b4be-a458-4859-b54f-cc5429df3aea/GykcBcc1Fk.lottie"
                    loop
                    autoplay
                    className="mt-10"
                  />
                  <p className="mt-4 text-xl text-center text-gray-600">Hunger strikes! Fill your cart with flavor now.</p>
                </>
              ) : (
                cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center mb-4 border-b pb-2"
                  >
                    <img
                      src={item.images.main}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="text-lg text-[var(--text-primary-muted)] font-semibold">
                        {item.name}
                      </h4>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-gray-800 font-bold">
                          $
                          {(
                            parseFloat(item.price.replace("$", "")) * item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Total Div */}
            {cartItems.length === 0 ? '' : (
              <div className="flex justify-between pl-4 pr-4 items-center mb-4">
                <span className="text-lg text-[var(--text-primary-muted)] font-semibold">
                  Total:
                </span>
                <span className="text-2xl text-black font-bold">
                  $
                  {cartItems
                    .reduce((total, item) => {
                      return (
                        total +
                        parseFloat(item.price.replace("$", "")) * item.quantity
                      );
                    }, 0)
                    .toFixed(2)}
                </span>
              </div>
            )}

            {/* Modal Footer */}
            {cartItems.length === 0 ? '' : (
            <div className="p-4 border-t border-[#ffd2ad]">
              <div className="flex justify-between">
                <Link to="/cart">
                  <SecondaryBtn onClick={closeCartModal}>
                    <FontAwesomeIcon className="mr-1" icon={faCartFlatbed} />
                    Cart
                  </SecondaryBtn>
                </Link>
                <SecondaryBtn onClick={() => console.log("Proceed to Checkout")}>
                  <FontAwesomeIcon className="mr-1" icon={faCreditCard} />
                  Checkout
                </SecondaryBtn>
              </div>
            </div> )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
