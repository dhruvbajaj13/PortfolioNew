'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

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
  impact?: string;
  github: string;
  liveDemo: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'splitr',
    title: 'Splitr',
    tagline: 'AI-Powered Expense Sharing App',
    category: 'Full-Stack & AI',
    image: '/images/splitr.jpg',
    problem: 'Manual group expense tracking is error-prone with missed receipts and awkward debt settlement among friends.',
    solution: 'Full-stack app with automated OCR receipt parsing and optimal debt-minimization graph algorithms.',
    features: ['AI OCR Receipt Scanner', 'Debt Graph Simplification', 'Multi-Currency', 'Smart Reminders'],
    techStack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tesseract OCR'],
    github: 'https://github.com/dhruvbajaj13/splitr',
    liveDemo: 'https://splitr-demo.vercel.app',
  },
  {
    id: 'codecraft',
    title: 'CodeCraft',
    tagline: 'SaaS Cloud IDE & Code Runner',
    category: 'Cloud Developer Tools',
    image: '/images/codecraft.jpg',
    problem: 'Local dev environment setups are slow, heavy, and hard to share instantly for collaboration.',
    solution: 'Browser IDE letting developers write, compile, and execute code across 10+ languages with zero setup.',
    features: ['Multi-Language Runner', 'Monaco Editor', 'Theme Switcher', 'Snippet Sharing'],
    techStack: ['Next.js 15', 'TypeScript', 'Monaco Editor', 'Judge0 API'],
    github: 'https://github.com/dhruvbajaj13/codecraft',
    liveDemo: 'https://codecraft-ide.vercel.app',
  },
  {
    id: 'rag-agent',
    title: 'RAG AI Agent',
    tagline: 'Autonomous Agent with Web Search',
    category: 'Artificial Intelligence',
    image: '/images/rag_agent.jpg',
    problem: 'LLMs hallucinate outdated facts. Standard retrieval is insufficient for proprietary or real-time knowledge.',
    solution: 'Hybrid RAG AI Agent using LangChain & ChromaDB that routes between vector store and live web search.',
    features: ['Hybrid Retrieval', 'Source Citations', 'Conversational Memory', 'Streaming Responses'],
    techStack: ['Python', 'LangChain', 'ChromaDB', 'OpenAI API', 'FastAPI'],
    github: 'https://github.com/dhruvbajaj13/rag-ai-agent',
    liveDemo: 'https://rag-agent-demo.vercel.app',
  },
  {
    id: 'synthex',
    title: 'Synthex',
    tagline: 'AI Web Productivity Extension',
    category: 'Browser Extensions',
    image: '/images/synthex.jpg',
    problem: 'Switching tabs to use ChatGPT breaks deep work focus and wastes time on repetitive tasks.',
    solution: 'Manifest V3 Chrome Extension with overlay AI actions directly on any active webpage text selection.',
    features: ['Selection Menu', 'Smart Email Replies', 'Custom Prompts', 'Local Storage Privacy'],
    techStack: ['JavaScript', 'Manifest V3', 'Chrome API', 'OpenAI API'],
    github: 'https://github.com/dhruvbajaj13/synthex-extension',
    liveDemo: 'https://chrome.google.com/webstore',
  },
];

export function ActProjects() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sync active index with scroll position
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    // Estimated width of one card + gap
    const cardEl = container.querySelector<HTMLElement>('[data-project-card]');
    const cardWidth = cardEl ? cardEl.offsetWidth + 20 : container.offsetWidth * 0.8;
    const newIndex = Math.round(scrollLeft / (cardWidth > 0 ? cardWidth : 1));
    const clampedIndex = Math.max(0, Math.min(PROJECTS_DATA.length - 1, newIndex));
    setActiveIndex(clampedIndex);
  };

  const scrollToProject = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>('[data-project-card]');
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    const prev = Math.max(0, activeIndex - 1);
    scrollToProject(prev);
  };

  const handleNext = () => {
    const next = Math.min(PROJECTS_DATA.length - 1, activeIndex + 1);
    scrollToProject(next);
  };

  return (
    <section id="projects" className="relative bg-[#050505] pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
      {/* Section Header with Controls */}
      <div className="max-w-6xl mx-auto mb-8 md:mb-12 px-4 sm:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs tracking-[0.25em] text-white/40 uppercase mb-2"
          >
            — Selected Works —
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none"
          >
            Projects
          </motion.h2>
        </div>

        {/* Carousel Navigation Bar (Arrows + Counter + Dots) */}
        <div className="flex items-center gap-4">
          {/* Step Dots */}
          <div className="flex items-center gap-2 mr-2">
            {PROJECTS_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToProject(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === i
                    ? 'w-8 h-2 bg-white'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="font-mono text-xs text-white/50 tracking-widest px-2">
            <span className="text-white font-bold">0{activeIndex + 1}</span> / 0{PROJECTS_DATA.length}
          </div>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              aria-label="Previous project"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeIndex === PROJECTS_DATA.length - 1}
              aria-label="Next project"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Carousel Track */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full flex gap-5 overflow-x-auto snap-x snap-mandatory px-4 sm:px-8 md:px-[calc((100vw-760px)/2)] scroll-smooth no-scrollbar pb-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PROJECTS_DATA.map((proj, i) => (
          <div
            key={proj.id}
            data-project-card
            className="shrink-0 snap-center w-[88vw] sm:w-[580px] md:w-[680px] lg:w-[740px]"
          >
            <div className="w-full bg-[#0D0D0D] rounded-3xl border border-white/10 overflow-hidden shadow-[0_12px_50px_rgba(0,0,0,0.8)] hover:border-white/20 transition-all duration-300 flex flex-col justify-between">
              
              {/* Card Top Bar */}
              <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-white/8 bg-[#111111]/70">
                <div className="flex items-center gap-3.5">
                  <span className="font-display font-black text-white/20 text-2xl md:text-3xl leading-none">
                    0{i + 1}
                  </span>
                  <div>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase">
                      {proj.category}
                    </span>
                    <h3 className="font-display font-black text-lg md:text-xl text-white tracking-tight uppercase leading-none">
                      {proj.title}
                    </h3>
                  </div>
                </div>

                {/* GitHub & Live Links */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all bg-[#050505]"
                    title="View GitHub Repository"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={proj.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 h-8 md:h-9 rounded-full bg-white text-black font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 hover:scale-105 transition-transform"
                    title="Open Live Preview"
                  >
                    <span>Live</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Card Content Split: Info Left + Image Right */}
              <div className="p-6 md:p-7 flex flex-col md:flex-row gap-6 items-center">
                {/* Left: Summary Details */}
                <div className="w-full md:w-[50%] flex flex-col gap-3">
                  <p className="text-white/50 text-xs font-light leading-snug">
                    {proj.tagline}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.04] text-[10px] font-mono text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Problem & Solution */}
                  <div className="pt-2 space-y-2">
                    <div>
                      <span className="font-mono text-[8px] tracking-widest text-white/30 uppercase block mb-0.5">
                        // Problem
                      </span>
                      <p className="text-xs text-white/65 leading-relaxed font-light line-clamp-2">
                        {proj.problem}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[8px] tracking-widest text-white/30 uppercase block mb-0.5">
                        // Solution
                      </span>
                      <p className="text-xs text-white/65 leading-relaxed font-light line-clamp-2">
                        {proj.solution}
                      </p>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="pt-2 border-t border-white/5">
                    <ul className="grid grid-cols-2 gap-1.5">
                      {proj.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-center gap-1.5 text-[10px] text-white/40">
                          <span className="w-1 h-1 rounded-full bg-white/40 shrink-0" />
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Colored Project Image Preview */}
                <div className="w-full md:w-[50%] aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 relative group/preview bg-[#050505]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover opacity-90 group-hover/preview:opacity-100 group-hover/preview:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Swipe/Scroll Hint for Mobile */}
      <div className="text-center pt-2 text-white/25 font-mono text-[10px] tracking-wider md:hidden">
        ← Swipe left / right to browse →
      </div>
    </section>
  );
}
