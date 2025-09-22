// src/pages/AnomaliesPage.jsx
import React, { useMemo } from "react";
import { Row, Col, Typography, Empty } from "antd";
import { useSensorData } from "../hooks/useSensorData";
import SensorDataTable from "../components/SensorDataTable";
import { useAuth } from "../contexts/AuthContext";

const { Title, Paragraph } = Typography;

const AnomaliesPage = () => {
  const { sensorData } = useSensorData();
  const { token } = useAuth();

  const anomalyData = useMemo(() => sensorData.filter((d) => d.anomaly), [sensorData]);

  if (!token) {
    return (
      <Row justify="center" align="middle" style={{ minHeight: "50vh" }}>
        <Col>
          <Empty description="Please log in to view anomalies." />
        </Col>
      </Row>
    );
  }

  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "#071228", color: "#fff" }}>
      <Title style={{ color: "#fff" }}>Anomalous Sensor Data</Title>
      <Paragraph style={{ color: "#cbd5e1" }}>Filtered list of sensor records flagged as anomalies.</Paragraph>
      <SensorDataTable sensorData={anomalyData} />
    </div>
  );
};

export default AnomaliesPage;
