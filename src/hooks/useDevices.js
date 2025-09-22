import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { message } from "antd";

export const useDevices = () => {
  const [devices, setDevices] = useState([]);

  const fetchDevices = useCallback(async () => {
    try {
      const { data } = await api.get("/device/detail");
      setDevices(data);
    } catch (error) {
      message.error("Failed to fetch devices.");
      console.error("Failed to fetch devices:", error);
    }
  }, []);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const addDevice = async (device) => {
    try {
      await api.post("/device", device);
      fetchDevices();
      message.success("Device added successfully.");
    } catch (error) {
      message.error("Failed to add device.");
      console.error("Failed to add device:", error);
    }
  };

  const updateDevice = async (device) => {
    try {
      await api.put(`/device/${device.deviceId}`, device);
      fetchDevices();
      message.success("Device updated successfully.");
    } catch (error) {
      message.error("Failed to update device.");
      console.error("Failed to update device:", error);
    }
  };

  const deleteDevice = async (id) => {
    try {
      await api.delete(`/device/${id}`);
      fetchDevices();
      message.success("Device deleted successfully.");
    } catch (error) {
      message.error("Failed to delete device.");
      console.error("Failed to delete device:", error);
    }
  };

  return { devices, addDevice, updateDevice, deleteDevice };
};