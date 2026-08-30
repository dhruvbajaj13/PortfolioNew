'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, ExternalLink, Download } from 'lucide-react';

// Minimal floating white particles — no neon, no cyan, no shapes
const HeroParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const N = 90;
    type Dot = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    const dots: Dot[] = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random() * 0.4 + 0.15,
    }));

    const maxDist = 140;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Draw connecting lines
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.08 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
      // Draw dots
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${d.a})`;
        ctx.fill();
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />;
};


// Roles for Typewriter Text Loop
const ROLES = [
  'Full-Stack Developer',
  'AI Engineer',
  'DSA Enthusiast',
  'Software Developer',
];

export function ActHero({
  selectedProject,
  setSelectedProject,
}: {
  selectedProject?: any;
  setSelectedProject?: (proj: any) => void;
}) {
  const RESUME_URL = 'https://drive.google.com/file/d/1F0QmpaQFUWuysUn1V8pO1E9kHdVS_BCZ/view';

  // Typewriter Loop Logic
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(targetRole.substring(0, currentText.length + 1));
        if (currentText === targetRole) {
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        setCurrentText(targetRole.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, roleIndex]);

  const scrollToNext = () => {
    const nextEl = document.getElementById('about');
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 md:px-16 pt-28 sm:pt-36 pb-12 overflow-hidden pointer-events-none z-10 bg-[#050505]"
    >
      {/* Minimal Particle Background */}
      <HeroParticleBackground />

      {/* Volumetric Radial Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,transparent_70%)] blur-[160px] pointer-events-none z-0" />

      {/* Main Hero Content Layout */}
      <div className="max-w-4xl mx-auto w-full my-auto space-y-8 pt-4 text-center relative z-10">
        
        {/* Status Pill Badge (Matching Screenshot) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#080808]/90 border border-white/10 text-xs font-semibold text-slate-300 shadow-lg pointer-events-auto backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Open to SDE Internship Opportunities</span>
        </motion.div>

        {/* Hero Title (Matching Screenshot: Dhruv Bajaj) */}
        <div className="space-y-3">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-tight"
          >
            Dhruv <span className="text-[#FFFFFF]">Bajaj</span>
          </motion.h1>

          {/* Typewriter Dynamic Role Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-12 flex items-center justify-center"
          >
            <span className="font-display text-lg sm:text-2xl font-semibold text-white tracking-wide">
              {currentText}
              <span className="text-[#FFFFFF] animate-pulse ml-0.5">|</span>
            </span>
          </motion.div>
        </div>

        {/* Description Paragraph (Matching Screenshot) */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="font-sans text-base sm:text-xl text-[#A8A8A8] max-w-2xl mx-auto leading-relaxed"
        >
          ECE undergrad at NSUT building full-stack products and AI systems. I turn ideas into production-ready software — fast, clean, and scalable.
        </motion.p>

        {/* Hero Action CTA Buttons (Matching Screenshot) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="pt-2 flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
        >
          {/* Primary CTA: View My Work ↗ */}
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-2xl bg-[#FFFFFF] font-sans text-sm font-bold text-black shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.7)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <span>View My Work</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Secondary CTA: Download Résumé */}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-2xl glass-panel border border-white/10 text-white font-sans text-sm font-bold hover:border-[#FFFFFF]/60 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg bg-[#080808]"
          >
            <Download className="w-4 h-4 text-[#FFFFFF]" />
            <span>Download Résumé</span>
          </a>
        </motion.div>

        {/* Social Icons Row (Matching Screenshot) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-4 flex items-center justify-center gap-3 pointer-events-auto"
        >
          <a
            href="https://github.com/dhruvbajaj13"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl glass-panel text-[#A8A8A8] hover:text-white border border-white/10 hover:border-[#FFFFFF] hover:scale-110 transition-all duration-300 shadow-md bg-[#080808]"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/dhruvbajaj13"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl glass-panel text-[#A8A8A8] hover:text-white border border-white/10 hover:border-[#FFFFFF] hover:scale-110 transition-all duration-300 shadow-md bg-[#080808]"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:d4bajaj@gmail.com"
            className="p-3 rounded-xl glass-panel text-[#A8A8A8] hover:text-white border border-white/10 hover:border-[#FFFFFF] hover:scale-110 transition-all duration-300 shadow-md bg-[#080808]"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Stat Cards Container (Matching Screenshot Exactly) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="pt-6 pointer-events-auto"
        >
          <div className="inline-flex flex-row items-center justify-center gap-8 sm:gap-14 px-8 py-5 rounded-3xl glass-panel border border-white/10 bg-[#080808]/90 shadow-2xl backdrop-blur-xl">
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">10+</div>
              <div className="font-mono text-[11px] text-[#A8A8A8] uppercase tracking-wider mt-0.5">Projects Shipped</div>
            </div>

            <div className="w-px h-8 bg-white/10" />

            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">5+</div>
              <div className="font-mono text-[11px] text-[#A8A8A8] uppercase tracking-wider mt-0.5">Tech Stacks</div>
            </div>

            <div className="w-px h-8 bg-white/10" />

            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">2027</div>
              <div className="font-mono text-[11px] text-[#A8A8A8] uppercase tracking-wider mt-0.5">Graduating</div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex items-center justify-center pt-4 relative z-10"
      >
        <button
          onClick={scrollToNext}
          className="pointer-events-auto p-2.5 rounded-full glass-panel border border-white/10 text-[#A8A8A8] hover:text-[#FFFFFF] hover:border-[#FFFFFF]/60 transition-colors bg-[#080808]"
        >
          <ArrowDown className="w-4 h-4 animate-bounce text-[#FFFFFF]" />
        </button>
      </motion.div>
    </section>
  );
}
