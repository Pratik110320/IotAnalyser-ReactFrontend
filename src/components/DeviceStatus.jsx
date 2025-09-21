import { Box, Heading, VStack, HStack, Text, Circle } from "@chakra-ui/react";

const DeviceStatus = ({ devices }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "ONLINE":
        return "green.500";
      case "OFFLINE":
        return "yellow.500";
      default:
        return "red.500";
    }
  };

  return (
    <Box bg="brand.800" p={4} borderRadius="lg" mb={8}>
      <Heading as="h3" size="lg" mb={4}>Device Status</Heading>
      <VStack align="stretch" spacing={4}>
        {devices.map((device) => (
          <HStack key={device.deviceId} justify="space-between">
            <Text>{device.deviceName}</Text>
            <Circle size="10px" bg={getStatusColor(device.status)} />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default DeviceStatus;