// src/components/RealTimeChart.jsx
import { Box } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RealTimeChart = ({ sensorData }) => {
    const chartData = {
        labels: sensorData.slice(-20).map(d => new Date(d.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Real-time Temperature',
                data: sensorData.filter(d => d.sensorType === 'TEMPERATURE').slice(-20).map(d => d.value),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Real-time Humidity',
                data: sensorData.filter(d => d.sensorType === 'HUMIDITY').slice(-20).map(d => d.value),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    }
  return (
    <Box bg="brand.800" p={4} borderRadius="lg">
      <Line data={chartData} />
    </Box>
  );
};

export default RealTimeChart;