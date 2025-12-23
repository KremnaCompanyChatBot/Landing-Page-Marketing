// pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/layout/Footer';
import { authAPI } from '../utils/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation checks
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      console.log('📧 Sending password reset email to:', email);
      
      const response = await authAPI.forgotPassword(email);
      
      console.log('✅ Reset email response:', response);
      
      // ✅ التحقق من success في الـ response
      if (response.success || response.message) {
        setIsSubmitted(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
      
    } catch (err) {
      console.error('❌ Forgot password error:', err);
      
      // عرض رسالة خطأ مناسبة
      if (err.message.includes('not found') || err.message.includes('No user')) {
        setError('We couldn\'t find an account with that email address. Please check your spelling.');
      } else {
        setError(err.message || 'Something went wrong. Please try again.');
      }
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-[500px] bg-white rounded-[20px] shadow-lg p-8 md:p-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {!isSubmitted ? (
            // Forgot Password Form
            <>
              {/* Headline */}
              <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                Forgot Your Password?
              </h1>

              {/* Subheadline */}
              <p className="text-center text-gray-600 mb-8 leading-relaxed">
                No problem. Enter the email address associated with your account, 
                and we'll send you a link to reset your password.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className={`w-full px-4 py-3 border ${
                      error ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent transition-all`}
                    placeholder="Enter your email"
                  />
                  
                  {/* Error Message */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-sm text-red-600"
                    >
                      {error}
                    </motion.p>
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
                      Sending...
                    </span>
                  ) : (
                    'Send Reset Link'
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
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Success Headline */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Check Your Inbox!
              </h2>

              {/* Success Message */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                We've sent a password reset link to{' '}
                <span className="font-semibold text-gray-900">{email}</span>
              </p>

              {/* Follow-up Hint */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Didn't receive the email?</span>
                  <br />
                  Please check your spam folder or{' '}
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail('');
                    }}
                    className="text-[#4ECDC4] hover:text-[#3db8b3] font-medium underline"
                  >
                    try again
                  </button>
                  .
                </p>
              </div>

              {/* Back to Login */}
              <Link
                to="/login"
                className="inline-block bg-[#4ECDC4] text-white font-semibold py-3 px-8 rounded-lg hover:bg-[#3db8b3] transition-all duration-300"
              >
                Back to Log In
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

export default ForgotPassword;