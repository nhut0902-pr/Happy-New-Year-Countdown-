
import React, { useState, useRef, useEffect } from 'react';
import Fireworks from './components/Fireworks';
import FloatingElements from './components/FloatingElements';
import Countdown from './components/Countdown';
import { WESTERN_NEW_YEAR, LUNAR_NEW_YEAR } from './constants';

const MUSIC_URL = "https://res.cloudinary.com/dyovozajb/video/upload/v1767157461/media_3_lspe3g.m4a";

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Khởi tạo đối tượng audio
    audioRef.current = new Audio(MUSIC_URL);
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.error("Không thể phát nhạc:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-black overflow-hidden select-none">
      {/* Background Layer: Fireworks */}
      <Fireworks />

      {/* Floating Greetings Layer */}
      <FloatingElements />

      {/* Content Layer */}
      <div className="relative z-30 w-full h-full flex flex-col items-center pt-10 md:pt-16 pb-20 px-4 overflow-y-auto custom-scrollbar">
        {/* Main Header */}
        <div className="text-center mb-8 md:mb-16 space-y-2">
          <h1 className="text-4xl md:text-7xl font-festive text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] py-2">
            Chúc Mừng Năm Mới 2026
          </h1>
          <div className="h-[2px] w-32 mx-auto bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
        </div>

        {/* Timers Container - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full max-w-6xl">
          <div className="transform transition-all hover:scale-[1.02]">
            <Countdown targetDate={WESTERN_NEW_YEAR} label="Đếm ngược Tết Dương Lịch" />
          </div>
          <div className="transform transition-all hover:scale-[1.02]">
            <Countdown targetDate={LUNAR_NEW_YEAR} label="Đếm ngược Tết Nguyên Đán" />
          </div>
        </div>

        {/* Floating Decoration Bottom */}
        <div className="mt-16 md:mt-24 text-center space-y-6 pb-20">
           <div className="flex items-center justify-center space-x-6 text-white/40 text-[9px] md:text-xs tracking-[0.4em] uppercase font-bold">
              <span>Bình An</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
              <span>May Mắn</span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
              <span>Thịnh Vượng</span>
           </div>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="fixed bottom-4 left-0 right-0 z-40 flex flex-col items-center space-y-2 pointer-events-none">
         <div className="flex items-center space-x-2 text-white/50 text-[10px] font-mono opacity-40">
            <i className="fa-brands fa-tiktok"></i>
            <span>nhutcoder0902</span>
         </div>
         <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-white/30 uppercase flex items-center space-x-2">
            <span className="w-4 h-[1px] bg-white/10"></span>
            <span>Powered By <span className="text-yellow-500/60 drop-shadow-[0_0_5px_rgba(234,179,8,0.3)]">Nhutcoder</span></span>
            <span className="w-4 h-[1px] bg-white/10"></span>
         </div>
      </div>

      {/* Control Buttons */}
      <div className="fixed top-6 right-6 z-50 flex space-x-4">
        <button 
          onClick={toggleMusic}
          className={`w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 transition-all duration-300 ${isPlaying ? 'text-yellow-400 border-yellow-400/50 shadow-[0_0_15px_rgba(255,215,0,0.3)] animate-pulse' : 'text-white/40 hover:text-white'}`}
          title={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
        >
          <i className={`fa-solid ${isPlaying ? 'fa-volume-high' : 'fa-volume-xmark'} text-sm`}></i>
        </button>
        <button 
          onClick={toggleFullScreen}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-yellow-400 transition-all duration-300"
          title="Toàn màn hình"
        >
          <i className="fa-solid fa-expand text-sm"></i>
        </button>
      </div>

      {/* Side Ornaments */}
      <div className="fixed top-0 left-0 pointer-events-none z-20 opacity-20">
        <div className="w-32 h-32 border-l-[1px] border-t-[1px] border-yellow-500/30 rounded-tl-full m-4"></div>
      </div>
      <div className="fixed top-0 right-0 pointer-events-none z-20 opacity-20">
        <div className="w-32 h-32 border-r-[1px] border-t-[1px] border-yellow-500/30 rounded-tr-full m-4"></div>
      </div>
    </div>
  );
};

export default App;
