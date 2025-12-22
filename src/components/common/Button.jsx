// src/components/common/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  ...props 
}) => {
  const baseStyles = 'font-medium transition-all duration-300 border-2 border-black';
  
  const variants = {
    primary: 'bg-[#94E4E4] text-black hover:bg-[#7dd4d4] w-[216px] h-[56px] rounded-[20px] px-4',
    secondary: 'bg-transparent text-black hover:bg-gray-50 w-[236px] h-[56px] rounded-[20px] px-4'
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;