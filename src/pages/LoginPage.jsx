// Enhanced LoginPage.jsx with Modern Design
import React, { useState } from 'react';
import { Card, Typography, Alert, Form, Input, Button, Divider } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { 
  MailOutlined, 
  LockOutlined, 
  LoginOutlined, 
  EyeTwoTone, 
  EyeInvisibleOutlined,
  GoogleOutlined,
  GithubOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

export const LoginPage = () => {
    const { login } = useAuth();
    const location = useLocation();
    const message = location.state?.message;
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await login(values);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '20px',
            position: 'relative'
        }}>
            <style jsx>{`
                .auth-container {
                    position: relative;
                    width: 100%;
                    max-width: 420px;
                    z-index: 10;
                }

                .auth-card {
                    background: rgba(30, 41, 59, 0.95) !important;
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 24px !important;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
                    overflow: hidden;
                    position: relative;
                }

                .auth-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), transparent);
                }

                .auth-header {
                    text-align: center;
                    margin-bottom: 32px;
                    position: relative;
                }

                .auth-title {
                    color: #f8fafc !important;
                    font-size: 2rem !important;
                    font-weight: 800 !important;
                    margin-bottom: 8px !important;
                    background: linear-gradient(135deg, #f8fafc, #6366f1);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .auth-subtitle {
                    color: #94a3b8 !important;
                    font-size: 1rem !important;
                    margin: 0 !important;
                }

                .auth-form .ant-form-item-label > label {
                    color: #cbd5e1 !important;
                    font-weight: 500 !important;
                }

                .auth-form .ant-input-affix-wrapper {
                    background: rgba(51, 65, 85, 0.5) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 12px !important;
                    padding: 12px 16px !important;
                    transition: all 0.3s ease !important;
                }

                .auth-form .ant-input-affix-wrapper:hover,
                .auth-form .ant-input-affix-wrapper-focused {
                    border-color: #6366f1 !important;
                    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
                    background: rgba(51, 65, 85, 0.8) !important;
                }

                .auth-form .ant-input {
                    background: transparent !important;
                    border: none !important;
                    color: #f8fafc !important;
                    font-size: 15px !important;
                }

                .auth-form .ant-input::placeholder {
                    color: #94a3b8 !important;
                }

                .auth-form .anticon {
                    color: #6b7280 !important;
                }

                .auth-btn-primary {
                    width: 100% !important;
                    height: 48px !important;
                    border-radius: 12px !important;
                    background: linear-gradient(135deg, #6366f1, #4f46e5) !important;
                    border: none !important;
                    font-weight: 600 !important;
                    font-size: 15px !important;
                    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4) !important;
                    transition: all 0.3s ease !important;
                    position: relative !important;
                    overflow: hidden !important;
                }

                .auth-btn-primary::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s;
                }

                .auth-btn-primary:hover::before {
                    left: 100%;
                }

                .auth-btn-primary:hover {
                    transform: translateY(-1px) !important;
                    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.5) !important;
                }

                .social-btn {
                    width: 100% !important;
                    height: 44px !important;
                    border-radius: 12px !important;
                    background: rgba(255, 255, 255, 0.05) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    color: #cbd5e1 !important;
                    margin-bottom: 12px !important;
                    transition: all 0.3s ease !important;
                }

                .social-btn:hover {
                    background: rgba(255, 255, 255, 0.1) !important;
                    border-color: #6366f1 !important;
                    color: #6366f1 !important;
                    transform: translateY(-1px) !important;
                }

                .divider-text {
                    color: #94a3b8 !important;
                    font-size: 14px !important;
                }

                .auth-link {
                    color: #6366f1 !important;
                    text-decoration: none !important;
                    font-weight: 500 !important;
                    transition: all 0.3s ease !important;
                }

                .auth-link:hover {
                    color: #4f46e5 !important;
                    text-decoration: underline !important;
                }

                .auth-footer {
                    text-align: center;
                    margin-top: 24px;
                    padding-top: 24px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                /* Background Animation */
                .bg-shapes {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                }

                .shape {
                    position: absolute;
                    border-radius: 50%;
                    opacity: 0.1;
                    animation: float 20s infinite linear;
                }

                .shape:nth-child(1) {
                    width: 200px;
                    height: 200px;
                    background: linear-gradient(45deg, #6366f1, #06b6d4);
                    top: 10%;
                    left: 10%;
                    animation-delay: 0s;
                }

                .shape:nth-child(2) {
                    width: 150px;
                    height: 150px;
                    background: linear-gradient(45deg, #ec4899, #8b5cf6);
                    top: 60%;
                    right: 10%;
                    animation-delay: 5s;
                }

                .shape:nth-child(3) {
                    width: 100px;
                    height: 100px;
                    background: linear-gradient(45deg, #10b981, #06b6d4);
                    bottom: 20%;
                    left: 20%;
                    animation-delay: 10s;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(180deg);
                    }
                }

                @media (max-width: 480px) {
                    .auth-container {
                        max-width: 100%;
                        padding: 0 16px;
                    }
                    
                    .auth-title {
                        font-size: 1.75rem !important;
                    }
                }
            `}</style>

            {/* Background Shapes */}
            <div className="bg-shapes">
                <div className="shape"></div>
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <div className="auth-container">
                <Card className="auth-card" bodyStyle={{ padding: '48px 32px 32px' }}>
                    <div className="auth-header">
                        <Title className="auth-title" level={2}>
                            <LoginOutlined style={{ marginRight: 12, color: '#6366f1' }} />
                            Welcome Back
                        </Title>
                        <Text className="auth-subtitle">
                            Sign in to your IoT Analyser account
                        </Text>
                    </div>

                    {message && (
                        <Alert 
                            message={message} 
                            type="info" 
                            showIcon 
                            style={{ 
                                marginBottom: 24,
                                background: 'rgba(99, 102, 241, 0.1)',
                                border: '1px solid rgba(99, 102, 241, 0.2)',
                                borderRadius: '12px'
                            }} 
                        />
                    )}

                    <Form
                        form={form}
                        className="auth-form"
                        layout="vertical"
                        onFinish={handleSubmit}
                        size="large"
                    >
                        <Form.Item
                            label="Email Address"
                            name="username"
                            rules={[
                                { required: true, message: 'Please enter your email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined />}
                                placeholder="Enter your email address"
                                autoComplete="email"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please enter your password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Enter your password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                autoComplete="current-password"
                            />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ color: '#94a3b8', fontSize: '14px' }}>
                                    <input type="checkbox" style={{ marginRight: 8 }} />
                                    Remember me
                                </Text>
                                <Link to="/forgot-password" className="auth-link" style={{ fontSize: '14px' }}>
                                    Forgot password?
                                </Link>
                            </div>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="auth-btn-primary"
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </Form.Item>
                    </Form>

                    <Divider>
                        <span className="divider-text">or continue with</span>
                    </Divider>

                    <div style={{ marginBottom: 24 }}>
                        <Button className="social-btn" icon={<GoogleOutlined />}>
                            Continue with Google
                        </Button>
                        <Button className="social-btn" icon={<GithubOutlined />}>
                            Continue with GitHub
                        </Button>
                    </div>

                    <div className="auth-footer">
                        <Text style={{ color: '#94a3b8' }}>
                            Don't have an account?{' '}
                            <Link to="/register" className="auth-link">
                                Create account
                            </Link>
                        </Text>
                    </div>
                </Card>
            </div>
        </div>
    );
};
