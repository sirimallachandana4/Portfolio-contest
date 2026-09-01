import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Cpu,
  Layers,
  Sparkles,
  ArrowLeft,
  GraduationCap,
  MapPin,
  CheckCircle2,
  Terminal,
  Code2,
  Boxes,
  Database,
  ArrowRight,
  FileText,
  Phone,
  Mail,
  Award,
  BookOpen,
  FolderGit2
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { About3DVisualizer } from './About3DVisualizer';

interface AboutSectionProps {
  onBackToOrbit: () => void;
  onNavigateToSkills: () => void;
  onNavigateToProjects?: () => void;
  mousePos: { x: number; y: number };
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onBackToOrbit,
  onNavigateToSkills,
  onNavigateToProjects,
  mousePos
}) => {
  const { personal, education, skills, certificates } = portfolioData;
  const [activeTab, setActiveTab] = useState<'profile' | 'cscore' | 'academics'>('profile');

  return (
    <motion.section
      id="about_section_panel"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-3 sm:py-5 select-none"
    >
      {/* Top Slide Header & Sub-Navigation */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/5">
        <button
          type="button"
          id="about_back_btn"
          onClick={onBackToOrbit}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141420]/80 hover:bg-[#1f1b33] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-teal-400" />
          <span>Home Slide</span>
        </button>

        {/* Tab Toggle between "PROFILE", "CS CORE MATRIX", and "ACADEMICS" */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#110e1e] border border-purple-500/30">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-teal-500/30 border border-teal-400 text-teal-200 font-semibold shadow-[0_0_12px_rgba(20,184,166,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            01. ABOUT PROFILE
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cscore')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activeTab === 'cscore'
                ? 'bg-purple-600/40 border border-purple-400 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            02. CS CORE STACK
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('academics')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activeTab === 'academics'
                ? 'bg-indigo-600/40 border border-indigo-400 text-white font-semibold shadow-[0_0_12px_rgba(99,102,241,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            03. ACADEMICS & QUALITIES
          </button>
        </div>

        <button
          type="button"
          onClick={onNavigateToSkills}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121020] border border-purple-500/30 text-purple-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
        >
          <span>3D Skills</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'profile' && (
          /* TAB 1: 3D ANIMATED ABOUT ME PROFILE */
          <motion.div
            key="profile_tab"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]"
          >
            {/* Left Column: Interactive 3D Holographic Core */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative w-full max-w-sm p-5 rounded-3xl bg-[#0f0d1c]/90 border border-teal-500/30 shadow-[0_0_40px_rgba(20,184,166,0.15)] backdrop-blur-xl flex flex-col items-center justify-center">
                {/* 3D Monolith & DNA Data Visualizer */}
                <About3DVisualizer mousePos={mousePos} />

                {/* Key Attributes Grid underneath 3D Core */}
                <div className="w-full grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-white/10 text-center">
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase block">DEGREE</span>
                    <span className="text-xs font-bold text-teal-300">B.Tech CSE (8.47)</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase block">CORE PROFICIENCY</span>
                    <span className="text-xs font-bold text-purple-300">Java • Python • C</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Engineering Passion */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-teal-300 uppercase tracking-widest block">
                  CANDIDATE BIOGRAPHY
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-purple-300 font-display tracking-tight uppercase">
                  SIRIMALLA CHANDANA
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full" />
              </div>

              {/* Bio Narrative */}
              <div className="space-y-3 text-zinc-200 font-light text-sm sm:text-base leading-relaxed bg-[#110e1e]/85 border border-white/10 rounded-3xl p-6 sm:p-7 backdrop-blur-md shadow-2xl">
                <p className="text-zinc-100 font-normal text-base leading-relaxed">
                  A passionate B.Tech student specializing in <span className="text-teal-300 font-semibold">Computer Science and Engineering</span>. I am eager to apply computational knowledge to solve real-world problems and continuously enhance technical and analytical skills in software engineering.
                </p>
                <p className="text-zinc-300 font-light leading-relaxed text-sm">
                  Equipped with strong foundational programming in C, Java (OOPs), and Python, combined with modern full-stack web technologies (HTML, CSS, JavaScript, React.js, Node.js) and data frameworks (Pandas, NumPy, Matplotlib).
                </p>

                {/* Quick Meta Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3 border-t border-white/10 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="block text-[10px] font-mono text-zinc-400 uppercase">COLLEGE</span>
                    <span className="font-semibold text-white truncate block">Vaagdevi Engg College</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="block text-[10px] font-mono text-zinc-400 uppercase">LOCATION</span>
                    <span className="font-semibold text-white">Warangal, India</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 col-span-2 sm:col-span-1">
                    <span className="block text-[10px] font-mono text-zinc-400 uppercase">MOBILE</span>
                    <span className="font-semibold text-teal-300">+91 7382100594</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('cscore')}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-400 hover:to-purple-500 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105"
                >
                  <span>EXPLORE CS CORE STACK</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'cscore' && (
          /* TAB 2: RELOCATED CS CORE PROGRAMMING & SKILLS MATRIX */
          <motion.div
            key="cscore_tab"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[460px]"
          >
            {/* Left Card: Core Programming & DSA */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-[#100e1e]/90 border border-teal-500/30 shadow-xl backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center justify-center">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                        CORE PROGRAMMING & DSA
                      </h3>
                      <span className="text-[10px] font-mono text-teal-300">
                        COMPUTATIONAL FOUNDATIONS
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-950/60 border border-teal-500/40 text-[10px] font-mono text-teal-300 font-bold">
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-teal-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white font-mono">Java (Object-Oriented Programming)</span>
                      <span className="text-xs text-teal-300 font-mono font-bold">Advanced</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light">
                      Classes, inheritance, polymorphism, encapsulation, exception handling, and Java collections framework.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-teal-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white font-mono">Python (Scripting & Analytics)</span>
                      <span className="text-xs text-teal-300 font-mono font-bold">Proficient</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light">
                      Data processing, functional scripting, algorithmic problem solving, and Python libraries.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-teal-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white font-mono">C Language (Systems & Memory)</span>
                      <span className="text-xs text-teal-300 font-mono font-bold">Certified</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light">
                      Pointer arithmetic, dynamic memory allocation, structured programming, and modular builds.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-teal-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white font-mono">Data Structures & Algorithms</span>
                      <span className="text-xs text-teal-300 font-mono font-bold">Core</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light">
                      Arrays, linked lists, stacks, queues, trees, searching, sorting, and algorithmic optimization.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>Cisco Certified C & Python</span>
                <span className="text-teal-300">Vaagdevi CSE 8.47 CGPA</span>
              </div>
            </div>

            {/* Right Card: Web Programming & Data Frameworks */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-[#100e1e]/90 border border-purple-500/30 shadow-xl backdrop-blur-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                        WEB & DATA FRAMEWORKS
                      </h3>
                      <span className="text-[10px] font-mono text-purple-300">
                        APPLICATION ENGINEERING
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-[10px] font-mono text-purple-300 font-bold">
                    MODERN STACK
                  </span>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white font-mono">React.js & JavaScript (ES6+)</span>
                      <span className="text-xs text-purple-300 font-mono font-bold">Frontend</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light">
                      Single-page component architectures, React hooks, state management, asynchronous fetch, and UI design.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white font-mono">HTML5, CSS3 & Tailwind CSS</span>
                      <span className="text-xs text-purple-300 font-mono font-bold">Responsive</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light">
                      Semantic document markup, mobile-first responsive layouts, flexbox, grid systems, and smooth UI animations.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white font-mono">Node.js & Express</span>
                      <span className="text-xs text-purple-300 font-mono font-bold">Backend</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light">
                      Server-side runtime, modular REST API routing, NPM ecosystems, and server integrations.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white font-mono">Pandas, NumPy & Matplotlib</span>
                      <span className="text-xs text-purple-300 font-mono font-bold">Data Analytics</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light">
                      Tabular DataFrame processing, multi-dimensional array operations, and visual statistical chart generation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('academics')}
                  className="text-xs font-mono text-purple-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Academic Milestones</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onNavigateToSkills}
                  className="px-4 py-1.5 rounded-full bg-purple-600/40 hover:bg-purple-600/60 border border-purple-400 text-white text-xs font-mono font-semibold transition-all cursor-pointer"
                >
                  Explore 3D Skills Sphere
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'academics' && (
          /* TAB 3: ACADEMIC TIMELINE & PERSONAL QUALITIES */
          <motion.div
            key="academics_tab"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[460px]"
          >
            {/* Left Column: Education Timeline Cards */}
            <div className="lg:col-span-6 space-y-3">
              <div className="space-y-1 mb-2">
                <span className="text-xs font-mono text-teal-300 uppercase tracking-widest block">
                  ACADEMIC EXCELLENCE
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight">
                  EDUCATION <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-purple-300">TIMELINE</span>
                </h3>
              </div>

              {/* B.Tech */}
              <div className="p-4 rounded-2xl bg-[#110e1e]/90 border border-teal-500/40 space-y-1 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white font-mono">B. Tech in Computer Science & Engg</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-black text-xs font-mono border border-teal-500/30">
                    8.47 CGPA
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-medium">Vaagdevi College of Engineering, Warangal</p>
                <p className="text-[11px] text-zinc-400 font-mono">2024 - 2028 • Currently Pursuing</p>
              </div>

              {/* Intermediate */}
              <div className="p-4 rounded-2xl bg-[#110e1e]/90 border border-purple-500/30 space-y-1 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white font-mono">Intermediate (MPC)</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs font-mono border border-purple-500/30">
                    88% Distinction
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-medium">SR Junior College for Girls, Warangal</p>
                <p className="text-[11px] text-zinc-400 font-mono">2022 - 2024 • Mathematics, Physics, Chemistry</p>
              </div>

              {/* SSC */}
              <div className="p-4 rounded-2xl bg-[#110e1e]/90 border border-white/10 space-y-1 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white font-mono">Secondary School Certificate (SSC)</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-bold text-xs font-mono border border-white/10">
                    9.3 / 10 GPA
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-medium">Govt High School Narendra Nagar, Warangal</p>
                <p className="text-[11px] text-zinc-400 font-mono">2022 • Academic Honors</p>
              </div>
            </div>

            {/* Right Column: Personal Qualities */}
            <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
              <div className="p-5 rounded-3xl bg-[#110e1e]/85 border border-purple-500/30 shadow-xl space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    <h4 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                      PERSONAL STRENGTHS & QUALITIES
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">CORE ETHOS</span>
                </div>

                <div className="space-y-2">
                  {personal.personalQualities.map((q, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-200 p-2 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button to Projects */}
              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className="text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  ← Back to Profile
                </button>

                <button
                  type="button"
                  onClick={onNavigateToSkills}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:scale-105"
                >
                  <span>SEE 3D SKILLS & PROJECTS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
