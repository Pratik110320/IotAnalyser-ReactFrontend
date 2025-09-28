
import { Table, Button, Space, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const getStatusColor = (status) => {
  switch (status) {
    case "ONLINE":
      return "success";
    case "OFFLINE":
      return "warning";
    default:
      return "error";
  }
};

const DeviceTable = ({ devices, onEdit, onDelete }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "deviceId",
      key: "deviceId",
    },
    {
      title: "Name",
      dataIndex: "deviceName",
      key: "deviceName",
    },
    {
      title: "Type",
      dataIndex: "deviceType",
      key: "deviceType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => onDelete(record.deviceId)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={devices}
      rowKey="deviceId"
      bordered
      scroll={{ x: true }}
    />
  );
};

export default DeviceTable;