import { Typography } from "antd";
import { useAnalytics } from "../hooks/useAnalytics";
import AnalyticsChart from "../components/AnalyticsChart";

const { Title } = Typography;

const AnalyticsPage = () => {
  const { analyticsData } = useAnalytics();

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>
        Analytics
      </Title>
      <AnalyticsChart data={analyticsData} />
    </div>
  );
};

export default AnalyticsPage;
