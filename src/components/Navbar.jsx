import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      p={6}
      bg="brand.800"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
          IoT Analyser
        </Link>
      </Flex>

      <Box>
        <Link as={RouterLink} to="/dashboard" mr={4}>
          Dashboard
        </Link>
        <Link as={RouterLink} to="/devices" mr={4}>
          Devices
        </Link>
        <Link as={RouterLink} to="/sensors" mr={4}>
          Sensors
        </Link>
        <Link as={RouterLink} to="/analytics" mr={4}>
          Analytics
        </Link>
      </Box>

      <Box>
        {user ? (
          <Button onClick={logout} colorScheme="red">Logout</Button>
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
