import React, { createContext, useContext, useState, useEffect } from "react";
import { loginAPi } from "../api/authApi";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (userId, password) => {
    try {
      const data = await loginAPi(userId, password);
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      if (data.status === "SUCCESS") {
        setIsAuthenticated(true);
      }
      return data;
    } catch (error) {
      console.error("로그인 에러:", error);
      return { status: "FAIL", message: "로그인 중 오류 발생" };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
