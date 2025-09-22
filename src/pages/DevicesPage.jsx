import { Button, Typography } from "antd";
import { useDevices } from "../hooks/useDevices";
import DeviceTable from "../components/DeviceTable";
import DeviceForm from "../components/DeviceForm";
import { useState } from "react";
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const DevicesPage = () => {
  const { devices, addDevice, updateDevice, deleteDevice } = useDevices();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleEdit = (device) => {
    setSelectedDevice(device);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setSelectedDevice(null);
    setIsFormOpen(false);
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Device Management
      </Title>
      <Button 
        type="primary" 
        icon={<PlusOutlined />} 
        onClick={() => setIsFormOpen(true)} 
        style={{ marginBottom: '24px' }}
      >
        Add Device
      </Button>
      <DeviceTable devices={devices} onEdit={handleEdit} onDelete={deleteDevice} />
      <DeviceForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={selectedDevice ? updateDevice : addDevice}
        device={selectedDevice}
      />
    </div>
  );
};

export default DevicesPage;
