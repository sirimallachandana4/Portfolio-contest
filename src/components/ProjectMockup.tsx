import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Bot,
  Layers,
  Sparkles,
  BarChart3,
  Users,
  CheckCircle2,
  Sliders
} from 'lucide-react';

interface ProjectMockupProps {
  type?: 'finora' | 'slides' | 'analyzer';
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ type = 'finora' }) => {
  if (type === 'finora') {
    return (
      <div className="w-full h-full min-h-[220px] sm:min-h-[260px] bg-[#0c0d16] rounded-xl border border-purple-500/20 p-3.5 sm:p-4 flex flex-col justify-between select-none overflow-hidden relative font-sans">
        {/* Mockup Window Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
              F
            </div>
            <span className="text-xs font-bold text-white tracking-tight">Finora AI</span>
            <span className="px-2 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-[9px] font-mono">
              Smart Expense Tracker
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/60" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
          </div>
        </div>

        {/* Dashboard Stat Cards */}
        <div className="grid grid-cols-3 gap-2 my-2.5">
          <div className="p-2 sm:p-2.5 rounded-lg bg-[#141524] border border-white/5">
            <span className="block text-[8px] sm:text-[9px] text-zinc-400 font-mono uppercase">Total Balance</span>
            <span className="text-xs sm:text-sm font-bold text-white font-mono">$4,850.00</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-lg bg-[#141524] border border-white/5">
            <span className="block text-[8px] sm:text-[9px] text-emerald-400 font-mono uppercase flex items-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5" /> Income
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-300 font-mono">+$6,200.00</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-lg bg-[#141524] border border-white/5">
            <span className="block text-[8px] sm:text-[9px] text-rose-400 font-mono uppercase flex items-center gap-0.5">
              <TrendingDown className="w-2.5 h-2.5" /> Expenses
            </span>
            <span className="text-xs sm:text-sm font-bold text-rose-300 font-mono">-$1,350.00</span>
          </div>
        </div>

        {/* Split View: Category Breakdown & AI Financial Assistant */}
        <div className="grid grid-cols-2 gap-2 flex-1 items-stretch">
          {/* Categories Chart simulation */}
          <div className="p-2.5 rounded-lg bg-[#141524]/90 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[9px] font-mono text-zinc-300">
              <span className="flex items-center gap-1"><PieChart className="w-3 h-3 text-purple-400" /> Categories</span>
              <span className="text-purple-300 font-semibold">October</span>
            </div>
            <div className="space-y-1.5 my-1">
              <div>
                <div className="flex justify-between text-[8px] text-zinc-400">
                  <span>Housing & Rent</span>
                  <span className="text-zinc-300 font-mono">$650</span>
                </div>
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full w-[48%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[8px] text-zinc-400">
                  <span>Groceries & Dining</span>
                  <span className="text-zinc-300 font-mono">$380</span>
                </div>
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full w-[28%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[8px] text-zinc-400">
                  <span>Utilities & Subs</span>
                  <span className="text-zinc-300 font-mono">$320</span>
                </div>
                <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-400 rounded-full w-[24%]" />
                </div>
              </div>
            </div>
          </div>

          {/* AI Financial Helper Assistant Snippet */}
          <div className="p-2.5 rounded-lg bg-gradient-to-br from-purple-950/40 to-indigo-950/40 border border-purple-500/30 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-purple-200">
              <Bot className="w-3 h-3 text-purple-400" />
              <span className="font-semibold">Finora AI Advisor</span>
            </div>
            <p className="text-[9px] text-zinc-300 font-light leading-snug my-1 bg-black/30 p-1.5 rounded border border-white/5">
              "You have saved <strong className="text-purple-300">22% more</strong> this month compared to last cycle. Budget status: On track."
            </p>
            <div className="flex items-center justify-between text-[8px] font-mono text-zinc-400 pt-1 border-t border-white/5">
              <span>Real-time Sync</span>
              <span className="text-emerald-400 font-semibold">Active</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'slides') {
    return (
      <div className="w-full h-full min-h-[220px] sm:min-h-[260px] bg-[#0c0d16] rounded-xl border border-white/10 p-3.5 sm:p-4 flex flex-col justify-between select-none overflow-hidden relative font-sans">
        <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white text-[10px] font-bold">
              AI
            </div>
            <span className="text-xs font-bold text-white tracking-tight">AI Presentation Suite</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-[9px] font-mono">
              Gemini 3.5
            </span>
          </div>
          <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-400">
            <span className="px-1.5 py-0.5 rounded bg-white/5">PPTX</span>
            <span className="px-1.5 py-0.5 rounded bg-white/5">PDF</span>
          </div>
        </div>

        {/* Slide Deck Canvas Simulation */}
        <div className="my-2 p-3 rounded-lg bg-gradient-to-br from-[#181622] to-[#12121a] border border-white/10 flex flex-col items-center justify-center text-center flex-1">
          <span className="text-[9px] font-mono text-purple-400 uppercase tracking-widest">Theme: Onyx Gold</span>
          <h4 className="text-xs sm:text-sm font-bold text-white mt-1">Full-Stack Cloud Architecture & Scale</h4>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-[9px] text-zinc-300">Intelligent AI Slide Outlining</span>
          </div>
        </div>

        {/* Slide Thumbnails bar */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`p-1.5 rounded text-center border text-[8px] font-mono ${
                num === 1
                  ? 'bg-purple-600/30 border-purple-400 text-purple-200'
                  : 'bg-white/5 border-white/5 text-zinc-500'
              }`}
            >
              Slide {num}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Student Performance Analyzer
  return (
    <div className="w-full h-full min-h-[220px] sm:min-h-[260px] bg-[#0c0d16] rounded-xl border border-white/10 p-3.5 sm:p-4 flex flex-col justify-between select-none overflow-hidden relative font-sans">
      <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-[10px] font-bold">
            SP
          </div>
          <span className="text-xs font-bold text-white tracking-tight">Student Performance Analyzer</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[9px] font-mono">
            Python & Flask
          </span>
        </div>
        <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-400">
          <BarChart3 className="w-3 h-3 text-emerald-400" />
          <span>Matplotlib</span>
        </div>
      </div>

      {/* Chart & Table Preview */}
      <div className="grid grid-cols-2 gap-2 my-2 flex-1">
        <div className="p-2 rounded-lg bg-[#141524] border border-white/5 flex flex-col justify-between">
          <span className="text-[8px] font-mono text-zinc-400">Grade Distribution</span>
          <div className="flex items-end gap-1.5 h-14 pt-2">
            <div className="flex-1 bg-emerald-500/80 rounded-t h-[80%]" />
            <div className="flex-1 bg-teal-500/80 rounded-t h-[95%]" />
            <div className="flex-1 bg-cyan-500/80 rounded-t h-[60%]" />
            <div className="flex-1 bg-indigo-500/80 rounded-t h-[40%]" />
          </div>
          <span className="text-[8px] font-mono text-zinc-500 text-center">Grades A / B / C / D</span>
        </div>

        <div className="p-2 rounded-lg bg-[#141524] border border-white/5 space-y-1 text-[8px] font-mono">
          <span className="text-zinc-400 block pb-1 border-b border-white/5">Recent Records</span>
          <div className="flex justify-between text-zinc-300">
            <span>CS-101: Alex R.</span>
            <span className="text-emerald-400 font-bold">94%</span>
          </div>
          <div className="flex justify-between text-zinc-300">
            <span>CS-102: Priya M.</span>
            <span className="text-emerald-400 font-bold">98%</span>
          </div>
          <div className="flex justify-between text-zinc-300">
            <span>CS-103: Ethan K.</span>
            <span className="text-teal-400 font-bold">89%</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 pt-1 border-t border-white/5">
        <span>SQLite Database Engine</span>
        <span className="text-emerald-300 font-semibold">Automatic GPA Metrics</span>
      </div>
    </div>
  );
};
