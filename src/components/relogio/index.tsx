'use client'

import { useEffect, useState, useRef } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setTime(prevTime => prevTime !== timeString ? timeString : prevTime);
    };

    updateTime();
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(updateTime, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="text-[12px] font-mono text-(--cor-primaria)">
      {time}
    </div>
  );
};

export default Clock;