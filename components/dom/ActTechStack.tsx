'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_TECH = [
  // Languages
  { name: 'Java',         category: 'Languages', color: '#E76F00', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'JavaScript',  category: 'Languages', color: '#F7DF1E', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript',  category: 'Languages', color: '#3178C6', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Python',      category: 'Languages', color: '#3776AB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },

  // Frontend
  { name: 'React.js',    category: 'Frontend',  color: '#61DAFB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js',     category: 'Frontend',  color: '#FFFFFF', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Tailwind CSS',category: 'Frontend',  color: '#06B6D4', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Framer Motion',category:'Frontend',  color: '#BB4BFF', logo: 'https://cdn.simpleicons.org/framer/BB4BFF' },
  { name: 'HTML5 / CSS3',category: 'Frontend',  color: '#E34F26', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },

  // Backend
  { name: 'Node.js',     category: 'Backend',   color: '#339933', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express.js',  category: 'Backend',   color: '#FFFFFF', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'REST APIs',   category: 'Backend',   color: '#FFFFFF', logo: 'https://cdn.simpleicons.org/fastapi/00E5FF' },
  { name: 'MongoDB',     category: 'Backend',   color: '#47A248', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'MySQL',       category: 'Backend',   color: '#4479A1', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'ChromaDB',    category: 'Backend',   color: '#A855F7', logo: 'https://cdn.simpleicons.org/chromatic/A855F7' },

  // AI / ML
  { name: 'LangChain',   category: 'AI / ML',   color: '#1CD399', logo: 'https://cdn.simpleicons.org/langchain/1CD399' },
  { name: 'LangGraph',   category: 'AI / ML',   color: '#FF6B6B', logo: 'https://cdn.simpleicons.org/langchain/FF6B6B' },
  { name: 'OpenAI',      category: 'AI / ML',   color: '#FFFFFF', logo: 'https://cdn.simpleicons.org/openai/FFFFFF' },
  { name: 'RAG',         category: 'AI / ML',   color: '#F59E0B', logo: 'https://cdn.simpleicons.org/googlebard/F59E0B' },
  { name: 'Vector DBs',  category: 'AI / ML',   color: '#EC4899', logo: 'https://cdn.simpleicons.org/pinecone/EC4899' },
  { name: 'HuggingFace', category: 'AI / ML',   color: '#FFD21E', logo: 'https://cdn.simpleicons.org/huggingface/FFD21E' },

  // Tools
  { name: 'Git',         category: 'Tools',     color: '#F05032', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub',      category: 'Tools',     color: '#FFFFFF', logo: 'https://cdn.simpleicons.org/github/FFFFFF' },
  { name: 'Docker',      category: 'Tools',     color: '#2496ED', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Postman',     category: 'Tools',     color: '#FF6C37', logo: 'https://cdn.simpleicons.org/postman/FF6C37' },
  { name: 'Jira',        category: 'Tools',     color: '#0052CC', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
  { name: 'Jupyter',     category: 'Tools',     color: '#F37626', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
];

export const TECH_NODES = ALL_TECH.map((t) => t.name);

const TABS = ['All', 'Languages', 'Frontend', 'Backend', 'AI / ML', 'Tools'];

export function ActTechStack() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? ALL_TECH
    : ALL_TECH.filter((t) => t.category === activeTab);

  return (
    <section
      id="skills"
      className="relative w-full px-4 sm:px-8 md:px-16 py-24 md:py-32 bg-[#050505]"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header — same premium style as Experience */}
        <div className="mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs tracking-[0.25em] text-white/40 uppercase mb-4"
          >
            — Tech Arsenal —
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none"
          >
            Skills
          </motion.h2>
        </div>

        {/* Two-column layout — identical to Experience layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

          {/* Left column – clickable categories list */}
          <div className="lg:w-[42%] flex flex-col gap-3">
            {TABS.map((tab, i) => {
              const count = tab === 'All' ? ALL_TECH.length : ALL_TECH.filter(t => t.category === tab).length;
              return (
                <motion.button
                  key={tab}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  onClick={() => setActiveTab(tab)}
                  className={`group text-left w-full px-6 py-5 rounded-2xl border transition-all duration-300 flex justify-between items-center gap-4 ${
                    activeTab === tab
                      ? 'bg-white/5 border-white/30'
                      : 'bg-white/[0.02] border-white/8 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className={`font-display font-bold text-lg md:text-xl tracking-tight transition-colors leading-tight ${activeTab === tab ? 'text-white' : 'text-white/50 group-hover:text-white/85'}`}>
                      {tab}
                    </span>
                    <span className={`font-mono text-[10px] tracking-widest uppercase transition-colors mt-0.5 ${activeTab === tab ? 'text-white/40' : 'text-white/20 group-hover:text-white/30'}`}>
                      Category {i + 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs transition-colors ${activeTab === tab ? 'text-white/60' : 'text-white/30 group-hover:text-white/50'}`}>
                      {count} items
                    </span>
                    {/* Active indicator line on right */}
                    <div className={`w-0.5 h-10 rounded-full flex-shrink-0 transition-all duration-300 ${activeTab === tab ? 'bg-white' : 'bg-white/10'}`} />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right column – tech stack grid */}
          <div className="lg:flex-1 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10 flex flex-col justify-between h-full gap-8 min-h-[350px]"
              >
                <div className="flex flex-col gap-1 pb-6 border-b border-white/10">
                  <h3 className="font-display font-black text-2xl text-white tracking-tight">
                    {activeTab} Stack
                  </h3>
                  <p className="text-white/40 text-xs font-mono tracking-wider uppercase">
                    {filtered.length} Technologies Active
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 py-2">
                  {filtered.map((tech, i) => (
                    <TechCard key={tech.name} tech={tech} index={i} />
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

function TechCard({ tech, index }: { tech: typeof ALL_TECH[0]; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.02, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.08] transition-all duration-300 cursor-default hover:scale-[1.03] shadow-md hover:shadow-lg"
    >
      {/* Icon container */}
      <div className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/10 bg-white/5 transition-all duration-300 group-hover:scale-105 group-hover:border-white/30">
        {!imgError ? (
          <img
            src={tech.logo}
            alt={tech.name}
            className="w-5 h-5 object-contain opacity-90 group-hover:opacity-100 transition-all duration-300"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <span className="text-sm font-extrabold font-mono text-white/60 group-hover:text-white transition-colors">
            {tech.name[0]}
          </span>
        )}
      </div>

      <span className="text-[11px] font-semibold text-white/40 group-hover:text-white transition-colors text-center leading-tight">
        {tech.name}
      </span>
    </motion.div>
  );
}
