import React from 'react';
import { motion } from 'framer-motion';

const BenefitsSection = () => {
  const benefits = [
    {
      id: 1,
      title: 'Automate & Save Time',
      description: 'Free your team from repetitive questions. Let your AI assistant handle 24/7 support, answer common queries, and automate repetitive tasks, so you can focus on what matters most.'
    },
    {
      id: 2,
      title: 'Increase Conversions & Sales',
      description: 'Engage every website visitor instantly. Your assistant can proactively capture leads, guide users to the right products, and turn passing visitors into paying customers, even while you sleep.'
    },
    {
      id: 3,
      title: 'Improve Customer Satisfaction',
      description: 'Provide instant, accurate answers anytime. Eliminate wait times and deliver a seamless support experience, building customer trust and loyalty with every interaction.'
    },
    {
      id: 4,
      title: 'Gain Actionable Insights',
      description: 'Understand your customers better than ever. Track engagement, see real-time user queries, and use simple reports to discover what your audience truly wants and improve your business.'
    }
  ];

  // أنيميشن للعنوان الرئيسي
  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // أنيميشن للعنوان الفرعي
  const subtitleVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  // أنيميشن للبطاقات - من خارج الشاشة تماماً
  const cardVariants = {
    hiddenLeft: {
      opacity: 0,
      x: -300, // من خارج الشاشة تماماً من اليسار
    },
    hiddenRight: {
      opacity: 0,
      x: 300, // من خارج الشاشة تماماً من اليمين
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 2.5, // السرعة - كلما أقل كلما أسرع
        ease: "easeOut" // أكثر سلاسة
      }
    }
  };

  return (
    <section className="bg-[#F2F4F8] py-[80px] flex justify-center overflow-hidden">
      <div className="w-full max-w-[1440px] px-4">
        {/* Header Section */}
        <motion.div 
          className="flex flex-col items-center text-center mb-[40px] gap-[16px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Main Title */}
          <motion.h2 
            className="text-3xl md:text-[36px] font-bold text-black leading-tight mx-auto"
            style={{ maxWidth: '1202px' }}
            variants={titleVariants}
          >
            Do More Than Just Talk. Drive Real Results.
          </motion.h2>

          {/* Purple Subheading */}
          <motion.p 
            className="text-lg md:text-[20px] font-bold mx-auto"
            style={{ 
              maxWidth: '1280px',
              color: '#7B18C7',
              lineHeight: '26px'
            }}
            variants={subtitleVariants}
          >
            Kremna helps you automate support, engage visitors, and reduce costs, all from one platform.
          </motion.p>
        </motion.div>

        {/* Cards Container */}
        <div className="flex flex-col gap-[22px] max-w-[1304px] mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              className="bg-white rounded-[20px] p-6 md:px-[40px] md:py-[32px] shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center"
              style={{ minHeight: '116px' }}
              initial={index % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              <p className="text-black-800 text-base md:text-[18px] leading-relaxed text-left">
                <span className="font-bold text-black mr-1">
                  {benefit.title}
                </span>
                <span className="font-normal text-black-600">
                  {benefit.description}
                </span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;