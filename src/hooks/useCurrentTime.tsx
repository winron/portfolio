import { useState, useEffect } from 'react';
import { LOCATION_CONFIG } from '../constants';

/**
 * Custom hook for displaying current time in Brooklyn timezone
 * @returns Current time string in HH:MM format
 */
export const useCurrentTime = (): string => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const brooklynTime = new Date(now.toLocaleString("en-US", {timeZone: LOCATION_CONFIG.timezone}));
      const timeString = brooklynTime.toLocaleTimeString("en-US", LOCATION_CONFIG.timeFormat);
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return currentTime;
};
