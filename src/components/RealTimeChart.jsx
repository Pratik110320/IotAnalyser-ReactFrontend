import { Card } from "antd";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RealTimeChart = ({ sensorData }) => {
    const latestData = sensorData.slice(0, 20).reverse();
    const chartData = {
        labels: latestData.map(d => new Date(d.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Real-time Temperature',
                data: latestData.filter(d => d.sensorType === 'TEMPERATURE').map(d => d.value),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Real-time Humidity',
                data: latestData.filter(d => d.sensorType === 'HUMIDITY').map(d => d.value),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ]
    }
  return (
    <Card title="Real-time Sensor Data" bordered={false}>
      <Line data={chartData} />
    </Card>
  );
};

export default RealTimeChart;

