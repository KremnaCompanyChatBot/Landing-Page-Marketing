// components/auth/AuthSidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// لا حاجة لاستيراد CSS - تم استيراده في AuthLayout

// محتوى الـ Sidebar لكل صفحة
const sidebarContent = {
  login: {
    title: "Welcome Back!",
    description: "Enter your credentials to access your AI assistant dashboard",
    buttonText: "Log In",
    buttonLink: "/login"
  },
  signup: {
    title: "Hello, Friend!",
    description: "Create your account and start building intelligent chatbots in minutes",
    buttonText: "Sign Up",
    buttonLink: "/signup"
  }
};

/**
 * AuthSidebar - الشكل التركوازي مع المحتوى
 * 
 * @param {Object} props
 * @param {('login'|'signup')} props.variant - نوع المحتوى
 * @param {boolean} props.animated - تفعيل الـ animation
 * @param {boolean} props.showButton - إظهار الزر
 */
const AuthSidebar = ({ variant = 'login', animated = false, showButton = false }) => {
  const navigate = useNavigate();
  const content = sidebarContent[variant];
  
  // تحديد الصفحة المعاكسة
  const oppositeVariant = variant === 'login' ? 'signup' : 'login';
  const oppositeContent = sidebarContent[oppositeVariant];

  const handleNavigate = () => {
    navigate(oppositeContent.buttonLink);
  };

  return (
    <aside className={`auth-sidebar ${animated ? 'animated' : ''}`}>
      <div className="auth-sidebar-content">
        <h2 className="auth-sidebar-title">{content.title}</h2>
        <p className="auth-sidebar-description">{content.description}</p>
        
        {showButton && (
          <button 
            className="toggle-btn" 
            onClick={handleNavigate}
          >
            {oppositeContent.buttonText}
          </button>
        )}
      </div>
    </aside>
  );
};

export default AuthSidebar;