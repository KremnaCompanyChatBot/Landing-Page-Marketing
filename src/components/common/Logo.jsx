import React from 'react';
import { Link } from 'react-router-dom';
// تأكد أن اسم الصورة ومسارها صحيح في جهازك
import logoImg from '../../assets/images/logoK.png'; 

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
      {/* هنا وضعنا الصورة بدلاً من الـ SVG */}
      <img 
        src={logoImg} 
        alt="Kremna Logo" 
        className="w-10 h-10 object-contain" 
      />
      {/* اسم الشركة */}
      <span className="font-bold text-xl text-gray-900">Kremna Company</span>
    </Link>
  );
};

export default Logo;