import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import DeviceStatus from "../components/DeviceStatus";
import RealTimeChart from "../components/RealTimeChart";
import SimulatorControl from "../components/SimulatorControl";
import StatCard from "../components/StatCard";
import { useSensorData } from "../hooks/useSensorData";
import { useDevices } from "../hooks/useDevices";
import { FiCpu, FiAlertTriangle, FiActivity } from "react-icons/fi";
import Alerts from '../components/Alerts';
import WeatherCard from '../components/WeatherCard';
const DashboardPage = () => {
  const { sensorData, anomalies } = useSensorData();
  const { devices } = useDevices();

  return (
    <Box p={8} bg="brand.900" minH="100vh" color="white">
      <Heading as="h2" size="2xl" mb={8}>
        Dashboard
      </Heading>
      <Grid templateColumns="repeat(12, 1fr)" gap={8}>
        <GridItem colSpan={{ base: 12, md: 4 }}>
            <StatCard icon={FiCpu} label="Active Devices" value={devices.length} />
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 4 }}>
            <StatCard icon={FiAlertTriangle} label="Anomalies" value={anomalies} />
        </GridItem>
         <GridItem colSpan={{ base: 12, md: 4 }}>
            <StatCard icon={FiActivity} label="Total Readings" value={sensorData.length} />
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 8 }}>
          <RealTimeChart sensorData={sensorData} />
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 4 }}>
          <DeviceStatus devices={devices} />
          <SimulatorControl />
          <Alerts />
          <WeatherCard />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DashboardPage;