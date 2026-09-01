import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Trophy,
  Code2,
  Cpu,
  Layers,
  FileText,
  Search,
  Eye
} from 'lucide-react';
import { portfolioData, CertificateItem } from '../data/portfolio';
import { CertificateModal } from './CertificateModal';

interface CertificationsSectionProps {
  onBackToOrbit: () => void;
  onNavigateToContact?: () => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  onBackToOrbit,
  onNavigateToContact
}) => {
  const { certificates, achievements } = portfolioData;
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'technical' | 'participation'>('all');
  const [activeModalCert, setActiveModalCert] = useState<CertificateItem | null>(null);

  const filteredCerts = certificates.filter((cert) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'technical') return cert.category === 'Technical Certification' || cert.category === 'Cloud & AI';
    if (selectedFilter === 'participation') return cert.category === 'National Participation';
    return true;
  });

  return (
    <motion.section
      id="certifications_section_panel"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 select-none"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5">
        <button
          type="button"
          id="certifications_back_btn"
          onClick={onBackToOrbit}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141420]/80 hover:bg-[#1f1b33] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-teal-400" />
          <span>Home Slide</span>
        </button>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#110e1e] border border-purple-500/30">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-teal-500/30 border border-teal-400 text-teal-200 font-semibold shadow-[0_0_12px_rgba(20,184,166,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            ALL (7)
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('technical')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              selectedFilter === 'technical'
                ? 'bg-purple-600/40 border border-purple-400 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            TECHNICAL & CLOUD (5)
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('participation')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              selectedFilter === 'participation'
                ? 'bg-amber-600/30 border border-amber-400 text-amber-200 font-semibold shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            IEEE PARTICIPATION (2)
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/40 border border-teal-500/30 text-teal-300 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="uppercase tracking-widest text-[10px] font-semibold">
            VERIFIED CREDENTIALS
          </span>
        </div>
      </div>

      {/* Title block */}
      <div className="mb-6 space-y-1.5">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-teal-300 uppercase tracking-widest">
          <Trophy className="w-3.5 h-3.5 text-teal-400" />
          <span>Certifications & IEEE National Participation</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white font-display uppercase tracking-tight">
          VERIFIED <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-purple-300">CREDENTIALS</span> & RECOGNITIONS
        </h2>
        <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-2xl">
          Authorized certifications from Cisco Networking Academy and Simplilearn SkillUp, alongside competitive participation in IEEE Flagship Congresses (NSPAC '24 & SPYRO 6.0).
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        <AnimatePresence>
          {filteredCerts.map((cert, index) => {
            const isParticipation = cert.category === 'National Participation';
            const themeBorder = isParticipation
              ? 'hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]'
              : 'hover:border-teal-400/50 hover:shadow-[0_0_30px_rgba(20,184,166,0.15)]';

            return (
              <motion.div
                key={cert.id}
                id={`cert_card_${cert.id}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className={`relative p-5 rounded-3xl bg-[#100e1e]/85 border border-white/10 ${themeBorder} transition-all duration-300 backdrop-blur-md flex flex-col justify-between group shadow-xl`}
              >
                <div>
                  {/* Top Badge & Date */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold ${
                        isParticipation
                          ? 'bg-amber-950/60 border border-amber-500/40 text-amber-300'
                          : 'bg-teal-950/60 border border-teal-500/40 text-teal-300'
                      }`}
                    >
                      {cert.badge}
                    </span>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                      <Calendar className="w-3 h-3 text-zinc-400" />
                      <span>{cert.issueDate}</span>
                    </div>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="text-base sm:text-lg font-bold text-white font-display group-hover:text-teal-200 transition-colors leading-snug mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mb-3">
                    {cert.issuer}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-zinc-300 font-light leading-relaxed mb-4 line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.skillsCovered.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-[10px] font-mono text-zinc-300"
                      >
                        {s}
                      </span>
                    ))}
                    {cert.skillsCovered.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-white/[0.04] text-[10px] font-mono text-zinc-400">
                        +{cert.skillsCovered.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Action: View Certificate Document */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400 truncate max-w-[150px]">
                    {cert.organization}
                  </span>

                  <button
                    type="button"
                    onClick={() => setActiveModalCert(cert)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/40 text-teal-300 hover:text-white text-xs font-mono transition-all cursor-pointer shadow-sm"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Realistic Certificate Modal */}
      <CertificateModal
        certificate={activeModalCert}
        isOpen={!!activeModalCert}
        onClose={() => setActiveModalCert(null)}
      />
    </motion.section>
  );
};
