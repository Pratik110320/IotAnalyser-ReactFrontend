import React from 'react';
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useWebSocket } from '../contexts/WebSocketContext'; // Assuming WebSocketContext is exported from App.js or its own file

const Alerts = () => {
  const { alerts } = useWebSocket();

  return (
    <Box bg="brand.800" p={4} borderRadius="lg" mt={8}>
      <Heading as="h3" size="lg" mb={4}>Recent Alerts</Heading>
      <VStack align="stretch" spacing={2}>
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <Text key={index} fontSize="sm" color="yellow.300">
              {alert}
            </Text>
          ))
        ) : (
          <Text color="gray.400">No recent alerts.</Text>
        )}
      </VStack>
    </Box>
  );
};

export default Alerts;