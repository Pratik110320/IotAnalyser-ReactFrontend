import { createContext, useState, useContext, useEffect } from "react";
import { message } from "antd";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

// Helper function to decode JWT payload
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    console.error("Failed to decode token", e);
    return null;
  }
};

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
        } else {
            // If user is not in local storage but token is, decode it
            const decodedPayload = decodeToken(token);
            if (decodedPayload && decodedPayload.sub) {
                const userData = { email: decodedPayload.sub };
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            }
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      // The response.data will be the raw JWT string
      const { data: tokenString } = await api.post("/api/auth/authenticate", credentials);
      
      if (typeof tokenString === 'string' && tokenString.length > 0) {
        const decodedPayload = decodeToken(tokenString);

        if (!decodedPayload || !decodedPayload.sub) {
            throw new Error("Invalid token received from server.");
        }

        const userData = { email: decodedPayload.sub }; // 'sub' is the standard claim for subject (username/email)
        
        localStorage.setItem("token", tokenString);
        localStorage.setItem("user", JSON.stringify(userData));
        api.defaults.headers.common["Authorization"] = `Bearer ${tokenString}`;
        setToken(tokenString);
        setUser(userData);
        message.success("Login Successful");
        return true;
      } else {
        throw new Error("Invalid response from server during login.");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Login Failed: Invalid credentials or server error.");
      return false;
    }
  };

  const register = async (credentials) => {
    try {
        // The backend returns a success message string on successful registration
        await api.post("/api/auth/register", credentials);
        message.success("Registration Successful! Please log in.");
        // We return true to signal the UI to switch to the login tab
        return true; 
    } catch (error) {
        const errorMessage = error.response?.data || "Email might already be in use.";
        message.error(`Registration Failed: ${errorMessage}`);
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