import { Card, Typography, Tabs } from "antd";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react";

const { Title } = Typography;

const AuthPage = () => {
    const { login, register } = useAuth();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.state?.defaultTab || 'login');

    useEffect(() => {
        if (location.state?.defaultTab) {
            setActiveTab(location.state.defaultTab);
        }
    }, [location.state]);

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
            children: <AuthForm onSubmit={register} />,
        },
    ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh'}}>
        <Card style={{ width: 400 }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
                IoT Analyser
            </Title>
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
