'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight, Globe } from 'lucide-react';

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
  browserUrl?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  // ─── Row 1 ───────────────────────────────────────────────────────────
  {
    id: 'splitr',
    title: 'Splitr',
    tagline: 'AI-Powered Expense Sharing App',
    category: 'Full-Stack & AI',
    image: '/images/splitr.jpg',
    browserUrl: 'https://splitr.app',
    problem: 'Manual group expense tracking is error-prone with missed receipts and awkward debt settlement.',
    solution: 'Full-stack app with automated OCR receipt parsing and optimal debt-minimization graph algorithms.',
    features: ['AI OCR Receipt Scanner', 'Debt Graph Simplification', 'Multi-Currency', 'Smart Reminders'],
    techStack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tesseract OCR'],
    github: 'https://github.com/dhruvbajaj13/splitr',
    liveDemo: 'https://splitr-demo.vercel.app',
  },
  {
    id: 'rag-agent',
    title: 'RAG AI Agent',
    tagline: 'Autonomous Agent with Web Search',
    category: 'Artificial Intelligence',
    image: '/images/rag_agent.jpg',
    browserUrl: 'https://rag-agent.ai',
    problem: 'LLMs hallucinate outdated facts without access to proprietary documents or real-time web sources.',
    solution: 'Hybrid RAG AI Agent using LangChain & ChromaDB routing queries between vector store and live search.',
    features: ['Hybrid Retrieval', 'Source Citations', 'Conversational Memory', 'Streaming Responses'],
    techStack: ['Python', 'LangChain', 'ChromaDB', 'OpenAI API', 'FastAPI'],
    github: 'https://github.com/dhruvbajaj13/rag-ai-agent',
    liveDemo: 'https://rag-agent-demo.vercel.app',
  },

  // ─── Row 2 ───────────────────────────────────────────────────────────
  {
    id: 'stock-market-analyser',
    title: 'Stock Market Analyser',
    tagline: 'Financial Analytics & Predictive Engine',
    category: 'FinTech & Analytics',
    image: '/images/stock_analyser.jpg',
    browserUrl: 'https://marketpulse-analyser.io',
    problem: 'Complex equity market data is fragmented, making technical analysis cumbersome for retail investors.',
    solution: 'Interactive financial dashboard with live candlestick charts, news sentiment NLP, and automated RSI/MACD indicators.',
    features: ['Live Candlestick Charts', 'Technical Indicators (RSI/MACD)', 'News Sentiment NLP', 'Portfolio Tracker'],
    techStack: ['React.js', 'Node.js', 'Python', 'FastAPI', 'Chart.js', 'Yahoo Finance API'],
    github: 'https://github.com/dhruvbajaj13/stock-market-analyser',
    liveDemo: 'https://stock-market-analyser.vercel.app',
  },
  {
    id: 'codecraft',
    title: 'CodeCraft',
    tagline: 'SaaS Cloud IDE & Code Runner',
    category: 'Cloud Developer Tools',
    image: '/images/codecraft.jpg',
    browserUrl: 'https://codecraft-ide.dev',
    problem: 'Local dev environment setups are slow, heavy, and difficult to spin up instantly for testing.',
    solution: 'Browser-based IDE allowing developers to write, compile, and execute code in 10+ languages with zero setup.',
    features: ['Multi-Language Runner', 'Monaco Editor', 'Theme Switcher', 'Snippet Sharing'],
    techStack: ['Next.js 15', 'TypeScript', 'Monaco Editor', 'Judge0 API'],
    github: 'https://github.com/dhruvbajaj13/codecraft',
    liveDemo: 'https://codecraft-ide.vercel.app',
  },

  // ─── Row 3 ───────────────────────────────────────────────────────────
  {
    id: 'synthex',
    title: 'Synthex',
    tagline: 'AI Web Productivity Extension',
    category: 'Browser Extensions',
    image: '/images/synthex.jpg',
    browserUrl: 'https://synthex.io/extension',
    problem: 'Switching tabs to interact with ChatGPT breaks focus and slows down reading, writing, and research.',
    solution: 'Manifest V3 Chrome Extension providing contextual AI text actions right on any active webpage selection.',
    features: ['Selection Menu', 'Smart Email Replies', 'Custom Prompts', 'Local Storage Privacy'],
    techStack: ['JavaScript', 'Manifest V3', 'Chrome API', 'OpenAI API'],
    github: 'https://github.com/dhruvbajaj13/synthex-extension',
    liveDemo: 'https://chrome.google.com/webstore',
  },
  {
    id: 'cleancity',
    title: 'CleanCity',
    tagline: 'Smart Waste Management & IoT Monitoring',
    category: 'IoT & Smart Cities',
    image: '/images/cleancity.jpg',
    browserUrl: 'https://cleancity.iot',
    problem: 'Urban bins overflow without warning, causing sanitation hazards and inefficient municipal collection routes.',
    solution: 'IoT-enabled urban monitoring system connecting smart bin sensors to an optimized collection dispatch map.',
    features: ['Real-Time Fill Sensors', 'Route Optimization Algorithm', 'Alert Notifications', 'Interactive City Map'],
    techStack: ['IoT Sensors', 'Arduino / ESP32', 'Node.js', 'Express', 'MongoDB', 'Leaflet Maps'],
    github: 'https://github.com/dhruvbajaj13/cleancity-iot',
    liveDemo: 'https://cleancity-iot.vercel.app',
  },
];

export function ActProjects() {
  return (
    <section id="projects" className="relative bg-[#050505] pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs tracking-[0.25em] text-white/40 uppercase mb-3"
          >
            — Selected Works —
          </motion.p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none"
            >
              Projects
            </motion.h2>
            <span className="font-mono text-xs text-white/40 tracking-wider">
              [ 6 Featured Applications · 3 × 2 Grid ]
            </span>
          </div>
        </div>

        {/* 3 Rows × 2 Columns Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROJECTS_DATA.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.15 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl border border-white/10 bg-[#0C0C0C] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.8)] hover:border-white/30 hover:shadow-[0_25px_60px_rgba(0,0,0,0.95)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* macOS Browser Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#121212] border-b border-white/8">
                {/* Traffic light dots */}
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-[0_0_6px_rgba(255,95,87,0.5)]" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-[0_0_6px_rgba(254,188,46,0.4)]" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-[0_0_6px_rgba(40,200,64,0.4)]" />
                </div>

                {/* Browser URL Search Bar */}
                <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#080808] border border-white/10 max-w-[220px] sm:max-w-[260px] truncate">
                  <Globe className="w-3 h-3 text-white/30 shrink-0" />
                  <span className="font-mono text-[10px] text-white/50 truncate select-none">
                    {proj.browserUrl || `https://${proj.id}.dev`}
                  </span>
                </div>

                {/* Quick Link Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all bg-[#080808]"
                    title="View GitHub Repository"
                  >
                    <Github className="w-3 h-3" />
                  </a>
                  <a
                    href={proj.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 h-7 rounded-full bg-white text-black font-bold uppercase tracking-wider text-[9px] flex items-center gap-1 hover:scale-105 transition-transform"
                    title="Open Live App"
                  >
                    <span>Live</span>
                    <ArrowUpRight className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              {/* Project Screenshot / Media Preview */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#070707] border-b border-white/8 group/img">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover opacity-90 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent pointer-events-none" />
                
                {/* Subtle project index pill */}
                <div className="absolute top-3 left-4 font-mono text-[10px] font-bold text-white/80 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  0{i + 1} // {proj.category}
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-6 md:p-7 flex flex-col gap-4 flex-1 justify-between">
                <div className="space-y-2">
                  <h3 className="font-display font-black text-2xl text-white tracking-tight uppercase">
                    {proj.title}
                  </h3>
                  <p className="text-white/50 text-xs font-light leading-relaxed">
                    {proj.tagline}
                  </p>

                  {/* Problem & Solution Block */}
                  <div className="pt-2 space-y-2 text-xs text-white/65 leading-relaxed font-light">
                    <div>
                      <span className="font-mono text-[9px] tracking-widest text-white/30 uppercase block mb-0.5 font-bold">
                        // Problem
                      </span>
                      <p className="line-clamp-2">{proj.problem}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] tracking-widest text-white/30 uppercase block mb-0.5 font-bold">
                        // Solution
                      </span>
                      <p className="line-clamp-2">{proj.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="pt-2 border-t border-white/8 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.04] text-[10px] font-mono text-white/70 hover:border-white/30 hover:text-white transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Key Highlights */}
                  <ul className="grid grid-cols-2 gap-1.5 pt-1">
                    {proj.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-[10px] text-white/40 truncate">
                        <span className="w-1 h-1 rounded-full bg-white/40 shrink-0" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
