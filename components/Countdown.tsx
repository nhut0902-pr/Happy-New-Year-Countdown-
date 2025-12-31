
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
  label: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate, label }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const Unit = ({ val, unitLabel }: { val: number; unitLabel: string }) => (
    <div className="flex flex-col items-center group">
      <div className="relative overflow-hidden bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl md:rounded-2xl p-2 md:p-4 w-14 md:w-24 shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:scale-105 group-hover:border-yellow-400/50">
        <div className="absolute inset-0 bg-yellow-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="text-2xl md:text-4xl font-bold text-yellow-400 font-mono tracking-tighter drop-shadow-[0_0_8px_rgba(255,215,0,0.5)] text-center">
          {val.toString().padStart(2, '0')}
        </div>
      </div>
      <div className="text-[9px] md:text-[10px] uppercase text-white/60 tracking-[0.2em] mt-2 font-bold group-hover:text-yellow-400 transition-colors">
        {unitLabel}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-4 md:p-6 rounded-3xl bg-black/20 border border-white/5 backdrop-blur-sm">
      <h3 className="text-sm md:text-lg font-bold text-red-500 uppercase tracking-[0.3em] mb-4 md:mb-6 drop-shadow-sm">
        {label}
      </h3>
      <div className="flex items-center gap-2 md:gap-4">
        <Unit val={timeLeft.days} unitLabel="Ngày" />
        <div className="text-xl text-yellow-500/30 mb-6">:</div>
        <Unit val={timeLeft.hours} unitLabel="Giờ" />
        <div className="text-xl text-yellow-500/30 mb-6">:</div>
        <Unit val={timeLeft.minutes} unitLabel="Phút" />
        <div className="text-xl text-yellow-500/30 mb-6">:</div>
        <Unit val={timeLeft.seconds} unitLabel="Giây" />
      </div>
    </div>
  );
};

export default Countdown;
