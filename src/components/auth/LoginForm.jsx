import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, userAPI } from '../../utils/api';

const LoginForm = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    const newErrors = {};

    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(loginData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Login request (returns token)
      const loginResponse = await authAPI.login({
        email: loginData.email,
        password: loginData.password,
        remember: loginData.remember,
      });

      if (!loginResponse?.token) {
        throw new Error('Authentication token not returned');
      }

      // Store token
      localStorage.setItem('authToken', loginResponse.token);

      // Fetch user profile
      const profileResponse = await userAPI.getProfile(loginResponse.token);

      if (!profileResponse?.user) {
        throw new Error('User profile not found');
      }

      localStorage.setItem('user', JSON.stringify(profileResponse.user));

      setSuccess('Login successful. Redirecting...');

      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1000);

    } catch (error) {
      setErrors({
        general: error.message || 'Invalid email or password',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h1 className="auth-form-title">Log In</h1>

      {errors.general && (
        <div className="error-message">{errors.general}</div>
      )}

      {success && (
        <div className="success-message">{success}</div>
      )}

      <form onSubmit={handleSubmit} className="auth-form-content">
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            disabled={isLoading}
          />
          {errors.email && (
            <span className="error-text">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            disabled={isLoading}
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>

        {/* Forgot password */}
        <div className="text-right mb-4">
          <Link to="/forgot-password" className="text-sm link">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="auth-btn"
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <div className="switch-text">
        <span>No account yet? </span>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginForm;
