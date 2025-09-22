import { useState, useEffect } from "react";
import api from "../services/api";

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const today = new Date().toISOString().split('T')[0];
      try {
        const { data } = await api.get(`/api/analytics/daily?date=${today}`);
        setAnalyticsData([{date: today, ...data}]); 
      } catch(error) {
        console.error("Failed to fetch analytics data", error);
        setAnalyticsData([]);
      }
    };
    fetchAnalytics();
  }, []);

  return { analyticsData };
};
