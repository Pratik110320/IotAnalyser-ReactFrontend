import { Card } from "antd";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AnalyticsChart = ({ data }) => {
    const chartData = {
        labels: data.map(d => new Date(d.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Average Temperature (°C)',
                data: data.map(d => d.stats.TEMPERATURE?.average),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.1,
            },
            {
                label: 'Average Humidity (%)',
                data: data.map(d => d.stats.HUMIDITY?.average),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                tension: 0.1,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '7-Day Sensor Averages',
            },
        },
        scales: {
            y: {
                beginAtZero: false,
            }
        }
    };

  return (
    <Card bordered={false}>
      <Line data={chartData} options={options} />
    </Card>
  );
};

export default AnalyticsChart;
