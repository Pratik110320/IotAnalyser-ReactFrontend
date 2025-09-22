import { createContext, useState, useContext, useEffect } from "react";
import { message } from "antd";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser({ email: "user@example.com" }); // Placeholder user
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      const { data } = await api.post("/api/auth/authenticate", credentials);
      localStorage.setItem("token", data);
      api.defaults.headers.common["Authorization"] = `Bearer ${data}`;
      setToken(data);
      setUser({ email: credentials.username });
      message.success("Login Successful");
      return true;
    } catch (error) {
      message.error("Login Failed: Invalid credentials.");
      return false;
    }
  };

  const register = async (credentials) => {
    try {
        await api.post("/api/auth/register", credentials);
        message.success("Registration Successful. You can now log in.");
        const loginSuccess = await login(credentials);
        if (loginSuccess) {
            navigate('/dashboard');
        }
        return true;
    } catch (error) {
        message.error("Registration Failed: Email might already be in use.");
        return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
    message.info("Logged Out");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
