// src/pages/LoginPage.jsx

import { Card, Typography, Alert } from "antd";
import { useLocation, Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";
import { LoginOutlined } from '@ant-design/icons';

const { Title } = Typography;

const LoginPage = () => {
    const { login } = useAuth();
    const location = useLocation();
    const message = location.state?.message;

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <Card style={{ width: 400 }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
                    <LoginOutlined /> Login
                </Title>
                {message && <Alert message={message} type="info" showIcon style={{ marginBottom: 24 }} />}
                <AuthForm isLogin onSubmit={login} />
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                    Not registered yet? <Link to="/register">Register now</Link>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;