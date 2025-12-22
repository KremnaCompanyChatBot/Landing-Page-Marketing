// pages/SignUp.jsx
import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import SignUpForm from '../components/auth/SignUpForm';

/**
 * SignUp Page
 * يستخدم AuthLayout للـ structure و SignUpForm للـ content
 */
const SignUp = () => {
  return (
    <AuthLayout
      sidebarVariant="signup"
      showSidebarButton={true}  // ✅ إظهار الزر
    >
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;