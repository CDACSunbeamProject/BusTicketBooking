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
  const [userId, setUserId] = useState(null);

  // ✅ Load from localStorage on app load
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");
    const savedRole = localStorage.getItem("role");
    const savedUserId = localStorage.getItem("userId");

    if (savedToken && savedEmail && savedRole && savedUserId) {
      setToken(savedToken);
      setEmail(savedEmail);
      setRole(savedRole);
      setUserId(savedUserId)
      setIsLoggedIn(true);
    }
  }, []);

  // ✅ Login function
  const login = (token, email, role, userId) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);

    setToken(token);
    setUserId(userId);
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
    <AuthContext.Provider value={{ token, isLoggedIn, email, userId , role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
