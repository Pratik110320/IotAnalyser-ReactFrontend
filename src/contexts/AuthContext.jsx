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
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        // Clear potentially corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      const { data } = await api.post("/api/auth/authenticate", credentials);
      if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        setToken(data.token);
        setUser(data.user);
        message.success("Login Successful");
        return true;
      } else {
        throw new Error("Invalid response from server during login.");
      }
    } catch (error) {
      message.error("Login Failed: Invalid credentials or server error.");
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
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
    message.info("Logged Out");
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

