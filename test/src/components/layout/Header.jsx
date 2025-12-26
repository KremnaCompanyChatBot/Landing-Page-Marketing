import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../common/Logo';

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')} 
            className="text-gray-700 hover:text-[#4ECDC4] transition-colors font-medium"
          >
            Log In
          </button>
          <button 
            onClick={() => navigate('/signup')} 
            className="text-gray-700 hover:text-[#4ECDC4] transition-colors font-medium"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;