import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import '../styles/profile.css';
import { userAPI } from '../utils/api';

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  /* ===================== LOAD PROFILE ===================== */

  useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await userAPI.getProfile(token);
        const profile = response.user || response;

        setProfileData({
          fullName: `${profile.firstName || ''} ${profile.lastName || ''}`.trim(),
          email: profile.email || '',
          phoneNumber: profile.phoneNumber || '',
          companyName: profile.companyName || '',
        });

        setUser(profile);
        localStorage.setItem('user', JSON.stringify(profile));
      } catch (error) {
        console.error('Profile fetch error:', error);
        const cachedUser = localStorage.getItem('user');
        if (cachedUser) setUser(JSON.parse(cachedUser));
      }
    };

    loadUserData();
  }, [navigate]);

  /* ===================== UPDATE PROFILE ===================== */

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoadingProfile(true);
    setErrors({});
    setSuccess('');

    try {
      const token = localStorage.getItem('authToken');

      const nameParts = profileData.fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const payload = {
        firstName,
        lastName,
      };

      // Only send email if it exists
      if (profileData.email?.trim()) {
        payload.email = profileData.email.trim();
      }

      // Only send companyName if not empty
      if (profileData.companyName?.trim()) {
        payload.companyName = profileData.companyName.trim();
      }

      // Only send phoneNumber if not empty
      if (profileData.phoneNumber?.trim()) {
        payload.phoneNumber = profileData.phoneNumber.replace(/\D/g, '');
      }


      const response = await userAPI.updateProfile(token, payload);

      if (response.success) {
        const updatedUser = response.user || { ...user, ...payload };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setSuccess('Profile updated successfully.');
      }
    } catch (err) {
      setErrors({ general: err.message || 'Failed to update profile.' });
    } finally {
      setIsLoadingProfile(false);
    }
  };

  /* ===================== CHANGE PASSWORD ===================== */

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setErrors({ password: 'Please fill in all required fields.' });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrors({ password: 'New passwords do not match.' });
      return;
    }

    setIsLoadingPassword(true);

    try {
      const token = localStorage.getItem('authToken');

      const response = await userAPI.changePassword(token, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      });

      if (response.success) {
        setSuccess('Password updated successfully.');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (err) {
      console.error('Password update error:', err);
      setErrors({ password: err.message || 'Failed to update password.' });
    } finally {
      setIsLoadingPassword(false);
    }
  };

  if (!user) return <div className="loading-state">Loading...</div>;

  /* ===================== UI ===================== */

  return (
    <div className="profile-page">
      <Header />

      <div className="profile-container">
        <div className="gradient-header">
          <h2 className="welcome-text">
            Welcome, {user.firstName || 'User'}
          </h2>
        </div>

        <main className="profile-content">
          <div className="forms-container">

            {/* Profile Information */}
            <section className="profile-section">
              <h2 className="section-title">Profile Information</h2>

              {success && !errors.password && (
                <div className="success-message">{success}</div>
              )}

              {errors.general && (
                <div className="error-message">{errors.general}</div>
              )}

              <form onSubmit={handleProfileUpdate} className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) =>
                      setProfileData({ ...profileData, fullName: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phoneNumber}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    value={profileData.companyName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        companyName: e.target.value,
                      })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="save-btn"
                  disabled={isLoadingProfile}
                >
                  {isLoadingProfile ? 'Saving...' : 'Save Profile Changes'}
                </button>
              </form>
            </section>

            {/* Change Password */}
            <section className="password-section">
              <h2 className="section-title">Change Password</h2>

              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}

              <form onSubmit={handlePasswordUpdate} className="password-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="update-btn"
                  disabled={isLoadingPassword}
                >
                  {isLoadingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
