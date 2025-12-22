import React from 'react';
import iconPath from '../../assets/icons/gg.png';

const HowItWorksSection = () => {
  // لكي تظهر الصورة في المتصفح، يجب استخدام رابط مباشر أو استيراد الصورة.
  // في جهازك المحلي، استخدم السطر التالي بدلاً من الرابط:

  
  // مؤقتاً وضعت هذا الرابط لكي تظهر الصورة أمامك الآن وتتأكد أن التصميم يعمل
  

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
    <section className="bg-[#E0F7FA] py-20 font-roboto overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center">
        
        {/* --- القسم العلوي (العناوين) --- */}
        <div className="flex flex-col items-center gap-8 mb-12 w-full max-w-[1240px]">
          
          {/* حاوية الأيقونة والعنوان */}
          <div className="flex items-center justify-center gap-6 relative">
            
            {/* حاوية الأيقونة */}
            <div className="relative w-[50px] h-[50px] flex items-center justify-center">
              
              {/* المربع الرمادي الخلفي (حسب مقاسات فيجما الدقيقة) */}
              <div 
                className="absolute bg-[#0F0F0F] opacity-20"
                style={{
                  width: '50px',
                  height: '49px',
                  transform: 'rotate(180deg)', // تدوير المربع
                  borderTopLeftRadius: '18px',
                  borderTopRightRadius: '5px',
                  borderBottomRightRadius: '10px',
                  borderBottomLeftRadius: '5px',
                  // ضبط الموقع ليكون خلف الصورة مع الإزاحة المطلوبة
                  top: '-10px', 
                  left: '12px',
                  zIndex: 0
                }}
              ></div>

              {/* عرض الصورة */}
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

            {/* العنوان الرئيسي */}
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

          {/* العنوان الفرعي الأول */}
          <h3 
            className="text-center font-bold text-black"
            style={{
              fontSize: '32px', 
              maxWidth: '1206px',
              lineHeight: '35px',
              fontFamily: 'Roboto, sans-serif'
            }}
          >
            It’s simpler than you think.
          </h3>

          {/* العنوان الفرعي الثاني */}
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

        {/* --- قائمة الخطوات --- */}
        <div className="flex flex-col gap-6 w-full max-w-[800px]">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="flex items-start gap-4 w-full"
            >
              {/* أيقونة الخطوة (نسخة مصغرة من الصورة) */}
              <div className="mt-1 flex-shrink-0" style={{ width: '24px', height: '24px', opacity: 0.8 }}>
                <img 
                  src={iconPath} 
                  alt="step icon" 
                  className="w-full h-full object-contain" 
                />
              </div>

              {/* نص الخطوة */}
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
                {step.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;