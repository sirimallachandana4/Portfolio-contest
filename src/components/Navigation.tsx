import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Menu,
  X,
  User,
  Code2,
  FolderGit2,
  GraduationCap,
  Award,
  Mail,
  Home,
  FileText
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { AudioPlayer } from './AudioPlayer';

interface NavigationProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  onOpenAI: () => void;
  onOpenResume: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSelectSection,
  onOpenAI,
  onOpenResume
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', num: '01', label: 'HOME', icon: Home },
    { id: 'about', num: '02', label: 'ABOUT', icon: User },
    { id: 'skills', num: '03', label: 'SKILLS', icon: Code2 },
    { id: 'projects', num: '04', label: 'PROJECTS', icon: FolderGit2 },
    { id: 'education', num: '05', label: 'EDUCATION', icon: GraduationCap },
    { id: 'certifications', num: '06', label: 'CERTIFICATES', icon: Award },
    { id: 'contact', num: '07', label: 'CONTACT', icon: Mail }
  ];

  const handleNavClick = (id: string) => {
    onSelectSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 sm:py-3.5 backdrop-blur-xl bg-[#08080c]/90 border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Monogram Logo */}
        <button
          type="button"
          id="nav_logo_btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group focus:outline-none cursor-pointer"
          aria-label="Sirimalla Chandana — Digital Portfolio"
        >
          <div className="w-9 h-9 rounded-full bg-[#161426] border border-teal-400/40 flex items-center justify-center text-teal-300 group-hover:border-teal-300 group-hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] transition-all duration-300">
            <span className="font-mono text-xs font-bold tracking-tight">SC</span>
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-white tracking-wider font-display uppercase">
              SIRIMALLA CHANDANA
            </span>
            <span className="text-[10px] font-mono text-teal-300">
              B.Tech CSE • 8.47 CGPA
            </span>
          </div>
        </button>

        {/* Center: Profile Link & Active Slide Indicator */}
        <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#121020]/90 border border-white/10 backdrop-blur-xl">
          <a
            href={portfolioData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-zinc-400 hover:text-teal-300 transition-colors tracking-tight"
          >
            linkedin.com/in/chandana-sirimalla
          </a>
          <span className="text-zinc-600">/</span>
          <span className="text-xs font-mono font-bold text-teal-300 uppercase tracking-widest">
            {activeSection}
          </span>
        </div>

        {/* Right Nav Menu Items */}
        <div className="flex items-center gap-3 sm:gap-5">
          <nav id="desktop_nav_links" className="hidden lg:flex items-center gap-4 text-xs font-mono tracking-widest uppercase">
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`transition-colors cursor-pointer ${activeSection === 'about' ? 'text-teal-300 font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              ABOUT
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('projects')}
              className={`transition-colors cursor-pointer ${activeSection === 'projects' ? 'text-teal-300 font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              PROJECTS
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('skills')}
              className={`transition-colors cursor-pointer ${activeSection === 'skills' ? 'text-teal-300 font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              SKILLS
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('education')}
              className={`transition-colors cursor-pointer ${activeSection === 'education' ? 'text-teal-300 font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              EDUCATION
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('certifications')}
              className={`transition-colors cursor-pointer ${activeSection === 'certifications' ? 'text-teal-300 font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              CERTIFICATES
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`transition-colors cursor-pointer ${activeSection === 'contact' ? 'text-teal-300 font-bold' : 'text-zinc-400 hover:text-white'}`}
            >
              CONTACT
            </button>
          </nav>

          {/* Ambient Music Synthesizer Player */}
          <AudioPlayer />

          {/* Dedicated RESUME Button */}
          <button
            type="button"
            id="nav_resume_trigger"
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/40 text-teal-300 hover:text-white text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer shadow-sm"
            title="View Full Verified Resume"
          >
            <FileText className="w-3.5 h-3.5 text-teal-300" />
            <span>RESUME</span>
          </button>

          {/* Ask AI Assistant button */}
          <button
            type="button"
            id="nav_ai_trigger"
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#151226] border border-purple-500/30 text-purple-200 hover:border-purple-400 hover:text-white text-xs font-mono tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.15)] group cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-[11px] group-hover:text-white transition-colors">AI</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            id="mobile_nav_toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden pt-4 pb-2 border-t border-white/5 mt-3 space-y-1 overflow-hidden"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  id={`mobile_nav_${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-teal-500/25 border border-teal-500/40 text-teal-200 font-semibold'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-teal-400 font-mono">{item.num}</span>
                    <Icon className="w-4 h-4 text-teal-400" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_#14b8a6]" />}
                </button>
              );
            })}

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                id="mobile_resume_btn"
                onClick={() => {
                  onOpenResume();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500/20 border border-teal-400/40 text-teal-200 text-xs font-mono font-medium cursor-pointer"
              >
                <FileText className="w-4 h-4 text-teal-300" />
                <span>View Full Resume Sheet</span>
              </button>

              <button
                type="button"
                id="mobile_ai_btn"
                onClick={() => {
                  onOpenAI();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/30 border border-purple-400/40 text-white text-xs font-mono font-medium cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-purple-300" />
                <span>Ask AI About Chandana</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
