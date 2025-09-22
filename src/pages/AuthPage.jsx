import { Card, Typography, Tabs, Alert } from "antd";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';

const { Title } = Typography;

const AuthPage = () => {
    const { login, register } = useAuth();
    const location = useLocation();

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
            {location.state?.fromLanding && <Alert message="Please log in to view the features of the app." type="info" showIcon style={{marginBottom: 24}} />}
            <Tabs defaultActiveKey="login" items={items} centered/>
        </Card>
    </div>
  );
};

export default AuthPage;
