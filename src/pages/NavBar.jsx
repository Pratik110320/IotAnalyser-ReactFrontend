// src/pages/NavBar.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { LoginOutlined, AppstoreAddOutlined } from '@ant-design/icons';

export default function NavBar({ isPublic }) {
  const { token } = useAuth();
  
  return (
    <div className={`site-nav ${isPublic ? 'public-nav' : 'app-nav'}`}>
      <div className="nav-inner">
        <Link to="/" className="logo">IoT<span className="logo-highlight">Analyser</span></Link>
        {isPublic && !token && (
          <div className="nav-links">
            <Link to="/login">
              <Button type="text" icon={<LoginOutlined />} style={{ color: '#cbd5e1' }}>Sign In</Button>
            </Link>
            <Link to="/register">
              <Button type="primary" icon={<AppstoreAddOutlined />} className="nav-cta">Get Started</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
