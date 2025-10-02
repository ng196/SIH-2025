/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('stemquest_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('stemquest_user');
      }
    }
  }, []);

  const signIn = async (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('stemquest_user', JSON.stringify(userData));
  };

  const signOut = async () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('stemquest_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
