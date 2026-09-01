import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, Linkedin, Award, BookOpen, Code, CheckCircle, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { personal, education, skills, achievements, socialLinks, contact } = portfolioData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
          {/* Backdrop Click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0"
          />

          {/* Modal Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 w-full max-w-4xl bg-[#0f0d1a] border border-purple-500/30 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
          >
            {/* Modal Header Controls */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#141224] border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 font-bold text-xs">
                  CV
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                    Sirimalla Chandana — Verified Resume
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-400">
                    B.Tech CSE • Vaagdevi College of Engineering • 8.47 CGPA
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Print / Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-teal-300" />
                  <span className="hidden sm:inline">Print / Save PDF</span>
                </button>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/50 text-xs font-mono text-purple-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Content Body (Styled exactly like the uploaded resume document) */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#fdfdfd] text-[#1c2a38] print:p-0 print:bg-white font-sans">
              <div className="max-w-3xl mx-auto shadow-sm rounded-xl overflow-hidden border border-slate-200 bg-white grid grid-cols-1 md:grid-cols-12 min-h-[780px]">
                
                {/* LEFT COLUMN: Cyan / Teal Contact & Skills Sidebar (Matching Resume) */}
                <div className="md:col-span-4 bg-[#0fa3d6] text-white p-6 flex flex-col justify-between space-y-6">
                  <div className="space-y-6">
                    
                    {/* CONTACT BOX */}
                    <div className="space-y-3 pb-6 border-b border-white/20">
                      <h4 className="text-base font-black tracking-widest uppercase border-b-2 border-white pb-1 font-display">
                        CONTACT
                      </h4>
                      <div className="space-y-3 text-xs leading-relaxed font-sans">
                        <div>
                          <span className="font-bold block text-white/90">Mobile:</span>
                          <a href={`tel:${personal.mobile}`} className="hover:underline text-white font-medium">
                            {personal.mobile}
                          </a>
                        </div>

                        <div>
                          <span className="font-bold block text-white/90">Email:</span>
                          <a href={`mailto:${contact.email}`} className="hover:underline text-white break-all font-medium text-[11px]">
                            {contact.email}
                          </a>
                        </div>

                        <div>
                          <span className="font-bold block text-white/90">Address:</span>
                          <p className="text-white/95 text-[11px] leading-snug">
                            {personal.address}
                          </p>
                        </div>

                        <div>
                          <span className="font-bold block text-white/90">LinkedIn:</span>
                          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline text-[11px] break-all text-white font-medium">
                            linkedin.com/in/chandana-sirimalla
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* SKILLS BOX */}
                    <div className="space-y-4">
                      <h4 className="text-base font-black tracking-widest uppercase border-b-2 border-white pb-1 font-display">
                        SKILLS
                      </h4>

                      {/* CORE PROGRAMMING */}
                      <div className="space-y-1 text-xs">
                        <span className="font-black tracking-wide text-white uppercase text-[11px] block">
                          CORE PROGRAMMING
                        </span>
                        <ul className="space-y-1 pl-2 text-white/95 text-xs">
                          <li>• C</li>
                          <li>• JAVA</li>
                          <li>• PYTHON</li>
                          <li>• DSA SOLVING</li>
                        </ul>
                      </div>

                      {/* WEB PROGRAMMING */}
                      <div className="space-y-1 text-xs">
                        <span className="font-black tracking-wide text-white uppercase text-[11px] block">
                          WEB PROGRAMMING
                        </span>
                        <ul className="space-y-1 pl-2 text-white/95 text-xs">
                          <li>• HTML</li>
                          <li>• CSS</li>
                          <li>• NODE</li>
                          <li>• JAVA SCRIPT</li>
                        </ul>
                      </div>

                      {/* LIBRARIES & FRAMEWORKS */}
                      <div className="space-y-1 text-xs">
                        <span className="font-black tracking-wide text-white uppercase text-[11px] block">
                          LIBRARIES & FRAMEWORKS
                        </span>
                        <ul className="space-y-1 pl-2 text-white/95 text-xs">
                          <li>• React.js</li>
                          <li>• Node.js</li>
                          <li>• Pandas, Numpy</li>
                          <li>• Matplotlib</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20 text-[10px] text-white/80 font-mono">
                    Updated September 2026
                  </div>
                </div>

                {/* RIGHT COLUMN: Main Body (About, Education, Qualities, Certifications) */}
                <div className="md:col-span-8 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
                  
                  {/* Big Name Header */}
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#1b3b6f] tracking-tight uppercase font-display">
                      SIRIMALLA CHANDANA
                    </h1>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                      B.Tech Computer Science & Engineering Student
                    </p>
                  </div>

                  {/* ABOUT ME */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 border-b border-[#1b3b6f]/30 pb-1">
                      <h4 className="text-sm font-bold text-[#1b3b6f] uppercase tracking-wider">
                        About Me:
                      </h4>
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-sans pl-2">
                      {personal.introSummary}
                    </p>
                  </div>

                  {/* EDUCATION */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-[#1b3b6f]/30 pb-1">
                      <h4 className="text-sm font-bold text-[#1b3b6f] uppercase tracking-wider">
                        Education:
                      </h4>
                    </div>
                    
                    <div className="space-y-3 pl-2">
                      {/* B.Tech */}
                      <div className="flex items-start justify-between gap-2 text-xs">
                        <div>
                          <h5 className="font-bold text-slate-900">B. Tech</h5>
                          <p className="text-slate-600 text-[11px]">Vaagdevi college of Engineering, Warangal</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-bold text-slate-900 block">2028</span>
                          <span className="font-black text-[#0fa3d6] text-xs">8.47 CGPA</span>
                        </div>
                      </div>

                      {/* Intermediate */}
                      <div className="flex items-start justify-between gap-2 text-xs">
                        <div>
                          <h5 className="font-bold text-slate-900">Intermediate</h5>
                          <p className="text-slate-600 text-[11px]">SR junior college for girls, Warangal</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-bold text-slate-900 block">2024</span>
                          <span className="font-black text-slate-800 text-xs">88%</span>
                        </div>
                      </div>

                      {/* SSC */}
                      <div className="flex items-start justify-between gap-2 text-xs">
                        <div>
                          <h5 className="font-bold text-slate-900">SSC</h5>
                          <p className="text-slate-600 text-[11px]">Govt High School Narendra Nagar, Warangal</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-bold text-slate-900 block">2022</span>
                          <span className="font-black text-slate-800 text-xs">9.3 / 10</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PERSONAL QUALITIES */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 border-b border-[#1b3b6f]/30 pb-1">
                      <h4 className="text-sm font-bold text-[#1b3b6f] uppercase tracking-wider">
                        Personal Qualities:
                      </h4>
                    </div>
                    <ul className="space-y-1 pl-2 text-xs text-slate-700">
                      {personal.personalQualities.map((quality, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-[#0fa3d6] font-bold">•</span>
                          <span>{quality}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CERTIFICATIONS */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 border-b border-[#1b3b6f]/30 pb-1">
                      <h4 className="text-sm font-bold text-[#1b3b6f] uppercase tracking-wider">
                        Certifications:
                      </h4>
                    </div>
                    <ul className="space-y-1 pl-2 text-xs text-slate-700">
                      {personal.certifications.map((cert, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-[#0fa3d6] font-bold">•</span>
                          <span className="font-medium text-slate-900">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </div>

            {/* Bottom Footer Actions */}
            <div className="px-6 py-4 bg-[#141224] border-t border-white/10 flex items-center justify-between shrink-0 text-xs font-mono">
              <span className="text-zinc-400">
                Contact: <span className="text-white">+91 7382100594</span> • <span className="text-teal-300">sirimallachandana4@gmail.com</span>
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
