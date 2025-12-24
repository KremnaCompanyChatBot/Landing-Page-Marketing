import React from 'react';
import { useNavigate } from 'react-router-dom';
import iconPath from '../../assets/icons/gg.png';

const HowItWorksSection = () => {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      text: "Sign Up & Create Sign up in minutes and instantly create your new assistant. No credit card required to start."
    },
    {
      id: 2,
      text: "Define its personality, tone, and knowledge. Upload your documents or add website links to train it instantly."
    },
    {
      id: 3,
      text: "Embed your new assistant on your website or app with a single click. It's that simple."
    }
  ];

  return (
    <section id="how-it-works" className="bg-[#E0F7FA] py-20 font-roboto overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">

        <div className="flex flex-col items-center gap-8 mb-12 w-full max-w-[1240px]">

          <div className="flex items-center justify-center gap-6 relative">

            <div className="relative w-[50px] h-[50px] flex items-center justify-center">

              <div
                className="absolute bg-[#0F0F0F] opacity-20"
                style={{
                  width: '50px',
                  height: '49px',
                  transform: 'rotate(180deg)',
                  borderTopLeftRadius: '18px',
                  borderTopRightRadius: '5px',
                  borderBottomRightRadius: '10px',
                  borderBottomLeftRadius: '5px',
                  top: '-10px',
                  left: '12px',
                  zIndex: 0
                }}
              ></div>

              <img
                src={iconPath}
                alt="Spiral Icon"
                className="relative z-10 w-full h-full object-contain"
                style={{
                  width: '50px',
                  height: '50px'
                }}
              />
            </div>

            <h2
              className="font-bold text-black tracking-[0px]"
              style={{
                fontSize: '42px',
                lineHeight: '110%',
                opacity: '0.8',
                fontFamily: 'Roboto, sans-serif'
              }}
            >
              How It Works
            </h2>
          </div>

          <h3
            className="text-center font-bold text-black"
            style={{
              fontSize: '32px',
              maxWidth: '1206px',
              lineHeight: '35px',
              fontFamily: 'Roboto, sans-serif'
            }}
          >
            It's simpler than you think.
          </h3>

          <p
            className="text-center font-bold text-black"
            style={{
              fontSize: '20px',
              maxWidth: '716px',
              lineHeight: '26px',
              fontFamily: 'Roboto, sans-serif'
            }}
          >
            Get your AI assistant up and running in just three simple steps.
          </p>
        </div>

        {/* Steps with improved styling */}
        <div className="flex flex-col gap-6 w-full max-w-[900px] mb-10">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-start gap-4 w-full bg-white/50 rounded-xl p-5 hover:bg-white hover:shadow-md transition-all duration-300 cursor-default border-l-4 border-transparent hover:border-[#4ECDC4]"
            >
              <div className="mt-1 flex-shrink-0" style={{ width: '24px', height: '24px', opacity: 0.8 }}>
                <img
                  src={iconPath}
                  alt="step icon"
                  className="w-full h-full object-contain"
                />
              </div>

              <p
                className="text-gray-900"
                style={{
                  fontSize: '18px',
                  fontWeight: '400',
                  lineHeight: '140%',
                  fontFamily: 'Roboto, sans-serif',
                  textAlign: 'left'
                }}
              >
                <span className="font-bold text-[#7B18C7] mr-2">Step {step.id}:</span>
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="flex flex-col items-center gap-3 mt-4">
          <p className="text-gray-700 text-base">Ready to get started?</p>
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-[#7B18C7] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
          >
            Create Your Assistant
          </button>
          <p className="text-sm text-gray-500">No credit card required</p>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
