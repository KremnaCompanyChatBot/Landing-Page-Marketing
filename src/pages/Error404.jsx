import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import Footer from '../components/layout/Footer';

const Error404 = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <Logo />
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <svg className="w-32 h-32 mx-auto mb-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Something went wrong.
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Please try again later.
          </p>
          
          <Button variant="secondary" onClick={() => navigate('/')}>
            Home Page
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Error404;