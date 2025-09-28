// Enhanced RegisterPage.jsx with Modern Design
import React, { useState } from 'react';
import { Card, Typography, Form, Input, Button, Divider, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { 
  MailOutlined, 
  LockOutlined, 
  UserAddOutlined, 
  EyeTwoTone, 
  EyeInvisibleOutlined,
  GoogleOutlined,
  GithubOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const RegisterPage = () => {
    const { register } = useAuth();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await register(values);
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
                    max-width: 460px;
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
                    line-height: 1.5;
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

                .password-strength {
                    margin-top: 8px;
                    padding: 12px;
                    background: rgba(51, 65, 85, 0.3);
                    border-radius: 8px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .strength-indicator {
                    display: flex;
                    gap: 4px;
                    margin-bottom: 8px;
                }

                .strength-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: rgba(107, 114, 128, 0.3);
                    transition: all 0.3s ease;
                }

                .strength-dot.active {
                    background: #10b981;
                    box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
                }

                .strength-requirements {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .requirement {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 12px;
                    color: #94a3b8;
                    transition: all 0.3s ease;
                }

                .requirement.met {
                    color: #10b981;
                }

                .requirement-icon {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: 1px solid #6b7280;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 8px;
                    transition: all 0.3s ease;
                }

                .requirement.met .requirement-icon {
                    background: #10b981;
                    border-color: #10b981;
                    color: white;
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

                .terms-checkbox .ant-checkbox-wrapper {
                    color: #94a3b8 !important;
                    font-size: 13px !important;
                    line-height: 1.5 !important;
                    align-items: flex-start !important;
                }

                .terms-checkbox .ant-checkbox {
                    margin-top: 2px !important;
                }

                .terms-checkbox .ant-checkbox-checked .ant-checkbox-inner {
                    background-color: #6366f1 !important;
                    border-color: #6366f1 !important;
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

                .features-list {
                    background: rgba(51, 65, 85, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    padding: 16px;
                    margin: 24px 0;
                }

                .feature-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 12px;
                    color: #cbd5e1;
                    font-size: 14px;
                }

                .feature-item:last-child {
                    margin-bottom: 0;
                }

                .feature-icon {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #6366f1, #06b6d4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 10px;
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
                    
                    .features-list {
                        margin: 16px 0;
                        padding: 12px;
                    }
                    
                    .feature-item {
                        font-size: 13px;
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
                            <UserAddOutlined style={{ marginRight: 12, color: '#6366f1' }} />
                            Create Account
                        </Title>
                        <Text className="auth-subtitle">
                            Join IoT Analyser and start monitoring your devices today
                        </Text>
                    </div>

                    {/* Features Preview */}
                    <div className="features-list">
                        <div className="feature-item">
                            <div className="feature-icon">
                                <CheckCircleOutlined />
                            </div>
                            <span>Real-time device monitoring and analytics</span>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <CheckCircleOutlined />
                            </div>
                            <span>Advanced anomaly detection and alerts</span>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">
                                <CheckCircleOutlined />
                            </div>
                            <span>Comprehensive dashboard and reporting</span>
                        </div>
                    </div>

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
    rules={[
        { required: true, message: 'Please enter your password!' },
        { min: 6, message: 'Password must be at least 6 characters!' }
    ]}
>
    <Input.Password
        prefix={<LockOutlined />}
        placeholder="Create a strong password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        autoComplete="new-password"
    />
</Form.Item>

{/* Password Strength Indicator - moved outside */}
<Form.Item noStyle shouldUpdate={(prev, curr) => prev.password !== curr.password}>
    {({ getFieldValue }) => {
        const password = getFieldValue('password') || '';
        const hasLength = password.length >= 6;
        const hasNumber = /\d/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasSpecial = /[!@#$%^&*]/.test(password);
        
        const strength = [hasLength, hasNumber, hasLower, hasUpper, hasSpecial].filter(Boolean).length;
        
        if (!password) return null;
        
        return (
            <div className="password-strength">
                <div className="strength-indicator">
                    {[...Array(5)].map((_, i) => (
                        <div 
                            key={i} 
                            className={`strength-dot ${i < strength ? 'active' : ''}`} 
                        />
                    ))}
                </div>
                <div className="strength-requirements">
                    <div className={`requirement ${hasLength ? 'met' : ''}`}>
                        <div className="requirement-icon">
                            {hasLength && <CheckCircleOutlined />}
                        </div>
                        At least 6 characters
                    </div>
                    <div className={`requirement ${hasNumber ? 'met' : ''}`}>
                        <div className="requirement-icon">
                            {hasNumber && <CheckCircleOutlined />}
                        </div>
                        Contains a number
                    </div>
                    <div className={`requirement ${hasLower && hasUpper ? 'met' : ''}`}>
                        <div className="requirement-icon">
                            {hasLower && hasUpper && <CheckCircleOutlined />}
                        </div>
                        Mixed case letters
                    </div>
                </div>
            </div>
        );
    }}
</Form.Item>

                        {/* <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Confirm your password"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                autoComplete="new-password"
                            />
                        </Form.Item> */}

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                { 
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Please accept the terms and conditions!')),
                                },
                            ]}
                            className="terms-checkbox"
                            style={{ marginBottom: 24 }}
                        >
                            <Checkbox style={{ alignItems: 'flex-start' }}>
                                <span style={{ lineHeight: 1.5 }}>
                                    I agree to the{' '}
                                    <Link to="/terms" className="auth-link">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link to="/privacy" className="auth-link">
                                        Privacy Policy
                                    </Link>
                                    , and consent to receive product updates and marketing communications.
                                </span>
                            </Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                className="auth-btn-primary"
                            >
                                {loading ? 'Creating Account...' : 'Create Your Account'}
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* <Divider>
                        <span className="divider-text">or sign up with</span>
                    </Divider>

                    <div style={{ marginBottom: 24 }}>
                        <Button className="social-btn" icon={<GoogleOutlined />}>
                            Continue with Google
                        </Button>
                        <Button className="social-btn" icon={<GithubOutlined />}>
                            Continue with GitHub
                        </Button>
                    </div> */}

                    <div className="auth-footer">
                        <Text style={{ color: '#94a3b8' }}>
                            Already have an account?{' '}
                            <Link to="/login" className="auth-link">
                                Sign in here
                            </Link>
                        </Text>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;