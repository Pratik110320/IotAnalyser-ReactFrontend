import React, { useMemo } from 'react';
import { Box, Heading, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { FiThermometer, FiDroplet } from "react-icons/fi";
import { useSensorData } from '../hooks/useSensorData';

const WeatherCard = () => {
  const { sensorData } = useSensorData();

  const weatherData = useMemo(() => {
    const temp = sensorData.slice().reverse().find(d => d.deviceId === 1 && d.sensorType === 'TEMPERATURE');
    const humidity = sensorData.slice().reverse().find(d => d.deviceId === 1 && d.sensorType === 'HUMIDITY');
    return { temp, humidity };
  }, [sensorData]);

  return (
    <Box bg="brand.800" p={4} borderRadius="lg" mt={8}>
      <Heading as="h3" size="lg" mb={4}>Current Weather (Nagpur)</Heading>
      <VStack align="stretch" spacing={2}>
        {weatherData.temp ? (
          <HStack>
            <Icon as={FiThermometer} color="orange.300" />
            <Text>Temperature: {weatherData.temp.value.toFixed(1)}°C</Text>
          </HStack>
        ) : (
          <Text color="gray.400">No temperature data.</Text>
        )}
        {weatherData.humidity ? (
          <HStack>
            <Icon as={FiDroplet} color="blue.300" />
            <Text>Humidity: {weatherData.humidity.value.toFixed(1)}%</Text>
          </HStack>
        ) : (
          <Text color="gray.400">No humidity data.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default WeatherCard;