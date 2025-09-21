import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const DeviceForm = ({ isOpen, onClose, onSubmit, device }) => {
  const [formData, setFormData] = useState({
    deviceName: "",
    deviceType: "",
    status: "ONLINE",
  });

  useEffect(() => {
    if (device) {
      setFormData(device);
    } else {
      setFormData({ deviceName: "", deviceType: "", status: "ONLINE" });
    }
  }, [device]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const dataToSubmit = { ...formData };
  if (!device) {
    delete dataToSubmit.status;
  }
  onSubmit(dataToSubmit);
  onClose();
};

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit} bg="brand.800" color="white">
        <ModalHeader>{device ? "Edit Device" : "Add Device"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Device Name</FormLabel>
            <Input name="deviceName" value={formData.deviceName} onChange={handleChange} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Device Type</FormLabel>
            <Input name="deviceType" value={formData.deviceType} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select name="status" value={formData.status} onChange={handleChange}>
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
              <option value="DISCONNECTED">Disconnected</option>
              <option value="UNKNOWN">Unknown</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit">
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeviceForm;
