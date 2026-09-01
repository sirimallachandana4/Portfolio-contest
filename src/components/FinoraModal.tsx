import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Github,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Project } from '../data/portfolio';
import { ProjectMockup } from './ProjectMockup';

interface FinoraModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FinoraModal: React.FC<FinoraModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl bg-[#0e0f18] border border-purple-500/30 rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.2)] overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col"
          >
            {/* Header close bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#121320]/60">
              <div className="flex items-center gap-2.5">
                {project.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/60 text-purple-200 text-[10px] font-mono font-semibold uppercase tracking-wider shadow-sm">
                    <Sparkles className="w-3 h-3 text-purple-300" />
                    Featured Project
                  </span>
                )}
                <span className="text-xs font-mono text-zinc-400">
                  {project.category}
                </span>
              </div>

              <button
                type="button"
                id="modal_close_btn"
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Content: Split View */}
            <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Rich Interactive Mockup Preview */}
              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-2xl bg-[#08080f] border border-white/10 p-2 sm:p-3 shadow-inner">
                  <ProjectMockup type={project.mockupType} />
                </div>

                {project.demoNote && (
                  <p className="text-[11px] font-mono text-zinc-400 bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                    ℹ️ {project.demoNote}
                  </p>
                )}

                {/* Quick Highlights list */}
                {project.highlights && (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {project.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-zinc-300 font-mono"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="text-[11px] truncate">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Project Details, Architecture, and Live Demo */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-display tracking-tight">
                    {project.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-mono text-purple-300 mt-1">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-zinc-300 font-light text-sm leading-relaxed">
                  {project.detailedDescription || project.description}
                </p>

                {/* Tech Stack Pills */}
                <div>
                  <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2.5">
                    Technologies & Libraries
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((techItem) => (
                      <span
                        key={techItem}
                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2.5">
                    Key Features & Functionality
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="modal_live_demo_link"
                      className="flex-1 min-w-[160px] py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-semibold tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_28px_rgba(168,85,247,0.6)] flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id="modal_github_link"
                      className="py-3.5 px-5 rounded-xl bg-[#181928] hover:bg-[#202236] border border-white/10 hover:border-purple-400/40 text-zinc-200 hover:text-white text-xs font-mono font-medium tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Github className="w-4 h-4 text-purple-300" />
                      <span>View GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
