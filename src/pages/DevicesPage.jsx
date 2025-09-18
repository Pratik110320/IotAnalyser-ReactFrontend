import { Box, Button, Heading } from "@chakra-ui/react";
import { useDevices } from "../hooks/useDevices";
import DeviceTable from "../components/DeviceTable";
import DeviceForm from "../components/DeviceForm";
import { useState } from "react";

const DevicesPage = () => {
  const { devices, addDevice, updateDevice, deleteDevice } = useDevices();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleEdit = (device) => {
    setSelectedDevice(device);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedDevice(null);
    setIsFormOpen(false);
  };

  return (
    <Box p={8} bg="brand.900" minH="100vh" color="white">
      <Heading as="h2" size="2xl" mb={8}>
        Device Management
      </Heading>
      <Button onClick={() => setIsFormOpen(true)} colorScheme="blue" mb={8}>
        Add Device
      </Button>
      <DeviceTable devices={devices} onEdit={handleEdit} onDelete={deleteDevice} />
      <DeviceForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={selectedDevice ? updateDevice : addDevice}
        device={selectedDevice}
      />
    </Box>
  );
};

export default DevicesPage;
