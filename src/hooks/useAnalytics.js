import { useState, useEffect } from "react";
import api from "../services/api";
import dayjs from 'dayjs';

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsForLast7Days = async () => {
      setLoading(true);
      try {
        const today = dayjs();
        const datePromises = [];

        for (let i = 0; i < 7; i++) {
          const date = today.subtract(i, 'day');
          const formattedDate = date.format('YYYY-MM-DDTHH:mm:ss');
          const promise = api.get(`/api/analytics/daily?date=${formattedDate}`)
            .then(response => ({
              date: date.format('YYYY-MM-DD'),
              stats: response.data
            }))
            .catch(err => {
              console.error(`Failed to fetch analytics for ${date.format('YYYY-MM-DD')}`, err);
              return null;
            });
          datePromises.push(promise);
        }

        const results = await Promise.all(datePromises);

        const validResults = results
          .filter(result => result && result.stats && (result.stats.TEMPERATURE || result.stats.HUMIDITY))
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        
        setAnalyticsData(validResults);
      } catch (error) {
        console.error("Failed to fetch analytics data", error);
        setAnalyticsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsForLast7Days();
  }, []);

  return { analyticsData, loading };
};
