// Enhanced App.js with Responsive Layout
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ConfigProvider, Layout, theme, Drawer, FloatButton } from 'antd';
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
import { LoginPage } from './pages/LoginPage';import RegisterPage from './pages/RegisterPage';
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
            <style jsx>{`
                /* Your existing JSX styles go here */
                .mobile-header {
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    background: rgba(15, 23, 42, 0.95);
                    backdrop-filter: blur(16px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 16px;
                    height: 64px;
                }

                .mobile-menu-btn {
                    background: rgba(255, 255, 255, 0.05) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    color: #cbd5e1 !important;
                    border-radius: 12px !important;
                    width: 40px !important;
                    height: 40px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }

                .mobile-menu-btn:hover {
                    background: rgba(99, 102, 241, 0.1) !important;
                    border-color: #6366f1 !important;
                    color: #6366f1 !important;
                }

                .desktop-layout {
                    display: flex;
                    min-height: 100vh;
                }

                .main-content {
                    flex: 1;
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
                    min-height: 100vh;
                    position: relative;
                }

                .content-wrapper {
                    min-height: calc(100vh - 140px);
                    background: rgba(15, 23, 42, 0.3);
                    backdrop-filter: blur(10px);
                    border-radius: 24px;
                    margin: 24px;
                    padding: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .mobile-drawer .ant-drawer-content {
                    background: rgba(30, 41, 59, 0.98) !important;
                    backdrop-filter: blur(20px);
                }

                .mobile-drawer .ant-drawer-header {
                    background: rgba(51, 65, 85, 0.8) !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
                }

                .mobile-drawer .ant-drawer-header-title {
                    color: #f8fafc !important;
                }

                .mobile-drawer .ant-drawer-close {
                    color: #cbd5e1 !important;
                }

                .mobile-drawer .ant-drawer-close:hover {
                    color: #6366f1 !important;
                }

                .scroll-to-top {
                    position: fixed !important;
                    bottom: 24px !important;
                    right: 24px !important;
                    z-index: 999 !important;
                }

                @media (max-width: 768px) {
                    .content-wrapper {
                        margin: 16px;
                        padding: 16px;
                        border-radius: 16px;
                    }
                    
                    .scroll-to-top {
                        bottom: 80px !important;
                        right: 16px !important;
                    }
                }

                /* Animation for content transitions */
                .page-transition-enter {
                    opacity: 0;
                    transform: translateY(20px);
                }

                .page-transition-enter-active {
                    opacity: 1;
                    transform: translateY(0);
                    transition: opacity 300ms, transform 300ms;
                }

                .page-transition-exit {
                    opacity: 1;
                }

                .page-transition-exit-active {
                    opacity: 0;
                    transition: opacity 300ms;
                }
            `}</style>

            {isMobile ? (
                // Mobile Layout
                <div>
                    {/* Mobile Header */}
                    <div className="mobile-header">
                        <button 
                            className="mobile-menu-btn"
                            onClick={() => setSidebarVisible(true)}
                        >
                            <MenuOutlined />
                        </button>
                        <NavBar />
                    </div>

                    {/* Mobile Sidebar Drawer */}
                    <Drawer
                        title="Navigation"
                        placement="left"
                        closable={true}
                        onClose={() => setSidebarVisible(false)}
                        open={sidebarVisible}
                        width={280}
                        className="mobile-drawer"
                        styles={{
                            body: { padding: 0 }
                        }}
                    >
                        <Sidebar onItemClick={() => setSidebarVisible(false)} />
                    </Drawer>

                    {/* Mobile Content */}
                    <div className="main-content">
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
                    </div>
                    {/* ADDED FOOTER FOR MOBILE VIEW */}
                    <Footer />
                </div>
            ) : (
                // Desktop Layout
                <div className="desktop-layout">
                    {/* Desktop Header */}
                    <Header 
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            zIndex: 1000,
                            padding: 0,
                            background: 'rgba(15, 23, 42, 0.95)',
                            backdropFilter: 'blur(16px)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            height: '64px',
                            lineHeight: '64px'
                        }}
                    >
                        <NavBar />
                    </Header>

                    {/* Desktop Sidebar */}
                    <Sider 
                        width={280}
                        style={{ 
                            position: 'fixed',
                            left: 0,
                            top: 64,
                            height: 'calc(100vh - 64px)',
                            zIndex: 100,
                            background: 'transparent'
                        }}
                    >
                        <Sidebar />
                    </Sider>

                    {/* Desktop Content */}
                    <Layout style={{ 
                        marginLeft: 280, 
                        marginTop: 64,
                        background: 'transparent',
                        flex:1
                    }}>
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
                        {/* CORRECTED FOOTER SYNTAX AND PLACEMENT */}
                        <Footer />
                    </Layout>
                </div>
            )}

            {/* Scroll to Top Button */}
            {scrolled && (
                <FloatButton 
                    className="scroll-to-top"
                    icon={<ArrowUpOutlined />}
                    type="primary"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{
                        background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                        boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)'
                    }}
                />
            )}
        </Layout>
    );
}

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
                        colorBorder: 'rgba(255, 255, 255, 0.1)',
                    },
                    Table: {
                        colorBgContainer: 'rgba(30, 41, 59, 0.8)',
                        colorBorder: 'rgba(255, 255, 255, 0.1)',
                        headerBg: 'rgba(51, 65, 85, 0.8)',
                    },
                    Menu: {
                        colorBgContainer: 'transparent',
                        colorItemBg: 'transparent',
                        colorItemBgSelected: 'rgba(99, 102, 241, 0.1)',
                        colorItemBgHover: 'rgba(99, 102, 241, 0.05)',
                        colorItemText: '#cbd5e1',
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
                        colorText: '#f8fafc',
                    },
                    Modal: {
                        colorBgElevated: 'rgba(30, 41, 59, 0.95)',
                        contentBg: 'rgba(30, 41, 59, 0.95)',
                        headerBg: 'rgba(51, 65, 85, 0.8)',
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