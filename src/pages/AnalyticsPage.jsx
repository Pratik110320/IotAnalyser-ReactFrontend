import { Typography, Spin, Empty } from "antd";
import { useAnalytics } from "../hooks/useAnalytics";
import AnalyticsChart from "../components/AnalyticsChart";

const { Title, Paragraph } = Typography;

const AnalyticsPage = () => {
  const { analyticsData, loading } = useAnalytics();

  return (
    <div>
      <Title level={2} style={{ marginBottom: 8 }}>
        Analytics
      </Title>
      <Paragraph type="secondary" style={{ marginBottom: 24 }}>
        Daily average sensor readings for the last 7 days.
      </Paragraph>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : analyticsData && analyticsData.length > 0 ? (
        <AnalyticsChart data={analyticsData} />
      ) : (
        <Empty description="No analytics data available for the last 7 days." />
      )}
    </div>
  );
};

export default AnalyticsPage;
