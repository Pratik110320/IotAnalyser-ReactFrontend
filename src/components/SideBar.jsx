import React from 'react';
import { Menu, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  HddOutlined,
  AreaChartOutlined,
  AlertOutlined,
  ExperimentOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const items = [
    { key: '/dashboard', icon: <DashboardOutlined />, label: <Link to="/dashboard">Dashboard</Link> },
    { key: '/devices', icon: <HddOutlined />, label: <Link to="/devices">Devices</Link> },
    { key: '/sensors', icon: <ExperimentOutlined />, label: <Link to="/sensors">Sensors</Link> },
    { key: '/anomalies', icon: <AlertOutlined />, label: <Link to="/anomalies">Anomalies</Link> },
    { key: '/analytics', icon: <AreaChartOutlined />, label: <Link to="/analytics">Analytics</Link> },
];

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        style={{ flex: 1, borderRight: 0 }}
      />
      <div style={{ padding: '16px', marginTop: 'auto' }}>
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={logout}
          style={{ width: '100%' }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
