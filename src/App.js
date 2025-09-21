import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";
import { AuthProvider } from './contexts/AuthContext';
import { WebSocketProvider } from './contexts/WebSocketContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import DevicesPage from './pages/DevicesPage';
import SensorDataPage from './pages/SensorDataPage';
import AnomaliesPage from './pages/AnomaliesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AuthPage from './pages/AuthPage';

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