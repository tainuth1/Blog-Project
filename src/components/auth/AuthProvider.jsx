import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const loadUserFromStorage = () => {
    const storedUser =
      JSON.parse(localStorage.getItem("authUser")) ||
      JSON.parse(sessionStorage.getItem("authUser"));
    return storedUser;
  };

  const login = (userData, rememberMe) => {
    setUser(userData);
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("authUser", JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    sessionStorage.removeItem("authUser");
    setUser(null);
  };

  useEffect(() => {
    const storedUser = loadUserFromStorage();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
