// src/contexts/WebSocketContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { notification } from "antd";
import api from "../services/api";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [sensorData, setSensorData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [simulatorStatus, setSimulatorStatus] = useState({ isRunning: false, runningDeviceIds: [] });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(process.env.REACT_APP_API_BASE_URL + "/ws-sensor-data"),
      onConnect: () => {
        setIsConnected(true);

        client.subscribe("/topic/sensor-data", (message) => {
          try {
            const data = JSON.parse(message.body);
            setSensorData((prev) => [data, ...prev.slice(0, 199)]);
          } catch (e) {
            console.error("Invalid sensor-data message", e);
          }
        });

        client.subscribe("/topic/simulator-control", (message) => {
          try {
            const status = JSON.parse(message.body);
            setSimulatorStatus(status);
          } catch (e) {
            console.error("Invalid simulator-control message", e);
          }
        });

        client.subscribe("/topic/alerts", (message) => {
          const alertMessage = message.body;
          setAlerts((prev) => [alertMessage, ...prev.slice(0, 4)]);
          notification.warning({
            message: "New Alert!",
            description: alertMessage,
            duration: 9,
          });
        });
      },
      onDisconnect: () => setIsConnected(false),
      onStompError: (err) => {
        console.error("STOMP error", err);
        setIsConnected(false);
      },
      reconnectDelay: 5000,
    });

    client.activate();
    return () => client.deactivate();
  }, []);

  const startSimulator = async () => {
    try {
      await api.post("/simulator/startAll");
      notification.success({ message: "Simulator Started" });
    } catch (e) {
      console.error(e);
      notification.error({ message: "Failed to Start Simulator" });
    }
  };

  const stopSimulator = async () => {
    try {
      await api.delete("/simulator/stopAll");
      notification.info({ message: "Simulator Stopped" });
    } catch (e) {
      console.error(e);
      notification.error({ message: "Failed to Stop Simulator" });
    }
  };

  return (
    <WebSocketContext.Provider value={{ sensorData, setSensorData, alerts, simulatorStatus, isConnected, startSimulator, stopSimulator }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
