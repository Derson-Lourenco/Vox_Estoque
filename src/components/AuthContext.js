// src/components/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const loginTime = localStorage.getItem('loginTime');

    if (token && loginTime) {
      const timeElapsed = Date.now() - parseInt(loginTime, 10);
      if (timeElapsed < 3600000) {
        setIsAuthenticated(true);
      } else {
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('loginTime', Date.now().toString());
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loginTime');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
