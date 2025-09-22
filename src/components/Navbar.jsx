import { Layout, Menu, Button, Flex } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ThunderboltOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const items = user ? [
    { key: '/dashboard', label: <Link to="/dashboard">Dashboard</Link> },
    { key: '/devices', label: <Link to="/devices">Devices</Link> },
    { key: '/sensors', label: <Link to="/sensors">Sensors</Link> },
    { key: '/anomalies', label: <Link to="/anomalies">Anomalies</Link> },
    { key: '/analytics', label: <Link to="/analytics">Analytics</Link> },
  ] : [];

  return (
    <Header style={{ display: 'flex', alignItems: 'center', padding: '0 24px' }}>
      <Flex align="center" justify="space-between" style={{ width: '100%' }}>
        <Flex align="center">
          <Link to="/" style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center' }}>
            <ThunderboltOutlined style={{ marginRight: 8 }}/>
            IoT Analyser
          </Link>
          {user && (
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={items}
              style={{ flex: 1, minWidth: 0, marginLeft: '24px' }}
            />
          )}
        </Flex>

        <div>
          {user ? (
            <Button type="primary" danger onClick={logout}>Logout</Button>
          ) : (
            <Button type="primary" as={Link} href="/auth">
              Login
            </Button>
          )}
        </div>
      </Flex>
    </Header>
  );
};

export default Navbar;
