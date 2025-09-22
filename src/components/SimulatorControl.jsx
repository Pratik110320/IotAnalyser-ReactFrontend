import { Card, Button, Space, Typography, Tag } from "antd";
import { useWebSocket } from "../contexts/WebSocketContext";
import { PlayCircleOutlined, StopOutlined } from '@ant-design/icons';

const { Text } = Typography;

const SimulatorControl = () => {
    const { simulatorStatus, startSimulator, stopSimulator } = useWebSocket();

  return (
    <Card title="Simulator Control" bordered={false}>
      <Space>
        <Button icon={<PlayCircleOutlined/>} type="primary" onClick={startSimulator} disabled={simulatorStatus.isRunning}>Start</Button>
        <Button icon={<StopOutlined/>} danger onClick={stopSimulator} disabled={!simulatorStatus.isRunning}>Stop</Button>
      </Space>
      <div style={{ marginTop: 16 }}>
        <Text>Status: </Text>
        <Tag color={simulatorStatus.isRunning ? 'green' : 'red'}>
            {simulatorStatus.isRunning ? 'Running' : 'Stopped'}
        </Tag>
      </div>
    </Card>
  );
};

export default SimulatorControl;