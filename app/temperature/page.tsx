"use client"

import { useState, useEffect } from 'react';

export default function WeatherDisplay() {
    const [weather, setWeather] = useState<{
        temperature: number | null,
        humidity: number | null
    }>({
      temperature: null,
      humidity: null
  })

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/temperature');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
          setWeather({
              temperature: data.temperature,
              humidity: data.humidity
        });
      } catch (error) {
        console.error('Failed to fetch temperature:', error);
      }
    };

    // Fetch temperature data every 3 seconds
    const intervalId = setInterval(fetchWeather, 3000);

    // Initial fetch
    fetchWeather();

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
    <h1>Current Weather</h1>
    <p>Temperature: {weather.temperature !== null ? `${weather.temperature} °C` : 'Loading...'}</p>
    <p>Humidity: {weather.humidity !== null ? `${weather.humidity} %` : 'Loading...'}</p>
  </div>
  );
}
