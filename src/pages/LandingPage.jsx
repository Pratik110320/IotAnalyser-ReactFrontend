import { Box, Button, Flex, Heading, Text, VStack, Icon, SimpleGrid, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiArrowRight, FiWifi, FiActivity, FiBarChart2 } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@chakra-ui/react";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const LandingPage = () => {
  const theme = useTheme();
  const gradientAnimation = `${theme.keyframes.gradient} 15s ease infinite`;

  return (
    <Box>
      <Flex
        as="section"
        direction="column"
        align="center"
        justify="center"
        minH="90vh"
        bgGradient="linear(to-r, blue.800, purple.900, brand.800)"
        backgroundSize="200% 200%"
        animation={gradientAnimation}
        color="white"
        p={8}
      >
        <VStack spacing={6} textAlign="center" maxW="3xl">
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading as="h1" size="4xl" fontWeight="extrabold" textShadow="2px 2px 4px rgba(0,0,0,0.3)">
              IoT Analyser
            </Heading>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Text fontSize="xl" maxW="2xl">
              Unlock the power of your IoT data. Real-time insights, anomaly detection, and powerful analytics at your fingertips.
            </Text>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <MotionButton
              as={RouterLink}
              to="/auth"
              size="lg"
              colorScheme="purple"
              rightIcon={<FiArrowRight />}
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}
            >
              Get Started
            </MotionButton>
          </MotionBox>
        </VStack>
      </Flex>

      <Container as="section" maxW="6xl" py={20}>
        <Heading as="h2" size="2xl" textAlign="center" mb={12}>
          Features
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={FiWifi}
            title="Real-time Connectivity"
            description="Connect and monitor your IoT devices in real-time with our robust WebSocket-based data pipeline."
          />
          <Feature
            icon={FiActivity}
            title="Live Anomaly Detection"
            description="Our intelligent algorithms analyze incoming data streams to detect and alert you to anomalies as they happen."
          />
          <Feature
            icon={FiBarChart2}
            title="Powerful Analytics"
            description="Visualize trends, track performance, and gain actionable insights with our comprehensive analytics dashboard."
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

const Feature = ({ icon, title, description }) => (
  <MotionBox
    p={8}
    bg="brand.800"
    borderRadius="lg"
    textAlign="center"
    whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0,0,0,0.5)" }}
    transition={{ duration: 0.3 }}
  >
    <Icon as={icon} w={12} h={12} color="purple.400" mb={4} />
    <Heading as="h3" size="lg" mb={4}>{title}</Heading>
    <Text color="gray.400">{description}</Text>
  </MotionBox>
);

export default LandingPage;