'use client'

import { useEffect, useState } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // horário local do usuário
      const timeString = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setTime(timeString);
    };

    updateTime(); // atualiza imediatamente
    const interval = setInterval(updateTime, 1000); // atualiza a cada segundo

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-[12px] font-mono text-(--cor-primaria)">
      {time}
    </div>
  );
};

export default Clock;