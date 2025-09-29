import { createContext, useState, useContext, useEffect } from "react";
import { message } from "antd";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

// A more robust function to decode JWT payload that handles URL-safe Base64
const decodeToken = (token) => {
  try {
    // A JWT is composed of three parts separated by dots. We need the second part (the payload).
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    // The payload is Base64URL encoded. We need to replace URL-safe characters
    // and add padding to make it a valid Base64 string for atob.
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode token", e);
    // If decoding fails, clear the invalid token to prevent future errors
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
      const { data } = await api.post("/api/auth/authenticate", credentials);
      const tokenString = data.token;
      
      if (typeof tokenString === 'string' && tokenString.length > 0) {
        const decodedPayload = decodeToken(tokenString);

        if (!decodedPayload || !decodedPayload.sub) {
            throw new Error("Invalid token received from server.");
        }

        const userData = { email: decodedPayload.sub }; 
        
        localStorage.setItem("token", tokenString);
        localStorage.setItem("user", JSON.stringify(userData));
        api.defaults.headers.common["Authorization"] = `Bearer ${tokenString}`;
        setToken(tokenString);
        setUser(userData);
        message.success("Login Successful");
        navigate("/dashboard");
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
        const registerCredentials = {
            email: credentials.email,
            password: credentials.password
        };
        await api.post("/api/auth/register", registerCredentials);
        message.success("Registration Successful! Logging you in...");
        // Automatically log in after successful registration
        return await login(registerCredentials);
    } catch (error) {
        // Display the specific error message from the backend if available
        const errorMessage = error.response?.data?.message || error.response?.data || "Email might already be in use.";
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

