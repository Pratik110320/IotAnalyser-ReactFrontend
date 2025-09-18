import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" p={6} bg="brand.800" color="white" textAlign="center">
      <Text>&copy; {new Date().getFullYear()} IoT Analyser. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
