import { Typography, Button } from "antd";
import { useWebSocket } from "../contexts/WebSocketContext";
import SensorDataTable from "../components/SensorDataTable";
import SensorDataForm from "../components/SensorDataForm";
import { useState } from "react";
import api from "../services/api";
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const SensorDataPage = () => {
  const { sensorData, setSensorData } = useWebSocket();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddSensorData = async (data) => {
    try {
      const response = await api.post("/sensor", data);
      setSensorData((prev) => [response.data, ...prev]);
      console.log("Sensor data added:", response.data);
    } catch (error) {
      console.error("Failed to add sensor data", error);
    }
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Sensor Data
      </Title>
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={() => setIsFormOpen(true)} 
        style={{ marginBottom: 24 }}
      >
        Add Sensor Data
      </Button>
      <SensorDataTable sensorData={sensorData} />
      <SensorDataForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddSensorData}
      />
    </div>
  );
};

export default SensorDataPage;
