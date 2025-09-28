// Enhanced Footer.jsx with Modern Design
import React from 'react';
import { Row, Col, Typography, Divider, Space } from 'antd';
import { 
  TwitterOutlined, 
  GithubOutlined, 
  LinkedinOutlined,
  MailOutlined,
  HeartFilled,
  RocketOutlined,
  ShieldCheckOutlined,
  ApiOutlined
} from '@ant-design/icons';

const { Text, Link } = Typography;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      background: 'rgba(15, 23, 42, 0.95)', 
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: 'auto',
      position: 'relative'
    }}>
      <style jsx>{`
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 24px 24px;
        }

        .footer-section {
          margin-bottom: 32px;
        }

        .footer-title {
          color: #f8fafc !important;
          font-size: 1.1rem !important;
          font-weight: 600 !important;
          margin-bottom: 16px !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }

        .footer-link {
          color: #94a3b8 !important;
          text-decoration: none !important;
          transition: all 0.3s ease !important;
          display: block !important;
          padding: 4px 0 !important;
          font-size: 0.9rem !important;
        }

        .footer-link:hover {
          color: #6366f1 !important;
          transform: translateX(4px) !important;
        }

        .social-link {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 40px !important;
          height: 40px !important;
          border-radius: 12px !important;
          background: rgba(255, 255, 255, 0.05) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #94a3b8 !important;
          transition: all 0.3s ease !important;
          text-decoration: none !important;
        }

        .social-link:hover {
          background: rgba(99, 102, 241, 0.1) !important;
          border-color: #6366f1 !important;
          color: #6366f1 !important;
          transform: translateY(-2px) !important;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2) !important;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 24px 24px;
          margin-top: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #f8fafc;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .brand-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
        }

        .footer-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-item {
          text-align: center;
          padding: 20px;
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-2px);
          border-color: rgba(99, 102, 241, 0.3);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: 800;
          background: linear-gradient(135deg, #6366f1, #06b6d4);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 4px;
        }

        .stat-label {
          color: #94a3b8;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .newsletter {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
        }

        .newsletter-input {
          background: rgba(51, 65, 85, 0.5) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 12px !important;
          color: #f8fafc !important;
          height: 44px !important;
        }

        .newsletter-input:hover,
        .newsletter-input:focus {
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1) !important;
        }

        .newsletter-btn {
          height: 44px !important;
          border-radius: 12px !important;
          background: linear-gradient(135deg, #6366f1, #4f46e5) !important;
          border: none !important;
          font-weight: 600 !important;
        }

        .newsletter-btn:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4) !important;
        }

        @media (max-width: 768px) {
          .footer-content {
            padding: 32px 16px 16px;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }

          .footer-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .stat-item {
            padding: 16px;
          }
        }
      `}</style>

      <div className="footer-content">
        {/* Stats Section */}
        <div className="footer-stats">
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Devices</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1M+</div>
            <div className="stat-label">Data Points</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Monitoring</div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="newsletter">
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={12}>
              <Text style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
                Stay Updated
              </Text>
              <Text style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Get the latest IoT insights and platform updates delivered to your inbox.
              </Text>
            </Col>
            <Col xs={24} md={12}>
              <Space.Compact style={{ width: '100%' }}>
                <input 
                  className="newsletter-input"
                  placeholder="Enter your email"
                  style={{ flex: 1 }}
                />
                <button className="newsletter-btn" style={{ padding: '0 24px' }}>
                  Subscribe
                </button>
              </Space.Compact>
            </Col>
          </Row>
        </div>

        {/* Main Footer Content */}
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} lg={6} className="footer-section">
            <Text className="footer-title">
              <RocketOutlined />
              Product
            </Text>
            <a href="#features" className="footer-link">Features</a>
            <a href="#pricing" className="footer-link">Pricing</a>
            <a href="#integrations" className="footer-link">Integrations</a>
            <a href="#api" className="footer-link">API Documentation</a>
            <a href="#changelog" className="footer-link">Changelog</a>
          </Col>

          <Col xs={24} sm={12} lg={6} className="footer-section">
            <Text className="footer-title">
              <ShieldCheckOutlined />
              Company
            </Text>
            <a href="#about" className="footer-link">About Us</a>
            <a href="#careers" className="footer-link">Careers</a>
            <a href="#blog" className="footer-link">Blog</a>
            <a href="#press" className="footer-link">Press Kit</a>
            <a href="#contact" className="footer-link">Contact</a>
          </Col>

          <Col xs={24} sm={12} lg={6} className="footer-section">
            <Text className="footer-title">
              <ApiOutlined />
              Resources
            </Text>
            <a href="#documentation" className="footer-link">Documentation</a>
            <a href="#tutorials" className="footer-link">Tutorials</a>
            <a href="#community" className="footer-link">Community</a>
            <a href="#support" className="footer-link">Support Center</a>
            <a href="#status" className="footer-link">System Status</a>
          </Col>

          <Col xs={24} sm={12} lg={6} className="footer-section">
            <Text className="footer-title">
              <HeartFilled />
              Legal
            </Text>
            <a href="#privacy" className="footer-link">Privacy Policy</a>
            <a href="#terms" className="footer-link">Terms of Service</a>
            <a href="#cookies" className="footer-link">Cookie Policy</a>
            <a href="#gdpr" className="footer-link">GDPR Compliance</a>
            <a href="#security" className="footer-link">Security</a>
          </Col>
        </Row>

        {/* Social Media Section */}
        <div style={{ textAlign: 'center', margin: '32px 0' }}>
          <Text style={{ color: '#cbd5e1', fontSize: '1rem', fontWeight: '600', display: 'block', marginBottom: '16px' }}>
            Connect with us
          </Text>
          <Space size={16}>
            <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined />
            </a>
            <a href="https://github.com" className="social-link" target="_blank" rel="noopener noreferrer">
              <GithubOutlined />
            </a>
            <a href="https://linkedin.com" className="social-link" target="_blank" rel="noopener noreferrer">
              <LinkedinOutlined />
            </a>
            <a href="mailto:contact@iotanalyser.com" className="social-link">
              <MailOutlined />
            </a>
          </Space>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-brand">
          <div className="brand-icon">IoT</div>
          <span>IoT Analyser</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <Text style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            © {currentYear} IoT Analyser. All rights reserved.
          </Text>
          <Text style={{ color: '#94a3b8', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Made with <HeartFilled style={{ color: '#ef4444' }} /> for IoT enthusiasts
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;