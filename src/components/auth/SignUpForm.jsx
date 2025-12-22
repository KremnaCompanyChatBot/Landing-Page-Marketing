// components/auth/SignUpForm.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TermsModal from '../common/TermsModal';
import PrivacyModal from '../common/PrivacyModal';
import { authAPI } from '../../utils/api';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');
    
    const newErrors = {};

    if (!signUpData.firstName) newErrors.firstName = 'Please fill out this field';
    if (!signUpData.lastName) newErrors.lastName = 'Please fill out this field';
    if (!signUpData.email) {
      newErrors.email = 'Please fill out this field';
    } else if (!validateEmail(signUpData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!signUpData.company) newErrors.company = 'Please fill out this field';
    if (!signUpData.password) {
      newErrors.password = 'Please fill out this field';
    } else if (signUpData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else {
      // Check for strong password (uppercase, lowercase, number, special char)
      const hasUpperCase = /[A-Z]/.test(signUpData.password);
      const hasLowerCase = /[a-z]/.test(signUpData.password);
      const hasNumber = /[0-9]/.test(signUpData.password);
      const hasSpecialChar = /[._-]/.test(signUpData.password);

      if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        newErrors.password = 'Password must contain uppercase, lowercase, number and special character (. _ -)';
      }
    }
    if (!signUpData.confirmPassword) {
      newErrors.confirmPassword = 'Please fill out this field';
    } else if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!signUpData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // ✅ إرسال البيانات إلى الـ API الجديد
      const requestData = {
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        email: signUpData.email,
        companyName: signUpData.company,
        password: signUpData.password,
      };

      console.log('📤 Sending registration data:', requestData);
      
      const response = await authAPI.register(requestData);

      console.log('✅ Registration response:', response);

      if (response.success) {
        setSuccess(response.message || 'Account created successfully! Redirecting to login…');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      console.error('❌ Registration error:', err);
      setErrors({
        general: err.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    // ✅ Google Auth معطل مؤقتاً
    alert('Google Sign Up will be available soon!');
    // authAPI.googleAuth();
  };

  return (
    <>
      <div className="auth-form">
        <h1 className="auth-form-title">Sign Up</h1>

        {errors.general && (
          <div className="error-message">
            {errors.general}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form-content">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={signUpData.firstName}
                onChange={(e) => setSignUpData({...signUpData, firstName: e.target.value})}
                className={errors.firstName ? 'error' : ''}
              />
              {errors.firstName && (
                <span className="error-text">{errors.firstName}</span>
              )}
            </div>
            
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={signUpData.lastName}
                onChange={(e) => setSignUpData({...signUpData, lastName: e.target.value})}
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && (
                <span className="error-text">{errors.lastName}</span>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={signUpData.email}
              onChange={(e) => setSignUpData({...signUpData, email: e.target.value})}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>
          
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              value={signUpData.company}
              onChange={(e) => setSignUpData({...signUpData, company: e.target.value})}
              className={errors.company ? 'error' : ''}
            />
            {errors.company && (
              <span className="error-text">{errors.company}</span>
            )}
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={signUpData.password}
              onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
              className={errors.password ? 'error' : ''}
              placeholder="Must include A-Z, a-z, 0-9, . _ -"
            />
            {errors.password && (
              <span className="error-text">{errors.password}</span>
            )}
            {!errors.password && signUpData.password && (
              <span style={{fontSize: '12px', color: '#666', marginTop: '4px', display: 'block'}}>
                Must contain: uppercase, lowercase, number, special character (. _ -)
              </span>
            )}
          </div>
          
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={signUpData.confirmPassword}
              onChange={(e) => setSignUpData({...signUpData, confirmPassword: e.target.value})}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>
          
          <div className="terms-group">
            <input
              type="checkbox"
              checked={signUpData.agreeToTerms}
              onChange={(e) => setSignUpData({...signUpData, agreeToTerms: e.target.checked})}
            />
            <label>
              By signing up, you agree to our{' '}
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="link-btn"
              >
                Terms of Service
              </button>
              {' '}and{' '}
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="link-btn"
              >
                Privacy Policy
              </button>
            </label>
          </div>
          {errors.agreeToTerms && (
            <span className="error-text">{errors.agreeToTerms}</span>
          )}
          
          <button 
            type="submit" 
            className="auth-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <button onClick={handleGoogleSignUp} className="google-btn">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign up with Google
        </button>
        
        <div className="switch-text">
          <span>Already have an account? </span>
          <Link to="/login">Log In</Link>
        </div>
      </div>

      {/* Modals */}
      <TermsModal 
        isOpen={showTermsModal} 
        onClose={() => setShowTermsModal(false)}
        onAccept={() => {
          setSignUpData({...signUpData, agreeToTerms: true});
          setShowTermsModal(false);
        }}
      />
      
      <PrivacyModal 
        isOpen={showPrivacyModal} 
        onClose={() => setShowPrivacyModal(false)}
        onAccept={() => {
          setSignUpData({...signUpData, agreeToTerms: true});
          setShowPrivacyModal(false);
        }}
      />
    </>
  );
};

export default SignUpForm;