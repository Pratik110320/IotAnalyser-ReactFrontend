import { useState, useEffect } from "react";
import api from "../services/api";

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const today = new Date().toISOString();
      const { data } = await api.get(`/api/analytics/daily?date=${today}`);
      // This part needs adjustment based on how you want to display analytics.
      // For now, we'll just store the raw daily data.
      // A more complex implementation would fetch data for a date range.
      setAnalyticsData([{date: today, ...data}]); 
    };
    fetchAnalytics();
  }, []);

  return { analyticsData };
};
