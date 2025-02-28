'use client';
import { useState, useEffect } from 'react';

const DeviceTime: React.FC = () => {
  const [time, setTime] = useState<string>('');

  const updateTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setTime(`${hours}:${minutes}`);
  };

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
};

export default DeviceTime;
