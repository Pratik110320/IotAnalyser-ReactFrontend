// Enhanced DashboardPage.jsx with Modern Design
import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Card, Statistic, Progress, Badge, List, Avatar } from 'antd';
import { 
  HddOutlined,
  AlertOutlined,
  LineChartOutlined,
  ThunderboltOutlined,
  WifiOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import DeviceStatus from '../components/DeviceStatus';
import RealTimeChart from '../components/RealTimeChart';
import SimulatorControl from '../components/SimulatorControl';
import Alerts from '../components/Alerts';
import WeatherCard from '../components/WeatherCard';
import { useSensorData } from '../hooks/useSensorData';
import { useDevices } from '../hooks/useDevices';
import { useWebSocket } from '../contexts/WebSocketContext';

const { Title, Text } = Typography;

const DashboardPage = () => {
  const { sensorData, anomalies } = useSensorData();
  const { devices } = useDevices();
  const { isConnected, simulatorStatus } = useWebSocket();
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Generate recent activity from sensor data
    const activity = sensorData.slice(0, 5).map((data, index) => ({
      id: index,
      type: data.anomaly ? 'anomaly' : 'normal',
      device: `Device ${data.deviceId}`,
      sensor: data.sensorType,
      value: data.value,
      timestamp: data.timestamp,
      status: data.anomaly ? 'warning' : 'success'
    }));
    setRecentActivity(activity);
  }, [sensorData]);

  const onlineDevices = devices.filter(d => d.status === 'ONLINE').length;
  const totalReadings = sensorData.length;
  const anomalyRate = totalReadings > 0 ? (anomalies / totalReadings * 100).toFixed(1) : 0;

  const StatCard = ({ title, value, icon, color, suffix = '', trend, description }) => (
    <Card
      className="stat-card"
      style={{
        background: 'rgba(30, 41, 59, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}
      bodyStyle={{ padding: '24px' }}
      hoverable
    >
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: `linear-gradient(135deg, ${color}20, ${color}10)`,
              border: `1px solid ${color}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px'
            }}
          >
            {React.cloneElement(icon, { style: { fontSize: '24px', color } })}
          </div>
          <div>
            <Text style={{ color: '#94a3b8', fontSize: '14px', display: 'block' }}>
              {title}
            </Text>
            <Text style={{ color: '#f8fafc', fontSize: '28px', fontWeight: '700', lineHeight: 1 }}>
              {value}{suffix}
            </Text>
          </div>
        </div>
        
        {description && (
          <Text style={{ color: '#cbd5e1', fontSize: '12px' }}>
            {description}
          </Text>
        )}
        
        {trend && (
          <div style={{ marginTop: '8px' }}>
            <Text style={{ color: trend > 0 ? '#10b981' : '#ef4444', fontSize: '12px' }}>
              {trend > 0 ? '↗' : '↙'} {Math.abs(trend)}% from last hour
            </Text>
          </div>
        )}
      </div>
      
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`,
          borderRadius: '50%',
          zIndex: 1
        }}
      />
    </Card>
  );

  const ActivityCard = ({ title, data, icon }) => (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {icon}
          <span style={{ color: '#f8fafc' }}>{title}</span>
        </div>
      }
      style={{
        background: 'rgba(30, 41, 59, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        height: '100%'
      }}
      headStyle={{
        background: 'rgba(51, 65, 85, 0.5)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px 16px 0 0'
      }}
      bodyStyle={{ padding: '16px' }}
    >
      <List
        size="small"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            style={{
              border: 'none',
              padding: '8px 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
            }}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  size="small"
                  style={{
                    background: item.status === 'success' ? '#10b981' : '#ef4444',
                    border: 'none'
                  }}
                  icon={item.status === 'success' ? <CheckCircleOutlined /> : <WarningOutlined />}
                />
              }
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ color: '#f8fafc', fontSize: '14px', fontWeight: '500' }}>
                    {item.device} - {item.sensor}
                  </Text>
                  <Badge 
                    status={item.status === 'success' ? 'success' : 'error'} 
                    text={
                      <Text style={{ color: '#cbd5e1', fontSize: '12px' }}>
                        {item.value?.toFixed(1)}
                      </Text>
                    }
                  />
                </div>
              }
              description={
                <Text style={{ color: '#94a3b8', fontSize: '12px' }}>
                  {new Date(item.timestamp).toLocaleTimeString()}
                </Text>
              }
            />
          </List.Item>
        )}
        locale={{ emptyText: 'No recent activity' }}
      />
    </Card>
  );

  return (
    <div style={{ padding: '24px', minHeight: '100vh' }}>
      <style jsx>{`
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border-color: rgba(99, 102, 241, 0.3);
        }

        .dashboard-header {
          margin-bottom: 32px;
        }

        .dashboard-title {
          background: linear-gradient(135deg, #f8fafc 0%, #6366f1 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .dashboard-subtitle {
          color: #cbd5e1;
          font-size: 1.1rem;
          margin: 0;
        }

        .system-health {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 12px;
          margin-top: 16px;
        }

        .health-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #10b981;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        .chart-container {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          height: 400px;
        }

        .widget-grid {
          display: grid;
          gap: 24px;
        }

        @media (max-width: 768px) {
          .dashboard-title {
            font-size: 2rem;
          }
          
          .chart-container {
            height: 300px;
            padding: 16px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="dashboard-header">
        <Title className="dashboard-title" level={1}>
          Dashboard
        </Title>
        <Text className="dashboard-subtitle">
          Real-time monitoring and analytics for your IoT infrastructure
        </Text>
        
        {/* System Health Indicator */}
        <div className="system-health">
          <div className="health-indicator" />
          <Text style={{ color: '#10b981', fontWeight: '500' }}>
            System Status: All systems operational
          </Text>
          <Text style={{ color: '#94a3b8', marginLeft: 'auto' }}>
            Last updated: {new Date().toLocaleTimeString()}
          </Text>
        </div>
      </div>

      {/* Stats Grid */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Active Devices"
            value={onlineDevices}
            suffix={`/${devices.length}`}
            icon={<HddOutlined />}
            color="#6366f1"
            trend={5.2}
            description="Devices currently online and reporting"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Anomalies Detected"
            value={anomalies}
            icon={<AlertOutlined />}
            color="#ef4444"
            trend={-2.1}
            description="Unusual patterns identified"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Readings"
            value={totalReadings > 1000 ? `${(totalReadings/1000).toFixed(1)}k` : totalReadings}
            icon={<LineChartOutlined />}
            color="#06b6d4"
            trend={12.5}
            description="Data points collected today"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="System Health"
            value={anomalyRate}
            suffix="%"
            icon={<ThunderboltOutlined />}
            color="#10b981"
            trend={-1.3}
            description="Anomaly rate (lower is better)"
          />
        </Col>
      </Row>

      {/* Main Content Grid */}
      <Row gutter={[24, 24]}>
        {/* Real-time Chart */}
        <Col xs={24} lg={16}>
          <div className="chart-container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <Title level={4} style={{ color: '#f8fafc', margin: 0 }}>
                Real-time Sensor Data
              </Title>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isConnected ? '#10b981' : '#ef4444',
                  animation: isConnected ? 'pulse 2s infinite' : 'none'
                }} />
                <Text style={{ color: '#cbd5e1', fontSize: '12px' }}>
                  {isConnected ? 'Live' : 'Disconnected'}
                </Text>
              </div>
            </div>
            <RealTimeChart sensorData={sensorData} />
          </div>
        </Col>

        {/* Side Widgets */}
        <Col xs={24} lg={8}>
          <div className="widget-grid" style={{ display: 'grid', gap: '24px' }}>
            {/* Device Status */}
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <WifiOutlined style={{ color: '#6366f1' }} />
                  <span style={{ color: '#f8fafc' }}>Device Status</span>
                </div>
              }
              style={{
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px'
              }}
              headStyle={{
                background: 'rgba(51, 65, 85, 0.5)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px 16px 0 0'
              }}
            >
              <DeviceStatus devices={devices} />
            </Card>

            {/* Simulator Control */}
            <Card
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ThunderboltOutlined style={{ color: '#06b6d4' }} />
                  <span style={{ color: '#f8fafc' }}>Simulator Control</span>
                </div>
              }
              style={{
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px'
              }}
              headStyle={{
                background: 'rgba(51, 65, 85, 0.5)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px 16px 0 0'
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <Text style={{ color: '#cbd5e1' }}>Status: </Text>
                <Badge 
                  status={simulatorStatus.isRunning ? 'processing' : 'default'}
                  text={
                    <Text style={{ color: simulatorStatus.isRunning ? '#10b981' : '#94a3b8' }}>
                      {simulatorStatus.isRunning ? 'Running' : 'Stopped'}
                    </Text>
                  }
                />
              </div>
              <SimulatorControl />
            </Card>

            {/* Weather Card */}
            <WeatherCard />
          </div>
        </Col>
      </Row>

      {/* Bottom Section */}
      <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
        <Col xs={24} lg={12}>
          <Alerts />
        </Col>
        <Col xs={24} lg={12}>
          <ActivityCard
            title="Recent Activity"
            icon={<ClockCircleOutlined style={{ color: '#06b6d4' }} />}
            data={recentActivity}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;