'use client'; // Mark this file as a client component

import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the context
const AuthContext = createContext();

// 2. Create a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulating an auth check (e.g., from localStorage or API)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Function to log in a user
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  
  // Function to log out a user
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
