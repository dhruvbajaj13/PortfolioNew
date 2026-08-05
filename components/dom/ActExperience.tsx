'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, CheckCircle2 } from 'lucide-react';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  bullets: string[];
  tech: string[];
  link?: string;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'gomed',
    role: 'Full Stack Developer Intern',
    company: 'GOMed',
    location: 'Delhi, India · Hybrid',
    duration: 'May 2026 – July 2026',
    bullets: [
      'Developed and deployed 5+ production-ready full-stack features for a live healthcare platform serving 3,000+ active users and 500+ paid users.',
      'Built and integrated 10+ REST API endpoints, resolved 20+ production issues, and optimized database queries for 30% faster load times.',
      'Collaborated closely with a cross-functional team in an Agile environment across 6+ sprint feature releases.',
    ],
    tech: ['Java', 'Svelte', 'Node.js', 'REST APIs', 'Git', 'Agile'],
    link: '#',
  },
  {
    id: 'gssoc',
    role: 'Open Source Contributor',
    company: 'GirlScript Summer of Code (GSSoC)',
    location: 'Remote',
    duration: 'June 2025 – Oct 2025',
    bullets: [
      'Contributed core pull requests to high-impact open-source web applications, implementing UI components and optimizing performance.',
      'Participated in code reviews, bug fixes, and documentation improvements across multi-maintainer repositories.',
    ],
    tech: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Git'],
    link: '#',
  },
  {
    id: 'nexel',
    role: 'Frontend Developer Intern',
    company: 'Nexel – Futurize the Innovation',
    location: 'Remote',
    duration: 'Jan 2025 – Feb 2025',
    bullets: [
      'Designed and engineered responsive client interfaces, enhancing user engagement and accessibility.',
      'Optimized asset loading and state management for smoother client-side navigation.',
    ],
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
    link: '#',
  },
];

export function ActExperience({
  selectedExpIndex: externalIndex,
  setSelectedExpIndex: externalSetIndex,
}: {
  selectedExpIndex?: number | null;
  setSelectedExpIndex?: (idx: number | null) => void;
}) {
  const [internalIndex, setInternalIndex] = React.useState<number | null>(0);
  const selectedExpIndex = externalIndex !== undefined ? externalIndex : internalIndex;
  const setSelectedExpIndex = externalSetIndex !== undefined ? externalSetIndex : setInternalIndex;

  return (
    <section
      id="experience"
      className="relative w-full flex flex-col justify-center px-4 sm:px-8 md:px-16 py-16 md:py-24 overflow-hidden pointer-events-none bg-[#050505]"
    >
      <div className="max-w-4xl mx-auto w-full space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 pointer-events-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight"
          >
            My <span className="text-[#00E5FF]">Experience</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-display text-base sm:text-xl font-medium text-[#A8A8A8] tracking-wide max-w-2xl mx-auto"
          >
            Production engineering internships and open-source contributions
          </motion.p>
        </div>

        {/* Compact Connected Vertical Timeline Container */}
        <div className="relative pl-8 sm:pl-12 space-y-6 pointer-events-auto group/timeline max-w-3xl mx-auto">
          
          {/* Vertical Timeline Track Bar */}
          <div className="absolute left-3 sm:left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#00E5FF] via-blue-500 to-[#00E5FF]/20 rounded-full shadow-[0_0_15px_#00E5FF]" />

          {EXPERIENCES.map((exp, idx) => {
            const isSelected = selectedExpIndex === idx;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.12 }}
                viewport={{ once: true }}
                onClick={() => setSelectedExpIndex(idx)}
                className={`relative overflow-hidden group p-5 sm:p-6 rounded-2xl glass-panel border transition-all duration-500 cursor-pointer shadow-[0_15px_40px_rgba(0,0,0,0.9)] bg-[#080808] backdrop-blur-xl group-hover/timeline:opacity-60 hover:!opacity-100 ${
                  isSelected
                    ? 'border-[#00E5FF] shadow-[0_0_35px_rgba(0,229,255,0.35)] scale-[1.01]'
                    : 'border-white/10 hover:border-[#00E5FF]/60'
                }`}
              >
                {/* Interactive Timeline Node Dot */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedExpIndex(idx);
                  }}
                  aria-label={`Select ${exp.company} experience`}
                  className={`absolute -left-[30px] sm:-left-[42px] top-6 w-5 h-5 rounded-full transition-all duration-500 flex items-center justify-center cursor-pointer ${
                    isSelected
                      ? 'bg-[#00E5FF] border-2 border-white shadow-[0_0_20px_#00E5FF] ring-4 ring-[#00E5FF]/30 scale-125 z-20'
                      : 'bg-[#050505] border-2 border-white/20 hover:border-[#00E5FF] hover:scale-110'
                  }`}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                  )}
                </button>

                {/* Card Content Layer */}
                <div className="relative z-10 space-y-3.5">
                  
                  {/* Header Row: Role, Company & Timeline Pill */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <h3
                        className={`font-display text-lg sm:text-xl font-bold transition-colors ${
                          isSelected ? 'text-[#00E5FF]' : 'text-white group-hover:text-[#00E5FF]'
                        }`}
                      >
                        {exp.role}
                      </h3>
                      <h4 className="font-sans text-xs sm:text-sm font-semibold text-[#A8A8A8] group-hover:text-white mt-0.5 flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-[#00E5FF]" />
                        <span>{exp.company}</span>
                      </h4>
                    </div>

                    {/* Timeline Date Pill Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#050505] border border-[#00E5FF]/40 font-mono text-[11px] font-bold text-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.2)] shrink-0 self-start sm:self-center">
                      <Calendar className="w-3 h-3 text-[#00E5FF]" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  {/* Location Tag */}
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#A8A8A8]">
                    <MapPin className="w-3 h-3 text-[#00E5FF]" />
                    <span>{exp.location}</span>
                  </div>

                  {/* Bullet Points */}
                  <ul className="space-y-2 pt-0.5">
                    {exp.bullets.map((b, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-[#A8A8A8] leading-relaxed group-hover:text-white"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-white/10">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] px-3 py-0.5 rounded-full bg-[#050505] border border-white/10 text-[#A8A8A8] group-hover:border-[#00E5FF]/40 group-hover:text-[#00E5FF] transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
