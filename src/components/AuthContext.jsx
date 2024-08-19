import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in on initial render
    axios.get('/check-auth')
      .then(response => setUser(response.data))
      .catch(() => setUser(null));
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      setUser(response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/http://localhost:3000/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
