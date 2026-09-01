import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Send,
  Phone,
  Linkedin,
  Github,
  Check,
  Copy,
  ExternalLink,
  MessageSquare,
  ArrowLeft,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface ContactSectionProps {
  onBackToOrbit: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onBackToOrbit }) => {
  const { personal, socialLinks, contact } = portfolioData;
  const targetEmail = "sirimallachandana4@gmail.com";
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'fallback_ready' | 'error'>('idle');
  const [lastSubmitted, setLastSubmitted] = useState<{ name: string; email: string; message: string } | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(targetEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getMailtoLink = (name: string, senderEmail: string, message: string) => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || 'Prospective Collaborator'}`);
    const body = encodeURIComponent(
      `Hello Chandana,\n\n` +
      `${message}\n\n` +
      `----------------------------------------\n` +
      `Sender Name: ${name}\n` +
      `Sender Email: ${senderEmail}\n` +
      `Sent via: Chandana Sirimalla Portfolio Website`
    );
    return `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  const getGmailLink = (name: string, senderEmail: string, message: string) => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || 'Prospective Collaborator'}`);
    const body = encodeURIComponent(
      `Hello Chandana,\n\n` +
      `${message}\n\n` +
      `----------------------------------------\n` +
      `Sender Name: ${name}\n` +
      `Sender Email: ${senderEmail}\n` +
      `Sent via: Chandana Sirimalla Portfolio Website`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      setStatusMessage('Please fill in all required fields.');
      return;
    }

    setFormStatus('sending');
    const submission = { ...formData };
    setLastSubmitted(submission);

    try {
      // 1. Direct AJAX Delivery to FormSubmit endpoint configured specifically for Chandana's inbox
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: submission.name,
          email: submission.email,
          message: submission.message,
          _subject: `New Portfolio Message from ${submission.name}`,
          _captcha: 'false',
          _template: 'table'
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setStatusMessage(`Message delivered directly to ${targetEmail}!`);
        setFormData({ name: '', email: '', message: '' });
      } else {
        // In case of any endpoint throttling or network policy, provide instant seamless fallback
        setFormStatus('fallback_ready');
        setStatusMessage(`Ready to dispatch to ${targetEmail}`);
      }
    } catch (err) {
      console.warn('Direct HTTP dispatch fallback:', err);
      setFormStatus('fallback_ready');
      setStatusMessage(`Ready to dispatch to ${targetEmail}`);
    }
  };

  return (
    <motion.section
      id="contact_section_panel"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-10 select-none"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
        <button
          type="button"
          id="contact_back_btn"
          onClick={onBackToOrbit}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#141420]/80 hover:bg-[#1f1b33] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-purple-400" />
          <span>Home Slide</span>
        </button>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/50 border border-teal-500/40 text-teal-300 text-xs font-mono shadow-sm">
          <Mail className="w-3.5 h-3.5 text-teal-400" />
          <span className="uppercase tracking-widest text-[10px] font-semibold">
            Recipient: {targetEmail}
          </span>
        </div>
      </div>

      {/* Main Title */}
      <div className="mb-10 space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-teal-300 uppercase tracking-widest">
          <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
          <span>Direct Contact Gateway</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white font-display uppercase tracking-tight">
          Let's Collaborate &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-purple-300">
            Build Software Systems
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl">
          Send a direct message below. Every submission is routed straight to{' '}
          <span className="text-teal-300 font-mono font-medium">{targetEmail}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info & Social Connections */}
        <div className="lg:col-span-5 space-y-5">
          {/* Email Direct Copy Card */}
          <div className="p-6 rounded-3xl bg-[#12121c]/90 border border-teal-500/30 backdrop-blur-md space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-950/60 border border-teal-500/40 text-teal-300 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Target Email Inbox
                </span>
                <span className="text-xs sm:text-sm font-semibold text-teal-300 font-mono break-all select-all">
                  {targetEmail}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                id="copy_email_btn"
                onClick={handleCopyEmail}
                className="w-full py-2.5 px-3 rounded-xl bg-[#181928] hover:bg-[#222038] border border-white/10 hover:border-teal-400/40 text-zinc-200 hover:text-white text-xs font-mono font-medium tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300 text-[11px]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-teal-400" />
                    <span className="text-[11px]">Copy Email</span>
                  </>
                )}
              </button>

              <a
                href={getGmailLink('Inquirer', '', 'Hello Chandana, I would like to connect with you regarding...')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-teal-950/50 hover:bg-teal-900/60 border border-teal-500/40 text-teal-200 hover:text-white text-xs font-mono font-medium tracking-wider transition-all duration-300 flex items-center justify-center gap-2 text-center"
              >
                <ExternalLink className="w-3.5 h-3.5 text-teal-300" />
                <span className="text-[11px]">Open Gmail</span>
              </a>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/5">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>{contact.responseTime}</span>
              </div>
              <a
                href={`tel:${personal.mobile}`}
                className="flex items-center gap-1 text-zinc-300 hover:text-teal-300 transition-colors"
                title={`Call ${personal.mobile}`}
              >
                <Phone className="w-3 h-3 text-teal-400" />
                <span>{personal.mobile}</span>
              </a>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="p-6 rounded-3xl bg-[#12121c]/80 border border-white/10 backdrop-blur-md space-y-3 shadow-xl">
            <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
              Verified Profiles & Channels
            </span>

            <div className="grid grid-cols-2 gap-3">
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                id="contact_linkedin_link"
                className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-400/40 hover:bg-purple-950/20 text-zinc-300 hover:text-white transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono font-medium">LinkedIn</span>
                </div>
                <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-purple-300" />
              </a>

              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                id="contact_github_link"
                className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-400/40 hover:bg-purple-950/20 text-zinc-300 hover:text-white transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-purple-300" />
                  <span className="text-xs font-mono font-medium">GitHub</span>
                </div>
                <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-purple-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Message Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#12121c]/90 border border-purple-500/30 backdrop-blur-md shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <span>Send Direct Email Message</span>
                <Sparkles className="w-4 h-4 text-teal-400" />
              </h3>
              <span className="text-[10px] font-mono text-teal-400 uppercase tracking-wider">
                → {targetEmail}
              </span>
            </div>

            {formStatus === 'success' ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base sm:text-lg font-bold text-emerald-200 font-display">
                    Message Dispatched Successfully!
                  </h4>
                  <p className="text-xs text-zinc-300 font-light max-w-md mx-auto">
                    Your message has been sent directly to <span className="text-teal-300 font-mono font-semibold">{targetEmail}</span>. Chandana will respond shortly!
                  </p>
                </div>

                {lastSubmitted && (
                  <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 text-left font-mono text-[11px] text-zinc-300 space-y-1.5">
                    <p><strong className="text-teal-400">Recipient:</strong> {targetEmail}</p>
                    <p><strong className="text-purple-300">Sender:</strong> {lastSubmitted.name} ({lastSubmitted.email})</p>
                    <p className="text-zinc-400 line-clamp-2"><strong className="text-zinc-300">Message:</strong> {lastSubmitted.message}</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormStatus('idle');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-400 hover:to-purple-500 text-white text-xs font-mono font-semibold transition-all cursor-pointer shadow-lg hover:scale-105"
                  >
                    Send Another Inquiry
                  </button>

                  {lastSubmitted && (
                    <a
                      href={getGmailLink(lastSubmitted.name, lastSubmitted.email, lastSubmitted.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-200 text-xs font-mono transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                      <span>View in Gmail</span>
                    </a>
                  )}
                </div>
              </div>
            ) : formStatus === 'fallback_ready' ? (
              <div className="p-6 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 text-center space-y-4 animate-in fade-in duration-200">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-indigo-200 font-display">
                    Prepared Message for {targetEmail}
                  </h4>
                  <p className="text-xs text-zinc-300 font-light max-w-md mx-auto">
                    Click below to open and deliver your message directly into Gmail Web or your email application:
                  </p>
                </div>

                {lastSubmitted && (
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={getGmailLink(lastSubmitted.name, lastSubmitted.email, lastSubmitted.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-mono font-bold tracking-wider flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open in Gmail Web</span>
                    </a>

                    <a
                      href={getMailtoLink(lastSubmitted.name, lastSubmitted.email, lastSubmitted.message)}
                      className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold tracking-wider flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open Default Mail</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setFormStatus('idle')}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-300 text-xs font-mono transition-colors"
                    >
                      Edit Message
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formStatus === 'error' && (
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                    <span>{statusMessage || 'Please complete all fields.'}</span>
                  </div>
                )}

                <div>
                  <label htmlFor="form_name" className="block text-[11px] font-mono text-zinc-400 mb-1">
                    Your Name / Organization *
                  </label>
                  <input
                    type="text"
                    id="form_name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Hiring Manager / Collaborator"
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a10] border border-white/10 focus:border-teal-400 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="form_email" className="block text-[11px] font-mono text-zinc-400 mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    id="form_email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. recruiter@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a10] border border-white/10 focus:border-teal-400 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="form_message" className="block text-[11px] font-mono text-zinc-400 mb-1">
                    Message Content *
                  </label>
                  <textarea
                    id="form_message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Chandana, we would like to interview you for a Software Engineering role..."
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a10] border border-white/10 focus:border-teal-400 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <button
                    type="submit"
                    id="form_submit_btn"
                    disabled={formStatus === 'sending'}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-teal-500 to-purple-600 hover:from-teal-400 hover:to-purple-500 disabled:opacity-50 text-white text-xs font-mono font-bold tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {formStatus === 'sending' ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting to {targetEmail}...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send to {targetEmail}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={getGmailLink(formData.name || 'Visitor', formData.email || '', formData.message || '')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
                    title="Open directly in Gmail web composer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                    <span>Gmail Web</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
