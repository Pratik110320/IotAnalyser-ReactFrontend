import { Box, Heading, Tabs, TabList, Tab, TabPanels, TabPanel, Text, Link } from "@chakra-ui/react";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const AuthPage = () => {
    const { login, register } = useAuth();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(false);

  return (
    <Box p={8} bg="brand.900" minH="100vh" color="white" display="flex" alignItems="center" justifyContent="center">
        <Box w="md" bg="brand.800" p={8} borderRadius="lg">
            {location.state?.fromLanding && <Text textAlign="center" mb={4}>Please log in to view the features of the app.</Text>}
      <Heading as="h2" size="xl" mb={8} textAlign="center">
        {isLogin ? 'Login' : 'Register'}
      </Heading>
      {isLogin ? <AuthForm isLogin onSubmit={login} /> : <AuthForm onSubmit={register} />}
      <Text textAlign="center" mt={4}>
        {isLogin ? "Don't have an account? " : "Already signed in? "}
        <Link color="blue.400" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register now" : "Log in now"}
        </Link>
      </Text>
      </Box>
    </Box>
  );
};

export default AuthPage;