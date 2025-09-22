import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const AuthForm = ({ isLogin, onSubmit }) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const success = await onSubmit(values);
    if (success && isLogin) {
      navigate("/dashboard");
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Email!', type: 'email' }]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          {isLogin ? "Login" : "Register"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AuthForm;
