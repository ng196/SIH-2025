/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }) => {
  // Default guest user with full permissions
  const defaultGuestUser = {
    method: 'guest',
    user: {
      name: 'Guest',
      type: 'guest',
      avatar: '👤'
    }
  };

  const [user, setUser] = useState(defaultGuestUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Load user from localStorage on mount, or use guest mode
  useEffect(() => {
    const storedUser = localStorage.getItem('stemquest_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('stemquest_user');
        // Keep default guest user
      }
    }
    // If no stored user, keep default guest mode (already set above)
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
