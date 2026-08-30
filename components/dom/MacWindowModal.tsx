'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Minus,
  Maximize2,
  Terminal,
  ExternalLink,
  Github,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from './ActProjects';

export function MacWindowModal({
  project,
  onClose,
}: {
  project: ProjectItem;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'tech' | 'architecture' | 'terminal'>('overview');
  const total = PROJECTS_DATA.length;
  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === project.id);
  const prevProj = PROJECTS_DATA[(currentIndex - 1 + total) % total];
  const nextProj = PROJECTS_DATA[(currentIndex + 1) % total];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-auto bg-black/80 backdrop-blur-xl pt-20 sm:pt-24">
        {/* Backdrop Dismiss */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl max-h-[78vh] rounded-3xl glass-panel border border-[#FFFFFF]/40 shadow-[0_0_60px_rgba(255,255,255,0.2)] bg-[#0A0A0A] flex flex-col overflow-hidden z-10"
        >
          {/* macOS Title Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#030303] shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-3.5 h-3.5 rounded-full bg-red-500/90 hover:bg-red-600 transition-colors shadow-[0_0_8px_#ff5f56]"
              />
              <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/90" />
              <div className="w-3.5 h-3.5 rounded-full bg-green-500/90" />
              <span className="ml-3 font-mono text-xs text-[#A8A8A8] hidden sm:inline-block">
                terminal://projects/{project.id}.sh
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#A8A8A8] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body (Prevent Lenis Wheel Lock) */}
          <div
            data-lenis-prevent
            className="overflow-y-auto p-6 sm:p-8 space-y-6 max-h-[70vh] text-[#A8A8A8]"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="font-mono text-xs font-bold text-[#FFFFFF] uppercase tracking-wider block mb-1">
                  {project.category}
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {project.title}
                </h2>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-[#FFFFFF] font-sans text-xs font-bold text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full glass-panel border border-white/10 font-sans text-xs font-bold text-white hover:border-[#FFFFFF] hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <span>VIEW SOURCE</span>
                  <Github className="w-3.5 h-3.5 text-[#FFFFFF]" />
                </a>
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed italic border-l-2 border-[#FFFFFF] pl-4">
              "{project.tagline}"
            </p>

            <div className="p-5 rounded-2xl bg-[#030303] border border-white/10 space-y-2">
              <span className="font-mono text-xs font-bold text-red-400 block uppercase">
                &gt; PROBLEM_STATEMENT
              </span>
              <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#030303] border border-emerald-500/40 text-emerald-100 space-y-2">
              <span className="font-mono text-xs font-bold text-emerald-400 block uppercase">
                &gt; ENGINEERED_SOLUTION
              </span>
              <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                {project.solution}
              </p>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-[#FFFFFF] block uppercase">
                &gt; KEY_SYSTEM_FEATURES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-4 rounded-xl bg-[#030303] border border-white/10 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FFFFFF] shrink-0 mt-0.5" />
                    <span className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-xs font-bold text-[#FFFFFF] block uppercase">
                &gt; TECH_STACK_MANIFEST
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-[#030303] border border-white/10 text-[#FFFFFF]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#030303] border border-[#FFFFFF]/50 text-cyan-200 space-y-1">
              <span className="font-mono text-xs font-bold text-[#FFFFFF] block uppercase">
                &gt; MEASURABLE_IMPACT
              </span>
              <p className="font-sans text-xs sm:text-sm font-semibold text-white">
                {project.impact}
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
