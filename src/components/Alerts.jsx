import React from 'react';
import { Card, List, Typography } from "antd";
import { useWebSocket } from '../contexts/WebSocketContext';
import { WarningOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Alerts = () => {
  const { alerts } = useWebSocket();

  return (
    <Card title="Recent Alerts" bordered={false}>
      <List
        dataSource={alerts}
        renderItem={(alert, index) => (
          <List.Item>
            <Text type="warning">
              <WarningOutlined style={{ marginRight: 8 }} />
              {alert}
            </Text>
          </List.Item>
        )}
        locale={{ emptyText: "No recent alerts."}}
      />
    </Card>
  );
};

export default Alerts;
