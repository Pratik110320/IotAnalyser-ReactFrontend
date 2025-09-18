import { useState, useEffect, useMemo } from "react";
import { useWebSocket } from "../contexts/WebSocketContext";

export const useSensorData = () => {
  const { sensorData } = useWebSocket();
  const anomalies = useMemo(() => sensorData.filter(d => d.anomaly).length, [sensorData]);

  return { sensorData, anomalies };
};
