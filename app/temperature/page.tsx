"use client";

import { useState, useEffect } from "react";

export default function SensorDisplay() {
  const [sensors, setSensors] = useState({
    temperature: null,
    humidity: null,
    rain: null,
    soilMoisture: null,
    gas: null,
    motionDetected: null,
    touch: null,
  });

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch("/api/temperature");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setSensors(data);
      } catch (error) {
        console.error("Failed to fetch temperature:", error);
      }
    };

    // Fetch temperature data every 3 seconds
    const intervalId = setInterval(fetchSensorData, 2000);

    // Initial fetch
    fetchSensorData();

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Sensor Data</h1>
      <p>
        Temperature:{" "}
        {sensors.temperature !== null
          ? `${sensors.temperature} °C`
          : "Loading..."}
      </p>
      <p>
        Humidity:{" "}
        {sensors.humidity !== null ? `${sensors.humidity} %` : "Loading..."}
      </p>
      <p>Rain: {sensors.rain !== null ? `${sensors.rain}` : "Loading..."}</p>
      <p>
        Soil Moisture:{" "}
        {sensors.soilMoisture !== null
          ? `${sensors.soilMoisture}`
          : "Loading..."}
      </p>
      <p>Gas: {sensors.gas !== null ? `${sensors.gas}` : "Loading..."}</p>
      <p>
        Motion Detected:{" "}
        {sensors.motionDetected !== null
          ? `${sensors.motionDetected ? "Yes" : "No"}`
          : "Loading..."}
      </p>
      <p>Touch: {sensors.touch !== null ? `${sensors.touch}` : "Loading..."}</p>
    </div>
  );
}
