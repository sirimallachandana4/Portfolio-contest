import React from 'react';
import { motion } from 'motion/react';
import {
  Award,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Trophy
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface AchievementCardsProps {
  onBackToOrbit: () => void;
}

export const AchievementCards: React.FC<AchievementCardsProps> = ({ onBackToOrbit }) => {
  const { achievements } = portfolioData;

  return (
    <motion.section
      id="achievements_section_panel"
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -80 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <button
          type="button"
          id="achievements_back_btn"
          onClick={onBackToOrbit}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#141420]/80 hover:bg-[#1f1b33] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-purple-400" />
          <span>Orbit View</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <Award className="w-3.5 h-3.5" />
          <span className="uppercase tracking-widest text-[10px] font-semibold">
            Recognitions & Milestones
          </span>
        </div>
      </div>

      {/* Main Title */}
      <div className="mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-300 uppercase tracking-widest">
          <Trophy className="w-3.5 h-3.5" />
          <span>Verified Milestones</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white font-display">
          Achievements &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
            Project Distinctions
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl">
          Tangible technical achievements, application launches, and demonstrated competencies in full-stack engineering.
        </p>
      </div>

      {/* Curved 3D Arc Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        {achievements.map((item, index) => (
          <motion.div
            key={item.id}
            id={`ach_card_${item.id}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: index * 0.1 }}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="relative p-6 sm:p-7 rounded-3xl bg-[#12121c]/80 border border-white/10 hover:border-purple-500/40 hover:bg-[#161426]/90 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col justify-between group"
          >
            {/* Top row: Category + Date */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[10px] font-mono uppercase tracking-wider font-semibold">
                  {item.category}
                </span>

                {item.date && (
                  <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-400">
                    <Calendar className="w-3 h-3 text-purple-400" />
                    <span>{item.date}</span>
                  </div>
                )}
              </div>

              {/* Title & Organization */}
              <h3 className="text-lg sm:text-xl font-bold text-white font-display group-hover:text-purple-200 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs font-mono text-purple-300 mt-1 mb-4">
                {item.organization}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            {/* Bottom Actions / Credentials Link */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px]">Verified Project Build</span>
              </div>

              {item.credentialUrl && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-purple-300 hover:text-white transition-colors"
                >
                  <span>Inspect</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
