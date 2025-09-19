import React, { useMemo } from 'react';
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { useSensorData } from '../hooks/useSensorData'; // Assuming useSensorData is in its own file or App.js
import SensorDataTable from '../components/SensorDataTable'; // Reuse the existing component
import { useAuth } from '../contexts/AuthContext'; // Assuming AuthContext is in its own file or App.js

const AnomaliesPage = () => {
  const { sensorData } = useSensorData();
  const { token } = useAuth();

  const anomalyData = useMemo(() => sensorData.filter(d => d.anomaly), [sensorData]);

  if (!token) {
    return (
      <Flex justify="center" align="center" h="50vh">
        <Text>Please log in to view anomalies.</Text>
      </Flex>
    );
  }

  return (
    <Box p={8}>
      <Heading as="h2" size="2xl" mb={8}>
        Anomalous Sensor Data
      </Heading>
      <SensorDataTable sensorData={anomalyData} />
    </Box>
  );
};

export default AnomaliesPage;