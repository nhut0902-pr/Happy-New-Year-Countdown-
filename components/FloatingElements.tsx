
import React, { useEffect, useState } from 'react';
import { TET_WISHES, COLORS } from '../constants';

interface FloatingItem {
  id: string;
  content: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
  color: string;
  rotation: number;
}

const FloatingElements: React.FC = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const generateItems = () => {
      // Create a smaller batch of items more frequently to keep screen clear but active
      const count = 8; 
      const newItems: FloatingItem[] = Array.from({ length: count }).map((_, i) => ({
        id: `${Date.now()}-${i}`,
        content: TET_WISHES[Math.floor(Math.random() * TET_WISHES.length)],
        left: (i * (100 / count)) + (Math.random() * 5), // Spread them out horizontally
        duration: Math.random() * 10 + 12,
        delay: Math.random() * 5,
        size: Math.random() * 0.4 + 0.9,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: (Math.random() - 0.5) * 15, // Slight tilt
      }));
      
      setItems(prev => [...prev.slice(-10), ...newItems]); // Keep limited history to avoid clutter
    };

    generateItems();
    const interval = setInterval(generateItems, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          className="floating-wish flex flex-col items-center"
          style={{
            left: `${item.left}%`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
          }}
        >
          <span
            className="font-bold whitespace-nowrap italic transition-all duration-1000"
            style={{
              fontSize: `${item.size}rem`,
              color: item.color,
              textShadow: `0 0 15px ${item.color}cc, 0 0 5px white`,
              transform: `rotate(${item.rotation}deg)`,
              opacity: 0.85
            }}
          >
            {item.content}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;
