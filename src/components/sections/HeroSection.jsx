import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Build your own AI assistant in minutes.
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              All-in-one platform to create and manage intelligent assistants websites and apps with a powerful and easy-to-use tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => navigate('/signup')}>
                Let's get started
              </Button>
              <Button variant="secondary">
                Read how it Works
              </Button>
            </div>
          </div>
          
          {/* Right Content - Video Placeholder */}
          <div className="order-1 md:order-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 aspect-video flex items-center justify-center hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-gray-500 text-sm font-medium">Demo Video</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;