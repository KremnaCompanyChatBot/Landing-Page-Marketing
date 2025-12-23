import React from 'react';
import { motion } from 'framer-motion';
import contactImage from '../../assets/images/content.png';

const ContactSection = () => {
  // أنيميشن للعنوان الرئيسي
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -30,
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

  // أنيميشن للنص التوضيحي
  const descriptionVariants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  // أنيميشن لبطاقات المعلومات
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.3 + (i * 0.15),
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    })
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-[#f8fdfd] to-white flex items-center justify-center py-20 px-6 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* القسم الأيسر: الصورة مع Particle Effect */}
          <motion.div
            className="flex justify-center items-center relative order-2 lg:order-1"
          >
            {/* جزيئات ديكور تتحرك عشوائياً */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #94E4E4, #4ECDC4)',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                initial={{
                  scale: 0,
                  opacity: 0,
                  x: (Math.random() - 0.5) * 500,
                  y: (Math.random() - 0.5) * 500
                }}
                whileInView={{
                  scale: [0, 1.5, 1],
                  opacity: [0, 1, 0.7],
                  x: 0,
                  y: 0
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: "easeOut"
                }}
                animate={{
                  y: [0, -25, 0],
                  x: [0, Math.sin(i) * 10, 0],
                  opacity: [0.7, 0.4, 0.7]
                }}
                transition={{
                  duration: 3 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* دائرة خلفية متوهجة */}
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(78, 205, 196, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: 0
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* الصورة الرئيسية */}
            <motion.img
              src={contactImage}
              alt="Contact Kremna Support"
              className="relative z-10 w-full max-w-[500px] h-auto object-contain"
              initial={{
                opacity: 0,
                filter: 'blur(20px)',
                scale: 1.3
              }}
              whileInView={{
                opacity: 1,
                filter: 'blur(0px)',
                scale: 1
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
             
            />

            {/* حلقات ديكور إضافية */}
            <motion.div
              className="absolute w-32 h-32 rounded-full border-2 border-[#4ECDC4] opacity-20"
              style={{ top: '10%', right: '5%' }}
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            <motion.div
              className="absolute w-24 h-24 rounded-full border-2 border-[#94E4E4] opacity-15"
              style={{ bottom: '15%', left: '5%' }}
              animate={{
                scale: [1, 1.4, 1],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>

          {/* القسم الأيمن: النصوص والمعلومات */}
          <motion.div
            className="flex flex-col justify-center space-y-8 order-1 lg:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* العنوان الرئيسي */}
            <motion.div variants={titleVariants}>
              <h2
                className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
                style={{
                  color: '#000000',
                  lineHeight: '1.3',
                  letterSpacing: '-0.01em'
                }}
              >
                Need assistance? Our team is ready to help.
              </h2>
            </motion.div>

            {/* النص التوضيحي */}
            <motion.p
              className="text-lg lg:text-xl leading-relaxed max-w-[600px]"
              style={{
                color: '#000000',
                lineHeight: '1.7'
              }}
              variants={descriptionVariants}
            >
              Whether you have a question about features, pricing, or just want to say hello, we'd love to hear from you. Reach out to us, and we'll get back to you as soon as possible.
            </motion.p>

            {/* بطاقة Email */}
            <motion.div
              className="space-y-2 p-4 rounded-2xl bg-white shadow-lg border-l-4 border-[#4ECDC4] hover:shadow-xl transition-shadow duration-300"
              custom={0}
              variants={cardVariants}
              whileHover={{
                x: 5,
                transition: { duration: 0.3 }
              }}
            >
              <h3
                className="text-xl lg:text-2xl font-bold"
                style={{ color: '#000000' }}
              >
                Email
              </h3>
              <motion.a
                href="mailto:support@kremna.com"
                className="text-lg lg:text-xl inline-block"
                style={{
                  color: '#000000',
                  textDecoration: 'none'
                }}
                whileHover={{
                  color: '#4ECDC4',
                  x: 5,
                  transition: { duration: 0.2 }
                }}
              >
                support@kremna.com
              </motion.a>
            </motion.div>

            {/* بطاقة Phone */}
            <motion.div
              className="space-y-2 p-4 rounded-2xl bg-white shadow-lg border-l-4 border-[#4ECDC4] hover:shadow-xl transition-shadow duration-300"
              custom={1}
              variants={cardVariants}
              whileHover={{
                x: 5,
                transition: { duration: 0.3 }
              }}
            >
              <h3
                className="text-xl lg:text-2xl font-bold"
                style={{ color: '#000000' }}
              >
                Phone
              </h3>
              <motion.a
                href="tel:+905073818048"
                className="text-lg lg:text-xl inline-block"
                style={{
                  color: '#000000',
                  textDecoration: 'none'
                }}
                whileHover={{
                  color: '#4ECDC4',
                  x: 5,
                  transition: { duration: 0.2 }
                }}
              >
                +90 507 381 80 48
              </motion.a>
            </motion.div>

            {/* بطاقة Based in */}
            <motion.div
              className="space-y-2 p-4 rounded-2xl bg-white shadow-lg border-l-4 border-[#94E4E4] hover:shadow-xl transition-shadow duration-300"
              custom={2}
              variants={cardVariants}
              whileHover={{
                x: 5,
                transition: { duration: 0.3 }
              }}
            >
              <h3
                className="text-xl lg:text-2xl font-bold"
                style={{ color: '#000000' }}
              >
                Based in
              </h3>
              <p
                className="text-base lg:text-lg leading-relaxed"
                style={{ color: '#000000' }}
              >
                Cami Mahallesi Türkerler Caddesi 301. Sokak Bucak/BURDUR 15300
              </p>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;