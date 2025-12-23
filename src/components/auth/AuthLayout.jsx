// components/auth/AuthLayout.jsx
import React from 'react';
import Logo from '../common/Logo';
import Footer from '../layout/Footer';
import AuthSidebar from './AuthSidebar';
import './Auth.css';  // ✅ ملف واحد فقط

/**
 * AuthLayout - Layout مشترك لصفحات Authentication
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - محتوى الفورم
 * @param {string} props.sidebarVariant - 'login' أو 'signup'
 * @param {boolean} props.showSidebarButton - إظهار الزر في الـ Sidebar
 */
const AuthLayout = ({ children, sidebarVariant = 'login', showSidebarButton = false }) => {
  return (
    <div className="auth-page">
      {/* Header */}
      <header className="auth-header">
        <div className="container">
          <Logo />
        </div>
      </header>

      {/* Main Auth Container */}
      <main className="auth-main">
        <div className="auth-container">
          
          {/* Form Container - محتوى ديناميكي */}
          <div className="auth-form-container">
            {children}
          </div>

          {/* Sidebar - الشكل التركوازي */}
          <AuthSidebar 
            variant={sidebarVariant} 
            showButton={showSidebarButton}
          />
          
        </div>
      </main>

      {/* Footer */}
      <Footer variant="simple" />
    </div>
  );
};

export default AuthLayout;