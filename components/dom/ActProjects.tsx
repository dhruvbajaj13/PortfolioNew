'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, CheckCircle2, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  image: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  impact: string;
  github: string;
  liveDemo: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'splitr',
    title: 'Splitr — AI-Powered Expense Sharing App',
    tagline: 'Automated receipt scanning, intelligent debt simplification & real-time settlements',
    category: 'Full-Stack & AI Web Application',
    image: '/images/splitr.jpg',
    problem:
      'Manual group expense tracking is prone to calculation errors, missing receipts, and awkward debt settlement conversations among friends and roommates.',
    solution:
      'Engineered Splitr, an intelligent full-stack web application featuring automated OCR receipt parsing, optimal debt-minimization algorithms, and instant payment links.',
    features: [
      'AI OCR Receipt Scanner: Upload bill images to automatically extract line items and split costs.',
      'Graph-Based Debt Simplification: Minimizes total transaction count across large groups.',
      'Multi-Currency Support: Real-time exchange rate conversion for international travel.',
      'Instant Settlement Reminders: Automated push notifications and payment links.',
    ],
    techStack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tesseract OCR', 'Tailwind CSS'],
    impact: 'Streamlined bill splitting for 500+ active users with zero manual entry errors.',
    github: 'https://github.com/dhruvbajaj13/splitr',
    liveDemo: 'https://splitr-demo.vercel.app',
  },
  {
    id: 'codecraft',
    title: 'CodeCraft — SaaS Code Editor & Cloud IDE',
    tagline: 'Browser-based code editor with multi-language execution & real-time syntax checking',
    category: 'Cloud Developer Tools',
    image: '/images/codecraft.jpg',
    problem:
      'Local dev environment setups are slow, resource-heavy, and difficult to share instantly for code reviews or technical interviews.',
    solution:
      'Built CodeCraft, a high-performance browser IDE enabling developers to write, compile, and execute code across 10+ programming languages with zero setup.',
    features: [
      'Multi-Language Code Runner: Instant execution for JavaScript, Python, C++, Java, and Go.',
      'Monaco Editor Integration: VS Code-like editing with Intellisense & auto-completion.',
      'Custom Theme Switcher: Dark modes, syntax color schemes, and monospace font customization.',
      'Code Snippet Sharing: Generate permanent shareable URLs for code snippets.',
    ],
    techStack: ['Next.js 15', 'TypeScript', 'Monaco Editor', 'Judge0 API', 'Tailwind CSS'],
    impact: 'Executed 10,000+ code runs with sub-second execution latency.',
    github: 'https://github.com/dhruvbajaj13/codecraft',
    liveDemo: 'https://codecraft-ide.vercel.app',
  },
  {
    id: 'rag-agent',
    title: 'RAG-Based AI Agent with Web Search',
    tagline: 'Autonomous AI agent combining local vector RAG retrieval with live Google web search',
    category: 'Artificial Intelligence & Agents',
    image: '/images/rag_agent.jpg',
    problem:
      'Standard LLMs hallucinate outdated information when answering queries about recent events or proprietary private documentation.',
    solution:
      'Developed a hybrid RAG AI Agent using LangChain & ChromaDB that intelligently decides whether to query internal vector embeddings or trigger live web search.',
    features: [
      'Hybrid Retrieval Architecture: Seamless routing between vector DB and live web search.',
      'Source Attribution & Citations: Renders inline markdown citations with clickable links.',
      'Conversational Memory: Retains context across multi-turn complex queries.',
      'Streaming Responses: Real-time token streaming for zero perception latency.',
    ],
    techStack: ['Python', 'LangChain', 'ChromaDB', 'OpenAI API', 'SerpAPI', 'FastAPI'],
    impact: 'Achieved 95%+ retrieval accuracy with zero hallucination on proprietary data.',
    github: 'https://github.com/dhruvbajaj13/rag-ai-agent',
    liveDemo: 'https://rag-agent-demo.vercel.app',
  },
  {
    id: 'synthex',
    title: 'Synthex — AI Web Productivity Chrome Extension',
    tagline: 'Contextual AI assistant for one-click summarization, rewrite & smart replies across web pages',
    category: 'Browser Extensions & AI Tools',
    image: '/images/synthex.jpg',
    problem:
      'Copy-pasting web text back and forth into ChatGPT tab switches breaks deep work focus and wastes time.',
    solution:
      'Engineered Synthex, a Manifest V3 Chrome Extension providing overlay AI actions directly on any active webpage selection.',
    features: [
      'One-Click Text Selection Menu: Highlight text anywhere on the web to summarize or translate.',
      'Email & Social Smart Replies: Draft context-aware responses directly inside Gmail & X.',
      'Custom Prompt Workflows: Save custom AI shortcuts for repetitive tasks.',
      'Privacy-First Local Storage: API keys stored securely in chrome.storage.local.',
    ],
    techStack: ['JavaScript', 'Manifest V3', 'Chrome Extensions API', 'OpenAI API', 'CSS3'],
    impact: 'Saved users an estimated 30+ minutes daily in web reading and email drafting.',
    github: 'https://github.com/dhruvbajaj13/synthex-extension',
    liveDemo: 'https://chrome.google.com/webstore',
  },
];

export const PROJECTS = PROJECTS_DATA;

export function ActProjects({
  selectedProject,
  setSelectedProject,
  activeProjectIndex: externalActiveIdx,
  setActiveProjectIndex: externalSetActiveIdx,
}: {
  selectedProject?: ProjectItem | null;
  setSelectedProject?: (proj: ProjectItem | null) => void;
  activeProjectIndex?: number;
  setActiveProjectIndex?: (idx: number) => void;
}) {
  const [internalActiveIdx, setInternalActiveIdx] = useState(0);
  const activeIdx = externalActiveIdx !== undefined ? externalActiveIdx : internalActiveIdx;
  const setActiveIdx = externalSetActiveIdx !== undefined ? externalSetActiveIdx : setInternalActiveIdx;

  const [internalModalProj, setInternalModalProj] = useState<ProjectItem | null>(null);
  const activeModalProj = selectedProject !== undefined ? selectedProject : internalModalProj;
  const setModalProj = setSelectedProject !== undefined ? setSelectedProject : setInternalModalProj;

  const handleNext = () => {
    setActiveIdx((activeIdx + 1) % PROJECTS_DATA.length);
  };

  const handlePrev = () => {
    setActiveIdx((activeIdx - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
  };

  return (
    <section
      id="projects"
      className="relative w-full flex flex-col justify-center px-4 sm:px-8 md:px-16 py-16 md:py-24 overflow-hidden pointer-events-none bg-[#050505]"
    >
      <div className="max-w-6xl mx-auto w-full space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 pointer-events-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight"
          >
            Featured <span className="text-[#00E5FF]">Projects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-display text-base sm:text-xl font-medium text-[#A8A8A8] tracking-wide max-w-2xl mx-auto"
          >
            Click left/right arrows to slide through projects • Click card to inspect details
          </motion.p>
        </div>

        {/* 3D Animated Moving Card Stage */}
        <div className="relative w-full flex flex-col items-center justify-center pointer-events-auto min-h-[480px] sm:min-h-[540px]">
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-40 p-4 rounded-full glass-panel border border-white/20 text-white hover:text-[#00E5FF] hover:border-[#00E5FF] hover:scale-110 transition-all duration-300 shadow-2xl bg-[#080808]/90 backdrop-blur-xl"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-40 p-4 rounded-full glass-panel border border-white/20 text-white hover:text-[#00E5FF] hover:border-[#00E5FF] hover:scale-110 transition-all duration-300 shadow-2xl bg-[#080808]/90 backdrop-blur-xl"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Full Image Card Block Display Stage */}
          <div className="relative w-full max-w-4xl h-[440px] sm:h-[480px] flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {PROJECTS_DATA.map((proj, idx) => {
                const isCurrent = idx === activeIdx;
                const isNext = idx === (activeIdx + 1) % PROJECTS_DATA.length;
                const isPrev = idx === (activeIdx - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;

                if (!isCurrent && !isNext && !isPrev) return null;

                let zIndex = 10;
                let scale = 0.88;
                let translateX = 0;
                let opacity = 0;
                let rotateY = 0;

                if (isCurrent) {
                  zIndex = 30;
                  scale = 1;
                  translateX = 0;
                  opacity = 1;
                  rotateY = 0;
                } else if (isNext) {
                  zIndex = 20;
                  scale = 0.9;
                  translateX = 60;
                  opacity = 0.4;
                  rotateY = -12;
                } else if (isPrev) {
                  zIndex = 20;
                  scale = 0.9;
                  translateX = -60;
                  opacity = 0.4;
                  rotateY = 12;
                }

                return (
                  <motion.div
                    key={proj.id}
                    initial={{ opacity: 0, scale: 0.8, x: translateX }}
                    animate={{ opacity, scale, x: translateX, rotateY }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                    style={{ zIndex }}
                    onClick={() => setModalProj(proj)}
                    className="absolute inset-0 w-full h-full rounded-3xl glass-panel border border-white/15 hover:border-[#00E5FF]/60 shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-[#080808] overflow-hidden group cursor-pointer"
                  >
                    {/* Full Hero Image Filling the Card */}
                    <div className="relative w-full h-full overflow-hidden bg-[#050505]">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                      />
                      {/* Gradient Overlay for Readable Title & Tech Stack */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />

                      {/* Top Category Badge */}
                      <div className="absolute top-5 left-6 px-4 py-1.5 rounded-full bg-[#050505]/90 border border-white/10 font-mono text-xs font-bold text-[#00E5FF] shadow-lg backdrop-blur-md">
                        {proj.category}
                      </div>

                      {/* Click to Inspect Pill Tag */}
                      <div className="absolute top-5 right-6 px-4 py-1.5 rounded-full bg-[#050505]/90 border border-white/10 font-mono text-xs font-bold text-white shadow-lg backdrop-blur-md flex items-center gap-1.5 group-hover:border-[#00E5FF]">
                        <span>Inspect</span>
                        <Maximize2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                      </div>

                      {/* Bottom Banner Content: Title & Tech Stack */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-3.5">
                        <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white group-hover:text-[#00E5FF] transition-colors leading-tight">
                          {proj.title}
                        </h3>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {proj.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="font-mono text-xs px-3.5 py-1 rounded-full bg-[#080808]/90 border border-white/20 text-[#00E5FF] backdrop-blur-md"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Live Demo & Source Links */}
                        <div className="flex items-center gap-3 pt-2">
                          <a
                            href={proj.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-5 py-2 rounded-full bg-[#00E5FF] font-sans text-xs font-bold text-black shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:scale-105 transition-all flex items-center gap-1.5"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-5 py-2 rounded-full glass-panel border border-white/10 font-sans text-xs font-bold text-white hover:border-[#00E5FF] hover:scale-105 transition-all flex items-center gap-1.5"
                          >
                            <span>View Source</span>
                            <Github className="w-3.5 h-3.5 text-[#00E5FF]" />
                          </a>
                        </div>

                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Dots Indicator Row */}
          <div className="flex items-center justify-center gap-3 pt-6 z-40">
            {PROJECTS_DATA.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setActiveIdx(dotIdx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  dotIdx === activeIdx
                    ? 'w-8 bg-[#00E5FF] shadow-[0_0_12px_#00E5FF]'
                    : 'w-2.5 bg-white/20 hover:bg-white/50'
                }`}
                aria-label={`Go to project ${dotIdx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>

      {/* Bounded macOS Terminal Window Modal */}
      <AnimatePresence>
        {activeModalProj && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-auto bg-black/80 backdrop-blur-xl pt-20 sm:pt-24">
            
            {/* Backdrop Dismiss */}
            <div className="absolute inset-0" onClick={() => setModalProj(null)} />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl max-h-[78vh] rounded-3xl glass-panel border border-[#00E5FF]/40 shadow-[0_0_60px_rgba(0,229,255,0.2)] bg-[#080808] flex flex-col overflow-hidden z-10"
            >
              {/* macOS Window Title Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#050505] shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setModalProj(null)}
                    className="w-3.5 h-3.5 rounded-full bg-red-500/90 hover:bg-red-600 transition-colors shadow-[0_0_8px_#ff5f56]"
                  />
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/90" />
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500/90" />
                  <span className="ml-3 font-mono text-xs text-[#A8A8A8] hidden sm:inline-block">
                    terminal://projects/{activeModalProj.id}.sh
                  </span>
                </div>

                <button
                  onClick={() => setModalProj(null)}
                  className="p-1 rounded-full text-[#A8A8A8] hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body Container */}
              <div
                data-lenis-prevent
                className="overflow-y-auto p-6 sm:p-8 space-y-6 max-h-[70vh] text-[#A8A8A8]"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#00E5FF] uppercase tracking-wider block mb-1">
                      {activeModalProj.category}
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                      {activeModalProj.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={activeModalProj.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-[#00E5FF] font-sans text-xs font-bold text-black shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:scale-105 transition-all flex items-center gap-1.5"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={activeModalProj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full glass-panel border border-white/10 font-sans text-xs font-bold text-white hover:border-[#00E5FF] hover:scale-105 transition-all flex items-center gap-1.5"
                    >
                      <span>VIEW SOURCE</span>
                      <Github className="w-3.5 h-3.5 text-[#00E5FF]" />
                    </a>
                  </div>
                </div>

                <p className="font-sans text-sm sm:text-base text-slate-200 leading-relaxed italic border-l-2 border-[#00E5FF] pl-4">
                  "{activeModalProj.tagline}"
                </p>

                <div className="p-5 rounded-2xl bg-[#050505] border border-white/10 space-y-2">
                  <span className="font-mono text-xs font-bold text-red-400 block uppercase">
                    &gt; PROBLEM_STATEMENT
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {activeModalProj.problem}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#050505] border border-emerald-500/40 text-emerald-100 space-y-2">
                  <span className="font-mono text-xs font-bold text-emerald-400 block uppercase">
                    &gt; ENGINEERED_SOLUTION
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {activeModalProj.solution}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-xs font-bold text-[#00E5FF] block uppercase">
                    &gt; KEY_SYSTEM_FEATURES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModalProj.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-4 rounded-xl bg-[#050505] border border-white/10 flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                        <span className="font-sans text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-xs font-bold text-[#00E5FF] block uppercase">
                    &gt; TECH_STACK_MANIFEST
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProj.techStack.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-[#050505] border border-white/10 text-[#00E5FF]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#050505] border border-[#00E5FF]/50 text-cyan-200 space-y-1">
                  <span className="font-mono text-xs font-bold text-[#00E5FF] block uppercase">
                    &gt; MEASURABLE_IMPACT
                  </span>
                  <p className="font-sans text-xs sm:text-sm font-semibold text-white">
                    {activeModalProj.impact}
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
