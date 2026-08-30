'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { ActHero } from './ActHero';
import { ActAbout } from './ActAbout';
import { ActExperience } from './ActExperience';
import { ActTechStack } from './ActTechStack';
import { ActProjects } from './ActProjects';
import { ActCPStats } from './ActCPStats';
import { ActContact } from './ActContact';

export function StackingCardsLayout({
  selectedTech,
  setSelectedTech,
  activeProjectIndex,
  setActiveProjectIndex,
}: {
  selectedTech: string | null;
  setSelectedTech: (id: string | null) => void;
  activeProjectIndex: number;
  setActiveProjectIndex: (idx: number) => void;
}) {
  const cards = [
    {
      id: 'hero',
      component: <ActHero />,
      bg: 'bg-[#030306]/90 border border-slate-800/80 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]',
    },
    {
      id: 'about',
      component: <ActAbout />,
      bg: 'bg-[#080a14]/95 border border-cyan-500/20 shadow-[0_-25px_60px_rgba(0,240,255,0.15)]',
    },
    {
      id: 'experience',
      component: <ActExperience />,
      bg: 'bg-[#0b0c1a]/95 border border-violet-500/20 shadow-[0_-25px_60px_rgba(112,0,255,0.15)]',
    },
    {
      id: 'tech',
      component: <ActTechStack />,

      bg: 'bg-[#070914]/95 border border-blue-500/20 shadow-[0_-25px_60px_rgba(0,102,255,0.15)]',
    },
    {
      id: 'projects',
      component: <ActProjects />,
      bg: 'bg-[#0a0816]/95 border border-cyan-400/30 shadow-[0_-30px_70px_rgba(0,240,255,0.2)]',
    },
    {
      id: 'cp',
      component: <ActCPStats />,
      bg: 'bg-[#0c0918]/95 border border-amber-500/20 shadow-[0_-25px_60px_rgba(245,158,11,0.15)]',
    },
    {
      id: 'contact',
      component: <ActContact />,
      bg: 'bg-[#04050d]/98 border border-cyan-400/40 shadow-[0_-30px_80px_rgba(0,240,255,0.25)]',
    },
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pb-24 space-y-12">
      {cards.map((card, idx) => (
        <motion.div
          key={card.id}
          id={card.id}
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className={`sticky top-20 rounded-[2.5rem] ${card.bg} backdrop-blur-3xl overflow-hidden transition-all duration-500`}
          style={{
            zIndex: idx + 10,
          }}
        >
          {card.component}
        </motion.div>
      ))}
    </div>
  );
}
