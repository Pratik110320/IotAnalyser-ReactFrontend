// Enhanced DashboardPage.jsx with Modern Design
import React from 'react';
import { Row, Col, Typography, Card, Badge, List, Avatar } from 'antd';
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

const StatCard = ({ title, value, icon, color, suffix = '' }) => (
    <Card
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
      </div>
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

const DashboardPage = () => {
  const { sensorData, anomalies } = useSensorData();
  const { devices } = useDevices();
  const { isConnected } = useWebSocket();

  const onlineDevices = devices.filter(d => d.status === 'ONLINE').length;
  const totalReadings = sensorData.length;
  const anomalyRate = totalReadings > 0 ? (anomalies / totalReadings * 100).toFixed(1) : 0;

  const recentActivity = sensorData.slice(0, 5).map((data, index) => ({
    id: data.id || index,
    type: data.anomaly ? 'anomaly' : 'normal',
    device: `Device ${data.deviceId}`,
    sensor: data.sensorType,
    value: data.value,
    timestamp: data.timestamp,
    status: data.anomaly ? 'warning' : 'success'
  }));

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px' }}>
        <Title level={1} style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #6366f1 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.5rem',
            fontWeight: 800,
            marginBottom: '8px'
        }}>
          Dashboard
        </Title>
        <Text style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>
          Real-time monitoring and analytics for your IoT infrastructure.
        </Text>
      </div>

      {/* Stats Grid */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Active Devices"
            value={onlineDevices}
            suffix={` / ${devices.length}`}
            icon={<HddOutlined />}
            color="#6366f1"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Anomalies Detected"
            value={anomalies}
            icon={<AlertOutlined />}
            color="#ef4444"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Readings"
            value={totalReadings > 1000 ? `${(totalReadings/1000).toFixed(1)}k` : totalReadings}
            icon={<LineChartOutlined />}
            color="#06b6d4"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Anomaly Rate"
            value={anomalyRate}
            suffix="%"
            icon={<ThunderboltOutlined />}
            color="#10b981"
          />
        </Col>
      </Row>

      {/* Main Content Grid */}
      <Row gutter={[24, 24]}>
        {/* Real-time Chart */}
        <Col xs={24} lg={16}>
          <Card
             title={
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Title level={4} style={{ color: '#f8fafc', margin: 0 }}>Real-time Sensor Data</Title>
                    <Badge status={isConnected ? 'processing' : 'error'} text={isConnected ? 'Live' : 'Disconnected'} />
                </div>
             }
             style={{ background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', height: '400px' }}
          >
            <RealTimeChart sensorData={sensorData} />
          </Card>
        </Col>

        {/* Side Widgets */}
        <Col xs={24} lg={8}>
            <Row gutter={[24, 24]}>
                <Col xs={24}>
                    <DeviceStatus devices={devices} />
                </Col>
                 <Col xs={24}>
                    <SimulatorControl />
                </Col>
                <Col xs={24}>
                     <WeatherCard />
                </Col>
            </Row>
        </Col>
      </Row>

       {/* Bottom Section */}
       <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
        <Col xs={24} lg={12}>
          <Alerts />
        </Col>
        <Col xs={24} lg={12}>
            <Card
                title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ClockCircleOutlined style={{ color: '#06b6d4' }} />
                    <span style={{ color: '#f8fafc' }}>Recent Activity</span>
                    </div>
                }
                style={{ background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', height: '100%' }}
                bodyStyle={{ padding: '16px' }}
            >
                 <List
                    dataSource={recentActivity}
                    renderItem={(item) => (
                    <List.Item style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <List.Item.Meta
                        avatar={
                            <Avatar
                                style={{ background: item.status === 'success' ? '#10b981' : '#ef4444' }}
                                icon={item.status === 'success' ? <CheckCircleOutlined /> : <WarningOutlined />}
                            />
                        }
                        title={<Text style={{ color: '#f8fafc' }}>{item.device} - {item.sensor}</Text>}
                        description={<Text type="secondary">{new Date(item.timestamp).toLocaleTimeString()}</Text>}
                        />
                         <Badge 
                            status={item.status === 'success' ? 'success' : 'error'} 
                            text={<Text style={{ color: '#cbd5e1' }}>{item.value?.toFixed(1)}</Text>}
                        />
                    </List.Item>
                    )}
                    locale={{ emptyText: 'No recent activity' }}
                />
            </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
