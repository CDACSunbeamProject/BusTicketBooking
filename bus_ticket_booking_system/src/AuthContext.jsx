// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';

// Create context
const AuthContext = createContext();

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const [role, setRole] = useState(null);

  // ✅ Load from localStorage on app load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");
    const savedRole = localStorage.getItem("role");

    if (savedToken && savedEmail && savedRole) {
      setToken(savedToken);
      setEmail(savedEmail);
      setRole(savedRole);
      setIsLoggedIn(true);
    }
  }, []);

  // ✅ Login function
  const login = (token, email, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);

    setToken(token);
    setEmail(email);
    setRole(role);
    setIsLoggedIn(true);
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.clear(); // clears all: token, email, role
    setToken(null);
    setEmail(null);
    setRole(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ token, isLoggedIn ,email, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
