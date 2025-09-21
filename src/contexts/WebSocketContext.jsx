import { createContext, useState, useContext, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useToast } from "@chakra-ui/react";
import api from '../services/api';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const [sensorData, setSensorData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [simulatorStatus, setSimulatorStatus] = useState({ isRunning: false, runningDeviceIds: [] });
  const [isConnected, setIsConnected] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(process.env.REACT_APP_API_BASE_URL + "/ws-sensor-data"),
      onConnect: () => {
        setIsConnected(true);
        client.subscribe("/topic/sensor-data", (message) => {
          const data = JSON.parse(message.body);
          setSensorData((prev) => [...prev.slice(-200), data]);
        });
        client.subscribe("/topic/simulator-control", (message) => {
          const status = JSON.parse(message.body);
          setSimulatorStatus(status);
        });
        client.subscribe("/topic/alerts", (message) => {
          const alertMessage = message.body;
          setAlerts((prev) => [alertMessage, ...prev.slice(0, 4)]); 
          toast({
            title: "New Alert!",
            description: alertMessage,
            status: "warning",
            duration: 9000,
            isClosable: true,
          });
        });
      },
      onDisconnect: () => setIsConnected(false),
      onStompError: () => setIsConnected(false),
      reconnectDelay: 5000,
    });

    client.activate();
    return () => client.deactivate();
  }, [toast]);
  
  const startSimulator = async () => {
      try {
        await api.post('/api/simulator/startAll');
        toast({ title: "Simulator Started", status: "success", isClosable: true });
      } catch (e) {
        toast({ title: "Failed to Start Simulator", status: "error", isClosable: true });
      }
  }

  const stopSimulator = async () => {
      try {
        await api.post('/api/simulator/stopAll');
        toast({ title: "Simulator Stopped", status: "info", isClosable: true });
      } catch (e) {
        toast({ title: "Failed to Stop Simulator", status: "error", isClosable: true });
      }
  }

  return (
    <WebSocketContext.Provider value={{ sensorData, alerts, simulatorStatus, isConnected, startSimulator, stopSimulator }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);