
import React, { useEffect, useState } from 'react';
import { Wish } from '../types';
import { TET_WISHES, COLORS } from '../constants';

const FloatingWishes: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);

  useEffect(() => {
    const generateWishes = () => {
      const newWishes = Array.from({ length: 15 }).map((_, i) => ({
        id: Math.random().toString(36).substr(2, 9),
        text: TET_WISHES[Math.floor(Math.random() * TET_WISHES.length)],
        left: Math.random() * 80 + 10,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 15,
        fontSize: Math.random() * 1.5 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
      setWishes(newWishes);
    };

    generateWishes();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {wishes.map((wish) => (
        <div
          key={wish.id}
          className="floating-wish font-bold italic"
          style={{
            left: `${wish.left}%`,
            animationDuration: `${wish.duration}s`,
            animationDelay: `${wish.delay}s`,
            fontSize: `${wish.fontSize}rem`,
            color: wish.color,
            textShadow: `0 0 10px ${wish.color}66`,
          }}
        >
          {wish.text}
        </div>
      ))}
    </div>
  );
};

export default FloatingWishes;
