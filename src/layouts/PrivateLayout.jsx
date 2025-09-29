// src/layouts/PrivateLayout.jsx
import React, { useState, useEffect } from 'react';
import { Layout, Drawer, Button, FloatButton } from 'antd';
import { MenuOutlined, ArrowUpOutlined, LogoutOutlined } from '@ant-design/icons';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/SideBar';
import NavBar from '../pages/NavBar';
import Footer from '../pages/Footer';
import { useAuth } from '../contexts/AuthContext';

const { Content, Sider, Header } = Layout;

const PrivateLayout = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { logout } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) {
                setSidebarVisible(false); // Close drawer on resize to desktop
            }
        };

        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Close sidebar on navigation
    useEffect(() => {
        if (sidebarVisible) {
            setSidebarVisible(false);
        }
    }, [location.pathname]);

    const sider = <Sider className="desktop-sider" width={280}><Sidebar /></Sider>;
    
    const headerContent = (
        <>
            {isMobile && (
                <Button
                    className="mobile-menu-btn"
                    icon={<MenuOutlined />}
                    onClick={() => setSidebarVisible(true)}
                />
            )}
            <NavBar />
            {isMobile && (
                 <Button
                    className="mobile-menu-btn"
                    icon={<LogoutOutlined />}
                    onClick={logout}
                />
            )}
        </>
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
             <Header className={isMobile ? "mobile-header" : "desktop-header"}>
                {headerContent}
            </Header>

            <Layout className="desktop-layout-container">
                {!isMobile && sider}
                
                <Layout className="desktop-content-layout" style={{ marginLeft: isMobile ? 0 : 280, marginTop: 64 }}>
                     <Content className="main-content">
                        <div className="content-wrapper">
                            <Outlet />
                        </div>
                    </Content>
                    <Footer />
                </Layout>
            </Layout>

            {isMobile && (
                 <Drawer
                    title="Navigation"
                    placement="left"
                    closable={true}
                    onClose={() => setSidebarVisible(false)}
                    open={sidebarVisible}
                    width={280}
                    className="mobile-drawer"
                    bodyStyle={{ padding: 0 }}
                >
                    <Sidebar />
                </Drawer>
            )}

            {scrolled && (
                <FloatButton
                    icon={<ArrowUpOutlined />}
                    type="primary"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                />
            )}
        </Layout>
    );
};

export default PrivateLayout;
