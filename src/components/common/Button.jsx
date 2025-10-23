import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  onClick, 
  className = '', 
  fullWidth = false 
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#4ECDC4] text-white hover:bg-[#3db8af] active:bg-[#2da39a]',
    secondary: 'bg-white text-black border-2 border-black hover:bg-gray-50 active:bg-gray-100',
    outline: 'bg-transparent text-black border border-gray-300 hover:bg-gray-50 active:bg-gray-100'
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;