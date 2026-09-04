'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, ExternalLink, Download } from 'lucide-react';

import * as THREE from 'three';

// Original 3D Spinning Wireframe Icosahedrons + Particle Background
const Hero3DGeometricBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Spinning Wireframe Icosahedron — Left
    const icoGeo1 = new THREE.IcosahedronGeometry(1.6, 1);
    const icoMat1 = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.18 });
    const icoMesh1 = new THREE.Mesh(icoGeo1, icoMat1);
    icoMesh1.position.set(-3.5, 0.5, -2);
    scene.add(icoMesh1);

    // Spinning Wireframe Icosahedron — Right
    const icoGeo2 = new THREE.IcosahedronGeometry(2.2, 1);
    const icoMat2 = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.22 });
    const icoMesh2 = new THREE.Mesh(icoGeo2, icoMat2);
    icoMesh2.position.set(3.8, -0.2, -3);
    scene.add(icoMesh2);

    // Floating Particle Field
    const particleCount = 600;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const cyan = new THREE.Color(0x00e5ff);
    const white = new THREE.Color(0xffffff);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const c = Math.random() > 0.5 ? cyan : white;
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const particleMat = new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.65, blending: THREE.AdditiveBlending });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      icoMesh1.rotation.y += 0.003; icoMesh1.rotation.x += 0.002;
      icoMesh2.rotation.y -= 0.0025; icoMesh2.rotation.x -= 0.0015;
      particles.rotation.y += 0.0006; particles.rotation.x += 0.0003;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth; const h = container.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
      icoGeo1.dispose(); icoMat1.dispose(); icoGeo2.dispose(); icoMat2.dispose();
      particleGeo.dispose(); particleMat.dispose(); renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />;
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
      {/* 3D Geometric Wireframe Background */}
      <Hero3DGeometricBackground />

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
