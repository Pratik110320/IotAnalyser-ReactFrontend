import React, { useMemo } from 'react';
import { Card, List, Typography } from "antd";
import { FiThermometer, FiDroplet } from "react-icons/fi";
import { useSensorData } from '../hooks/useSensorData';

const { Text } = Typography;

const WeatherCard = () => {
  const { sensorData } = useSensorData();

  const weatherData = useMemo(() => {
    const temp = sensorData.slice().reverse().find(d => d.deviceId === 1 && d.sensorType === 'TEMPERATURE');
    const humidity = sensorData.slice().reverse().find(d => d.deviceId === 1 && d.sensorType === 'HUMIDITY');
    return { temp, humidity };
  }, [sensorData]);

  const data = [];
  if (weatherData.temp) {
      data.push({
          icon: <FiThermometer color="#fa8c16" />,
          label: `Temperature: ${weatherData.temp.value.toFixed(1)}°C`
      })
  } else {
    data.push({
        icon: <FiThermometer color="#8c8c8c" />,
        label: `No temperature data.`
    })
  }

  if (weatherData.humidity) {
    data.push({
        icon: <FiDroplet color="#1890ff" />,
        label: `Humidity: ${weatherData.humidity.value.toFixed(1)}%`
    })
  } else {
    data.push({
        icon: <FiDroplet color="#8c8c8c" />,
        label: `No humidity data.`
    })
  }

  return (
    <Card title="Current Weather (Nagpur)" bordered={false}>
        <List
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    <Text>{item.icon} {item.label}</Text>
                </List.Item>
            )}
        />
    </Card>
  );
};

export default WeatherCard;
