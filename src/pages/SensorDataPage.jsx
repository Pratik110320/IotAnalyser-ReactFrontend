import { Box, Heading, Button } from "@chakra-ui/react";
import { useWebSocket } from "../contexts/WebSocketContext";
import SensorDataTable from "../components/SensorDataTable";
import SensorDataForm from "../components/SensorDataForm";
import { useState } from "react";
import api from "../services/api";

const SensorDataPage = () => {
  const { sensorData, setSensorData } = useWebSocket();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddSensorData = async (data) => {
    try {
      const response = await api.post("/sensor", data);
      setSensorData((prev) => [...prev, response.data]);
      console.log("Sensor data added:", response.data);
    } catch (error) {
      console.error("Failed to add sensor data", error);
    }
  };

  return (
    <Box p={8} bg="brand.900" minH="100vh" color="white">
      <Heading as="h2" size="2xl" mb={8}>
        Sensor Data
      </Heading>
      <Button onClick={() => setIsFormOpen(true)} colorScheme="blue" mb={8}>
        Add Sensor Data
      </Button>
      <SensorDataTable sensorData={sensorData} />
      <SensorDataForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddSensorData}
      />
    </Box>
  );
};

export default SensorDataPage;