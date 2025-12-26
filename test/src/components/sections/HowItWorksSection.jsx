import React from 'react';

const HowItWorksSection = () => {
  return (
    <section className="bg-[#BBEDED] py-20">
      <div className="container mx-auto px-4 md:px-20 lg:px-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <div className="flex items-center justify-center gap-3">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-lg text-gray-700">
            Sign up, create, and connect — it's that simple
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;