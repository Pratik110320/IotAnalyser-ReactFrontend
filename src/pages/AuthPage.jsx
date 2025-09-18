import { Box, Heading, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";

const AuthPage = () => {
    const { login, register } = useAuth();
  return (
    <Box p={8} bg="brand.900" minH="100vh" color="white" display="flex" alignItems="center" justifyContent="center">
        <Box w="md" bg="brand.800" p={8} borderRadius="lg">
      <Heading as="h2" size="xl" mb={8} textAlign="center">
        Account
      </Heading>
      <Tabs isFitted variant="enclosed">
          <TabList>
              <Tab>Login</Tab>
              <Tab>Register</Tab>
          </TabList>
          <TabPanels>
              <TabPanel>
                  <AuthForm isLogin onSubmit={login} />
              </TabPanel>
              <TabPanel>
                  <AuthForm onSubmit={register} />
              </TabPanel>
          </TabPanels>
      </Tabs>
      </Box>
    </Box>
  );
};

export default AuthPage;
