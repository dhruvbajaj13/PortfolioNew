'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Code2, Trophy, Flame } from 'lucide-react';

// Official LeetCode Vector Logo SVG
const LeetCodeLogo = () => (
  <svg className="w-8 h-8 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.102 17.93l-2.697 2.607c-.466.45-1.08.7-1.733.7-.653 0-1.267-.25-1.733-.7l-5.69-5.498c-.466-.45-.723-1.042-.723-1.674 0-.632.257-1.224.723-1.674l5.69-5.498c.466-.45 1.08-.7 1.733-.7.653 0 1.267.25 1.733.7l2.697 2.607a.784.784 0 010 1.127.822.822 0 01-1.144 0l-2.697-2.607a.818.818 0 00-.589-.239c-.221 0-.43.085-.589.239l-5.69 5.498a.774.774 0 000 1.127l5.69 5.498c.159.154.368.239.589.239.221 0 .43-.085.589-.239l2.697-2.607a.822.822 0 011.144 0 .784.784 0 010 1.127zM20.485 10.96a.784.784 0 000-1.127L14.795 4.335a2.532 2.532 0 00-3.567 0L5.538 9.833a2.441 2.441 0 000 3.524l5.69 5.498a2.532 2.532 0 003.567 0l5.69-5.498c.466-.45.723-1.042.723-1.674 0-.244-.038-.481-.123-.723zm-7.618 6.136a.784.784 0 010-1.127l3.69-3.567a.822.822 0 011.144 0c.316.305.316.822 0 1.127l-3.69 3.567a.822.822 0 01-1.144 0z" />
  </svg>
);

// Official Codeforces Vector Logo SVG
const CodeforcesLogo = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
    <rect x="1.5" y="9" width="5" height="12" rx="1.5" fill="#FFC107" />
    <rect x="9.5" y="3" width="5" height="18" rx="1.5" fill="#2196F3" />
    <rect x="17.5" y="13" width="5" height="8" rx="1.5" fill="#E91E63" />
  </svg>
);

// Official CodeChef Vector Logo SVG
const CodeChefLogo = () => (
  <svg className="w-8 h-8 text-amber-700" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
  </svg>
);

// Viewport Triggered Count-Up Counter
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
      const current = Math.floor(progress * targetNum);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, targetNum, duration]);

  if (targetNum === 0) {
    return <span ref={ref}>{target}</span>;
  }

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {hasPlus ? '+' : ''}
    </span>
  );
}

export function ActCPStats() {
  return (
    <section
      id="cp-stats"
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
            Competitive <span className="text-[#00E5FF]">Programming</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-display text-base sm:text-xl font-medium text-[#A8A8A8] tracking-wide max-w-2xl mx-auto"
          >
            Data Structures, Algorithms, and Contest Ratings across platforms
          </motion.p>
        </div>

        {/* CP Platforms Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pointer-events-auto">
          
          {/* Card 1: LeetCode */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl glass-panel border border-white/10 hover:border-[#00E5FF]/50 transition-all duration-500 shadow-2xl bg-[#080808] space-y-6 group hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shadow-lg">
                <LeetCodeLogo />
              </div>
              <span className="font-mono text-xs font-bold text-[#00E5FF] px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30">
                Knight / Top 3%
              </span>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                LeetCode
              </h3>
              <p className="font-sans text-xs text-[#A8A8A8] mt-1">
                Primary Algorithmic Platform
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
              <div>
                <span className="font-mono text-[11px] text-[#A8A8A8] block uppercase">Solved</span>
                <span className="font-display text-xl font-extrabold text-white">
                  <AnimatedCounter target="1000+" />
                </span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-[#A8A8A8] block uppercase">Rating</span>
                <span className="font-display text-xl font-extrabold text-[#00E5FF]">
                  <AnimatedCounter target="1933" />
                </span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-[#A8A8A8] block uppercase">Contests</span>
                <span className="font-display text-xl font-extrabold text-white">
                  <AnimatedCounter target="42" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Codeforces */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl glass-panel border border-white/10 hover:border-[#00E5FF]/50 transition-all duration-500 shadow-2xl bg-[#080808] space-y-6 group hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shadow-lg">
                <CodeforcesLogo />
              </div>
              <span className="font-mono text-xs font-bold text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                Active Contestant
              </span>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                Codeforces
              </h3>
              <p className="font-sans text-xs text-[#A8A8A8] mt-1">
                Speed & Math Problem Solving
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
              <div>
                <span className="font-mono text-[11px] text-[#A8A8A8] block uppercase">Solved</span>
                <span className="font-display text-xl font-extrabold text-white">
                  <AnimatedCounter target="70+" />
                </span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-[#A8A8A8] block uppercase">Rating</span>
                <span className="font-display text-xl font-extrabold text-[#00E5FF]">
                  <AnimatedCounter target="1198" />
                </span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-[#A8A8A8] block uppercase">Contests</span>
                <span className="font-display text-xl font-extrabold text-white">
                  <AnimatedCounter target="10+" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 3: CodeChef */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl glass-panel border border-white/10 hover:border-[#00E5FF]/50 transition-all duration-500 shadow-2xl bg-[#080808] space-y-6 group hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-amber-700/10 border border-amber-700/30 flex items-center justify-center shadow-lg">
                <CodeChefLogo />
              </div>
              <span className="font-mono text-xs font-bold text-amber-400 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                3★ Division
              </span>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                CodeChef
              </h3>
              <p className="font-sans text-xs text-[#A8A8A8] mt-1">
                Long & Starters Contests
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
              <div>
                <span className="font-mono text-[11px] text-[#A8A8A8] block uppercase">Solved</span>
                <span className="font-display text-xl font-extrabold text-white">
                  <AnimatedCounter target="70+" />
                </span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-[#A8A8A8] block uppercase">Rating</span>
                <span className="font-display text-xl font-extrabold text-[#00E5FF]">
                  <AnimatedCounter target="1605" />
                </span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-[#A8A8A8] block uppercase">Contests</span>
                <span className="font-display text-xl font-extrabold text-white">
                  <AnimatedCounter target="17" />
                </span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
