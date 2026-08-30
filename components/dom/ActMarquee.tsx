'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Github, Code2, GitBranch } from 'lucide-react';

/* ─── Custom Premium Portfolio-Relevant Tiles ─── */

const TerminalTile = () => (
  <div className="w-full h-full bg-[#080808] p-4 font-mono text-[10px] text-white/50 flex flex-col justify-between select-none">
    <div className="flex items-center gap-1.5 border-b border-white/5 pb-2 mb-1">
      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
      <span className="text-[9px] text-white/20 ml-2 font-mono">bash - dev@nsut</span>
    </div>
    <div className="flex-1 space-y-1 text-left leading-normal pt-1.5">
      <div><span className="text-white/30">$</span> npm run build</div>
      <div className="text-white">✓ Compiled successfully</div>
      <div><span className="text-white/30">$</span> python agent.py</div>
      <div className="text-white/70">🤖 RAG Agent: vector DB connected</div>
    </div>
  </div>
);

const GithubContributionsTile = () => (
  <div className="w-full h-full bg-[#080808] p-4 flex flex-col justify-between select-none">
    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-1">
      <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/40 uppercase tracking-wider">
        <Github className="w-3 h-3 text-white/50" />
        <span>GitHub Commits</span>
      </div>
      <span className="text-[9px] font-mono text-white font-semibold">540+ commits</span>
    </div>
    <div className="grid grid-flow-col grid-rows-5 gap-[3px] my-auto justify-center">
      {Array.from({ length: 90 }).map((_, i) => {
        // Pseudo-random but deterministic levels
        const val = (i * 7 + 13) % 5;
        const bgClass =
          val === 0 ? 'bg-white/5' :
          val === 1 ? 'bg-white/10' :
          val === 2 ? 'bg-white/20' :
          val === 3 ? 'bg-white/40' :
          'bg-white';
        return <div key={i} className={`w-1.5 h-1.5 rounded-sm ${bgClass}`} />;
      })}
    </div>
  </div>
);

const SortingTile = () => (
  <div className="w-full h-full bg-[#080808] p-4 flex flex-col justify-between select-none">
    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-1">
      <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/40 uppercase tracking-wider">
        <Code2 className="w-3 h-3 text-white/50" />
        <span>QuickSort Algorithm</span>
      </div>
      <span className="text-[9px] font-mono text-white/30">O(N log N)</span>
    </div>
    <div className="flex items-end justify-center gap-1.5 h-[50px] px-2">
      {[25, 45, 15, 80, 35, 95, 55, 30, 85, 40, 65, 20, 50].map((h, i) => {
        const isPivot = i === 5;
        const isComparing = i === 3 || i === 8;
        const bgClass = isPivot ? 'bg-white shadow-[0_0_8px_white]' : isComparing ? 'bg-white/55' : 'bg-white/10';
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
  <div className="w-full h-full bg-[#080808] p-4 flex flex-col justify-between select-none">
    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-1">
      <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/40 uppercase tracking-wider">
        <GitBranch className="w-3 h-3 text-white/50" />
        <span>Git Branch History</span>
      </div>
      <span className="text-[9px] font-mono text-white/40">main</span>
    </div>
    <div className="relative flex-1 flex items-center justify-center pt-2">
      <svg className="w-full h-[45px]" viewBox="0 0 200 45">
        <path d="M 10 22 L 190 22" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="3,3" />
        <path d="M 30 22 Q 50 5, 80 5 L 140 5 Q 160 22, 175 22" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
        <path d="M 60 5 Q 80 38, 110 38 L 130 38 Q 140 22, 150 5" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" />
        <circle cx="20" cy="22" r="3" fill="#fff" />
        <circle cx="40" cy="22" r="2.5" fill="rgba(255,255,255,0.3)" />
        <circle cx="80" cy="5" r="2.5" fill="#fff" />
        <circle cx="95" cy="22" r="2.5" fill="rgba(255,255,255,0.3)" />
        <circle cx="110" cy="38" r="2.5" fill="#fff" />
        <circle cx="130" cy="38" r="2.5" fill="#fff" />
        <circle cx="150" cy="5" r="2.5" fill="#fff" />
        <circle cx="180" cy="22" r="3" fill="#fff" />
      </svg>
    </div>
  </div>
);

const ProjectTile = ({ image, title, category }: { image: string; title: string; category: string }) => (
  <div className="w-full h-full relative group select-none overflow-hidden">
    <img 
      src={image} 
      alt={title} 
      className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-all duration-500 grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100" 
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-left">
      <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">{category}</span>
      <span className="text-[11px] font-sans font-bold text-white tracking-wide mt-0.5">{title}</span>
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
    { type: 'project', title: 'Splitr App', category: 'AI Expense Tracker', image: '/images/splitr.jpg' },
    { type: 'component', component: <TerminalTile /> },
    { type: 'project', title: 'RAG AI Agent', category: 'Autonomous Agent', image: '/images/rag_agent.jpg' },
    { type: 'component', component: <GithubContributionsTile /> },
    { type: 'project', title: 'Spatial AI', category: '3D Mapping', image: '/images/spatial.jpg' },
    { type: 'component', component: <SortingTile /> },
  ];

  const TILES_ROW2 = [
    { type: 'component', component: <GitGraphTile /> },
    { type: 'project', title: 'CodeCraft IDE', category: 'SaaS Cloud IDE', image: '/images/codecraft.jpg' },
    { type: 'component', component: <TerminalTile /> },
    { type: 'project', title: 'Synthex Extension', category: 'AI Browser Tool', image: '/images/synthex.jpg' },
    { type: 'component', component: <GithubContributionsTile /> },
    { type: 'project', title: 'AI Workflow', category: 'Agent Pipelines', image: '/images/ai_workflow.jpg' },
  ];

  // Duplicate arrays to ensure seamless infinite looping scroll behavior
  const row1 = [...TILES_ROW1, ...TILES_ROW1, ...TILES_ROW1, ...TILES_ROW1];
  const row2 = [...TILES_ROW2, ...TILES_ROW2, ...TILES_ROW2, ...TILES_ROW2];

  return (
    <section ref={sectionRef} className="py-10 md:py-14 bg-[#050505] overflow-hidden flex flex-col gap-4 relative z-10">
      
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
            className="w-[200px] md:w-[260px] h-[120px] md:h-[150px] shrink-0 rounded-xl md:rounded-[20px] overflow-hidden border border-white/10 bg-[#080808] hover:border-white/20 transition-colors duration-300"
          >
            {tile.type === 'project' ? (
              <ProjectTile image={tile.image!} title={tile.title!} category={tile.category!} />
            ) : (
              tile.component
            )}
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
            className="w-[200px] md:w-[260px] h-[120px] md:h-[150px] shrink-0 rounded-xl md:rounded-[20px] overflow-hidden border border-white/10 bg-[#080808] hover:border-white/20 transition-colors duration-300"
          >
            {tile.type === 'project' ? (
              <ProjectTile image={tile.image!} title={tile.title!} category={tile.category!} />
            ) : (
              tile.component
            )}
          </div>
        ))}
      </div>

    </section>
  );
}
