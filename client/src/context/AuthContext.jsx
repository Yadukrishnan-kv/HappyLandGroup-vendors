import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState({
    logoUrl: '',
    logoText: 'Happy Land',
    logoTextSpan: 'Group'
  });

  const fetchSettings = async () => {
    try {
      const res = await API.get('/settings');
      if (res.data.success) {
        setSettings(res.data.data);
      }
    } catch (err) {
      console.warn('Offline fallback or error loading settings.');
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSettingsLogo = async (settingsData) => {
    try {
      let payload = settingsData;
      const config = {};

      if (settingsData && settingsData.logoFile) {
        payload = new FormData();
        payload.append('logoText', settingsData.logoText || '');
        payload.append('logoTextSpan', settingsData.logoTextSpan || '');
        payload.append('logoUrl', settingsData.logoUrl || '');
        payload.append('logo', settingsData.logoFile);
        config.headers = {
          'Content-Type': 'multipart/form-data'
        };
      }

      const res = await API.put('/settings', payload, config);
      if (res.data.success) {
        setSettings(res.data.data);
        return { success: true };
      }
    } catch (err) {
      console.error(err);
      return { success: false, message: err.response?.data?.message || 'Failed to update system settings.' };
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        if (parsedUser && parsedUser.role === 'admin') {
          sessionStorage.setItem('isAdminSession', 'true');
        }
        
        // Optionally verify token in background
        try {
          const res = await API.get('/auth/profile');
          if (res.data.success) {
            setUser(res.data.data);
            localStorage.setItem('user', JSON.stringify(res.data.data));
            if (res.data.data && res.data.data.role === 'admin') {
              sessionStorage.setItem('isAdminSession', 'true');
            }
          }
        } catch (err) {
          console.warn('Session expired or offline fallback.');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data.success) {
        const { token, ...userData } = res.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(token);
        setUser(userData);
        setLoading(false);
        return { success: true };
      }
    } catch (err) {
      setLoading(false);
      const errMsg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errMsg);
      return { success: false, message: errMsg };
    }
  };

  const register = async (firstName, lastName, email, password, phone) => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.post('/auth/register', { firstName, lastName, email, password, phone });
      if (res.data.success) {
        const { token, ...userData } = res.data.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(token);
        setUser(userData);
        setLoading(false);
        return { success: true };
      }
    } catch (err) {
      setLoading(false);
      const errMsg = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errMsg);
      return { success: false, message: errMsg };
    }
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.put('/auth/profile', profileData);
      if (res.data.success) {
        const { token: newToken, ...userData } = res.data.data;
        if (newToken) {
          localStorage.setItem('token', newToken);
          setToken(newToken);
        }
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setLoading(false);
        return { success: true };
      }
    } catch (err) {
      setLoading(false);
      const errMsg = err.response?.data?.message || 'Failed to update profile settings.';
      setError(errMsg);
      return { success: false, message: errMsg };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('isAdminSession');
    setToken(null);
    setUser(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        settings,
        login,
        register,
        logout,
        updateProfile,
        clearError,
        updateSettingsLogo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
};
