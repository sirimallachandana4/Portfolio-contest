import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Send,
  Sparkles,
  Terminal,
  Github,
  Linkedin,
  Mail,
  Phone,
  ChevronDown,
  FolderGit2
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { Interactive3DOrb } from './Interactive3DOrb';

interface HeroSectionProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  mousePos: { x: number; y: number };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeSection,
  onSelectSection,
  mousePos
}) => {
  const { personal, contact, socialLinks } = portfolioData;

  return (
    <div
      id="hero_universe_slide"
      className="relative min-h-[calc(100vh-80px)] w-full flex flex-col justify-between px-4 sm:px-8 lg:px-12 py-3 overflow-hidden select-none"
    >
      {/* 1. ENORMOUS AMBIENT WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <h1
          id="hero_huge_bg_watermark"
          className="text-[17vw] font-black tracking-tighter text-white/[0.025] font-display uppercase leading-none select-none text-center"
          style={{ letterSpacing: '-0.05em' }}
        >
          CHANDANA
        </h1>
      </div>

      {/* Top Bar with Live Status */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between pt-1">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121020]/80 border border-purple-500/30 text-purple-300 text-xs font-mono backdrop-blur-md shadow-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span>{personal.statusBadge}</span>
        </motion.div>

        <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-zinc-400">
          <span className="text-teal-300 font-semibold">VAAGDEVI COLLEGE OF ENGG</span>
          <span className="text-zinc-600">•</span>
          <span className="text-purple-300 font-semibold">SOFTWARE DEVELOPER</span>
          <span className="text-zinc-600">•</span>
          <span>WARANGAL, IN</span>
        </div>
      </div>

      {/* 2. MAIN HERO STAGE */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 my-auto py-4">
        
        {/* Left Column: Name & Main Action Unit */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left order-2 lg:order-1"
        >
          {/* Title & Name */}
          <div className="space-y-1.5">
            <span className="text-xs sm:text-sm font-mono text-teal-300 tracking-wider flex items-center justify-center lg:justify-start gap-2">
              <span>SOFTWARE ENGINEER & DEVELOPER</span>
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white font-display tracking-tight leading-none uppercase">
              SIRIMALLA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-purple-300">
                CHANDANA
              </span>
            </h1>
          </div>

          {/* Software Solutions Block (placed directly under name) */}
          <div className="space-y-4 pt-1">
            <div className="space-y-1">
              <span className="text-xs sm:text-sm font-mono text-zinc-400 font-light block tracking-wider">
                Architecting High-Performance
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-none uppercase flex items-center justify-center lg:justify-start gap-3">
                <span className="inline-block w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#ffffff] shrink-0" />
                <span className="text-[#2dd4bf] drop-shadow-[0_0_20px_rgba(45,212,191,0.4)]">SOFTWARE</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-400">
                  SOLUTIONS
                </span>
              </h2>
            </div>

            {/* Action Buttons: Connect With Me & Explore Projects */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              {/* Glowing CONNECT WITH ME Button */}
              <button
                type="button"
                id="hero_connect_with_me_btn"
                onClick={() => onSelectSection('contact')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-400 via-cyan-500 to-purple-600 hover:from-teal-300 hover:via-cyan-400 hover:to-purple-500 text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-[0_0_25px_rgba(20,184,166,0.4)] hover:shadow-[0_0_35px_rgba(20,184,166,0.65)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5"
              >
                <span>CONNECT WITH ME</span>
                <Send className="w-3.5 h-3.5" />
              </button>

              {/* EXPLORE PROJECTS Button */}
              <button
                type="button"
                id="hero_explore_projects_btn"
                onClick={() => onSelectSection('projects')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#0d0c18] hover:bg-[#181628] border border-white/15 hover:border-purple-400/50 text-zinc-200 hover:text-white text-xs font-mono tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-md hover:scale-105"
              >
                <FolderGit2 className="w-4 h-4 text-purple-400" />
                <span>EXPLORE PROJECTS</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            </div>
          </div>

          {/* Social & Contact Channels Dock */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2 border-t border-white/5">
            <a
              href={`tel:${personal.mobile}`}
              className="p-2.5 rounded-xl bg-[#141224] border border-white/10 hover:border-teal-400 text-teal-300 hover:text-white transition-all hover:scale-110 shadow-md"
              aria-label="Call Mobile"
              title={personal.mobile}
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="p-2.5 rounded-xl bg-[#141224] border border-white/10 hover:border-purple-400 text-zinc-300 hover:text-white transition-all hover:scale-110 shadow-md"
              aria-label="Send Email"
              title={contact.email}
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#141224] border border-white/10 hover:border-teal-400 text-zinc-300 hover:text-white transition-all hover:scale-110 shadow-md"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-[#141224] border border-white/10 hover:border-purple-400 text-zinc-300 hover:text-white transition-all hover:scale-110 shadow-md"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <span className="text-[11px] font-mono text-zinc-500 pl-2 hidden sm:inline">
              Available for Software Engineering Roles
            </span>
          </div>
        </motion.div>

        {/* Right Column: 3D HOLOGRAPHIC QUANTUM ORB */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[380px] flex flex-col items-center justify-center"
          >
            {/* 3D Orb Component */}
            <Interactive3DOrb mousePos={mousePos} variant="hero" />

            {/* Floating Tech Badge */}
            <div className="absolute -bottom-2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#100e1e]/90 border border-teal-500/40 text-teal-300 text-xs font-mono shadow-[0_0_20px_rgba(20,184,166,0.3)] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
              <span>Interactive 3D Core • Real-Time Systems</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. Bottom Slide Prompt */}
      <div className="relative z-20 w-full max-w-7xl mx-auto flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono text-zinc-400">
        <span className="flex items-center gap-2 text-zinc-400">
          <Terminal className="w-3.5 h-3.5 text-teal-400" />
          <span>DIRECT: {personal.mobile} • {contact.email}</span>
        </span>
        <button
          type="button"
          onClick={() => onSelectSection('about')}
          className="hover:text-teal-300 transition-colors flex items-center gap-1.5 cursor-pointer text-teal-400 font-semibold animate-bounce"
        >
          <span>EXPLORE SLIDE 02: ABOUT & CS CORE</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
