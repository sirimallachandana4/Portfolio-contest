import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ExternalLink,
  Code2,
  FolderGit2,
  GraduationCap,
  Mail,
  CheckCircle2
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  linkAction?: {
    label: string;
    sectionId?: string;
    externalUrl?: string;
  };
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  isOpen,
  onClose,
  onNavigateSection
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I am Chandana Sirimalla's Portfolio Intelligence assistant. You can ask me about her technical skills, her featured Finora AI project, full-stack architectures, education, or contact details.",
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sampleQuestions = [
    "What is Finora AI?",
    "What technologies does Chandana know?",
    "Show me Chandana's projects",
    "Tell me about her education",
    "How can I contact her?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const generateAnswer = (query: string): { text: string; linkAction?: Message['linkAction'] } => {
    const q = query.toLowerCase();

    // Finora AI
    if (q.includes('finora') || q.includes('expense') || q.includes('tracker')) {
      return {
        text: "Finora AI is Chandana's featured project — a smart expense tracker and financial intelligence web application. It features live income/expense analytics, category-wise breakdown charts, budget tracking, real-time sync, and an AI advisor. Built with React, TypeScript, Tailwind CSS, Recharts, and Firebase.",
        linkAction: {
          label: "Open Finora AI Live Demo ↗",
          externalUrl: "https://finora-ai-sepia.vercel.app/"
        }
      };
    }

    // Skills & Technologies
    if (q.includes('skill') || q.includes('technolog') || q.includes('know') || q.includes('stack') || q.includes('mern') || q.includes('react') || q.includes('node') || q.includes('mongo')) {
      const proficient = portfolioData.skills.filter(s => s.category === 'proficient').map(s => s.name).join(', ');
      const familiar = portfolioData.skills.filter(s => s.category === 'familiar').map(s => s.name).join(', ');
      return {
        text: `Chandana is a MERN Stack Developer & Software Engineer.\n\n• Proficient Skills: ${proficient}\n• Familiar & Applied: ${familiar}\n\nShe specializes in creating clean React frontend architectures and scalable Node.js/Express backends connected to MongoDB databases.`,
        linkAction: {
          label: "Explore Skills Space",
          sectionId: "skills"
        }
      };
    }

    // Projects
    if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('slides') || q.includes('student') || q.includes('analys')) {
      return {
        text: "Chandana has built three verified, completed applications:\n\n1. Finora AI (Featured): Smart Expense Tracker & Financial Intelligence.\n2. AI Presentation Suite: Full-stack slide generator powered by Gemini & React with PPTX/PDF export.\n3. Student Performance Analyzer: Academic evaluation & student record management system with Flask & Matplotlib.",
        linkAction: {
          label: "View All Projects",
          sectionId: "projects"
        }
      };
    }

    // Education & Background
    if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('study') || q.includes('b.tech') || q.includes('university') || q.includes('student')) {
      const edu = portfolioData.education[0];
      return {
        text: `Chandana is pursuing her ${edu.degree} in ${edu.institution} (${edu.year}). Her curriculum centers on Data Structures, Algorithms, Computer Networks, Database Management Systems, and Software Engineering, paired with extensive full-stack MERN practice.`,
        linkAction: {
          label: "View Academic Timeline",
          sectionId: "education"
        }
      };
    }

    // Contact
    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('linkedin') || q.includes('github') || q.includes('message')) {
      return {
        text: `You can reach Chandana directly via:\n\n• Email: ${portfolioData.contact.email}\n• LinkedIn: linkedin.com/in/sirimalla-chandana-83b58a32b\n• GitHub: github.com/sirimallachandana4\n\nShe is currently open to Software Engineering roles and technical opportunities.`,
        linkAction: {
          label: "Go to Contact Panel",
          sectionId: "contact"
        }
      };
    }

    // Achievements
    if (q.includes('achieve') || q.includes('certif') || q.includes('award') || q.includes('honor')) {
      return {
        text: "Chandana's verified milestones include the successful architectural launch of Finora AI, full-stack Gemini AI integration in AI Presentation Suite, academic honors in student performance management systems, and demonstrated MERN proficiency.",
        linkAction: {
          label: "Inspect Achievements Space",
          sectionId: "achievements"
        }
      };
    }

    // Default Fallback strictly based on portfolio facts
    return {
      text: "Chandana Sirimalla is an aspiring Software Engineer and MERN Stack Developer. She has architected Finora AI (smart expense tracker), AI Presentation Suite, and Student Performance Analyzer. Feel free to ask about her technical skills, education, or project architectures!",
      linkAction: {
        label: "Explore Projects",
        sectionId: "projects"
      }
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText.trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    setTimeout(() => {
      const response = generateAnswer(query);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.text,
        timestamp: 'Now',
        linkAction: response.linkAction
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 450);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-6">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* AI Panel Container */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full sm:max-w-lg bg-[#0e0e18] border border-purple-500/30 rounded-t-3xl sm:rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.25)] overflow-hidden z-10 flex flex-col h-[580px] max-h-[88vh]"
          >
            {/* AI Header with Glowing Orb Indicator */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/5 bg-[#141424]/80 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                {/* Glowing AI Orb */}
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500 shadow-[0_0_10px_#a855f7]"></span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <span>Portfolio Assistant</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                      Grounded
                    </span>
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    Answers strictly from Chandana's verified portfolio
                  </p>
                </div>
              </div>

              <button
                type="button"
                id="ai_close_btn"
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close AI Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 font-sans">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-6 h-6 rounded-lg bg-purple-950/80 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`p-3 sm:p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed max-w-[85%] ${
                      msg.sender === 'user'
                        ? 'bg-purple-600 text-white font-medium rounded-tr-sm shadow-md'
                        : 'bg-[#161626] border border-white/10 text-zinc-200 rounded-tl-sm shadow-sm whitespace-pre-line'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Interactive Action Link */}
                    {msg.linkAction && (
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center gap-2">
                        {msg.linkAction.externalUrl ? (
                          <a
                            href={msg.linkAction.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/50 text-purple-200 text-[11px] font-mono font-medium transition-colors"
                          >
                            <span>{msg.linkAction.label}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              if (msg.linkAction?.sectionId) {
                                onNavigateSection(msg.linkAction.sectionId);
                                onClose();
                              }
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/50 text-purple-200 text-[11px] font-mono font-medium transition-colors cursor-pointer"
                          >
                            <span>{msg.linkAction?.label}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isThinking && (
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono p-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse delay-100" />
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse delay-200" />
                  <span className="text-[11px]">Analyzing portfolio knowledge...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestion Chips */}
            <div className="px-4 py-2 bg-[#0b0b14] border-t border-white/5 overflow-x-auto flex items-center gap-2 no-scrollbar">
              {sampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-purple-950/40 border border-white/10 hover:border-purple-400/40 text-zinc-400 hover:text-purple-200 text-[10px] font-mono whitespace-nowrap transition-colors cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[#121220] border-t border-white/5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask about Chandana's skills, Finora AI, education..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#090910] border border-white/10 focus:border-purple-500/60 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  id="ai_send_btn"
                  className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white transition-colors cursor-pointer"
                  aria-label="Send query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
