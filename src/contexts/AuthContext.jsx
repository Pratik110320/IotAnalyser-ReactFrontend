import { createContext, useState, useContext, useEffect } from "react";
import { message } from "antd";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

// A more robust function to decode JWT payload that handles URL-safe Base64
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

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
            } else {
              // Token exists but is invalid
              logout();
            }
        }
      } catch (error) {
        console.error("Failed to initialize auth state:", error);
        logout();
      }
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      // Backend expects "username", frontend form uses "email"
      const authRequest = {
        username: credentials.email,
        password: credentials.password
      };
      
      // Backend returns the token as a raw string in the response data
      const { data: tokenString } = await api.post("/api/auth/authenticate", authRequest);
      
      if (typeof tokenString === 'string' && tokenString.length > 0) {
        const decodedPayload = decodeToken(tokenString);

        if (!decodedPayload || !decodedPayload.sub) {
            throw new Error("Invalid token received from server.");
        }

        const userData = { email: decodedPayload.sub }; 
        
        localStorage.setItem("token", tokenString);
        localStorage.setItem("user", JSON.stringify(userData));
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
      const errorMessage = error.response?.data?.message || "Invalid credentials or server error.";
      message.error(`Login Failed: ${errorMessage}`);
      return false;
    }
  };

  const register = async (credentials) => {
    try {
        const registerRequest = {
            username: credentials.email,
            password: credentials.password
        };
        await api.post("/api/auth/register", registerRequest);
        message.success("Registration Successful! Please log in.");
        navigate("/login", { state: { message: "Registration successful! You can now log in." } });
        return true;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.response?.data || "Email might already be in use.";
        message.error(`Registration Failed: ${errorMessage}`);
        return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    message.info("Logged Out");
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


