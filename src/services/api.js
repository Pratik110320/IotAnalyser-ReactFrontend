import axios from "axios";

const api = axios.create({
  baseURL: "https://iotanalyser-simulator.onrender.com",
});

export default api;
