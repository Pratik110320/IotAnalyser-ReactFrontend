// src/layouts/PublicLayout.jsx
import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import NavBar from '../pages/NavBar';
import Footer from '../pages/Footer';

const { Content } = Layout;

const PublicLayout = () => {
    return (
        <Layout style={{ minHeight: '100vh', background: '#0f172a' }}>
            <NavBar />
            <Content>
                <Outlet />
            </Content>
            <Footer />
        </Layout>
    );
};

export default PublicLayout;
