import { useState, useEffect } from "react";
import api from "../services/api";

export const useDevices = () => {
  const [devices, setDevices] = useState([]);

  const fetchDevices = async () => {
    const { data } = await api.get("/api/device/detail");
    setDevices(data);
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const addDevice = async (device) => {
    await api.post("/api/device", device);
    fetchDevices();
  };

  const updateDevice = async (device) => {
    await api.put(`api/device/${device.deviceId}`, device);
    fetchDevices();
  };

  const deleteDevice = async (id) => {
    await api.delete(`/api/device/${id}`);
    fetchDevices();
  };

  return { devices, addDevice, updateDevice, deleteDevice };
};
