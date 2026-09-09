import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// 1. Create the Auth Context object
const AuthContext = createContext();

// 2. AuthProvider Component that wraps our application
export const AuthProvider = ({ children }) => {
  // State for user data, token, and loading state
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Set default authorization header for axios whenever token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      fetchUserProfile();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  // Fetch logged-in user profile
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/auth/profile');
      setUser(response.data);
      setAuthError(null);
    } catch (err) {
      console.error('Error fetching profile:', err);
      // If token expired or invalid, clear token
      if (err.response && err.response.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  // Login handler function
  const login = async (email, password) => {
    try {
      setAuthError(null);
      const response = await axios.post('/api/auth/login', { email, password });
      const { token: authToken, user: userData } = response.data;
      
      setToken(authToken);
      setUser(userData);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Register handler function (supports file upload for avatar)
  const register = async (formData) => {
    try {
      setAuthError(null);
      const response = await axios.post('/api/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { token: authToken, user: userData } = response.data;
      
      setToken(authToken);
      setUser(userData);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed.';
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Logout handler function
  const logout = () => {
    setToken('');
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, authError, login, register, logout, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook to easily consume AuthContext in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
