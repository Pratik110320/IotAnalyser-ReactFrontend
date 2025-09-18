import { Box, Heading } from "@chakra-ui/react";
import { useSensorData } from "../hooks/useSensorData";
import SensorDataTable from "../components/SensorDataTable";

const SensorDataPage = () => {
  const { sensorData } = useSensorData();

  return (
    <Box p={8} bg="brand.900" minH="100vh" color="white">
      <Heading as="h2" size="2xl" mb={8}>
        Sensor Data
      </Heading>
      <SensorDataTable sensorData={sensorData} />
    </Box>
  );
};

export default SensorDataPage;
