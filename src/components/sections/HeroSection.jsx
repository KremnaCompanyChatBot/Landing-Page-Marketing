import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
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
              <Button variant="primary" onClick={() => navigate('/signup')}>
                Let's get started
              </Button>
              <Button variant="secondary">
                Read how it works
              </Button>
            </div>
          </div>

          {/* Right Content - Lottie Animation */}
          <div className="order-1 md:order-2">
            <div className="">
              <DotLottieReact
                src="https://lottie.host/63902443-15fe-4e93-876d-c352e9cb7e40/9vAjFwNZza.lottie"
                loop
                autoplay
                className="w-full h-full transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

