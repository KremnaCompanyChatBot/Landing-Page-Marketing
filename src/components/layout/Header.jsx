// components/layout/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../common/Logo';
import { authAPI } from '../../utils/api';
import { trackCTAClick, trackAuthEvent } from '../../utils/analytics';

const Header = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  // ✅ جلب بيانات المستخدم من localStorage عند تحميل المكون
  useEffect(() => {
    const checkUserAuth = () => {
      const storedUser = localStorage.getItem('user');
      const authToken = localStorage.getItem('authToken');
      
      if (storedUser && authToken) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          console.log('✅ User logged in:', userData);
        } catch (error) {
          console.error('❌ Error parsing user data:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('authToken');
        }
      } else {
        setUser(null);
      }
    };

    checkUserAuth();

    // ✅ إضافة event listener لتحديث الحالة عند تغيير localStorage
    window.addEventListener('storage', checkUserAuth);
    return () => window.removeEventListener('storage', checkUserAuth);
  }, []);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    console.log("🚪 Logging out...");

    try {
      const token = localStorage.getItem('authToken');

      if (token) {
        // ✅ استدعاء logout API
        await authAPI.logout(token);
        console.log('✅ Logout successful from server');
      }

      // Track successful logout
      trackAuthEvent('logout', 'success');
    } catch (error) {
      console.error('❌ Logout API error:', error);
      // Track logout even if API fails
      trackAuthEvent('logout', 'success');
    } finally {
      // ✅ حذف البيانات من localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');

      // تحديث الحالة
      setUser(null);
      setIsDropdownOpen(false);

      // الانتقال إلى صفحة تسجيل الدخول
      navigate('/login');
    }
  };

  const handleLoginClick = () => {
    trackCTAClick('Log In', 'header', '/login');
    navigate('/login');
  };

  const handleSignUpClick = () => {
    trackCTAClick('Sign Up', 'header', '/signup');
    navigate('/signup');
  };

  // ✅ دالة لعرض اسم المستخدم من firstName و lastName
  const getUserDisplayName = () => {
    if (!user) return 'User';
    
    // ✅ الـ API الجديد يرجع firstName و lastName
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    
    // fallback للأسماء القديمة
    return user.name || user.username || user.email?.split('@')[0] || 'User';
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Logo />

        {/* User Section */}
        <div>
          {user ? (
         
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[#F3F0FF]"
                style={{ 
                  backgroundColor: '#F3F0FF', 
                  color: '#7B18C7'            
                }}
              >
                <span className="font-bold text-sm md:text-base">
                  {getUserDisplayName()}
                </span>
               
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

           
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  <button 
                    onClick={() => {
                      setIsDropdownOpen(false);
                      navigate('/profile');
                    }} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#7B18C7]"
                  >
                    Edit Profile
                  </button>
                  <button 
                    onClick={handleLogout} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (

            <div className="flex items-center gap-4">
              <button
                onClick={handleLoginClick}
                className="text-gray-700 hover:text-[#7B18C7] transition-colors font-medium"
              >
                Log In
              </button>
              <button
                onClick={handleSignUpClick}
                className="bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-[#7B18C7] transition-colors font-medium"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;