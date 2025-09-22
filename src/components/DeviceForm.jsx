import { Modal, Form, Input, Select } from "antd";
import { useEffect } from "react";

const { Option } = Select;

const DeviceForm = ({ isOpen, onClose, onSubmit, device }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (device) {
      form.setFieldsValue(device);
    } else {
      form.resetFields();
      form.setFieldsValue({ status: "ONLINE" });
    }
  }, [device, form, isOpen]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const dataToSubmit = { ...values };
        if (device) {
            dataToSubmit.deviceId = device.deviceId;
        }
        onSubmit(dataToSubmit);
        onClose();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={device ? "Edit Device" : "Add Device"}
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      okText="Save"
    >
      <Form form={form} layout="vertical" name="device_form">
        <Form.Item
          name="deviceName"
          label="Device Name"
          rules={[{ required: true, message: 'Please input the device name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="deviceType"
          label="Device Type"
          rules={[{ required: true, message: 'Please input the device type!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          initialValue="ONLINE"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="ONLINE">Online</Option>
            <Option value="OFFLINE">Offline</Option>
            <Option value="DISCONNECTED">Disconnected</Option>
            <Option value="UNKNOWN">Unknown</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DeviceForm;
