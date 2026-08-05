'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface TechCategory {
  title: string;
  skills: { name: string; level: number; desc: string }[];
}

export const SKILL_CATEGORIES: TechCategory[] = [
  {
    title: 'Frontend & UI Engineering',
    skills: [
      { name: 'React.js', level: 92, desc: 'Component Architecture, Hooks, Custom State' },
      { name: 'Next.js 15', level: 90, desc: 'App Router, Server Components, SSR/SSG' },
      { name: 'TypeScript', level: 88, desc: 'Strict Typing, Generics, Interfaces' },
      { name: 'Tailwind CSS', level: 95, desc: 'Responsive Design, Custom Tokens, Design Systems' },
      { name: 'Framer Motion', level: 85, desc: 'Layout Animations, Gestures, Keyframes' },
      { name: 'HTML5 / CSS3', level: 95, desc: 'Semantic Markup, Flexbox, CSS Grid' },
    ],
  },
  {
    title: 'Backend & Database Systems',
    skills: [
      { name: 'Node.js', level: 88, desc: 'Event Loop, Async I/O, REST Services' },
      { name: 'Express.js', level: 88, desc: 'Middleware, Routing, API Architecture' },
      { name: 'Java', level: 85, desc: 'OOP, Collections, Enterprise Architecture' },
      { name: 'MongoDB', level: 82, desc: 'Document Schemas, Aggregation Pipelines' },
      { name: 'PostgreSQL', level: 80, desc: 'Relational Schemas, Indexing, SQL Queries' },
      { name: 'REST APIs', level: 92, desc: 'Endpoint Design, JSON Schemas, Auth' },
    ],
  },
  {
    title: 'AI, ML & Agentic Systems',
    skills: [
      { name: 'Python', level: 86, desc: 'Data Structures, Scripting, AI Libraries' },
      { name: 'LangChain', level: 82, desc: 'LLM Orchestration, Prompt Templates, Chains' },
      { name: 'RAG Pipelines', level: 85, desc: 'Vector Embeddings, Retrieval, Context Ingestion' },
      { name: 'Vector DBs', level: 80, desc: 'ChromaDB, Pinecone, Semantic Search' },
    ],
  },
  {
    title: 'DevOps, Tools & Methodologies',
    skills: [
      { name: 'Git / GitHub', level: 90, desc: 'Version Control, Branching, PR Workflows' },
      { name: 'Docker', level: 75, desc: 'Containerization, Dockerfiles, Compose' },
      { name: 'Postman', level: 88, desc: 'API Testing, Documentation, Collection Runners' },
      { name: 'Agile / Scrum', level: 85, desc: 'Sprint Planning, Standups, Feature Iteration' },
    ],
  },
];

export const TECH_NODES = SKILL_CATEGORIES.flatMap((cat) => cat.skills.map((s) => s.name));

export function ActTechStack({
  selectedTech,
  setSelectedTech,
}: {
  selectedTech?: string | null;
  setSelectedTech?: (tech: string | null) => void;
}) {
  const [activeCategory, setActiveCategory] = useState<number>(0);

  return (
    <section
      id="skills"
      className="relative w-full flex flex-col justify-center px-4 sm:px-8 md:px-16 py-16 md:py-24 overflow-hidden pointer-events-none bg-[#050505]"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3 pointer-events-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight"
          >
            Technical <span className="text-[#00E5FF]">Skills</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-display text-base sm:text-xl font-medium text-[#A8A8A8] tracking-wide max-w-2xl mx-auto"
          >
            Technologies, frameworks, and engineering methodologies
          </motion.p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 pointer-events-auto">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isActive = activeCategory === idx;
            return (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(idx)}
                className={`px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#00E5FF] text-black font-bold border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.35)] scale-105'
                    : 'glass-panel text-[#A8A8A8] border-white/10 hover:text-white hover:border-[#00E5FF]/50'
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pointer-events-auto">
          {SKILL_CATEGORIES[activeCategory].skills.map((skill, sIdx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: sIdx * 0.08 }}
              onClick={() => setSelectedTech?.(skill.name)}
              className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-[#00E5FF]/50 transition-all duration-300 shadow-xl bg-[#080808] space-y-4 group hover:scale-[1.02] cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                  {skill.name}
                </h3>
                <span className="font-mono text-xs font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-3 py-1 rounded-full border border-[#00E5FF]/30">
                  {skill.level}%
                </span>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#A8A8A8] leading-relaxed">
                {skill.desc}
              </p>

              {/* Progress Level Bar */}
              <div className="w-full h-2 rounded-full bg-[#050505] p-0.5 border border-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-[#00E5FF] to-blue-500 rounded-full shadow-[0_0_12px_#00E5FF]"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
