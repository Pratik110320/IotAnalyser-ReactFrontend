// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ConfigProvider, Layout, theme } from 'antd';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WebSocketProvider } from './contexts/WebSocketContext';
import Navbar from './pages/NavBar';
import Footer from './pages/Footer';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import DevicesPage from './pages/DevicesPage';
import SensorDataPage from './pages/SensorDataPage';
import AnomaliesPage from './pages/AnomaliesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Sidebar from './components/SideBar';

const { Content, Sider } = Layout;

const AppLayout = () => {
    const { token } = useAuth();
    const location = useLocation();

    const publicPaths = ['/', '/login', '/register'];
    const isPublicPath = publicPaths.includes(location.pathname);

    if (token && !isPublicPath) {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Navbar />
                <Layout>
                    <Sider
                        width={200}
                        breakpoint="lg"
                        collapsedWidth="0"
                        style={{ background: theme.darkAlgorithm.colorBgContainer }}
                    >
                        <Sidebar />
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Content style={{ margin: '24px 0 0', padding: 24, background: '#1a202c', minHeight: 'calc(100vh - 180px)' }}>
                            <Routes>
                                <Route path="/dashboard" element={<DashboardPage />} />
                                <Route path="/devices" element={<DevicesPage />} />
                                <Route path="/sensors" element={<SensorDataPage />} />
                                <Route path="/anomalies" element={<AnomaliesPage />} />
                                <Route path="/analytics" element={<AnalyticsPage />} />
                                <Route path="*" element={<Navigate to="/dashboard" />} />
                            </Routes>
                        </Content>
                    </Layout>
                </Layout>
                <Footer />
            </Layout>
        );
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Navbar />
            <Content>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="*" element={<Navigate to={token ? "/dashboard" : "/"} />} />
                </Routes>
            </Content>
            <Footer />
        </Layout>
    );
};

function App() {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#7B61FF',
                    colorBgBase: '#1a202c',
                    colorBgContainer: '#2d3748',
                },
            }}
        >
            <Router>
                <AuthProvider>
                    <WebSocketProvider>
                        <AppLayout />
                    </WebSocketProvider>
                </AuthProvider>
            </Router>
        </ConfigProvider>
    );
}

export default App;