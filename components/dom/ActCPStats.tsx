'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/* ─── Official Brand Logos (exact brand colors, SVG paths) ─── */

const LeetCodeLogo = () => (
  <svg viewBox="0 0 95 111" fill="none" className="w-7 h-7">
    <path d="M68.5 37.1H46.9c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5H68.5c1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5z" fill="#FFA116"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M42 72.7L13.3 44c-5-5-5-13.1 0-18.1L32.6 6.6c5-5 13.1-5 18.1 0l54 54c5 5 5 13.1 0 18.1L85.4 88c-5 5-13.1 5-18.1 0L42 62.8V72.7zM47.5 7.9c-3.1 0-6.2 1.2-8.5 3.5L19.7 30.7c-4.7 4.7-4.7 12.3 0 17L42 70l-3.5 3.5V90l30 30c2.3 2.3 5.4 3.5 8.5 3.5s6.2-1.2 8.5-3.5l19.3-19.3c4.7-4.7 4.7-12.3 0-17L47.5 7.9z" fill="#FFA116"/>
    <path d="M56 68.5c-2.8 2.8-7.4 2.8-10.2 0L13.3 36c-2.8-2.8-2.8-7.4 0-10.2L32.6 6.5c2.8-2.8 7.4-2.8 10.2 0l32.5 32.5-3.5 3.5-32-32c-1.4-1.4-3.7-1.4-5.1 0L15.4 29.8c-1.4 1.4-1.4 3.7 0 5.1l32.5 32.5-3.5 3.5 11.6 11.6c2.8 2.8 7.4 2.8 10.2 0l19.3-19.3c1.4-1.4 1.4-3.7 0-5.1L56 68.5z" fill="#B3B3B3"/>
  </svg>
);

const CodeforcesLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
    <rect x="1" y="8" width="6" height="13" rx="1.5" fill="#1890FF"/>
    <rect x="9" y="2" width="6" height="19" rx="1.5" fill="#E74C3C"/>
    <rect x="17" y="12" width="6" height="9" rx="1.5" fill="#1890FF"/>
  </svg>
);

const CodeChefLogo = () => (
  <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none">
    <circle cx="20" cy="20" r="20" fill="#5B4638"/>
    <path d="M20 7c-1.7 0-3 1.3-3 3 0 1.1.6 2.1 1.5 2.6C15.4 13.6 13 16.6 13 20c0 1.5.4 2.9 1.1 4.1C12.4 25 11 26.9 11 29c0 2.2 1.8 4 4 4s4-1.8 4-4h2c0 2.2 1.8 4 4 4s4-1.8 4-4c0-2.1-1.4-4-3.1-4.9.7-1.2 1.1-2.6 1.1-4.1 0-3.4-2.4-6.4-5.5-7.4.9-.5 1.5-1.5 1.5-2.6 0-1.7-1.3-3-3-3zm0 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm0 5c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm-5 12.3c.5.4 1 .7 1.6.9-.4.6-.6 1.2-.6 1.8 0 1.1-.9 2-2 2s-2-.9-2-2c0-1.1.9-2 2-2 .4 0 .7.1 1 .3zm10 0c.3-.2.6-.3 1-.3 1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2c0-.6-.2-1.2-.6-1.8.6-.2 1.1-.5 1.6-.9z" fill="#F5C518"/>
  </svg>
);

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, duration = 1200 }: { target: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const numMatch = target.match(/\d+/);
  const targetNum = numMatch ? parseInt(numMatch[0], 10) : 0;
  const hasPlus = target.includes('+');

  useEffect(() => {
    if (!isInView || targetNum === 0) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * targetNum));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, targetNum, duration]);

  if (targetNum === 0) return <span ref={ref}>{target}</span>;
  return <span ref={ref}>{count.toLocaleString()}{hasPlus ? '+' : ''}</span>;
}

/* ─── Platform Data ─── */
const platforms = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    tagline: 'Primary Algorithmic Platform',
    badge: 'Knight · Top 3%',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    iconBg: 'bg-amber-500/10 border-amber-500/25',
    accentColor: '#FFA116',
    profileUrl: 'https://leetcode.com/u/nobodyknowswhy/',
    stats: [
      { label: 'Solved', value: '1000+', color: 'text-white' },
      { label: 'Rating', value: '1933', color: 'text-[#FFA116]' },
      { label: 'Contests', value: '42', color: 'text-white' },
    ],
    Logo: LeetCodeLogo,
  },
  {
    id: 'codeforces',
    name: 'Codeforces',
    tagline: 'Speed & Math Problem Solving',
    badge: 'Newbie → Pupil',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    iconBg: 'bg-blue-500/10 border-blue-500/25',
    accentColor: '#1890FF',
    profileUrl: 'https://codeforces.com/profile/dhruvvv_1307',
    stats: [
      { label: 'Solved', value: '70+', color: 'text-white' },
      { label: 'Rating', value: '1198', color: 'text-[#1890FF]' },
      { label: 'Contests', value: '10+', color: 'text-white' },
    ],
    Logo: CodeforcesLogo,
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    tagline: 'Long & Starters Contests',
    badge: '3★ Division',
    badgeColor: 'text-amber-600 bg-amber-700/10 border-amber-700/30',
    iconBg: 'bg-amber-700/10 border-amber-700/25',
    accentColor: '#F5C518',
    profileUrl: 'https://www.codechef.com/users/dhruvvv_1307',
    stats: [
      { label: 'Solved', value: '70+', color: 'text-white' },
      { label: 'Rating', value: '1605', color: 'text-[#F5C518]' },
      { label: 'Contests', value: '17', color: 'text-white' },
    ],
    Logo: CodeChefLogo,
  },
];

/* ─── Main Component ─── */
export function ActCPStats() {
  return (
    <section
      id="cp-stats"
      className="relative w-full flex flex-col justify-center px-4 sm:px-8 md:px-16 py-16 md:py-24 overflow-hidden bg-[#050505]"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#00E5FF]/3 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto w-full space-y-14 relative z-10">

        {/* Section Header */}
        <div className="text-center space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-mono text-xs font-semibold tracking-[0.25em] text-[#00E5FF] uppercase"
          >
            — Competitive Programming —
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Platform <span className="text-[#00E5FF]">Profiles</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[#A8A8A8] text-base sm:text-lg max-w-xl mx-auto"
          >
            Data Structures, Algorithms & Contest Ratings across platforms
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platforms.map((platform, i) => {
            const { Logo } = platform;
            return (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Glow on hover */}
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                  style={{ background: `linear-gradient(135deg, ${platform.accentColor}30, transparent)` }}
                />

                <div className="relative flex flex-col h-full rounded-2xl bg-[#0C0C0C] border border-white/8 hover:border-white/20 transition-all duration-500 overflow-hidden shadow-xl">

                  {/* Top accent line */}
                  <div
                    className="h-[2px] w-full opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${platform.accentColor}, transparent)` }}
                  />

                  <div className="flex flex-col flex-1 p-6 space-y-5">

                    {/* Header: logo + badge */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-13 h-13 w-12 h-12 rounded-xl border flex items-center justify-center ${platform.iconBg}`}
                      >
                        <Logo />
                      </div>
                      <span className={`text-[11px] font-semibold font-mono px-2.5 py-1 rounded-full border ${platform.badgeColor}`}>
                        {platform.badge}
                      </span>
                    </div>

                    {/* Platform name */}
                    <div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-[#00E5FF] transition-colors duration-300">
                        {platform.name}
                      </h3>
                      <p className="text-[#606060] text-xs mt-0.5 font-sans">
                        {platform.tagline}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/6">
                      {platform.stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                          <span className={`font-display text-lg font-extrabold ${stat.color}`}>
                            <AnimatedCounter target={stat.value} />
                          </span>
                          <span className="block font-mono text-[10px] text-[#505050] uppercase tracking-wider mt-0.5">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Profile Link Button */}
                    <a
                      href={platform.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white/4 hover:bg-white/8 border border-white/8 hover:border-white/20 transition-all duration-300 group/link"
                    >
                      <span className="text-sm font-semibold text-[#A8A8A8] group-hover/link:text-white transition-colors duration-300">
                        View Profile
                      </span>
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 group-hover/link:scale-110"
                        style={{ background: `${platform.accentColor}20`, border: `1px solid ${platform.accentColor}40` }}
                      >
                        <ArrowUpRight
                          className="w-4 h-4 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                          style={{ color: platform.accentColor }}
                        />
                      </div>
                    </a>
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
