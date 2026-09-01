import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  FolderGit2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  ExternalLink
} from 'lucide-react';
import { portfolioData, Project } from '../data/portfolio';
import { ProjectCard } from './ProjectCard';
import { FinoraModal } from './FinoraModal';

interface ProjectsCarouselProps {
  onBackToOrbit: () => void;
}

export const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ onBackToOrbit }) => {
  const { projects } = portfolioData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation for arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return;
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <motion.section
      id="projects_section_panel"
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10"
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5">
        <button
          type="button"
          id="projects_back_btn"
          onClick={onBackToOrbit}
          className="w-fit flex items-center gap-2 px-4 py-2 rounded-full bg-[#141420]/80 hover:bg-[#1f1b33] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-purple-400" />
          <span>Orbit View</span>
        </button>

        {/* Carousel controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest text-[10px] font-semibold">
              Project Space ({currentIndex + 1} / {projects.length})
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              id="carousel_prev_btn"
              onClick={handlePrev}
              className="p-2 rounded-xl bg-[#141420]/80 hover:bg-purple-950/50 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              id="carousel_next_btn"
              onClick={handleNext}
              className="p-2 rounded-xl bg-[#141420]/80 hover:bg-purple-950/50 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
              aria-label="Next project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Title */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-300 uppercase tracking-widest mb-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Engineered Applications</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white font-display">
          Full-Stack Systems &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
            Intelligent Architectures
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1 max-w-2xl">
          Demonstrating production-level engineering, dynamic UI composition, modern databases, and AI API integrations.
        </p>
      </div>

      {/* Grid / Carousel of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            isActive={currentIndex === idx}
            onOpenDetails={handleOpenDetails}
          />
        ))}
      </div>

      {/* Bottom Carousel Indicator dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {projects.map((project, idx) => (
          <button
            key={project.id}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx
                ? 'w-8 bg-purple-500 shadow-[0_0_10px_#a855f7]'
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to project ${project.title}`}
          />
        ))}
      </div>

      {/* Detailed Modal */}
      <FinoraModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </motion.section>
  );
};
