import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Footer from '../components/layout/Footer';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    console.log('Sign up:', formData);
  };

  const handleGoogleSignUp = () => {
    console.log('Google sign up clicked');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <Logo />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              Sign Up
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First and Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                />
                
                <Input
                  label="Last Name"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                />
              </div>
              
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              
              <Input
                label="Company Name"
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                required
              />
              
              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              
              <Input
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
              
              {/* Terms Agreement */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({...formData, agreeToTerms: e.target.checked})}
                  required
                  className="w-4 h-4 mt-1 text-[#4ECDC4] border-gray-300 rounded focus:ring-[#4ECDC4] cursor-pointer"
                />
                <label className="text-sm text-gray-700">
                  By signing up, you agree to our{' '}
                  <button type="button" className="text-[#4ECDC4] hover:underline">
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button type="button" className="text-[#4ECDC4] hover:underline">
                    Privacy Policy
                  </button>
                </label>
              </div>
              
              <Button type="submit" fullWidth>
                Sign Up
              </Button>
            </form>
            
            <div className="mt-6">
              <button 
                onClick={handleGoogleSignUp}
                className="w-full px-4 py-3 bg-white border-2 border-gray-900 rounded flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Log in with Google
              </button>
            </div>
            
            <p className="mt-8 text-center text-sm text-[#4ECDC4]">
              <button 
                onClick={() => navigate('/login')} 
                className="hover:underline"
              >
                Already have an account?
              </button>
            </p>
          </div>
        </div>

        {/* Right Side - Image Placeholder */}
        <div className="hidden lg:block lg:w-1/2 bg-gray-200">
          <div className="h-full flex items-center justify-center p-12">
            <div className="w-full max-w-md aspect-square bg-white rounded-lg shadow-lg flex items-center justify-center">
              <svg className="w-48 h-48 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SignUp;