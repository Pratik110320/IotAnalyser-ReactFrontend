import { Table, Thead, Tbody, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const DeviceTable = ({ devices, onEdit, onDelete }) => {
  return (
    <Table variant="simple" colorScheme="whiteAlpha">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Type</Th>
          <Th>Status</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {devices.map((device) => (
          <Tr key={device.deviceId}>
            <Td>{device.deviceId}</Td>
            <Td>{device.deviceName}</Td>
            <Td>{device.deviceType}</Td>
            <Td>{device.status}</Td>
            <Td>
              <IconButton icon={<FiEdit />} onClick={() => onEdit(device)} mr={2} />
              <IconButton icon={<FiTrash2 />} onClick={() => onDelete(device.deviceId)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DeviceTable;
