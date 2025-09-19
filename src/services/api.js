import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8083" 
    : "https://iotanalyser-simulator.onrender.com";

const api = axios.create({
  baseURL: baseURL,
});

export default api;