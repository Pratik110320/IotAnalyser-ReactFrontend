// src/components/SensorDataTable.jsx
import React from "react";
import { Table, Tag } from "antd";
import "./SensorDataTable.css"; // contains the fade animation CSS shown below

// columns depends on sensorData shape
const columns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Device ID", dataIndex: "deviceId", key: "deviceId" },
  { title: "Type", dataIndex: "sensorType", key: "sensorType" },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
    render: (v) => (typeof v === "number" ? v.toFixed(2) : v),
  },
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
    render: (t) => (t ? new Date(t).toLocaleString() : ""),
  },
  {
    title: "Anomaly",
    dataIndex: "anomaly",
    key: "anomaly",
    render: (a) => (a ? <Tag color="red">Yes</Tag> : <Tag color="green">No</Tag>),
  },
];

const SensorDataTable = ({ sensorData = [] }) => {
  const dataSource = sensorData.map((s, i) => ({
    key: s.id ?? s._id ?? i,
    ...s,
    shouldAnimate: i === 0, // first row highlight
  }));

  return (
    <div className="sensor-table-card">
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10 }}
        size="small"
        bordered
        rowClassName={(record) => (record.shouldAnimate ? "animated-row" : "")}
      />
    </div>
  );
};

export default SensorDataTable;
