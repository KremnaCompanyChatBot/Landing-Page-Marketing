const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://104.248.192.222/api';

const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API Error');
  }

  return data;
};

export const authAPI = {
  signup: (userData) =>
    apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
};

export const userAPI = {
  getProfile: (token) =>
    apiRequest('/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
