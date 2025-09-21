import { Box, Heading, Button } from "@chakra-ui/react";
import { useSensorData } from "../hooks/useSensorData";
import SensorDataTable from "../components/SensorDataTable";
import SensorDataForm from "../components/SensorDataForm";
import { useState } from "react";
import api from "../services/api"; // Import the api service

const SensorDataPage = () => {
  const { sensorData, setSensorData } = useSensorData(); // Assuming you can update sensorData from your hook
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleAddSensorData = async (data) => {
    try {
      const response = await api.post("/sensor", data);
      // Assuming the API returns the new sensor data, you might want to add it to your local state
      // If your useSensorData hook manages this, you might call a function from there
      // For now, let's just log it.
      console.log("Sensor data added:", response.data);
      // You might want to refetch the sensor data here or update the state directly
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