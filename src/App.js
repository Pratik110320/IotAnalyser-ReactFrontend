import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ConfigProvider, Layout, theme } from 'antd';
import { AuthProvider, useAuth } from './contexts/AuthContext';
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
import Sidebar from './components/Sidebar';

const { Content, Sider } = Layout;

const AppLayout = () => {
    const { token } = useAuth();
    const location = useLocation();

    const publicPaths = ['/', '/auth'];
    const isPublicPath = publicPaths.includes(location.pathname);

    // If user has a token and is not on a public path, show the main app layout with sidebar.
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

    // Otherwise, show the public layout (for landing and auth pages)
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Navbar />
            <Content>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    {/* If a logged-in user tries to access a public path, redirect to dashboard */}
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
