import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const FAQSection = () => {
  // الحالة الافتراضية 1 تعني أن السؤال الأوسط مفتوح تلقائياً
  const [activeIndex, setActiveIndex] = useState(1);

  const faqs = [
    {
      id: 0,
      question: "Do I need coding skills to use Kremna?",
      answer: "Absolutely not. Kremna is an all-in-one platform designed for everyone. You can build, train, and integrate your assistant with one-click integrations without writing a single line of code.",
    },
    {
      id: 1,
      question: "How do I customize my assistant's personality?",
      answer: "In your dashboard, you'll find simple settings to design your assistant's tone, style, and behavior. You can make it professional, friendly, witty, or anything in between to match your brand.",
    },
    {
      id: 2,
      question: "How can I track my assistant's performance?",
      answer: "Kremna includes built-in analytics. You can track engagement, see user messages in real-time, and get reports on performance easily right from your dashboard.",
    }
  ];

  return (
    <section className=" bg-white flex items-center justify-center py-16 md:py-24  px-4 lg:px-8 overflow-hidden">
      <div className="max-w-7xl   relative">
        
        {/* العنوان الرئيسي */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
            Got Questions? We Have Answers.
          </h2>
        </motion.div>

        {/* الحاوية الرئيسية - Flexbox لضمان المحاذاة */}
        {/* md:flex-row تضمن أن العناصر تكون بجانب بعضها حتى في الشاشات المتوسطة وليس فقط الكبيرة */}
        <div className="flex flex-col md:flex-row items-center justify-start relative">
          
          {/* 1. بطاقة الأسئلة (على اليسار) */}
          {/* z-20 يرفعها فوق كارت الإجابة */}
          <div className="w-full md:w-[45%] relative z-20">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden py-2">
              {faqs.map((faq, index) => {
                const isActive = activeIndex === index;
                
                return (
                  <button
                    key={faq.id}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full flex items-center gap-5 p-6 text-left transition-all duration-300
                      ${isActive ? 'bg-purple-50/40' : 'bg-white hover:bg-gray-50'}
                      ${index !== faqs.length - 1 ? 'border-b border-gray-100' : ''}
                    `}
                  >
                    {/* الدائرة الملونة */}
                    <div 
                      className={`flex-shrink-0 w-10 h-10 rounded-full transition-colors duration-300 flex items-center justify-center ${
                        isActive ? 'bg-[#A855F7]' : 'bg-[#99F6E4]'
                      }`}
                    />

                    {/* نص السؤال */}
                    <span className={`flex-1 text-lg font-medium ${isActive ? 'text-black' : 'text-gray-900'}`}>
                      {faq.question}
                    </span>

                    {/* السهم */}
                    <ChevronRight 
                      className={`w-5 h-5 transition-all duration-300 ${
                        isActive ? 'text-[#A855F7] transform translate-x-1' : 'text-[#99F6E4]'
                      }`} 
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. بطاقة الإجابة (على اليمين وكبيرة جداً) */}
          {/* md:-ml-24 هو السر الذي يسحب البطاقة لتدخل تحت الأسئلة في الشاشات المتوسطة والكبيرة */}
          <div className="w-full md:w-[65%] md:-ml-24 mt-6 md:mt-0 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="bg-[#F9FAFB] rounded-[3rem] p-10 lg:p-16 w-full border border-gray-100 shadow-sm flex flex-col justify-center"
                style={{ minHeight: '450px' }} // ارتفاع ثابت كبير لضمان أنها أكبر من الأسئلة
              >
                {/* هامش داخلي يسار كبير لكي لا يغطي صندوق الأسئلة على النص */}
                <div className="md:pl-24 flex flex-col justify-center h-full">
                  <h3 className="text-2xl lg:text-3xl font-bold text-black mb-8 leading-tight">
                    {faqs[activeIndex].question}
                  </h3>
                  
                  <p className="text-lg lg:text-xl text-black leading-loose opacity-90 text-justify">
                    {faqs[activeIndex].answer}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;