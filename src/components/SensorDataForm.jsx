import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

const SensorDataForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    deviceId: "",
    sensorType: "",
    value: "",
    unit: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit} bg="brand.800" color="white">
        <ModalHeader>Add Sensor Data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Device ID</FormLabel>
            <Input
              name="deviceId"
              value={formData.deviceId}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Sensor Type</FormLabel>
            <Input
              name="sensorType"
              value={formData.sensorType}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Value</FormLabel>
            <Input
              name="value"
              type="number"
              value={formData.value}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Unit</FormLabel>
            <Input name="unit" value={formData.unit} onChange={handleChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit">
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SensorDataForm;