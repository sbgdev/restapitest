"use client"

import { useState, useEffect } from 'react';

export default function TemperatureDisplay() {
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch('/api/temperature');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setTemperature(data.temperature);
      } catch (error) {
        console.error('Failed to fetch temperature:', error);
      }
    };

    // Fetch temperature data every 3 seconds
    const intervalId = setInterval(fetchTemperature, 3000);

    // Initial fetch
    fetchTemperature();

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Current Temperature</h1>
      {temperature !== null ? (
        <p>{temperature} °C</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
