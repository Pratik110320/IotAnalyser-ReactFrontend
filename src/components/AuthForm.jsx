import { Button, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const AuthForm = ({ isLogin, onSubmit, loading }) => {

  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <Form onFinish={onFinish} layout="vertical" size="large">
      <Form.Item
        name="email"
        label="Email Address"
        rules={[{ required: true, message: 'Please input your Email!', type: 'email' }]}
      >
        <Input prefix={<MailOutlined />} placeholder="email@example.com" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>
      {!isLogin && (
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
          </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }} loading={loading}>
          {isLogin ? "Login" : "Register"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AuthForm;
