import React, { useState, useEffect, useRef } from 'react';

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // SVG Icons - Cleaned and sized consistently
  const Icons = {
    chain: (
      <svg width="32" height="32" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.8115 19.6104C27.3542 19.6104 27.8746 19.8258 28.2588 20.209C28.8983 20.8471 29.4058 21.605 29.752 22.4395C30.0981 23.2739 30.2764 24.1688 30.2764 25.0723C30.2763 25.9755 30.098 26.8698 29.752 27.7041C29.449 28.4344 29.0226 29.1064 28.4922 29.6904L28.2588 29.9355L16.2715 41.9023C14.5238 43.6464 12.1555 44.6259 9.68652 44.626C7.21744 44.626 4.8493 43.6464 3.10156 41.9023C2.23754 41.0401 1.55176 40.0162 1.08398 38.8887C0.616253 37.7611 0.37505 36.5518 0.375 35.3311C0.375 34.1102 0.616229 32.9011 1.08398 31.7734C1.55176 30.6457 2.2374 29.6212 3.10156 28.7588L7.60156 24.2646V24.2666L8.24121 23.6289C8.62545 23.2457 9.14579 23.0303 9.68848 23.0303C10.2311 23.0303 10.7515 23.2457 11.1357 23.6289C11.3254 23.8184 11.4764 24.0433 11.5791 24.291C11.6817 24.5386 11.7344 24.8043 11.7344 25.0723C11.7343 25.3403 11.6817 25.6059 11.5791 25.8535C11.5021 26.0392 11.3986 26.2124 11.2715 26.3672L11.1357 26.5156L5.99902 31.6455C5.51467 32.1289 5.13039 32.7029 4.86816 33.335C4.60598 33.967 4.47075 34.6448 4.4707 35.3291C4.4707 36.0134 4.60601 36.6911 4.86816 37.3232C5.09765 37.8765 5.4205 38.3856 5.82227 38.8281L5.99902 39.0137C6.97845 39.9905 8.30519 40.539 9.68848 40.5391C10.9854 40.5391 12.2325 40.0566 13.1904 39.1914L13.3789 39.0137L25.3633 27.0459C25.6227 26.7868 25.8293 26.4793 25.9697 26.1406C26.1101 25.802 26.1826 25.4388 26.1826 25.0723C26.1826 24.7056 26.1102 24.3417 25.9697 24.0029C25.8644 23.7489 25.7218 23.5125 25.5479 23.3008L25.3633 23.0977C25.1734 22.9083 25.0228 22.6832 24.9199 22.4355C24.8171 22.1877 24.7637 21.9216 24.7637 21.6533C24.7637 21.385 24.8171 21.119 24.9199 20.8711C25.0227 20.6234 25.1734 20.3984 25.3633 20.209C25.7476 19.8257 26.2688 19.6104 26.8115 19.6104ZM35.3184 0.375C37.7875 0.375 40.1566 1.35454 41.9043 3.09863C42.7683 3.961 43.4532 4.98569 43.9209 6.11328C44.3887 7.241 44.6299 8.45001 44.6299 9.6709C44.6299 10.8917 44.3886 12.1009 43.9209 13.2285C43.4531 14.3561 42.7683 15.3808 41.9043 16.2432H41.9033L37.4014 20.7363V20.7344L36.7617 21.373C36.3774 21.7563 35.8562 21.9717 35.3135 21.9717C34.7709 21.9716 34.2504 21.7561 33.8662 21.373C33.6765 21.1836 33.5255 20.9586 33.4229 20.7109C33.3202 20.4633 33.2676 20.1977 33.2676 19.9297C33.2676 19.6617 33.3203 19.396 33.4229 19.1484C33.5255 18.9008 33.6766 18.6758 33.8662 18.4863L39.0039 13.3564C39.4883 12.873 39.8725 12.2982 40.1348 11.666C40.3969 11.0339 40.5322 10.3562 40.5322 9.67188C40.5322 8.98753 40.397 8.30986 40.1348 7.67773C39.8725 7.04556 39.4883 6.47077 39.0039 5.9873C38.0244 5.01037 36.6969 4.46191 35.3135 4.46191C33.9303 4.46198 32.6034 5.01058 31.624 5.9873V5.98828L19.6416 17.9551C19.3821 18.2142 19.1756 18.5226 19.0352 18.8613C18.8949 19.1999 18.8232 19.5632 18.8232 19.9297C18.8233 20.2963 18.8948 20.6594 19.0352 20.998C19.1756 21.3368 19.3821 21.6442 19.6416 21.9033C19.8316 22.0928 19.9821 22.3185 20.085 22.5664C20.1878 22.8142 20.2412 23.0803 20.2412 23.3486C20.2412 23.6168 20.1877 23.8822 20.085 24.1299C19.9821 24.3778 19.8316 24.6035 19.6416 24.793C19.2573 25.1762 18.7361 25.3916 18.1934 25.3916C17.6508 25.3915 17.1303 25.1761 16.7461 24.793C16.1066 24.1549 15.5991 23.3968 15.2529 22.5625C14.9067 21.7281 14.7286 20.8331 14.7285 19.9297C14.7285 19.0262 14.9067 18.1314 15.2529 17.2969C15.5559 16.5665 15.9822 15.8946 16.5127 15.3105L16.7461 15.0664L28.7334 3.09863C30.4811 1.35462 32.8494 0.375092 35.3184 0.375Z" fill="black" stroke="black" strokeWidth="0.5"/>
      </svg>
    ),
    computer: (
      <svg width="36" height="36" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 32.5V35H12.5V5H5V27.5H7.5V32.5H5ZM2.5 0H15C15.663 0 16.2989 0.263392 16.7678 0.732233C17.2366 1.20107 17.5 1.83696 17.5 2.5V37.5C17.5 38.163 17.2366 38.7989 16.7678 39.2678C16.2989 39.7366 15.663 40 15 40H2.5C1.83696 40 1.20107 39.7366 0.732233 39.2678C0.263392 38.7989 0 38.163 0 37.5V2.5C0 1.83696 0.263392 1.20107 0.732233 0.732233C1.20107 0.263392 1.83696 0 2.5 0V0ZM25 7.5H45C46.3261 7.5 47.5979 8.02678 48.5355 8.96447C49.4732 9.90215 50 11.1739 50 12.5V27.5C50 28.8261 49.4732 30.0979 48.5355 31.0355C47.5979 31.9732 46.3261 32.5 45 32.5H25C23.6739 32.5 22.4021 31.9732 21.4645 31.0355C20.5268 30.0979 20 28.8261 20 27.5V12.5C20 11.1739 20.5268 9.90215 21.4645 8.96447C22.4021 8.02678 23.6739 7.5 25 7.5ZM25 12.5V27.5H45V12.5H25ZM30 35H40C40.663 35 41.2989 35.2634 41.7678 35.7322C42.2366 36.2011 42.5 36.837 42.5 37.5C42.5 38.163 42.2366 38.7989 41.7678 39.2678C41.2989 39.7366 40.663 40 40 40H30C29.337 40 28.7011 39.7366 28.2322 39.2678C27.7634 38.7989 27.5 38.163 27.5 37.5C27.5 36.837 27.7634 36.2011 28.2322 35.7322C28.7011 35.2634 29.337 35 30 35Z" fill="black"/>
      </svg>
    ),
    pen: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M19.4 7.34L16.66 4.6A2 2 0 0 0 13.82 4.6L4 14.42C3.6 14.82 3.2 15.4 3.2 16L3 20.2C2.96 20.74 3.4 21.18 3.94 21.14L8.14 20.94C8.72 20.92 9.3 20.52 9.7 20.12L19.52 10.3C20.3 9.52 20.3 8.24 19.4 7.34ZM15.24 11.72L12.42 8.9L14.54 6.78L17.36 9.6L15.24 11.72ZM6.46 18.44L5.3 17.28L11.02 11.56L12.18 12.72L6.46 18.44Z" fill="black"/>
         <path d="M20.71 3.29L19.29 1.87C18.35 0.93 16.83 0.93 15.89 1.87L14.54 3.23L19.36 8.05L20.71 6.7C21.65 5.76 21.65 4.24 20.71 3.29Z" fill="black"/>
      </svg>
    ),
    chat: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fillRule="evenodd" clipRule="evenodd" d="M4 4C4 2.89543 4.89543 2 6 2H18C19.1046 2 20 2.89543 20 4V16C20 17.1046 19.1046 18 18 18H7.82843L4 21.8284V4ZM6 4V16.1716L7.17157 15H18V4H6Z" fill="black" stroke="black" strokeWidth="1.5"/>
      </svg>
    ),
    pulse: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H6L9 3L13 21L16 12H21" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  };

  const topRowFeatures = [
    { id: 1, icon: Icons.chain, title: 'One-click integrations' },
    { id: 2, icon: Icons.computer, title: 'Connect easily to your website or app' },
    { id: 3, icon: Icons.pen, title: 'Custom Personality — Design your assistant s tone, style, and behavior' }
  ];

  const bottomRowFeatures = [
    { id: 4, icon: Icons.chat, title: 'Real-time Insights — See your users messages and behavior in real time' },
    { id: 5, icon: Icons.pulse, title: 'Analytics & Reports — Track engagement and performance easily.' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Card Component
  const FeatureCard = ({ feature, index, delayOffset = 0 }) => (
    <div
      className={`group bg-[#F5F7FA] rounded-[2rem] p-12 transition-all duration-700 transform hover:shadow-2xl hover:-translate-y-2 hover:bg-[#EEEEF0] flex flex-col items-center text-center h-full w-full ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        transitionDelay: `${(index + delayOffset) * 150}ms`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}
    >
      {/* The "Art" Container */}
      <div className="relative mb-10 w-20 h-20 flex items-center justify-center">
        
        {/* Purple Background Shape */}
        <div className="absolute top-190px right-22px w-16 h-16 bg-[#C68AF5] rounded-2xl 
                      transform translate-x-4 -translate-y-3 rotate-12 
                      transition-all duration-500 ease-out
                      group-hover:rotate-0 group-hover:scale-110 group-hover:translate-x-5 group-hover:-translate-y-4 group-hover:shadow-lg">
        </div>

        {/* The Icon - Stays stable on top */}
        <div className="relative z-10 transform translate-y-1 -translate-x-1 transition-transform duration-500 group-hover:scale-110">
          {feature.icon}
        </div>
      </div>

      <h3 className="text-[17px] font-medium text-gray-900 leading-[1.6] max-w-[92%] tracking-tight">
        {feature.title}
      </h3>
    </div>
  );

  return (
    <section ref={sectionRef} className="py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
         
          
          {/* Top Row - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {topRowFeatures.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>

          {/* Bottom Row - 2 Columns Centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[calc(66.666%-1rem)] mx-auto">
            {bottomRowFeatures.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} delayOffset={3} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;