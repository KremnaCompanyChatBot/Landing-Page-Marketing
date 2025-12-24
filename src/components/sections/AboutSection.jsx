import React from 'react';
import { motion } from 'framer-motion';
import aboutImage from '../../assets/images/about.png';

const AboutSection = () => {
  // أنيميشن متقدم للعنوان - يظهر بطريقة احترافية
  const titleVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  // أنيميشن للعنوان الفرعي
  const subtitleVariants = {
    hidden: { 
      opacity: 0,
      y: -15,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  // أنيميشن للفقرة - يظهر حرف حرف (stagger effect)
  const paragraphVariants = {
    hidden: { 
      opacity: 0,
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.4,
        ease: "easeOut"
      }
    }
  };

  // أنيميشن للصورة - floating effect مع ظهور تدريجي
  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateY: -15
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        delay: 0.3,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  // أنيميشن floating للصورة
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section id="about" className="w-full min-h-screen bg-white flex items-center justify-center py-20 px-6 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* القسم الأيسر: النصوص */}
          <motion.div 
            className="flex flex-col items-start justify-center space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* العنوان الرئيسي - About Kremna */}
            <motion.h2 
              className="text-5xl lg:text-6xl xl:text-7xl font-bold"
              style={{
                color: '#000000',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}
              variants={titleVariants}
            >
              About Kremna
            </motion.h2>

            {/* العنوان الفرعي */}
            <motion.h3 
              className="text-2xl lg:text-3xl font-semibold"
              style={{
                color: '#1a1a1a',
                lineHeight: '1.4'
              }}
              variants={subtitleVariants}
            >
              Empowering Creators, One Assistant at a Time.
            </motion.h3>

            {/* النص الرئيسي */}
            <motion.div 
              className="max-w-[516px]"
              variants={paragraphVariants}
            >
              <motion.p 
                className="text-lg lg:text-xl leading-relaxed"
                style={{
                  color: '#000000',
                  textAlign: 'justify',
                  lineHeight: '1.8'
                }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.5
                  }
                }}
                viewport={{ once: true }}
              >
                Kremna was founded on a simple idea: building an intelligent AI assistant shouldn't be complicated or expensive. We are a passionate team of designers and engineers dedicated to creating an all-in-one platform that allows anyone to build, manage, and deploy powerful AI assistants in minutes, not months. Our mission is to help you save time by automating repetitive tasks and create meaningful interactions with your users.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* القسم الأيمن: الصورة */}
          <motion.div 
            className="flex justify-center items-center relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageVariants}
          >
            {/* دائرة خلفية بلون Kremna */}
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full opacity-10"
              style={{
                background: 'linear-gradient(135deg, #94E4E4 0%, #4ECDC4 100%)',
                filter: 'blur(60px)',
                zIndex: 0
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* الصورة مع أنيميشن floating */}
            <motion.div
              className="relative z-10"
              animate={floatingAnimation}
            >
              <motion.img 
                src={aboutImage} 
                alt="About Kremna - AI Assistant Platform"
                className="w-full max-w-[550px] h-auto object-contain drop-shadow-2xl"
                whileHover={{ 
                  scale: 1.03,
                  rotate: [0, -2, 2, 0],
                  transition: { 
                    duration: 0.5,
                    ease: "easeInOut"
                  }
                }}
              />
            </motion.div>

            {/* عناصر ديكور متحركة */}
            <motion.div
              className="absolute top-10 right-10 w-20 h-20 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #94E4E4 0%, #4ECDC4 100%)',
                opacity: 0.2,
                filter: 'blur(10px)'
              }}
              animate={{
                y: [0, 20, 0],
                x: [0, 10, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.div
              className="absolute bottom-20 left-10 w-16 h-16 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #4ECDC4 0%, #94E4E4 100%)',
                opacity: 0.15,
                filter: 'blur(8px)'
              }}
              animate={{
                y: [0, -15, 0],
                x: [0, -8, 0],
                scale: [1, 1.15, 1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;