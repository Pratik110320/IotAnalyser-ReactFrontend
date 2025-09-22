import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, Layout, theme } from 'antd';
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

const { Content } = Layout;

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
            <Layout style={{ minHeight: '100vh' }}>
              <Navbar />
              <Content style={{ padding: '0 24px', marginTop: 24 }}>
                <div style={{ background: '#1a202c', padding: 24, minHeight: 'calc(100vh - 180px)' }}>
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
                </div>
              </Content>
              <Footer />
            </Layout>
          </WebSocketProvider>
        </AuthProvider>
      </Router>
    </ConfigProvider>
  );
}

export default App;
