'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Each card: slide in from below as it enters, previous card scales down
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        // Slide in from below
        gsap.fromTo(
          card,
          { yPercent: 12, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Scale down previous cards as current scrolls up
        if (i < cardsRef.current.length - 1) {
          const nextCard = cardsRef.current[i + 1];
          if (nextCard) {
            gsap.to(card, {
              scale: 0.94,
              opacity: 0.45,
              ease: 'none',
              scrollTrigger: {
                trigger: nextCard,
                start: 'top 75%',
                end: 'top 30%',
                scrub: 0.8,
              },
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative bg-[#050505] pt-16 pb-20 md:pt-24 md:pb-28">

      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-12 md:mb-16 px-4 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-xs tracking-[0.25em] text-white/40 uppercase mb-3"
        >
          — Selected Works —
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none"
        >
          Projects
        </motion.h2>
      </div>

      {/* Cards — stacked, each is ~55-60vh so multiple are visible and scroll feels tight */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col gap-5">
        {PROJECTS_DATA.map((proj, i) => (
          <div
            key={proj.id}
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className="sticky"
            style={{ top: `${72 + i * 16}px`, zIndex: 10 + i }}
          >
            <div
              className="w-full bg-[#0C0C0C] rounded-2xl border border-white/10 overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.7)]"
              style={{ minHeight: '58vh' }}
            >
              {/* Card top bar */}
              <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/8 bg-[#0A0A0A]">
                <div className="flex items-center gap-4">
                  <span className="font-display font-black text-white/12 text-[2.5rem] md:text-[3.5rem] leading-none">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.2em] text-white/35 uppercase">{proj.category}</p>
                    <h3 className="font-display font-black text-lg md:text-2xl text-white tracking-tight uppercase leading-none">
                      {proj.title}
                    </h3>
                    <p className="text-white/40 text-[11px] md:text-xs mt-0.5 font-light">{proj.tagline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all bg-[#050505]"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={proj.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 h-8 md:h-10 rounded-full bg-white text-black font-bold uppercase tracking-wider text-[10px] flex items-center gap-1 hover:scale-105 transition-transform"
                  >
                    <span>Live</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col md:flex-row" style={{ minHeight: 'calc(58vh - 68px)' }}>
                {/* Left info */}
                <div className="w-full md:w-[44%] p-6 md:p-8 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-white/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div>
                    <p className="font-mono text-[8px] tracking-widest text-white/25 uppercase mb-1">// Problem</p>
                    <p className="text-[11px] md:text-sm text-white/55 leading-relaxed font-light">{proj.problem}</p>
                  </div>

                  <div>
                    <p className="font-mono text-[8px] tracking-widest text-white/25 uppercase mb-1">// Solution</p>
                    <p className="text-[11px] md:text-sm text-white/55 leading-relaxed font-light">{proj.solution}</p>
                  </div>

                  <div className="mt-auto pt-3 border-t border-white/5">
                    <ul className="grid grid-cols-2 gap-1.5">
                      {proj.features.map((f) => (
                        <li key={f} className="flex items-center gap-1.5 text-[10px] text-white/35">
                          <span className="w-1 h-1 rounded-full bg-white/25 shrink-0" />
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: actual project image — colored */}
                <div className="hidden md:block flex-1 relative overflow-hidden border-l border-white/8 group cursor-pointer">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/60 via-transparent to-transparent group-hover:opacity-0 transition-opacity duration-600" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
