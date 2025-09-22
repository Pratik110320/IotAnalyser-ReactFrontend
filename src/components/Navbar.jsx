import { Layout, Button, Flex } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ThunderboltOutlined } from '@ant-design/icons';

const { Header } = Layout;

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <Header style={{ display: 'flex', alignItems: 'center', padding: '0 24px', zIndex: 1, width: '100%' }}>
      <Flex align="center" justify="space-between" style={{ width: '100%' }}>
        <Flex align="center">
          <Link to="/" style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center' }}>
            <ThunderboltOutlined style={{ marginRight: 8 }}/>
            IoT Analyser
          </Link>
        </Flex>

        <div>
          {user ? (
            <Button type="primary" danger onClick={logout}>Logout</Button>
          ) : (
             <Link to="/auth">
              <Button type="primary">
                Login / Register
              </Button>
            </Link>
          )}
        </div>
      </Flex>
    </Header>
  );
};

export default Navbar;
