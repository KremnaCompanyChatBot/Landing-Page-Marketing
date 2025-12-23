import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Footer from '../components/layout/Footer';

// ملاحظة هامة: تأكدي من أن اسم الصورة هنا يطابق الاسم الموجود لديك في المجلد
// افترضت أن المسار هو نفس مسار الصور المعتاد (assets/images)
import ErrorImage from '../assets/images/error.png'; 

const Error404 = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <Logo />
        </div>
      </header>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 flex flex-col items-center">
          
          {/* 1. عرض الصورة بدلاً من الأيقونة */}
          <img 
            src={ErrorImage} 
            alt="Error Robot" 
            className="w-64 h-auto mb-6 object-contain"
          />
          
          {/* 2. النصوص بتنسيق عريض ومشابه للصورة */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Something went wrong.
          </h1>
          
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-10">
            Please try again later.
          </p>
          
          {/* 3. الزر المخصص بتأثير التركواز */}
          <button 
            onClick={() => navigate('/')}
            className="
              px-10 py-3 
              border-2 border-black 
              rounded-full 
              text-lg font-semibold 
              text-black
              transition-all duration-300 
              hover:bg-[#40E0D0] hover:border-[#40E0D0] hover:text-white
              active:bg-[#3bcbc0]
            "
          >
            Home Page
          </button>

        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Error404;