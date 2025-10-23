import React, { useState, useEffect, useRef } from 'react';

const FeaturesSection = () => {
  const [visibleFeatures, setVisibleFeatures] = useState([]);
  const sectionRef = useRef(null);

  const features = [
    {
      id: 1,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      title: 'One-click integrations'
    },
    {
      id: 2,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Connect easily to your website or app'
    },
    {
      id: 3,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      title: 'Custom Personality — Design your assistants tone, style, and behavior'
    },
    {
      id: 4,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'Real-time Insights — See your users messages and behavior in real time'
    },
    {
      id: 5,
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Analytics & Reports — Track engagement and performance easily'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((feature, index) => {
              setTimeout(() => {
                setVisibleFeatures((prev) => [...prev, feature.id]);
              }, index * 150);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Features Section */}
      <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 animate-fade-in-down">
            Features
          </h2>
          
          {/* First Row - 3 Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 max-w-6xl mx-auto">
            {features.slice(0, 3).map((feature, index) => (
              <div
                key={feature.id}
                className={`group bg-[#F9FAFB] rounded-2xl p-8 text-center transition-all duration-700 transform hover:shadow-xl hover:scale-105 hover:bg-white border-2 border-transparent hover:border-[#4ECDC4] cursor-pointer ${
                  visibleFeatures.includes(feature.id)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="text-gray-300 mb-6 flex justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:text-[#4ECDC4] group-hover:rotate-6">
                  {feature.icon}
                </div>
                <h3 className="text-base font-normal text-gray-900 transition-colors group-hover:text-[#4ECDC4] leading-relaxed">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
          
          {/* Second Row - 2 Features Centered */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.slice(3, 5).map((feature, index) => (
              <div
                key={feature.id}
                className={`group bg-[#F9FAFB] rounded-2xl p-8 text-center transition-all duration-700 transform hover:shadow-xl hover:scale-105 hover:bg-white border-2 border-transparent hover:border-[#4ECDC4] cursor-pointer ${
                  visibleFeatures.includes(feature.id)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${(index + 3) * 150}ms`
                }}
              >
                <div className="text-gray-300 mb-6 flex justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:text-[#4ECDC4] group-hover:rotate-6">
                  {feature.icon}
                </div>
                <h3 className="text-base font-normal text-gray-900 transition-colors group-hover:text-[#4ECDC4] leading-relaxed">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Save Time Section */}
      <section className="bg-[#F2F4F8] py-20">
        <div className="container mx-auto px-4 md:px-20">
          <p className="text-center text-lg font-semibold text-gray-900 animate-fade-in">
            Save time by automating repetitive tasks.
          </p>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;