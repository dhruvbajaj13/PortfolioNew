'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Github, Code2, GitBranch, Cpu, Terminal, Flame, Sparkles, Database } from 'lucide-react';

/* ─── Vibrant Always-Colored Engineering Tiles ─── */

const LeetCodeTile = () => (
  <div className="w-full h-full bg-[#0D0B08] border border-[#FFA116]/25 p-3.5 sm:p-4 flex flex-col justify-between select-none rounded-xl md:rounded-[20px]">
    <div className="flex items-center justify-between border-b border-[#FFA116]/15 pb-2">
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 95 111" fill="none" className="w-4 h-4 shrink-0">
          <path d="M68.5 37.1H46.9c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5H68.5c1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5z" fill="#FFA116"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M42 72.7L13.3 44c-5-5-5-13.1 0-18.1L32.6 6.6c5-5 13.1-5 18.1 0l54 54c5 5 5 13.1 0 18.1L85.4 88c-5 5-13.1 5-18.1 0L42 62.8V72.7zM47.5 7.9c-3.1 0-6.2 1.2-8.5 3.5L19.7 30.7c-4.7 4.7-4.7 12.3 0 17L42 70l-3.5 3.5V90l30 30c2.3 2.3 5.4 3.5 8.5 3.5s6.2-1.2 8.5-3.5l19.3-19.3c4.7-4.7 4.7-12.3 0-17L47.5 7.9z" fill="#FFA116"/>
        </svg>
        <span className="text-[11px] font-mono font-bold text-[#FFA116] uppercase tracking-wider">LeetCode Knight</span>
      </div>
      <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
        <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
        366 Days
      </span>
    </div>
    <div className="space-y-1 pt-1">
      <div className="flex items-baseline justify-between">
        <span className="font-display font-black text-white text-lg">4,000+</span>
        <span className="text-[10px] font-mono text-[#FFA116] bg-[#FFA116]/10 px-2 py-0.5 rounded-full border border-[#FFA116]/30">Rating 1933</span>
      </div>
      <p className="text-[10px] text-white/50 font-mono">1,000+ Problems Solved · Top 3%</p>
    </div>
  </div>
);

const RagAITile = () => (
  <div className="w-full h-full bg-[#0B0813] border border-[#A855F7]/25 p-3.5 sm:p-4 flex flex-col justify-between select-none rounded-xl md:rounded-[20px]">
    <div className="flex items-center justify-between border-b border-[#A855F7]/15 pb-2">
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#C084FC] uppercase tracking-wider font-semibold">
        <Sparkles className="w-3.5 h-3.5 text-[#C084FC]" />
        <span>RAG & AI Agents</span>
      </div>
      <span className="text-[9px] font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 rounded">LangGraph</span>
    </div>
    <div className="flex items-center justify-between text-[9px] font-mono pt-2 gap-1 text-center">
      <span className="px-2 py-1 rounded bg-[#1CD399]/15 text-[#1CD399] border border-[#1CD399]/30">Embeddings</span>
      <span className="text-white/30">→</span>
      <span className="px-2 py-1 rounded bg-[#A855F7]/15 text-[#C084FC] border border-[#A855F7]/30">ChromaDB</span>
      <span className="text-white/30">→</span>
      <span className="px-2 py-1 rounded bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30">FastAPI</span>
    </div>
  </div>
);

const TerminalTile = () => (
  <div className="w-full h-full bg-[#080808] border border-white/10 p-3.5 sm:p-4 font-mono text-[10px] flex flex-col justify-between select-none rounded-xl md:rounded-[20px]">
    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-1">
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="text-[9px] text-white/40 ml-1.5 font-mono">dhruv@nsut-ece</span>
      </div>
      <span className="text-[9px] text-emerald-400 font-bold">READY</span>
    </div>
    <div className="space-y-1 text-left leading-tight pt-1">
      <div><span className="text-emerald-400">$</span> java Solution.java</div>
      <div className="text-white font-semibold flex items-center gap-1"><span className="text-emerald-400">✔</span> LeetCode Daily: Accepted (0ms)</div>
      <div><span className="text-sky-400">$</span> next build &amp;&amp; deploy</div>
      <div className="text-white/70 flex items-center gap-1"><span className="text-emerald-400">✔</span> Zero Vulnerabilities · Optimized</div>
    </div>
  </div>
);

const IoTSensorTile = () => (
  <div className="w-full h-full bg-[#06120F] border border-[#10B981]/25 p-3.5 sm:p-4 flex flex-col justify-between select-none rounded-xl md:rounded-[20px]">
    <div className="flex items-center justify-between border-b border-[#10B981]/15 pb-2">
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#34D399] uppercase tracking-wider font-semibold">
        <Cpu className="w-3.5 h-3.5 text-[#34D399]" />
        <span>IoT &amp; Embedded (NSUT)</span>
      </div>
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
    </div>
    <div className="space-y-1 pt-1 font-mono text-[10px]">
      <div className="flex items-center justify-between text-white/90">
        <span className="text-emerald-400">ESP32 Telemetry</span>
        <span className="text-[9px] text-white/40">MQTT @ 24Hz</span>
      </div>
      <div className="flex gap-2 text-[9px] text-white/60">
        <span className="bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">Ultrasonic ±1cm</span>
        <span className="bg-[#38BDF8]/10 px-2 py-0.5 rounded border border-[#38BDF8]/20">Smart Edge</span>
      </div>
    </div>
  </div>
);

const GithubContributionsTile = () => (
  <div className="w-full h-full bg-[#080E09] border border-[#22c55e]/25 p-3.5 sm:p-4 flex flex-col justify-between select-none rounded-xl md:rounded-[20px]">
    <div className="flex items-center justify-between border-b border-[#22c55e]/15 pb-2">
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
        <Github className="w-3.5 h-3.5 text-emerald-400" />
        <span>GitHub Commits</span>
      </div>
      <span className="text-[10px] font-mono text-white font-bold">540+ commits</span>
    </div>
    <div className="grid grid-flow-col grid-rows-5 gap-[3px] my-auto justify-center">
      {Array.from({ length: 90 }).map((_, i) => {
        const val = (i * 7 + 13) % 5;
        const bg =
          val === 0 ? 'bg-emerald-950/40' :
          val === 1 ? 'bg-emerald-800' :
          val === 2 ? 'bg-emerald-600' :
          val === 3 ? 'bg-emerald-500' :
          'bg-emerald-400 shadow-[0_0_4px_#34d399]';
        return <div key={i} className={`w-1.5 h-1.5 rounded-sm ${bg}`} />;
      })}
    </div>
  </div>
);

const FullStackTile = () => (
  <div className="w-full h-full bg-[#080D14] border border-[#38BDF8]/25 p-3.5 sm:p-4 flex flex-col justify-between select-none rounded-xl md:rounded-[20px]">
    <div className="flex items-center justify-between border-b border-[#38BDF8]/15 pb-2">
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-sky-400 uppercase tracking-wider font-semibold">
        <Database className="w-3.5 h-3.5 text-sky-400" />
        <span>Full-Stack Architecture</span>
      </div>
      <span className="text-[9px] font-mono text-sky-300">18ms Latency</span>
    </div>
    <div className="flex items-center justify-between text-[9px] font-mono pt-1.5 gap-1.5">
      <span className="px-2 py-1 rounded bg-[#61DAFB]/15 text-[#61DAFB] border border-[#61DAFB]/30">React 19</span>
      <span className="px-2 py-1 rounded bg-[#339933]/15 text-[#4ADE80] border border-[#339933]/30">Node.js</span>
      <span className="px-2 py-1 rounded bg-[#47A248]/15 text-[#47A248] border border-[#47A248]/30">MongoDB</span>
      <span className="px-2 py-1 rounded bg-[#3178C6]/15 text-[#38BDF8] border border-[#3178C6]/30">TypeScript</span>
    </div>
  </div>
);

const SortingTile = () => (
  <div className="w-full h-full bg-[#0D0A14] border border-[#EC4899]/25 p-3.5 sm:p-4 flex flex-col justify-between select-none rounded-xl md:rounded-[20px]">
    <div className="flex items-center justify-between border-b border-[#EC4899]/15 pb-2">
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-pink-400 uppercase tracking-wider font-semibold">
        <Code2 className="w-3.5 h-3.5 text-pink-400" />
        <span>DSA Algorithms</span>
      </div>
      <span className="text-[9px] font-mono text-amber-400 font-semibold">O(N log N)</span>
    </div>
    <div className="flex items-end justify-center gap-1.5 h-[46px] px-2">
      {[25, 45, 15, 80, 35, 95, 55, 30, 85, 40, 65, 20, 50].map((h, i) => {
        const isPivot = i === 5;
        const isComparing = i === 3 || i === 8;
        const bgClass = isPivot
          ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]'
          : isComparing
          ? 'bg-emerald-400 shadow-[0_0_6px_#10b981]'
          : i % 2 === 0
          ? 'bg-sky-400/80'
          : 'bg-purple-400/80';
        return (
          <div 
            key={i} 
            className={`w-[6px] rounded-t-sm transition-all duration-300 ${bgClass}`} 
            style={{ height: `${h}%` }}
          />
        );
      })}
    </div>
  </div>
);

const GitGraphTile = () => (
  <div className="w-full h-full bg-[#080808] border border-white/15 p-3.5 sm:p-4 flex flex-col justify-between select-none rounded-xl md:rounded-[20px]">
    <div className="flex items-center justify-between border-b border-white/10 pb-2">
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/70 uppercase tracking-wider font-semibold">
        <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
        <span>Git Branch Pipeline</span>
      </div>
      <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded">CI/CD PASS</span>
    </div>
    <div className="relative flex-1 flex items-center justify-center pt-1">
      <svg className="w-full h-[40px]" viewBox="0 0 200 40">
        <path d="M 10 20 L 190 20" stroke="#10b981" strokeWidth="2" />
        <path d="M 30 20 Q 50 6, 80 6 L 140 6 Q 160 20, 175 20" stroke="#8b5cf6" strokeWidth="2" fill="none" />
        <path d="M 60 6 Q 80 34, 110 34 L 130 34 Q 140 20, 150 6" stroke="#f59e0b" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="20" r="3" fill="#10b981" />
        <circle cx="80" cy="6" r="3" fill="#8b5cf6" />
        <circle cx="110" cy="34" r="3" fill="#f59e0b" />
        <circle cx="150" cy="6" r="3" fill="#8b5cf6" />
        <circle cx="180" cy="20" r="3.5" fill="#10b981" />
      </svg>
    </div>
  </div>
);

export function ActMarquee() {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const { top } = sectionRef.current.getBoundingClientRect();
          if (top < window.innerHeight && top > -window.innerHeight * 2) {
            setOffset((window.scrollY - top + window.innerHeight) * 0.35);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const TILES_ROW1 = [
    <LeetCodeTile key="lc" />,
    <TerminalTile key="term" />,
    <RagAITile key="rag" />,
    <GithubContributionsTile key="gh" />,
    <IoTSensorTile key="iot" />,
    <SortingTile key="sort" />,
  ];

  const TILES_ROW2 = [
    <FullStackTile key="fs" />,
    <GitGraphTile key="git" />,
    <LeetCodeTile key="lc2" />,
    <RagAITile key="rag2" />,
    <TerminalTile key="term2" />,
    <IoTSensorTile key="iot2" />,
  ];

  const row1 = [...TILES_ROW1, ...TILES_ROW1, ...TILES_ROW1, ...TILES_ROW1];
  const row2 = [...TILES_ROW2, ...TILES_ROW2, ...TILES_ROW2, ...TILES_ROW2];

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-[#050505] overflow-hidden flex flex-col gap-4 relative z-10">
      
      {/* Dark gradient masks for smooth edges */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-36 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-36 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

      {/* Row 1 (Moves Right) */}
      <div 
        className="flex gap-4 will-change-transform"
        style={{ transform: `translateX(${offset - 400}px)` }}
      >
        {row1.map((tile, i) => (
          <div 
            key={`r1-${i}`} 
            className="w-[240px] md:w-[280px] h-[125px] md:h-[140px] shrink-0"
          >
            {tile}
          </div>
        ))}
      </div>

      {/* Row 2 (Moves Left) */}
      <div 
        className="flex gap-4 will-change-transform"
        style={{ transform: `translateX(${-(offset - 400)}px)` }}
      >
        {row2.map((tile, i) => (
          <div 
            key={`r2-${i}`} 
            className="w-[240px] md:w-[280px] h-[125px] md:h-[140px] shrink-0"
          >
            {tile}
          </div>
        ))}
      </div>

    </section>
  );
}
