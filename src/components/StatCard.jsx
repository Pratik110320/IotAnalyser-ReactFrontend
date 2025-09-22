import { Card, Statistic, Avatar } from "antd";
import { RiseOutlined } from '@ant-design/icons';

const StatCard = ({ icon, label, value }) => {
  return (
    <Card bordered={false}>
      <Statistic
        title={label}
        value={value}
        prefix={<Avatar size="large" icon={icon} style={{ backgroundColor: '#7B61FF' }} />}
        suffix={<RiseOutlined style={{ color: '#3f8600', marginLeft: '8px' }} />}
      />
    </Card>
  );
};

export default StatCard;
