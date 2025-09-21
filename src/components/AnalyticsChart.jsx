// src/components/AnalyticsChart.jsx
import { Box } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AnalyticsChart = ({ data }) => {
    const chartData = {
        labels: data.map(d => new Date(d.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Temperature',
                data: data.map(d => d.TEMPERATURE?.average),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Humidity',
                data: data.map(d => d.HUMIDITY?.average),
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

export default AnalyticsChart;