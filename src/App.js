

import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink, Navigate } from 'react-router-dom';
import {
  ChakraProvider,
  extendTheme,
  Box,
  Button,
  Flex,
  Heading,
  Text,
  VStack,
  Icon,
  Grid,
  GridItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Circle,
  HStack,
  Link,
  useToast,
  Spinner
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiArrowRight, FiCpu, FiDatabase, FiTrendingUp, FiEdit, FiTrash2, FiAlertTriangle, FiActivity } from "react-icons/fi";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-moment';
import axios from "axios";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";


// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

// --- THEME ---
const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'gray.900',
        color: 'white',
        lineHeight: 'tall',
      },
    },
  },
  colors: {
    brand: {
      900: "#1a202c",
      800: "#2d3748",
      700: "#4a5568",
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

// --- API SERVICE ---
const api = axios.create({
  baseURL: "https://iotanalyser-simulator.onrender.com",
});

// --- AUTH CONTEXT ---
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [token, setToken] = useState(() => "dummy-token");
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

const useAuth = () => useContext(AuthContext);
// --- WebSocket Context (Updated for Alerts) ---
const WebSocketContext = createContext();

const WebSocketProvider = ({ children }) => {
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
        // Subscribe to the alerts topic
        client.subscribe("/topic/alerts", (message) => {
          const alertMessage = message.body;
          setAlerts((prev) => [alertMessage, ...prev.slice(0, 4)]); // Keep last 5 alerts
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
        await api.post('/simulator/startAll');
        toast({ title: "Simulator Started", status: "success", isClosable: true });
      } catch (e) {
        toast({ title: "Failed to Start Simulator", status: "error", isClosable: true });
      }
  }

  const stopSimulator = async () => {
      try {
        await api.post('/simulator/stopAll');
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
const useWebSocket = () => useContext(WebSocketContext);

// --- HOOKS ---
const useDevices = () => {
  const [devices, setDevices] = useState([]);
  const { token } = useAuth();
  const toast = useToast();

  const fetchDevices = async () => {
    if (!token) return;
    try {
        const { data } = await api.get("/device/detail");
        setDevices(data);
    } catch (e) {
        toast({ title: "Could not fetch devices", status: "error", isClosable: true });
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [token]);

  const addDevice = async (device) => { await api.post("/device", device); fetchDevices(); };
  const updateDevice = async (device) => { await api.put(`/device/${device.deviceId}`, device); fetchDevices(); };
  const deleteDevice = async (id) => { await api.delete(`/device/${id}`); fetchDevices(); };

  return { devices, fetchDevices, addDevice, updateDevice, deleteDevice };
};

const useSensorData = () => {
  const { sensorData } = useWebSocket();
  const anomalies = useMemo(() => sensorData.filter(d => d.anomaly).length, [sensorData]);
  return { sensorData, anomalies };
};

const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const { token } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!token) return;
      try {
        const today = new Date().toISOString();
        const { data } = await api.get(`/api/analytics/daily?date=${today}`);
        setAnalyticsData(data);
      } catch (e) {
          toast({ title: "Could not fetch analytics", status: "error", isClosable: true });
      }
    };
    fetchAnalytics();
  }, [token]);

  return { analyticsData };
};

// --- UI COMPONENTS ---
// --- Navbar (Updated for React Router) ---
const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" p={6} bg="brand.800" color="white" borderBottom="1px" borderColor="brand.700">
      <Flex align="center" mr={5}><Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">IoT Analyser</Link></Flex>
      {user && (
        <HStack spacing={4}>
          <Link as={RouterLink} to="/dashboard">Dashboard</Link>
          <Link as={RouterLink} to="/devices">Devices</Link>
          <Link as={RouterLink} to="/sensors">Sensors</Link>
          <Link as={RouterLink} to="/anomalies">Anomalies</Link>
          <Link as={RouterLink} to="/analytics">Analytics</Link>
        </HStack>
      )}
      <Box>
        {user ? (
          <Button as={RouterLink} to="/" onClick={logout} colorScheme="purple">Logout</Button>
        ) : (
          <Button as={RouterLink} to="/auth" colorScheme="blue">Login / Register</Button>
        )}
      </Box>
    </Flex>
  );
};


const Footer = () => <Box as="footer" p={6} bg="brand.800" color="gray.400" textAlign="center" mt={10}><Text>&copy; {new Date().getFullYear()} IoT Analyser. All rights reserved.</Text></Box>;

const StatCard = ({ icon, label, value }) => <Flex align="center" p={5} bg="brand.800" borderRadius="lg" boxShadow="lg"><Icon as={icon} w={10} h={10} color="blue.400" mr={4} /><Box><Text fontSize="2xl" fontWeight="bold">{value}</Text><Text fontSize="sm" color="gray.400">{label}</Text></Box></Flex>;

const DeviceTable = ({ devices, onEdit, onDelete }) => <Box overflowX="auto"><Table variant="simple" colorScheme="whiteAlpha"><Thead><Tr><Th>ID</Th><Th>Name</Th><Th>Type</Th><Th>Status</Th><Th>Actions</Th></Tr></Thead><Tbody>{devices.map((d) => <Tr key={d.deviceId}><Td>{d.deviceId}</Td><Td>{d.deviceName}</Td><Td>{d.deviceType}</Td><Td>{d.status}</Td><Td><IconButton icon={<FiEdit />} onClick={() => onEdit(d)} mr={2} colorScheme="yellow"/><IconButton icon={<FiTrash2 />} onClick={() => onDelete(d.deviceId)} colorScheme="red"/></Td></Tr>)}</Tbody></Table></Box>;

const SensorDataTable = ({ sensorData }) => <Box overflowX="auto"><Table variant="simple" colorScheme="whiteAlpha"><Thead><Tr><Th>Device ID</Th><Th>Type</Th><Th>Value</Th><Th>Timestamp</Th><Th>Anomaly</Th></Tr></Thead><Tbody>{[...sensorData].reverse().map((d, i) => <Tr key={`${d.id}-${i}`}><Td>{d.deviceId}</Td><Td>{d.sensorType}</Td><Td>{d.value.toFixed(2)}</Td><Td>{new Date(d.timestamp).toLocaleString()}</Td><Td color={d.anomaly ? "red.400" : "green.400"}>{d.anomaly ? "Yes" : "No"}</Td></Tr>)}</Tbody></Table></Box>;

const AnalyticsChart = ({ data }) => {
    const chartData = {
        labels: data ? Object.keys(data) : [],
        datasets: [{
            label: 'Average Value',
            data: data ? Object.values(data).map(stat => stat.average) : [],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }]
    };
    return <Box bg="brand.800" p={4} borderRadius="lg">{data ? <Line data={chartData} /> : <Text>Loading analytics...</Text>}</Box>;
};

const DeviceForm = ({ isOpen, onClose, onSubmit, device }) => {
  const [formData, setFormData] = useState({ deviceName: "", deviceType: "", status: "ONLINE" });
  useEffect(() => { setFormData(device ? { ...device } : { deviceName: "", deviceType: "", status: "ONLINE" }); }, [device, isOpen]);
  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); onClose(); };

  return <Modal isOpen={isOpen} onClose={onClose}><ModalOverlay /><ModalContent as="form" onSubmit={handleSubmit} bg="brand.800" color="white"><ModalHeader>{device ? "Edit" : "Add"} Device</ModalHeader><ModalCloseButton /><ModalBody><FormControl mb={4}><FormLabel>Device Name</FormLabel><Input name="deviceName" value={formData.deviceName} onChange={handleChange} /></FormControl><FormControl mb={4}><FormLabel>Device Type</FormLabel><Input name="deviceType" value={formData.deviceType} onChange={handleChange} /></FormControl><FormControl><FormLabel>Status</FormLabel><Select name="status" value={formData.status} onChange={handleChange} sx={{option: {color: 'black'}}}><option value="ONLINE">Online</option><option value="OFFLINE">Offline</option></Select></FormControl></ModalBody><ModalFooter><Button colorScheme="blue" mr={3} type="submit">Save</Button><Button variant="ghost" onClick={onClose}>Cancel</Button></ModalFooter></ModalContent></Modal>;
};

const AuthForm = ({ isLogin, onSubmit, setPage, setTab }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(formData);
    if(success && isLogin) setPage('dashboard');
    if(success && !isLogin) setTab(0); // Switch to login tab after successful registration
  };

  return <VStack as="form" spacing={4} onSubmit={handleSubmit}><FormControl><FormLabel>Email</FormLabel><Input type="email" name="username" value={formData.username} onChange={handleChange} /></FormControl><FormControl><FormLabel>Password</FormLabel><Input type="password" name="password" value={formData.password} onChange={handleChange} /></FormControl><Button type="submit" colorScheme="blue" w="full">{isLogin ? "Login" : "Register"}</Button></VStack>;
};

const RealTimeChart = ({ sensorData }) => {
    const chartData = {
        labels: sensorData.slice(-30).map(d => new Date(d.timestamp).toLocaleTimeString()),
        datasets: [
            { label: 'Temperature', data: sensorData.filter(d => d.sensorType === 'TEMPERATURE').slice(-30).map(d => d.value), borderColor: '#FC8181', backgroundColor: '#FC818120', tension: 0.3 },
            { label: 'Humidity', data: sensorData.filter(d => d.sensorType === 'HUMIDITY').slice(-30).map(d => d.value), borderColor: '#63B3ED', backgroundColor: '#63B3ED20', tension: 0.3 },
        ]
    };
    const options = { responsive: true, maintainAspectRatio: false, scales: { x: { type: 'time' } } };
  return <Box bg="brand.800" p={4} borderRadius="lg"><Line data={chartData} options={options} /></Box>;
};

const DeviceStatus = ({ devices }) => {
  const getStatusColor = (s) => ({ "ONLINE": "green.500", "OFFLINE": "yellow.500" }[s] || "red.500");
  return <Box bg="brand.800" p={4} borderRadius="lg" mb={8}><Heading as="h3" size="lg" mb={4}>Device Status</Heading><VStack align="stretch" spacing={4}>{devices.length > 0 ? devices.map((d) => <HStack key={d.deviceId} justify="space-between"><Text>{d.deviceName}</Text><Circle size="10px" bg={getStatusColor(d.status)} /></HStack>) : <Text color="gray.400">No devices found.</Text>}</VStack></Box>;
};

const SimulatorControl = () => {
    const { simulatorStatus, startSimulator, stopSimulator, isConnected } = useWebSocket();
    return <Box bg="brand.800" p={4} borderRadius="lg"><Heading as="h3" size="lg" mb={4}>Simulator Control</Heading><HStack><Button onClick={startSimulator} colorScheme="green" isDisabled={simulatorStatus.isRunning || !isConnected}>Start</Button><Button onClick={stopSimulator} colorScheme="red" isDisabled={!simulatorStatus.isRunning || !isConnected}>Stop</Button></HStack><Text mt={4}>Status: <Text as="span" color={simulatorStatus.isRunning ? 'green.400' : 'red.400'}>{simulatorStatus.isRunning ? 'Running' : 'Stopped'}</Text></Text><Text mt={2}>Connection: <Text as="span" color={isConnected ? 'green.400' : 'red.400'}>{isConnected ? 'Connected' : 'Disconnected'}</Text></Text></Box>;
};

// --- PAGES ---
const LandingPage = ({ setPage }) => <Flex direction="column" align="center" justify="center" minH="calc(100vh - 150px)" p={8}><VStack spacing={8} textAlign="center" maxW="3xl"><motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}><Heading as="h1" size="4xl" fontWeight="extrabold">IoT Analyser</Heading></motion.div><motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}><Text fontSize="xl">A real-time data processing pipeline for IoT devices. Register, ingest, and analyze sensor data with our intuitive dashboard.</Text></motion.div><motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}><Button onClick={() => setPage('dashboard')} size="lg" bgGradient="linear(to-r, blue.400, purple.500)" _hover={{ bgGradient: "linear(to-r, blue.500, purple.600)" }} rightIcon={<FiArrowRight />}>Go to Dashboard</Button></motion.div></VStack><Grid mt={20} templateColumns={{ base: "1fr", md: "repeat(3, 1fr)"}} gap={8}>{[{i:FiCpu, t:"Device Management", d:"Easily register and manage your IoT devices."}, {i:FiDatabase, t:"Real-time Data", d:"Ingest and visualize sensor data in real-time."}, {i:FiTrendingUp, t:"Analytics", d:"Gain insights with powerful data analytics."}].map(f => <VStack key={f.t} spacing={4} p={8} bg="brand.800" borderRadius="lg"><Icon as={f.i} w={10} h={10} color="blue.300"/><Heading as="h3" size="md">{f.t}</Heading><Text color="gray.400" textAlign="center">{f.d}</Text></VStack>)}</Grid></Flex>;

const DashboardPage = () => {
  const { sensorData, anomalies } = useSensorData();
  const { devices } = useDevices();
  const { token } = useAuth();
  if (!token) return <Flex justify="center" align="center" h="50vh"><Text>Please log in to view the dashboard.</Text></Flex>
  return <Box p={8}><Heading as="h2" size="2xl" mb={8}>Dashboard</Heading><Grid templateColumns="repeat(12, 1fr)" gap={8}><GridItem colSpan={{ base: 12, md: 4 }}><StatCard icon={FiCpu} label="Active Devices" value={devices.length} /></GridItem><GridItem colSpan={{ base: 12, md: 4 }}><StatCard icon={FiAlertTriangle} label="Anomalies" value={anomalies} /></GridItem><GridItem colSpan={{ base: 12, md: 4 }}><StatCard icon={FiActivity} label="Total Readings" value={sensorData.length} /></GridItem><GridItem colSpan={{ base: 12, lg: 8 }} h="400px"><RealTimeChart sensorData={sensorData} /></GridItem><GridItem colSpan={{ base: 12, lg: 4 }}><DeviceStatus devices={devices} /><SimulatorControl /></GridItem></Grid></Box>;
};

const DevicesPage = () => {
  const { devices, addDevice, updateDevice, deleteDevice } = useDevices();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const { token } = useAuth();

  const handleEdit = (d) => { setSelectedDevice(d); setIsFormOpen(true); };
  const handleClose = () => { setSelectedDevice(null); setIsFormOpen(false); };
  const handleAdd = () => { setSelectedDevice(null); setIsFormOpen(true); };

  if (!token) return <Flex justify="center" align="center" h="50vh"><Text>Please log in to manage devices.</Text></Flex>
  return <Box p={8}><Flex justify="space-between" align="center" mb={8}><Heading as="h2" size="2xl">Device Management</Heading><Button onClick={handleAdd} colorScheme="blue">Add Device</Button></Flex><DeviceTable devices={devices} onEdit={handleEdit} onDelete={deleteDevice} /><DeviceForm isOpen={isFormOpen} onClose={handleClose} onSubmit={selectedDevice ? updateDevice : addDevice} device={selectedDevice} /></Box>;
};

const SensorDataPage = () => {
  const { sensorData } = useSensorData();
  const { token } = useAuth();
  if (!token) return <Flex justify="center" align="center" h="50vh"><Text>Please log in to view sensor data.</Text></Flex>
  return <Box p={8}><Heading as="h2" size="2xl" mb={8}>Sensor Data History</Heading><SensorDataTable sensorData={sensorData} /></Box>;
};

const AnalyticsPage = () => {
  const { analyticsData } = useAnalytics();
  const { token } = useAuth();
  if (!token) return <Flex justify="center" align="center" h="50vh"><Text>Please log in to view analytics.</Text></Flex>
  return <Box p={8}><Heading as="h2" size="2xl" mb={8}>Analytics</Heading>{analyticsData ? <AnalyticsChart data={analyticsData} /> : <Spinner />}</Box>;
};

const AuthPage = ({ setPage }) => {
    const { login, register } = useAuth();
    const [tabIndex, setTabIndex] = useState(0);
  return <Flex align="center" justify="center" minH="calc(100vh - 150px)"><Box w="md" bg="brand.800" p={8} borderRadius="lg"><Heading as="h2" size="xl" mb={8} textAlign="center">Account</Heading><Tabs index={tabIndex} onChange={(index) => setTabIndex(index)} isFitted variant="enclosed"><TabList><Tab>Login</Tab><Tab>Register</Tab></TabList><TabPanels><TabPanel><AuthForm isLogin onSubmit={login} setPage={setPage} /></TabPanel><TabPanel><AuthForm onSubmit={register} setPage={setPage} setTab={setTabIndex}/></TabPanel></TabPanels></Tabs></Box></Flex>;
};

// --- MAIN APP ---
function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AuthProvider>
          <WebSocketProvider>
            <Box>
              <Navbar />
              <Box as="main" minH="calc(100vh - 150px)">
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/devices" element={<DevicesPage />} />
                  <Route path="/sensors" element={<SensorDataPage />} />
                  <Route path="/anomalies" element={<AnomaliesPage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </WebSocketProvider>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

export default App;

