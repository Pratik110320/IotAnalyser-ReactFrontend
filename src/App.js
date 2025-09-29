// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ConfigProvider, Layout, theme, Drawer, FloatButton, Button } from 'antd';
import { MenuOutlined, ArrowUpOutlined, LogoutOutlined } from '@ant-design/icons';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WebSocketProvider } from './contexts/WebSocketContext';
import NavBar from './pages/NavBar';
import Footer from './pages/Footer';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import DevicesPage from './pages/DevicesPage';
import SensorDataPage from './pages/SensorDataPage';
import AnomaliesPage from './pages/AnomaliesPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { LoginPage } from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Sidebar from './components/SideBar';
import './App.css'; // Make sure to import the CSS file

const { Content, Sider, Header } = Layout;

const AppRoutes = () => {
    const { token } = useAuth();
    const location = useLocation();

    const publicPaths = ['/', '/login', '/register'];
    const isPublicPath = publicPaths.includes(location.pathname);

    if (token && isPublicPath) {
        return <Navigate to="/dashboard" />;
    }

    if (token) {
        return (
            <Routes>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/devices" element={<DevicesPage />} />
                <Route path="/sensors" element={<SensorDataPage />} />
                <Route path="/anomalies" element={<AnomaliesPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}


const AppLayout = () => {
    const { token, logout } = useAuth();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) {
                setSidebarVisible(false);
            }
        };

        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);
        handleResize(); // Initial check

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const publicPaths = ['/', '/login', '/register'];
    const isPublicPath = publicPaths.includes(location.pathname);


    if (token && !isPublicPath) {
        // Authenticated Layout
        return (
             <Layout style={{ minHeight: '100vh' }}>
                {isMobile ? (
                    // Mobile Layout
                    <Layout>
                        <Header className="mobile-header">
                            <Button
                                className="mobile-menu-btn"
                                icon={<MenuOutlined />}
                                onClick={() => setSidebarVisible(true)}
                            />
                            <NavBar />
                             <Button
                                className="mobile-menu-btn"
                                icon={<LogoutOutlined />}
                                onClick={logout}
                            />
                        </Header>
                        <Drawer
                            title="Navigation"
                            placement="left"
                            closable={true}
                            onClose={() => setSidebarVisible(false)}
                            open={sidebarVisible}
                            width={280}
                            className="mobile-drawer"
                            bodyStyle={{ padding: 0 }}
                        >
                            <Sidebar onItemClick={() => setSidebarVisible(false)} />
                        </Drawer>
                        <Content className="main-content">
                            <div className="content-wrapper">
                               <AppRoutes />
                            </div>
                        </Content>
                        <Footer />
                    </Layout>
                ) : (
                    // Desktop Layout
                    <>
                        <Header className="desktop-header">
                            <NavBar />
                        </Header>
                        <Layout className="desktop-layout-container">
                            <Sider className="desktop-sider" width={280}>
                                <Sidebar />
                            </Sider>
                            <Layout className="desktop-content-layout">
                                <Content>
                                    <div className="content-wrapper">
                                        <AppRoutes />
                                    </div>
                                </Content>
                                <Footer />
                            </Layout>
                        </Layout>
                    </>
                )}
                {scrolled && (
                    <FloatButton
                        className="scroll-to-top"
                        icon={<ArrowUpOutlined />}
                        type="primary"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    />
                )}
            </Layout>
        );
    }

    // Public Pages Layout
    return (
        <Layout style={{ minHeight: '100vh', background: '#0f172a' }}>
           {!isMobile && <NavBar />}
            <Content>
                <AppRoutes />
            </Content>
             {!isMobile && <Footer />}
            {scrolled && location.pathname === '/' && (
                <FloatButton
                    className="scroll-to-top"
                    icon={<ArrowUpOutlined />}
                    type="primary"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                />
            )}
        </Layout>
    );
};

function App() {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#6366f1',
                    colorBgBase: '#0f172a',
                    // ... other theme tokens from your original file
                },
                components: {
                    // ... your component theme overrides
                }
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

