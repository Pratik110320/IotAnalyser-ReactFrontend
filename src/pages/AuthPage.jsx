import { Card, Typography, Tabs, Alert } from "antd";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { useState } from "react";

const { Title } = Typography;

const AuthPage = () => {
    const { login, register } = useAuth();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('login');

    const handleRegister = async (credentials) => {
      const success = await register(credentials);
      if (success) {
        setActiveTab('login'); // Switch to login tab on successful registration
      }
    };

    const items = [
        {
            label: (
                <span>
                    <LoginOutlined />
                    Login
                </span>
            ),
            key: 'login',
            children: <AuthForm isLogin onSubmit={login} />,
        },
        {
            label: (
                <span>
                    <UserAddOutlined />
                    Register
                </span>
            ),
            key: 'register',
            children: <AuthForm onSubmit={handleRegister} />,
        },
    ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh'}}>
        <Card style={{ width: 400 }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
                IoT Analyser
            </Title>
            {location.state?.fromLanding && <Alert message="Please log in to view the features of the app." type="info" showIcon style={{marginBottom: 24}} />}
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab} 
              items={items} 
              centered
            />
        </Card>
    </div>
  );
};

export default AuthPage;