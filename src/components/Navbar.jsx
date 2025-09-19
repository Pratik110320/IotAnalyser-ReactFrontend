import { Box, Flex, Link, Button, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" p={6} bg="brand.800" color="white">
      <Flex align="center" mr={5}>
        <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
          IoT Analyser
        </Link>
      </Flex>

      {user && (
        <HStack spacing={8}>
          <Link as={RouterLink} to="/dashboard">Dashboard</Link>
          <Link as={RouterLink} to="/devices">Devices</Link>
          <Link as={RouterLink} to="/sensors">Sensors</Link>
          <Link as={RouterLink} to="/anomalies">Anomalies</Link>
          <Link as={RouterLink} to="/analytics">Analytics</Link>
        </HStack>
      )}

      <Box>
        {user ? (
          <Button as={RouterLink} to="/" onClick={logout} colorScheme="purple">Logout</Button>
        ) : (
          <Button as={RouterLink} to="/auth" colorScheme="blue">
            Login
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;