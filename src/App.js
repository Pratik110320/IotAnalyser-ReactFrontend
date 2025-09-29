// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, Layout, theme } from 'antd';
import { AuthProvider } from './contexts/AuthContext';
import { WebSocketProvider } from './contexts/WebSocketContext';

// Layouts
import PrivateLayout from './layouts/PrivateLayout';
import PublicLayout from './layouts/PublicLayout';

// Auth Pages
import { LoginPage } from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';

// Private Pages
import DashboardPage from './pages/DashboardPage';
import DevicesPage from './pages/DevicesPage';
import SensorDataPage from './pages/SensorDataPage';
import AnomaliesPage from './pages/AnomaliesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

import './App.css';

const { Content } = Layout;

function App() {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#6366f1',
                    colorBgBase: '#0f172a',
                },
            }}
        >
            <Router>
                <AuthProvider>
                    <WebSocketProvider>
                        <Routes>
                            {/* Public Routes */}
                            <Route element={<PublicLayout />}>
                                <Route path="/" element={<LandingPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                            </Route>

                            {/* Private Routes */}
                            <Route 
                                element={
                                    <ProtectedRoute>
                                        <PrivateLayout />
                                    </ProtectedRoute>
                                }
                            >
                                <Route path="/dashboard" element={<DashboardPage />} />
                                <Route path="/devices" element={<DevicesPage />} />
                                <Route path="/sensors" element={<SensorDataPage />} />
                                <Route path="/anomalies" element={<AnomaliesPage />} />
                                <Route path="/analytics" element={<AnalyticsPage />} />
                            </Route>
                        </Routes>
                    </WebSocketProvider>
                </AuthProvider>
            </Router>
        </ConfigProvider>
    );
}

export default App;
