// pages/Login.jsx
import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <AuthLayout 
      sidebarVariant="login" 
      showSidebarButton={true}  
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;