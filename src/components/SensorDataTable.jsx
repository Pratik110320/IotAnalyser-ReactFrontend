// ✅ Only import components you actually need from Chakra
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

// ✅ Import keyframes ONLY from Emotion
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { background-color: #4A5568; }
  to   { background-color: transparent; }
`;

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
        {sensorData.map((data, index) => (
          <Tr
            key={data.id}
            animation={index === sensorData.length - 1 ? `${fadeIn} 1s ease-out` : ""}
          >
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
