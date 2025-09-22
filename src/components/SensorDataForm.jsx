import { Modal, Form, Input, InputNumber } from "antd";
import { useEffect } from "react";

const SensorDataForm = ({ isOpen, onClose, onSubmit }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (!isOpen) {
            form.resetFields();
        }
    }, [isOpen, form]);

    const handleOk = () => {
        form
            .validateFields()
            .then((values) => {
                onSubmit(values);
                onClose();
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

  return (
    <Modal
      title="Add Sensor Data"
      open={isOpen}
      onOk={handleOk}
      onCancel={onClose}
      okText="Save"
    >
      <Form form={form} layout="vertical" name="sensor_data_form">
        <Form.Item
          name="deviceId"
          label="Device ID"
          rules={[{ required: true, message: 'Please input the Device ID!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="sensorType"
          label="Sensor Type"
          rules={[{ required: true, message: 'Please input the Sensor Type!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="value"
          label="Value"
          rules={[{ required: true, message: 'Please input the value!' }]}
        >
          <InputNumber style={{ width: '100%' }}/>
        </Form.Item>
        <Form.Item
          name="unit"
          label="Unit"
          rules={[{ required: true, message: 'Please input the unit!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SensorDataForm;
