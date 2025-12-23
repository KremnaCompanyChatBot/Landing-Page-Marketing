// pages/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/common/Logo';
import Footer from '../components/layout/Footer';
import { authAPI } from '../utils/api';

const ResetPassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();
  
  const [isValidToken, setIsValidToken] = useState(null); 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

 
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidToken(false);
        return;
      }

      try {
        console.log('🔍 Validating reset token:', token);
        const response = await authAPI.validateResetToken(token);
        
        console.log('✅ Token validation response:', response);
        
        if (response.valid) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
        }
      } catch (error) {
        console.error('❌ Token validation error:', error);
        setIsValidToken(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};

    // Validation
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'Please enter a new password';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      console.log('🔒 Resetting password with token:', token);
      
      
      const response = await authAPI.resetPassword(token, {
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword
      });
      
      console.log('✅ Password reset successful:', response);
      
      setIsSubmitted(true);
      
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (err) {
      console.error('❌ Password reset error:', err);
      setErrors({ 
        general: err.message || 'Failed to reset password. Please try again or request a new reset link.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  // ✅ Loading state (checking token)
  if (isValidToken === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center px-4 py-12">
          <motion.div
            className="w-full max-w-[500px] bg-white rounded-[20px] shadow-lg p-8 md:p-12 text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="animate-spin h-12 w-12 border-4 border-[#4ECDC4] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Validating reset link...</p>
          </motion.div>
        </div>
        <Footer variant="simple" />
      </div>
    );
  }

  // ✅ Invalid token
  if (isValidToken === false) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex items-center justify-center px-4 py-12">
          <motion.div
            className="w-full max-w-[500px] bg-white rounded-[20px] shadow-lg p-8 md:p-12 text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Error Icon */}
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Invalid or Expired Link
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              This password reset link is invalid or has expired. Please request a new one.
            </p>

            <Link
              to="/forgot-password"
              className="inline-block bg-[#4ECDC4] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#3db8b3] transition-all duration-300"
            >
              Request New Link
            </Link>
          </motion.div>
        </div>
        <Footer variant="simple" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-12 relative z-10">
        <motion.div
          className="w-full max-w-[500px] bg-white rounded-[20px] shadow-lg p-8 md:p-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {!isSubmitted ? (
            // Reset Password Form
            <>
              {/* Headline */}
              <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                Reset Your Password
              </h1>

              {/* Subheadline */}
              <p className="text-center text-gray-600 mb-8 leading-relaxed">
                Enter your new password below. Make sure it's strong and secure.
              </p>

              {/* General Error */}
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-sm text-red-600">{errors.general}</p>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* New Password */}
                <div>
                  <label 
                    htmlFor="newPassword" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={passwordData.newPassword}
                    onChange={(e) => {
                      setPasswordData({...passwordData, newPassword: e.target.value});
                      setErrors({});
                    }}
                    className={`w-full px-4 py-3 border ${
                      errors.newPassword ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent transition-all`}
                    placeholder="Enter new password"
                  />
                  {errors.newPassword && (
                    <p className="mt-2 text-sm text-red-600">{errors.newPassword}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">Must be at least 8 characters</p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label 
                    htmlFor="confirmPassword" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={(e) => {
                      setPasswordData({...passwordData, confirmPassword: e.target.value});
                      setErrors({});
                    }}
                    className={`w-full px-4 py-3 border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent transition-all`}
                    placeholder="Confirm new password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#4ECDC4] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#3db8b3] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Resetting...
                    </span>
                  ) : (
                    'Reset Password'
                  )}
                </button>

                {/* Back to Login Link */}
                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm text-[#4ECDC4] hover:text-[#3db8b3] font-medium transition-colors"
                  >
                    Back to Log In
                  </Link>
                </div>
              </form>
            </>
          ) : (
            // Success Message
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Password Reset Successful!
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Your password has been successfully reset. You can now log in with your new password.
              </p>

              <p className="text-sm text-gray-500 mb-6">
                Redirecting to login page in 3 seconds...
              </p>

              <Link
                to="/login"
                className="inline-block bg-[#4ECDC4] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#3db8b3] transition-all duration-300"
              >
                Go to Login
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <Footer variant="simple" />
    </div>
  );
};

export default ResetPassword;