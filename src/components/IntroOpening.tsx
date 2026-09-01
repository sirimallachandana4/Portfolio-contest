import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, ArrowRight, Code2, Sparkles, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { ambientMusic } from '../utils/audioSynth';

interface IntroOpeningProps {
  onDiscover: () => void;
}

export const IntroOpening: React.FC<IntroOpeningProps> = ({ onDiscover }) => {
  const [audioEnabled, setAudioEnabled] = useState(true);

  const handleExploreClick = () => {
    if (audioEnabled) {
      ambientMusic.start();
    }
    // Direct instantaneous navigation to slides
    onDiscover();
  };

  return (
    <motion.div
      id="intro_experience_curtain"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 bg-[#e8e5dc] text-[#1c1a17] flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none font-sans"
    >
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between z-20">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#5a574f]">
          <span className="w-2 h-2 rounded-full bg-[#1c1a17]" />
          <span>SIRIMALLA CHANDANA</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono tracking-widest text-[#7a766c] uppercase">
          <span>PORTFOLIO 2026</span>
          <span>•</span>
          <span>WARANGAL, IN</span>
        </div>
      </div>

      {/* Main Center Title Screen */}
      <div className="w-full max-w-7xl mx-auto my-auto relative z-10 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center space-y-6 sm:space-y-10"
        >
          {/* Header: EXPLORE with sleek animated badge */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 font-display font-black text-5xl sm:text-8xl md:text-9xl uppercase tracking-tighter text-[#141210]">
            <span>EXPLORE</span>

            {/* Capsule Window */}
            <div className="relative w-28 sm:w-44 md:w-56 h-12 sm:h-20 md:h-24 rounded-full overflow-hidden border border-[#2a2622]/20 shadow-2xl bg-[#0d121c] flex items-center justify-center group px-4">
              <div className="flex items-center gap-2 text-teal-400">
                <Code2 className="w-5 h-5 sm:w-7 sm:h-7 animate-pulse" />
                <span className="text-xs sm:text-base font-mono font-bold text-white tracking-widest">
                  PORTFOLIO
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-transparent to-purple-600/20" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-full" />
            </div>
          </div>

          {/* Sub-Tagline & Immediate Direct Trigger */}
          <div className="space-y-6 max-w-xl mx-auto">
            <motion.button
              type="button"
              id="intro_explore_btn"
              onClick={handleExploreClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3.5 px-9 py-4 rounded-full bg-[#1c1a17] text-[#f4f2eb] hover:bg-[#34312b] transition-all duration-300 font-mono text-xs sm:text-sm tracking-widest uppercase cursor-pointer shadow-2xl"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 group-hover:animate-ping" />
              <span className="font-bold">Explore Slides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-teal-300" />
            </motion.button>

            <p className="text-xs sm:text-sm font-serif italic text-[#6a665d] leading-relaxed">
              "Passionate Computer Science & Engineering student solving real-world problems with C, Java, Python, React.js, and Data frameworks."
              <br />
              <span className="text-[11px] font-mono not-italic text-[#8c887e] uppercase tracking-wider block mt-1.5">
                Click Explore to directly enter the interactive 3D Portfolio slides
              </span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#7a766c] z-20">
        <button
          type="button"
          onClick={() => setAudioEnabled(!audioEnabled)}
          className="flex items-center gap-2 hover:text-[#1c1a17] transition-colors cursor-pointer"
        >
          {audioEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{audioEnabled ? 'AUDIO ACTIVE' : 'AUDIO MUTED'}</span>
        </button>

        <a
          href={portfolioData.socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#1c1a17] transition-colors underline underline-offset-4"
        >
          linkedin.com/in/chandana-sirimalla
        </a>
      </div>
    </motion.div>
  );
};
