import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, CheckCircle2, ShieldCheck, Download, ExternalLink, Calendar, User, FileText, Sparkles } from 'lucide-react';
import { CertificateItem } from '../data/portfolio';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  isOpen,
  onClose
}) => {
  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl bg-[#0e0d17] border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-zinc-100 flex flex-col my-auto max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141224]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-teal-300 uppercase tracking-widest block font-semibold">
                    {certificate.badge} • {certificate.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    {certificate.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Certificate Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content - Realistic Certificate Presentation Canvas */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* Realistic Certificate Frame */}
              <div className="relative rounded-2xl bg-[#fbfaf6] text-[#1c1917] p-6 sm:p-10 border-4 border-[#292524]/15 shadow-inner select-none font-sans overflow-hidden">
                {/* Decorative border insets */}
                <div className="absolute inset-2 border border-[#78716c]/30 rounded-xl pointer-events-none" />
                <div className="absolute inset-3.5 border border-dashed border-[#a8a29e]/40 rounded-lg pointer-events-none" />

                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
                  <Award className="w-96 h-96 text-[#1c1917]" />
                </div>

                {/* Top Logos & Issuers */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#e7e5e4] pb-4">
                  <div className="text-left">
                    <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#78716c] uppercase font-bold block">
                      OFFICIAL CREDENTIAL
                    </span>
                    <span className="font-display font-black text-sm sm:text-base text-[#1c1917] tracking-tight">
                      {certificate.issuer}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full bg-[#1c1917] text-[#fafaf9] text-[10px] font-mono font-bold tracking-wider uppercase">
                      VERIFIED ACADEMIC RECORD
                    </span>
                  </div>
                </div>

                {/* Certificate Body */}
                <div className="relative z-10 text-center py-6 sm:py-8 space-y-4">
                  <p className="text-xs sm:text-sm uppercase tracking-widest text-[#78716c] font-mono">
                    This is proudly presented / awarded to
                  </p>

                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0c0a09] tracking-tight py-1">
                    SIRIMALLA CHANDANA
                  </h2>

                  <p className="text-xs sm:text-sm text-[#57534e] max-w-xl mx-auto italic font-serif leading-relaxed">
                    for successfully completing and fulfilling all curriculum requirements for
                  </p>

                  <div className="inline-block px-6 py-2 rounded-xl bg-[#1c1917]/5 border border-[#1c1917]/10">
                    <h4 className="text-lg sm:text-2xl font-display font-black text-[#1c1917] tracking-tight">
                      {certificate.title}
                    </h4>
                  </div>

                  <p className="text-xs text-[#78716c] max-w-lg mx-auto leading-relaxed font-sans pt-1">
                    Offered through {certificate.organization}
                  </p>
                </div>

                {/* Signatures & Dates Footer */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#e7e5e4] items-end text-xs text-[#44403c]">
                  <div className="space-y-1">
                    <div className="font-serif italic font-semibold text-sm text-[#1c1917]">
                      {certificate.instructorOrSignee || "Authorized Signatory"}
                    </div>
                    <div className="h-[1px] w-44 bg-[#78716c]/40 my-1" />
                    <span className="text-[10px] font-mono text-[#78716c] uppercase block">
                      Instructor / Event Authority
                    </span>
                  </div>

                  <div className="sm:text-right space-y-1">
                    <div className="font-mono text-xs text-[#1c1917] font-bold">
                      {certificate.issueDate}
                    </div>
                    <div className="h-[1px] w-36 bg-[#78716c]/40 my-1 sm:ml-auto" />
                    <span className="text-[10px] font-mono text-[#78716c] uppercase block">
                      {certificate.credentialId ? `Code: ${certificate.credentialId}` : 'Date of Completion / Event'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Certificate Metadata & Skills Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <span className="text-xs font-mono text-teal-300 font-bold uppercase tracking-wider block">
                    Curriculum & Skills Mastered
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {certificate.skillsCovered.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-200 text-xs font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <span className="text-xs font-mono text-purple-300 font-bold uppercase tracking-wider block">
                    Program Scope & Impact
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    {certificate.description}
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Bottom Actions */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#121020] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Credential Record</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
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
