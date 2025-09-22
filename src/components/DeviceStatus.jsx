import { Card, List, Badge } from "antd";

const getStatusType = (status) => {
    switch (status) {
      case "ONLINE":
        return "success";
      case "OFFLINE":
        return "warning";
      default:
        return "error";
    }
}

const DeviceStatus = ({ devices }) => {
  return (
    <Card title="Device Status" bordered={false}>
      <List
        dataSource={devices}
        renderItem={(device) => (
          <List.Item>
            <List.Item.Meta
              title={device.deviceName}
              description={device.deviceType}
            />
            <Badge status={getStatusType(device.status)} text={device.status} />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default DeviceStatus;
