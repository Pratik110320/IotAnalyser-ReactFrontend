import { createContext, useState, useContext, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [sensorData, setSensorData] = useState([]);
  const [simulatorStatus, setSimulatorStatus] = useState({ isRunning: false, runningDeviceIds: [] });
  
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("https://iotanalyser-simulator.onrender.com/ws-sensor-data"),
      onConnect: () => {
        client.subscribe("/topic/sensor-data", (message) => {
          const data = JSON.parse(message.body);
          setSensorData((prev) => [...prev, data]);
        });
        client.subscribe("/topic/simulator-control", (message) => {
            const status = JSON.parse(message.body);
            setSimulatorStatus(status);
        })
      },
    });

    client.activate();

    return () => client.deactivate();
  }, []);

  const startSimulator = () => {
      fetch('https://iotanalyser-simulator.onrender.com/simulator/startAll', { method: 'POST' });
  }

  const stopSimulator = () => {
      fetch('https://iotanalyser-simulator.onrender.com/simulator/stopAll', { method: 'POST' });
  }

  return (
    <WebSocketContext.Provider value={{ sensorData, simulatorStatus, startSimulator, stopSimulator }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
