import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Github,
  Linkedin,
  Mail,
  Phone,
  Play,
  Pause,
  FileText
} from 'lucide-react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsCarousel } from './components/ProjectsCarousel';
import { EducationTimeline } from './components/EducationTimeline';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { AIAssistant } from './components/AIAssistant';
import { ResumeModal } from './components/ResumeModal';
import { LoadingScreen } from './components/LoadingScreen';
import { IntroOpening } from './components/IntroOpening';
import { World3DCanvas } from './components/World3DCanvas';
import { CustomBallCursor } from './components/CustomBallCursor';
import { AudioPlayer } from './components/AudioPlayer';
import { portfolioData } from './data/portfolio';

export type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'education' | 'certifications' | 'contact';

export const SECTIONS: { id: SectionId; num: string; label: string }[] = [
  { id: 'home', num: '01', label: 'HOME' },
  { id: 'about', num: '02', label: 'ABOUT' },
  { id: 'skills', num: '03', label: 'SKILLS' },
  { id: 'projects', num: '04', label: 'PROJECTS' },
  { id: 'education', num: '05', label: 'EDUCATION' },
  { id: 'certifications', num: '06', label: 'CERTIFICATES' },
  { id: 'contact', num: '07', label: 'CONTACT' }
];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(true);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [autoPlayProgress, setAutoPlayProgress] = useState(0);

  const isTransitioningRef = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const bottomScrollAccumulator = useRef(0);
  const topScrollAccumulator = useRef(0);

  // Mouse Parallax tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSelectSection = useCallback((id: string) => {
    const mappedId = id === 'achievements' ? 'certifications' : (id as SectionId);
    setActiveSection(mappedId);
    setAutoPlayProgress(0);
    bottomScrollAccumulator.current = 0;
    topScrollAccumulator.current = 0;
    // Always start at top of new slide
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const goToNextSection = useCallback(() => {
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
    if (currentIndex < SECTIONS.length - 1) {
      handleSelectSection(SECTIONS[currentIndex + 1].id);
    } else {
      // Loop back to home in auto-play or manual
      handleSelectSection(SECTIONS[0].id);
    }
  }, [activeSection, handleSelectSection]);

  const goToPrevSection = useCallback(() => {
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
    if (currentIndex > 0) {
      handleSelectSection(SECTIONS[currentIndex - 1].id);
    }
  }, [activeSection, handleSelectSection]);

  // Auto-Play Slide Timer
  useEffect(() => {
    if (!isAutoPlay || isIntroOpen || isAIOpen || isResumeOpen) return;

    const interval = 80;
    const totalDuration = 7000;
    const step = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setAutoPlayProgress((prev) => {
        if (prev >= 100) {
          goToNextSection();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoPlay, isIntroOpen, isAIOpen, isResumeOpen, goToNextSection]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAIOpen || isResumeOpen) return;

      if (e.key === 'Escape') {
        handleSelectSection('home');
      } else if (e.key === '1') {
        handleSelectSection('home');
      } else if (e.key === '2') {
        handleSelectSection('about');
      } else if (e.key === '3') {
        handleSelectSection('skills');
      } else if (e.key === '4') {
        handleSelectSection('projects');
      } else if (e.key === '5') {
        handleSelectSection('education');
      } else if (e.key === '6') {
        handleSelectSection('certifications');
      } else if (e.key === '7') {
        handleSelectSection('contact');
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNextSection();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevSection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAIOpen, isResumeOpen, handleSelectSection, goToNextSection, goToPrevSection]);

  // Full-Slide-Aware Wheel Navigation
  // Enables users to freely read through the full length of a slide first before moving to next slide
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAIOpen || isResumeOpen || isTransitioningRef.current) return;
      if (Math.abs(e.deltaY) < 15) return;

      const target = e.target as HTMLElement;

      // 1. Check if user is scrolling inside an internal scrollable container (e.g. modal or card)
      const scrollableInside = target?.closest('.overflow-y-auto, .overflow-auto') as HTMLElement | null;
      if (scrollableInside && scrollableInside.scrollHeight > scrollableInside.clientHeight + 10) {
        const isInternalBottom = Math.abs(scrollableInside.scrollHeight - scrollableInside.scrollTop - scrollableInside.clientHeight) < 15;
        const isInternalTop = scrollableInside.scrollTop <= 8;

        if (e.deltaY > 0 && !isInternalBottom) return; // scroll internal down naturally
        if (e.deltaY < 0 && !isInternalTop) return; // scroll internal up naturally
      }

      // 2. Check window/document scroll boundaries for the whole slide
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const isSlideScrollable = docHeight > windowHeight + 35;
      const isAtBottom = (scrollY + windowHeight) >= (docHeight - 30);
      const isAtTop = scrollY <= 15;

      // If slide has content below the fold and user hasn't visited/scrolled to the bottom yet
      if (e.deltaY > 0) {
        topScrollAccumulator.current = 0;
        if (isSlideScrollable && !isAtBottom) {
          // Allow natural window scrolling down so user reads the rest of the slide
          return;
        }

        // At the bottom of the slide, require intentional boundary scroll to advance
        bottomScrollAccumulator.current += e.deltaY;
        if (bottomScrollAccumulator.current > 60 || !isSlideScrollable) {
          bottomScrollAccumulator.current = 0;
          isTransitioningRef.current = true;
          goToNextSection();
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 650);
        }
      } else if (e.deltaY < 0) {
        bottomScrollAccumulator.current = 0;
        if (isSlideScrollable && !isAtTop) {
          // Allow natural window scrolling up so user views the top of the slide
          return;
        }

        // At the top of the slide, require intentional scroll up to go to previous slide
        topScrollAccumulator.current += Math.abs(e.deltaY);
        if (topScrollAccumulator.current > 60 || !isSlideScrollable) {
          topScrollAccumulator.current = 0;
          isTransitioningRef.current = true;
          goToPrevSection();
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 650);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isAIOpen, isResumeOpen, goToNextSection, goToPrevSection]);

  // Touch Swipe (Only triggers slide change when at page boundaries)
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null || isTransitioningRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - touchEndY;

      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const isSlideScrollable = docHeight > windowHeight + 35;
      const isAtBottom = (scrollY + windowHeight) >= (docHeight - 30);
      const isAtTop = scrollY <= 15;

      if (Math.abs(diffY) > 65) {
        if (diffY > 65) {
          // Swipe up (scroll down) -> only if already at bottom or slide fits
          if (!isSlideScrollable || isAtBottom) {
            isTransitioningRef.current = true;
            goToNextSection();
            setTimeout(() => {
              isTransitioningRef.current = false;
            }, 600);
          }
        } else {
          // Swipe down (scroll up) -> only if already at top or slide fits
          if (!isSlideScrollable || isAtTop) {
            isTransitioningRef.current = true;
            goToPrevSection();
            setTimeout(() => {
              isTransitioningRef.current = false;
            }, 600);
          }
        }
      }
      touchStartY.current = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goToNextSection, goToPrevSection]);

  const currentSectionIndex = SECTIONS.findIndex((s) => s.id === activeSection);

  return (
    <div
      id="portfolio_app_root"
      className="relative min-h-screen bg-[#07070a] text-[#f4f4f6] selection:bg-teal-500/30 selection:text-teal-200 overflow-x-hidden font-sans"
    >
      {/* Intro Experience Screen */}
      <AnimatePresence>
        {isIntroOpen && (
          <IntroOpening onDiscover={() => setIsIntroOpen(false)} />
        )}
      </AnimatePresence>

      {/* Short Initial Loading Screen */}
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}

      {/* Custom 3D Ball Cursor */}
      <CustomBallCursor />

      {/* Persistent 3D WebGL Background & Cinematic Camera System */}
      <World3DCanvas
        activeSection={activeSection}
        mousePos={mousePos}
      />

      {/* Spatial Grid Pattern Background Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.025] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10" />

      {/* Top Floating Controls: Ambient Audio & Resume */}
      <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-40 flex items-center gap-2.5">
        <AudioPlayer />
        <button
          type="button"
          onClick={() => setIsResumeOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#121020]/90 hover:bg-[#1e1b33] border border-teal-500/30 hover:border-teal-400 text-teal-200 hover:text-white text-xs font-mono tracking-wider transition-all duration-300 backdrop-blur-xl shadow-lg cursor-pointer"
          title="Open Resume Document"
        >
          <FileText className="w-3.5 h-3.5 text-teal-400" />
          <span className="hidden sm:inline">RESUME</span>
        </button>
      </div>

      {/* Main Spatial Stage with Smooth Slide Animation */}
      <main className="relative pt-6 sm:pt-10 pb-24 min-h-screen flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <HeroSection
                activeSection={activeSection}
                onSelectSection={handleSelectSection}
                mousePos={mousePos}
              />
            </motion.div>
          )}

          {activeSection === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <AboutSection
                onBackToOrbit={() => handleSelectSection('home')}
                onNavigateToSkills={() => handleSelectSection('skills')}
                onNavigateToProjects={() => handleSelectSection('projects')}
                mousePos={mousePos}
              />
            </motion.div>
          )}

          {activeSection === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <SkillsSection
                onBackToOrbit={() => handleSelectSection('home')}
                onNavigateProjects={() => handleSelectSection('projects')}
              />
            </motion.div>
          )}

          {activeSection === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectsCarousel
                onBackToOrbit={() => handleSelectSection('home')}
              />
            </motion.div>
          )}

          {activeSection === 'education' && (
            <motion.div
              key="education"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <EducationTimeline
                onBackToOrbit={() => handleSelectSection('home')}
              />
            </motion.div>
          )}

          {activeSection === 'certifications' && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <CertificationsSection
                onBackToOrbit={() => handleSelectSection('home')}
                onNavigateToContact={() => handleSelectSection('contact')}
              />
            </motion.div>
          )}

          {activeSection === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContactSection
                onBackToOrbit={() => handleSelectSection('home')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Left Vertical Quick Social Dock */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3.5">
        <a
          href={`tel:${portfolioData.personal.mobile}`}
          className="p-2.5 rounded-full bg-[#110e1e]/85 border border-white/10 hover:border-teal-400 text-zinc-400 hover:text-teal-300 hover:scale-110 transition-all backdrop-blur-md shadow-lg"
          title={`Call: ${portfolioData.personal.mobile}`}
        >
          <Phone className="w-3.5 h-3.5" />
        </a>
        <a
          href={portfolioData.socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-[#110e1e]/85 border border-white/10 hover:border-teal-400 text-zinc-400 hover:text-teal-300 hover:scale-110 transition-all backdrop-blur-md shadow-lg"
          title="LinkedIn"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </a>
        <a
          href={`mailto:${portfolioData.contact.email}`}
          className="p-2.5 rounded-full bg-[#110e1e]/85 border border-white/10 hover:border-purple-400 text-zinc-400 hover:text-white hover:scale-110 transition-all backdrop-blur-md shadow-lg"
          title="Email"
        >
          <Mail className="w-3.5 h-3.5" />
        </a>
        <a
          href={portfolioData.socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-full bg-[#110e1e]/85 border border-white/10 hover:border-purple-400 text-zinc-400 hover:text-white hover:scale-110 transition-all backdrop-blur-md shadow-lg"
          title="GitHub"
        >
          <Github className="w-3.5 h-3.5" />
        </a>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      {/* Center Bottom Slide Controller */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 sm:gap-3 px-3.5 sm:px-5 py-2 rounded-full bg-[#100e1e]/90 border border-purple-500/30 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.7)] select-none">
        
        {/* Prev Slide Button */}
        <button
          type="button"
          onClick={goToPrevSection}
          disabled={currentSectionIndex === 0}
          className="p-1.5 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer"
          title="Previous Slide"
          aria-label="Previous Slide"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>

        {/* Slide Dots / Indicators */}
        <div className="flex items-center gap-1.5 px-2">
          {SECTIONS.map((sec) => {
            const isActive = sec.id === activeSection;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => handleSelectSection(sec.id)}
                className={`relative transition-all duration-300 rounded-full cursor-pointer group ${
                  isActive
                    ? 'w-7 sm:w-8 h-2 bg-gradient-to-r from-teal-400 to-purple-400 shadow-[0_0_10px_rgba(20,184,166,0.5)]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/50'
                }`}
                title={`Jump to ${sec.num}: ${sec.label}`}
                aria-label={`Slide ${sec.num}: ${sec.label}`}
              >
                {isActive && isAutoPlay && (
                  <span
                    className="absolute inset-0 bg-white/40 rounded-full transition-all duration-75"
                    style={{ width: `${autoPlayProgress}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Current Slide Label */}
        <span className="text-[10px] sm:text-xs font-mono text-teal-300 font-bold tracking-widest px-1 hidden sm:inline">
          {SECTIONS[currentSectionIndex]?.num} / {SECTIONS[currentSectionIndex]?.label}
        </span>

        {/* Next Slide Button */}
        <button
          type="button"
          onClick={goToNextSection}
          disabled={currentSectionIndex === SECTIONS.length - 1}
          className="p-1.5 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white disabled:opacity-25 disabled:pointer-events-none transition-all cursor-pointer"
          title="Next Slide"
          aria-label="Next Slide"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Auto-Play Slide Progression Toggle */}
        <button
          type="button"
          onClick={() => {
            setIsAutoPlay(!isAutoPlay);
            setAutoPlayProgress(0);
          }}
          className={`p-1.5 rounded-full border transition-all cursor-pointer ${
            isAutoPlay
              ? 'bg-teal-500/25 border-teal-400 text-teal-300'
              : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
          }`}
          title={isAutoPlay ? "Pause Automatic Slide Transition" : "Auto-advance Slides (7s per slide)"}
          aria-label="Toggle Auto Play Slides"
        >
          {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
      </div>

      {/* Floating AI Assistant Trigger (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center">
        <button
          type="button"
          id="floating_ai_trigger"
          onClick={() => setIsAIOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#131024]/95 hover:bg-[#201a3c] border border-purple-500/40 hover:border-purple-400 text-purple-200 hover:text-white shadow-[0_8px_30px_rgba(168,85,247,0.25)] hover:shadow-[0_8px_35px_rgba(168,85,247,0.4)] backdrop-blur-md text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer group"
          title="Ask AI about Sirimalla Chandana's skills & projects"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
          </span>
          <span className="hidden sm:inline">Ask AI</span>
          <Sparkles className="w-3.5 h-3.5 text-purple-300 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Interactive Resume Modal Sheet */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Global AI Assistant Modal Panel */}
      <AIAssistant
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onNavigateSection={handleSelectSection}
      />

      {/* Minimal Aesthetic Footer */}
      <footer className="w-full py-5 px-6 border-t border-white/5 bg-[#07070a] text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] tracking-wider uppercase text-zinc-400">
            © {new Date().getFullYear()} SIRIMALLA CHANDANA // SOFTWARE DEVELOPER & ENGINEER
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              type="button"
              onClick={() => handleSelectSection('home')}
              className="hover:text-teal-300 transition-colors cursor-pointer"
            >
              Home Slide
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="hover:text-teal-300 transition-colors cursor-pointer"
            >
              Resume Sheet
            </button>
            <span>•</span>
            <a
              href={portfolioData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition-colors"
            >
              LinkedIn ↗
            </a>
            <span>•</span>
            <a
              href={portfolioData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-300 transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
