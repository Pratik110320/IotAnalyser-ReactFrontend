import { Box, Flex, Icon, Text } from "@chakra-ui/react";

const StatCard = ({ icon, label, value }) => {
  return (
    <Flex
      align="center"
      p={5}
      bg="brand.800"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Icon as={icon} w={10} h={10} color="blue.400" mr={4} />
      <Box>
        <Text fontSize="2xl" fontWeight="bold">{value}</Text>
        <Text fontSize="sm" color="gray.400">{label}</Text>
      </Box>
    </Flex>
  );
};

export default StatCard;
