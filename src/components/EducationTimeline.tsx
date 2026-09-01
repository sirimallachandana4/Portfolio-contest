import React from 'react';
import { motion } from 'motion/react';
import {
  GraduationCap,
  ArrowLeft,
  Calendar,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface EducationTimelineProps {
  onBackToOrbit: () => void;
}

export const EducationTimeline: React.FC<EducationTimelineProps> = ({ onBackToOrbit }) => {
  const { education } = portfolioData;

  return (
    <motion.section
      id="education_section_panel"
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-10"
    >
      {/* Header bar with Back button & section badge */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <button
          type="button"
          id="education_back_btn"
          onClick={onBackToOrbit}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#141420]/80 hover:bg-[#1f1b33] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-purple-400" />
          <span>Orbit View</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono">
          <GraduationCap className="w-3.5 h-3.5" />
          <span className="uppercase tracking-widest text-[10px] font-semibold">
            Academic Track
          </span>
        </div>
      </div>

      {/* Main Title */}
      <div className="mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-300 uppercase tracking-widest">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Academic Milestones</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white font-display">
          Education &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
            Engineering Foundations
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl">
          Foundational computer science principles coupled with intensive full-stack development practice.
        </p>
      </div>

      {/* 3-Column Timeline Matching Reference Video Clip */}
      <div className="space-y-4">
        {education.map((item, index) => (
          <motion.div
            key={index}
            id={`edu_milestone_${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start p-6 rounded-3xl bg-[#110e1e]/60 hover:bg-[#151226]/80 border border-white/10 hover:border-teal-500/40 transition-all duration-300 backdrop-blur-md group"
          >
            {/* Column 1: Role / Degree & Institution */}
            <div className="lg:col-span-4 space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-white font-display group-hover:text-teal-200 transition-colors">
                {item.degree}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-purple-300">
                {item.institution}
              </p>
              <div className="pt-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-teal-950/40 border border-teal-500/30 text-teal-300 text-[10px] font-mono">
                  {item.status}
                </span>
              </div>
            </div>

            {/* Column 2: Date / Year Big Typography */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <span className="text-2xl sm:text-3xl font-black text-zinc-100 font-display tracking-tight">
                {item.year}
              </span>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                {item.status}
              </span>
            </div>

            {/* Column 3: Impact Description & Coursework */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-zinc-300"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary Note */}
      <div className="mt-8 p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
        <span className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-purple-400" />
          <span>Curriculum grounded in Data Structures, Algorithms & Cloud Web Architectures</span>
        </span>
        <span className="text-purple-300 hidden sm:inline">Active Engineering Focus</span>
      </div>
    </motion.section>
  );
};
