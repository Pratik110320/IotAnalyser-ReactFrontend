import { createContext, useState, useContext, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const toast = useToast();

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
      toast({ title: "Login Successful", status: "success", duration: 3000, isClosable: true });
      return true;
    } catch (error) {
      toast({ title: "Login Failed", description: "Invalid credentials.", status: "error", duration: 3000, isClosable: true });
      return false;
    }
  };

  const register = async (credentials) => {
    try {
        await api.post("/api/auth/register", credentials);
        toast({ title: "Registration Successful", description: "You can now log in.", status: "success", duration: 3000, isClosable: true });
        return true;
    } catch (error) {
        toast({ title: "Registration Failed", description: "Email might already be in use.", status: "error", duration: 3000, isClosable: true });
        return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
    toast({ title: "Logged Out", status: "info", duration: 3000, isClosable: true });
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);