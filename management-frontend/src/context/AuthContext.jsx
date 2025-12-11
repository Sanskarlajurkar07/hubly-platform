import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify token with backend
          const res = await api.get('/auth/verify');
          if (res.data) {
            setUser(res.data);
          } else {
            throw new Error('Verification failed');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async ({ email, password }) => {
    try {
      console.log('AuthContext.login request ->', { email, password });
      const res = await api.post('/auth/login', { email, password });
      console.log('AuthContext.login response ->', res.status, res.data);

      if (res.status === 200 && res.data) {
        const token = res.data.token || res.data.accessToken;
        const userData = res.data.user || res.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return res.data;
      }

      throw new Error(res.data?.message || 'Login failed');
    } catch (err) {
      const serverMsg = err?.response?.data?.message || err?.response?.data?.error;
      console.error('AuthContext.login error ->', err?.response || err);
      throw new Error(serverMsg || err.message || 'Endpoint not found');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const signup = async (data) => {
    try {
      const res = await api.post('/auth/signup', data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed'
      };
    }
  }

  const value = {
    user,
    login,
    logout,
    signup,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
