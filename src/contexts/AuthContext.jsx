import { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // You might want to fetch user data here
      // For simplicity, we'll just set a dummy user
      setUser({ email: "user@example.com" });
    }
  }, [token]);

  const login = async (credentials) => {
    const { data } = await api.post("/api/auth/authenticate", credentials);
    localStorage.setItem("token", data);
    setToken(data);
  };

  const register = async (credentials) => {
    await api.post("/api/auth/register", credentials);
    //
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
