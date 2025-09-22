// src/pages/RegisterPage.jsx

import { Card, Typography } from "antd";
import { Link } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../contexts/AuthContext";
import { UserAddOutlined } from '@ant-design/icons';

const { Title } = Typography;

const RegisterPage = () => {
    const { register } = useAuth();

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <Card style={{ width: 400 }}>
                <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>
                    <UserAddOutlined /> Register
                </Title>
                <AuthForm onSubmit={register} />
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                    Already signed in? <Link to="/login">Log in now</Link>
                </div>
            </Card>
        </div>
    );
};

export default RegisterPage;