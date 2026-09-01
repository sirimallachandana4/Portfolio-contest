import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Volume1, Play, Pause, Music, Sparkles } from 'lucide-react';
import { ambientMusic } from '../utils/audioSynth';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [waveHeights, setWaveHeights] = useState([40, 70, 30, 85, 55]);

  useEffect(() => {
    const unsubscribe = ambientMusic.subscribe((playing, vol, muted) => {
      setIsPlaying(playing);
      setVolume(vol);
      setIsMuted(muted);
    });

    return () => unsubscribe();
  }, []);

  // Animate sound waves when playing
  useEffect(() => {
    if (!isPlaying || isMuted) {
      setWaveHeights([20, 20, 20, 20, 20]);
      return;
    }

    const interval = setInterval(() => {
      setWaveHeights([
        Math.floor(25 + Math.random() * 65),
        Math.floor(35 + Math.random() * 60),
        Math.floor(45 + Math.random() * 50),
        Math.floor(30 + Math.random() * 65),
        Math.floor(20 + Math.random() * 70),
      ]);
    }, 120);

    return () => clearInterval(interval);
  }, [isPlaying, isMuted]);

  const handleTogglePlay = () => {
    ambientMusic.toggle();
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    ambientMusic.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    ambientMusic.setVolume(newVol);
  };

  return (
    <div
      id="ambient_music_controller"
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Pill Button */}
      <button
        type="button"
        onClick={handleTogglePlay}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 backdrop-blur-xl cursor-pointer ${
          isPlaying && !isMuted
            ? 'bg-purple-950/70 border-purple-400/50 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
            : 'bg-[#121020]/80 border-white/10 text-zinc-400 hover:text-zinc-200 hover:border-white/20'
        }`}
        title={isPlaying ? 'Pause Ambient Portfolio Synth' : 'Play Ambient Music'}
        aria-label="Toggle Ambient Audio"
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 text-purple-300" />
        ) : (
          <Play className="w-3.5 h-3.5 text-teal-300 fill-teal-300/30" />
        )}

        {/* Animated Waveform Bars */}
        <div className="flex items-center gap-[2.5px] h-3.5 px-0.5">
          {waveHeights.map((h, i) => (
            <span
              key={i}
              className={`w-[2px] rounded-full transition-all duration-150 ${
                isPlaying && !isMuted
                  ? 'bg-gradient-to-t from-teal-400 to-purple-400'
                  : 'bg-zinc-600'
              }`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        <span className="text-[10px] font-mono tracking-widest uppercase hidden sm:inline text-zinc-300 font-semibold">
          {isPlaying ? (isMuted ? 'MUTED' : 'CYBER AMBIENT') : 'MUSIC'}
        </span>
      </button>

      {/* Hover/Flyout Volume Slider */}
      {isHovered && (
        <div className="absolute top-full mt-2 right-0 z-50 p-2.5 rounded-2xl bg-[#110e1e]/95 border border-purple-500/30 backdrop-blur-xl shadow-2xl flex items-center gap-2.5 min-w-[170px] animate-in fade-in zoom-in-95 duration-150">
          <button
            type="button"
            onClick={handleToggleMute}
            className="p-1 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            ) : volume < 0.5 ? (
              <Volume1 className="w-3.5 h-3.5 text-teal-300" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-teal-300" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
            aria-label="Volume Slider"
          />

          <span className="text-[10px] font-mono text-zinc-400 min-w-[24px]">
            {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
          </span>
        </div>
      )}
    </div>
  );
};
