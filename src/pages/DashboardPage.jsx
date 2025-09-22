import { Row, Col, Typography } from "antd";
import DeviceStatus from "../components/DeviceStatus";
import RealTimeChart from "../components/RealTimeChart";
import SimulatorControl from "../components/SimulatorControl";
import StatCard from "../components/StatCard";
import { useSensorData } from "../hooks/useSensorData";
import { useDevices } from "../hooks/useDevices";
import { HddOutlined, AlertOutlined, LineChartOutlined } from "@ant-design/icons";
import Alerts from '../components/Alerts';
import WeatherCard from '../components/WeatherCard';

const { Title } = Typography;

const DashboardPage = () => {
  const { sensorData, anomalies } = useSensorData();
  const { devices } = useDevices();

  return (
    <div>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Dashboard
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8}>
            <StatCard icon={<HddOutlined />} label="Active Devices" value={devices.length} />
        </Col>
        <Col xs={24} sm={12} md={8}>
            <StatCard icon={<AlertOutlined />} label="Anomalies" value={anomalies} />
        </Col>
         <Col xs={24} sm={12} md={8}>
            <StatCard icon={<LineChartOutlined />} label="Total Readings" value={sensorData.length} />
        </Col>
        <Col xs={24} lg={16}>
          <RealTimeChart sensorData={sensorData} />
        </Col>
        <Col xs={24} lg={8}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <DeviceStatus devices={devices} />
            </Col>
            <Col span={24}>
              <SimulatorControl />
            </Col>
            <Col span={24}>
              <Alerts />
            </Col>
            <Col span={24}>
              <WeatherCard />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
