// src/pages/LandingPage.jsx

import { Button, Row, Col, Card, Typography, Space } from "antd";
import { WifiOutlined, FundOutlined, BarChartOutlined } from "@ant-design/icons";
import { Link as RouterLink } from "react-router-dom";
import './LandingPage.css';

const { Title, Paragraph } = Typography;

const LandingPage = () => {
  return (
    <div>
      <div className="hero-section">
        <div className="hero-content">
          <Title style={{ color: 'white', textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
            IoT Analyser
          </Title>
          <Paragraph style={{ color: 'white', fontSize: '18px' }}>
            Unlock the power of your IoT data. Real-time insights, anomaly detection, and powerful analytics at your fingertips.
          </Paragraph>
          <Space size="large" style={{ marginTop: '24px' }}>
            <RouterLink to="/login" state={{ message: "Please log in to view the features of the app." }}>
              <Button type="primary" size="large">
                Go to Dashboard
              </Button>
            </RouterLink>
          </Space>
        </div>
      </div>

      <div style={{ padding: '50px 24px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 48 }}>
          Features
        </Title>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card hoverable className="feature-card">
              <WifiOutlined style={{ fontSize: '48px', color: '#7B61FF' }} />
              <Title level={4}>Real-time Connectivity</Title>
              <Paragraph>Connect and monitor your IoT devices in real-time with our robust WebSocket-based data pipeline.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable className="feature-card">
              <FundOutlined style={{ fontSize: '48px', color: '#7B61FF' }} />
              <Title level={4}>Live Anomaly Detection</Title>
              <Paragraph>Our intelligent algorithms analyze incoming data streams to detect and alert you to anomalies as they happen.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable className="feature-card">
              <BarChartOutlined style={{ fontSize: '48px', color: '#7B61FF' }} />
              <Title level={4}>Powerful Analytics</Title>
              <Paragraph>Visualize trends, track performance, and gain actionable insights with our comprehensive analytics dashboard.</Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default LandingPage;