import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  HddOutlined,
  AreaChartOutlined,
  AlertOutlined,
  ExperimentOutlined
} from '@ant-design/icons';

const items = [
    { key: '/dashboard', icon: <DashboardOutlined />, label: <Link to="/dashboard">Dashboard</Link> },
    { key: '/devices', icon: <HddOutlined />, label: <Link to="/devices">Devices</Link> },
    { key: '/sensors', icon: <ExperimentOutlined />, label: <Link to="/sensors">Sensors</Link> },
    { key: '/anomalies', icon: <AlertOutlined />, label: <Link to="/anomalies">Anomalies</Link> },
    { key: '/analytics', icon: <AreaChartOutlined />, label: <Link to="/analytics">Analytics</Link> },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={items}
      style={{ height: '100%', borderRight: 0 }}
    />
  );
};

export default Sidebar;
