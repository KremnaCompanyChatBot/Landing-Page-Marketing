const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://167.99.141.138/api';

/* ===================== GENERIC API HELPER ===================== */

const apiRequest = async (endpoint, options = {}) => {
  
  const url = `${API_BASE_URL}${endpoint}`;

  const hasBody = !!options.body;

  const config = {
    method: options.method || 'GET',
    headers: {
      ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
    ...(hasBody ? { body: options.body } : {}),
  };

  const response = await fetch(url, config);

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
};

/* ===================== AUTH API ===================== */


export const authAPI = {
  login: async (credentials) =>
    apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: async (userData) =>
    apiRequest('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  logout: async (token) =>
    apiRequest('/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    forgotPassword: async (email) =>
    apiRequest('/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};

/* ===================== USER API ===================== */

export const userAPI = {
  getProfile: async (token) =>
    apiRequest('/user/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  updateProfile: async (token, userData) => {
    if (!userData || Object.keys(userData).length === 0) {
      throw new Error('Profile data is empty');
    }

    // تأمين التوكن (منع Bearer Bearer)
    const cleanToken = token.replace(/^Bearer\s+/i, '').trim();

    return apiRequest('/user/profile', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
      body: JSON.stringify(userData),
    });
  },

  changePassword: async (token, passwordData) =>
    apiRequest('/user/change-password', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      }),
    }),
};
