import React, { useRef, useState, useEffect, useCallback } from 'react';
import './primaryBtn.css';

const PrimaryBtn = ({ children, onClick, className = '', ...props }) => {
  const btnRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left; 
      const y = e.clientY - rect.top;
      
      btnRef.current.style.setProperty('--x', `${x}px`);
      btnRef.current.style.setProperty('--y', `${y}px`);
    }
  }, []);

  useEffect(() => {
    const button = btnRef.current;
    if (button) {
      button.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (button) {
        button.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [handleMouseMove]);
  const buttonClasses = `
    group relative inline-flex border border-primary bg-transparent
    px-5 py-2.5 text-xl text-[var(--btn-primary)] rounded-lg transition-colors duration-500 overflow-hidden
    hover:text-white primary-btn cursor-pointer ${className}  
  `;
  
  const spanClasses = `
    z-10
  `;

  return (
    <a 
      // href={href || '#'}
      ref={btnRef} 
      className={buttonClasses} 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <span className={spanClasses}>{children || 'Button'}</span>
    </a>
  );
};

export default PrimaryBtn;