import React, { useRef, useState, useEffect, useCallback } from 'react';
import './secondaryBtn.css';

const SecondaryBtn = ({ children, onClick, className = '', isActive = false }) => {
    const baseClasses = `
        px-4 py-2 text-base font-semibold border-2 rounded-lg 
        relative overflow-hidden outline-none cursor-pointer
        transition-colors duration-300 ease-in-out z-10
        ${className}
    `;

    const colorClasses = `
        border-[#f5930b] bg-transparent
    `;

    const activeClasses = isActive 
        ? 'bg-[#eb8c07] !text-white !border-[#eb8c07] transition-none'
        : 'text-[#ff9100]'; 
        
    const finalClasses = `${baseClasses} ${colorClasses} secondary-btn ${activeClasses}`;
    
    return (
        <button 
            onClick={onClick}
            className={`${finalClasses} ${isActive ? 'active' : ''}`}
        >
            {children || 'Button'}
        </button>
    );
};

export default SecondaryBtn;