import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Error404 from './pages/Error404';
import Profile from './pages/Profile';
import { trackPageView } from './utils/analytics';
import useScrollDepth from './hooks/useScrollDepth';

// Component to track page views and scroll depth
function PageTracker() {
  const location = useLocation();

  // Track page views on route change
  useEffect(() => {
    const pageTitles = {
      '/': 'Home',
      '/login': 'Login',
      '/signup': 'Sign Up',
      '/forgot-password': 'Forgot Password',
      '/profile': 'Profile',
    };

    const pageTitle = pageTitles[location.pathname] || 'Page Not Found';
    trackPageView(location.pathname, pageTitle);
  }, [location]);

  // Enable scroll depth tracking
  useScrollDepth();

  return null;
}

function App() {
  return (
    <Router>
      <PageTracker />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;