// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    
    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUser({ username: storedUsername, token: storedToken });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setToken(userData.token);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("username", userData.username);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      // Keep your old properties for compatibility
      loggedIn: !!user,
      email: user?.email || ""
    }}>
      {children}
    </AuthContext.Provider>
  );
}