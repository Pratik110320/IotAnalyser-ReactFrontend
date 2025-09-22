import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      IoT Analyser ©{new Date().getFullYear()}
    </AntFooter>
  );
};

export default Footer;
