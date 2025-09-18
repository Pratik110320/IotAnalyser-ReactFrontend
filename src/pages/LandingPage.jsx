import { Box, Button, Flex, Heading, Text, VStack, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiArrowRight, FiCpu, FiDatabase, FiTrendingUp } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";

const MotionBox = motion(Box);

const LandingPage = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bgGradient="linear(to-br, brand.900, brand.800)"
      color="white"
      p={8}
    >
      <VStack spacing={8} textAlign="center" maxW="3xl">
        <MotionBox
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading as="h1" size="4xl" fontWeight="extrabold">
            IoT Analyser
          </Heading>
        </MotionBox>
        <MotionBox
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Text fontSize="xl">
            A real-time data processing pipeline for IoT devices. Register, ingest, and analyze sensor data with our intuitive dashboard.
          </Text>
        </MotionBox>
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            as={RouterLink}
            to="/dashboard"
            size="lg"
            bgGradient="linear(to-r, blue.400, purple.500)"
            _hover={{ bgGradient: "linear(to-r, blue.500, purple.600)" }}
            rightIcon={<FiArrowRight />}
          >
            Go to Dashboard
          </Button>
        </MotionBox>
      </VStack>

      <Flex mt={20} direction={{ base: "column", md: "row" }} spacing={10}>
        <Feature icon={FiCpu} title="Device Management" description="Easily register and manage your IoT devices." />
        <Feature icon={FiDatabase} title="Real-time Data" description="Ingest and visualize sensor data in real-time." />
        <Feature icon={FiTrendingUp} title="Analytics" description="Gain insights with powerful data analytics." />
      </Flex>
    </Flex>
  );
};

const Feature = ({ icon, title, description }) => (
  <VStack spacing={4} p={8} bg="brand.800" borderRadius="lg" m={4}>
    <Icon as={icon} w={10} h={10} />
    <Heading as="h3" size="md">{title}</Heading>
    <Text>{description}</Text>
  </VStack>
);


export default LandingPage;
