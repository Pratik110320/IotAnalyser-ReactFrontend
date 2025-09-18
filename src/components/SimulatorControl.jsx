import { Box, Heading, Button, HStack, Text } from "@chakra-ui/react";
import { useWebSocket } from "../contexts/WebSocketContext";

const SimulatorControl = () => {
    const { simulatorStatus, startSimulator, stopSimulator } = useWebSocket();
  return (
    <Box bg="brand.800" p={4} borderRadius="lg">
      <Heading as="h3" size="lg" mb={4}>Simulator Control</Heading>
      <HStack>
        <Button onClick={startSimulator} colorScheme="green" isDisabled={simulatorStatus.isRunning}>Start</Button>
        <Button onClick={stopSimulator} colorScheme="red" isDisabled={!simulatorStatus.isRunning}>Stop</Button>
      </HStack>
        <Text mt={4}>Status: {simulatorStatus.isRunning ? 'Running' : 'Stopped'}</Text>
    </Box>
  );
};

export default SimulatorControl;
