'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Tech Data with SVG icon URLs ─── */
const ALL_TECH = [
  // Languages
  { name: 'Java',         category: 'Languages',   emoji: '☕', color: '#E76F00', bg: '#E76F001A' },
  { name: 'JavaScript',  category: 'Languages',   emoji: '🟨', color: '#F7DF1E', bg: '#F7DF1E1A' },
  { name: 'TypeScript',  category: 'Languages',   emoji: '🔷', color: '#3178C6', bg: '#3178C61A' },
  { name: 'Python',      category: 'Languages',   emoji: '🐍', color: '#3776AB', bg: '#3776AB1A' },
  { name: 'C++',         category: 'Languages',   emoji: '⚙️', color: '#00599C', bg: '#00599C1A' },

  // Frontend
  { name: 'React.js',    category: 'Frontend',    emoji: '⚛️', color: '#61DAFB', bg: '#61DAFB1A' },
  { name: 'Next.js',     category: 'Frontend',    emoji: '▲',  color: '#FFFFFF', bg: '#FFFFFF12' },
  { name: 'Tailwind CSS',category: 'Frontend',    emoji: '🌊', color: '#06B6D4', bg: '#06B6D41A' },
  { name: 'Framer Motion',category:'Frontend',    emoji: '🎞️', color: '#BB4BFF', bg: '#BB4BFF1A' },
  { name: 'Three.js',    category: 'Frontend',    emoji: '🧊', color: '#FFFFFF', bg: '#FFFFFF12' },
  { name: 'HTML5/CSS3',  category: 'Frontend',    emoji: '🌐', color: '#E34F26', bg: '#E34F261A' },

  // Backend
  { name: 'Node.js',     category: 'Backend',     emoji: '🟢', color: '#339933', bg: '#3399331A' },
  { name: 'Express.js',  category: 'Backend',     emoji: '🚂', color: '#FFFFFF', bg: '#FFFFFF12' },
  { name: 'REST APIs',   category: 'Backend',     emoji: '🔗', color: '#00E5FF', bg: '#00E5FF1A' },
  { name: 'MongoDB',     category: 'Backend',     emoji: '🍃', color: '#47A248', bg: '#47A2481A' },
  { name: 'PostgreSQL',  category: 'Backend',     emoji: '🐘', color: '#336791', bg: '#3367911A' },
  { name: 'MySQL',       category: 'Backend',     emoji: '🐬', color: '#4479A1', bg: '#4479A11A' },
  { name: 'ChromaDB',    category: 'Backend',     emoji: '🔮', color: '#A855F7', bg: '#A855F71A' },

  // AI / ML
  { name: 'LangChain',   category: 'AI / ML',     emoji: '🔗', color: '#1C3C3C', bg: '#00E5FF1A' },
  { name: 'LangGraph',   category: 'AI / ML',     emoji: '🕸️', color: '#FF6B6B', bg: '#FF6B6B1A' },
  { name: 'RAG',         category: 'AI / ML',     emoji: '📚', color: '#F59E0B', bg: '#F59E0B1A' },
  { name: 'LLMs',        category: 'AI / ML',     emoji: '🤖', color: '#8B5CF6', bg: '#8B5CF61A' },
  { name: 'Vector DBs',  category: 'AI / ML',     emoji: '🗃️', color: '#EC4899', bg: '#EC48991A' },
  { name: 'Embedding Models', category: 'AI / ML',emoji: '🧠', color: '#10B981', bg: '#10B9811A' },

  // Tools
  { name: 'Git',         category: 'Tools',       emoji: '🔧', color: '#F05032', bg: '#F050321A' },
  { name: 'GitHub',      category: 'Tools',       emoji: '🐙', color: '#FFFFFF', bg: '#FFFFFF12' },
  { name: 'Docker',      category: 'Tools',       emoji: '🐳', color: '#2496ED', bg: '#2496ED1A' },
  { name: 'Postman',     category: 'Tools',       emoji: '📮', color: '#FF6C37', bg: '#FF6C371A' },
  { name: 'Jira',        category: 'Tools',       emoji: '📋', color: '#0052CC', bg: '#0052CC1A' },
  { name: 'Jupyter',     category: 'Tools',       emoji: '📓', color: '#F37626', bg: '#F376261A' },
];

export const TECH_NODES = ALL_TECH.map((t) => t.name);

const TABS = ['All', 'Languages', 'Frontend', 'Backend', 'AI / ML', 'Tools'];


/* ─── Category label color map ─── */
const CAT_COLOR: Record<string, string> = {
  Languages: '#F7DF1E',
  Frontend:  '#61DAFB',
  Backend:   '#47A248',
  'AI / ML': '#8B5CF6',
  Tools:     '#F05032',
};

export function ActTechStack() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? ALL_TECH
    : ALL_TECH.filter((t) => t.category === activeTab);

  /* Group by category for "All" view */
  const grouped: Record<string, typeof ALL_TECH> = {};
  filtered.forEach((t) => {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  });

  return (
    <section
      id="skills"
      className="relative w-full px-4 sm:px-8 md:px-16 py-16 md:py-24 overflow-hidden bg-[#050505]"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-[#00E5FF]/4 blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto w-full space-y-12 relative z-10">

        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-mono text-xs font-semibold tracking-[0.25em] text-[#00E5FF] uppercase"
          >
            — Tech Arsenal —
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Technical <span className="text-[#00E5FF]">Skills</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[#A8A8A8] text-base sm:text-lg max-w-xl mx-auto"
          >
            Technologies, frameworks & tools I build with
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold font-sans transition-all duration-300 border ${
                  isActive
                    ? 'text-black bg-[#00E5FF] border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.35)]'
                    : 'text-[#A8A8A8] bg-white/4 border-white/10 hover:text-white hover:border-white/25 hover:bg-white/8'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </motion.div>

        {/* Tech Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {activeTab === 'All' ? (
              /* ── Grouped by category ── */
              <div className="space-y-10">
                {Object.entries(grouped).map(([category, techs]) => (
                  <div key={category}>
                    {/* Category Label */}
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="font-display text-lg font-bold"
                        style={{ color: CAT_COLOR[category] ?? '#00E5FF' }}
                      >
                        {category}
                      </span>
                      <div className="flex-1 h-px bg-white/6" />
                      <span className="text-[#404040] text-xs font-mono">{techs.length} techs</span>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                      {techs.map((tech, i) => (
                        <TechCard key={tech.name} tech={tech} index={i} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* ── Single category grid ── */
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {filtered.map((tech, i) => (
                  <TechCard key={tech.name} tech={tech} index={i} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

/* ─── Individual Tech Card ─── */
function TechCard({ tech, index }: { tech: typeof ALL_TECH[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
      className="group relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-white/8 bg-[#0C0C0C] hover:border-white/20 hover:bg-[#111] transition-all duration-300 cursor-default hover:scale-105 hover:shadow-lg"
      style={{
        '--glow-color': tech.color,
      } as React.CSSProperties}
    >
      {/* Icon box */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border transition-all duration-300 group-hover:scale-110"
        style={{
          background: tech.bg,
          borderColor: `${tech.color}30`,
          boxShadow: `0 0 0 0px ${tech.color}00`,
        }}
      >
        <span>{tech.emoji}</span>
      </div>

      {/* Name */}
      <span className="text-[11px] sm:text-xs font-semibold text-[#C0C0C0] group-hover:text-white transition-colors text-center leading-tight">
        {tech.name}
      </span>

      {/* Bottom accent on hover */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-2/3 h-[2px] rounded-full transition-all duration-300"
        style={{ background: tech.color }}
      />
    </motion.div>
  );
}
