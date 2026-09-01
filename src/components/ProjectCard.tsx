import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Sparkles, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Project } from '../data/portfolio';
import { ProjectMockup } from './ProjectMockup';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isActive,
  onOpenDetails
}) => {
  return (
    <motion.div
      id={`project_card_${project.id}`}
      layout
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.25 }
      }}
      className={`relative w-full max-w-md sm:max-w-lg rounded-3xl p-6 sm:p-7 transition-all duration-500 flex flex-col justify-between backdrop-blur-md ${
        project.featured
          ? 'bg-[#121124]/90 border border-purple-500/50 shadow-[0_12px_40px_rgba(168,85,247,0.18)] hover:border-purple-400 hover:shadow-[0_16px_50px_rgba(168,85,247,0.3)]'
          : 'bg-[#12121c]/80 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-purple-500/30'
      }`}
    >
      {/* Top Header Badge bar */}
      <div className="flex items-center justify-between gap-3 mb-4">
        {project.featured ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400 text-purple-200 text-[10px] font-mono font-semibold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3 h-3 text-purple-300" />
            Featured Project
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-mono uppercase tracking-wider">
            {project.category}
          </span>
        )}

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>{project.status}</span>
          <span className="text-zinc-600">•</span>
          <span>{project.year}</span>
        </div>
      </div>

      {/* Project Mockup Visual Stage */}
      <div
        onClick={() => onOpenDetails(project)}
        className="relative rounded-2xl bg-[#090910] border border-white/10 overflow-hidden cursor-pointer group mb-5 transition-transform"
      >
        <ProjectMockup type={project.mockupType} />
        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-purple-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono font-semibold">
          <span>Click to Inspect System</span>
          <ArrowUpRight className="w-4 h-4 text-purple-300" />
        </div>
      </div>

      {/* Title & Description */}
      <div className="space-y-2 mb-5">
        <h3 className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight flex items-center justify-between">
          <span>{project.title}</span>
          <button
            type="button"
            onClick={() => onOpenDetails(project)}
            className="text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors p-1"
            title="Expand project view"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </h3>
        <p className="text-xs font-mono text-purple-300 font-medium">
          {project.tagline}
        </p>
        <p className="text-xs text-zinc-300 font-light leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      {/* Tech Stack Chips */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.tech.slice(0, 5).map((techItem) => (
          <span
            key={techItem}
            className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300"
          >
            {techItem}
          </span>
        ))}
        {project.tech.length > 5 && (
          <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-zinc-400">
            +{project.tech.length - 5}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`project_demo_btn_${project.id}`}
            className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-semibold tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_22px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`project_gh_btn_${project.id}`}
            className="py-2.5 px-3.5 rounded-xl bg-[#181928] hover:bg-[#202236] border border-white/10 hover:border-purple-400/40 text-zinc-300 hover:text-white text-xs font-mono font-medium tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
            title="View GitHub Repository"
          >
            <Github className="w-3.5 h-3.5 text-purple-300" />
            <span className="hidden sm:inline">Code</span>
          </a>
        )}

        <button
          type="button"
          id={`project_details_btn_${project.id}`}
          onClick={() => onOpenDetails(project)}
          className="py-2.5 px-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono font-medium tracking-wider transition-all duration-300 cursor-pointer"
        >
          Details
        </button>
      </div>
    </motion.div>
  );
};
