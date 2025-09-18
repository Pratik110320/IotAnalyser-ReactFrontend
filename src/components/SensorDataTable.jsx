import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const SensorDataTable = ({ sensorData }) => {
  return (
    <Table variant="simple" colorScheme="whiteAlpha">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Device ID</Th>
          <Th>Type</Th>
          <Th>Value</Th>
          <Th>Timestamp</Th>
          <Th>Anomaly</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sensorData.map((data) => (
          <Tr key={data.id}>
            <Td>{data.id}</Td>
            <Td>{data.deviceId}</Td>
            <Td>{data.sensorType}</Td>
            <Td>{data.value}</Td>
            <Td>{new Date(data.timestamp).toLocaleString()}</Td>
            <Td>{data.anomaly ? "Yes" : "No"}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default SensorDataTable;
