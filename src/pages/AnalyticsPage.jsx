import { Box, Heading } from "@chakra-ui/react";
import { useAnalytics } from "../hooks/useAnalytics";
import AnalyticsChart from "../components/AnalyticsChart";

const AnalyticsPage = () => {
  const { analyticsData } = useAnalytics();

  return (
    <Box p={8} bg="brand.900" minH="100vh" color="white">
      <Heading as="h2" size="2xl" mb={8}>
        Analytics
      </Heading>
      <AnalyticsChart data={analyticsData} />
    </Box>
  );
};

export default AnalyticsPage;
