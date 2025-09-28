// Enhanced App.js with Responsive Layout
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ConfigProvider, Layout, theme, Drawer, FloatButton, Button } from 'antd';
import { MenuOutlined, ArrowUpOutlined } from '@ant-design/icons';
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

const { Content, Sider, Header } = Layout;

const AppLayout = () => {
    const { token } = useAuth();
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
        return (
            <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
                {isMobile ? (
                    // Mobile Layout
                    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                        <Header className="mobile-header">
                            <Button
                                className="mobile-menu-btn"
                                icon={<MenuOutlined />}
                                onClick={() => setSidebarVisible(true)}
                            />
                            <NavBar />
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
                        <Content className="main-content" style={{ flex: 1 }}>
                            <div className="content-wrapper">
                                <Routes>
                                    <Route path="/dashboard" element={<DashboardPage />} />
                                    <Route path="/devices" element={<DevicesPage />} />
                                    <Route path="/sensors" element={<SensorDataPage />} />
                                    <Route path="/anomalies" element={<AnomaliesPage />} />
                                    <Route path="/analytics" element={<AnalyticsPage />} />
                                    <Route path="*" element={<Navigate to="/dashboard" />} />
                                </Routes>
                            </div>
                        </Content>
                        <Footer />
                    </div>
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
                                        <Routes>
                                            <Route path="/dashboard" element={<DashboardPage />} />
                                            <Route path="/devices" element={<DevicesPage />} />
                                            <Route path="/sensors" element={<SensorDataPage />} />
                                            <Route path="/anomalies" element={<AnomaliesPage />} />
                                            <Route path="/analytics" element={<AnalyticsPage />} />
                                            <Route path="*" element={<Navigate to="/dashboard" />} />
                                        </Routes>
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
        <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}>
            <NavBar />
            <Content style={{ position: 'relative', zIndex: 1 }}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="*" element={<Navigate to={token ? "/dashboard" : "/"} />} />
                </Routes>
            </Content>
            <Footer />
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
                    colorBgContainer: '#1e293b',
                    colorBgElevated: '#334155',
                    colorBorder: 'rgba(255, 255, 255, 0.1)',
                    colorText: '#f8fafc',
                    colorTextSecondary: '#cbd5e1',
                    colorTextTertiary: '#94a3b8',
                    borderRadius: 12,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                },
                components: {
                    Card: {
                        colorBgContainer: 'rgba(30, 41, 59, 0.8)',
                    },
                    Table: {
                        colorBgContainer: 'rgba(30, 41, 59, 0.8)',
                        headerBg: 'rgba(51, 65, 85, 0.8)',
                    },
                    Menu: {
                        colorBgContainer: 'transparent',
                        colorItemBgSelected: 'rgba(99, 102, 241, 0.1)',
                        colorItemBgHover: 'rgba(99, 102, 241, 0.05)',
                        colorItemTextSelected: '#6366f1',
                        colorItemTextHover: '#6366f1',
                    },
                    Button: {
                        colorPrimary: '#6366f1',
                        colorPrimaryHover: '#4f46e5',
                        colorPrimaryActive: '#4338ca',
                    },
                    Input: {
                        colorBgContainer: 'rgba(30, 41, 59, 0.8)',
                        colorBorder: 'rgba(255, 255, 255, 0.1)',
                    },
                    Modal: {
                        colorBgElevated: 'rgba(30, 41, 59, 0.95)',
                    },
                    Drawer: {
                        colorBgElevated: 'rgba(30, 41, 59, 0.98)',
                    }
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