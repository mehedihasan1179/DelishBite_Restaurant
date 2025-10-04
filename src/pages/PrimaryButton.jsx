import React, { useRef } from 'react';

// New component structure: check for 'href' to decide the element type
const PrimaryButton = ({ children, href, onClick, className = '' }) => { 
  const buttonRef = useRef(null);

  const handleMouseMove = (event) => {
    // ... (your existing handleMouseMove logic)
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      buttonRef.current.style.setProperty("--x-pos", `${x}px`);
      buttonRef.current.style.setProperty("--y-pos", `${y}px`);
    }
  };

  // Decide which HTML element to render
  const Element = href ? 'a' : 'button';

  return (
    <Element 
      // Spread any props passed to the component (like href, onClick, etc.)
      {...(href ? { href } : { onClick })}
      className={`primary-btn ${className}`}
      ref={buttonRef}
      onMouseMove={handleMouseMove}
    >
      {children}
    </Element>
  );
};

export default PrimaryButton;