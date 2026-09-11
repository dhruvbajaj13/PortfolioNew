'use client';

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, ExternalLink, Download } from "lucide-react";
import * as THREE from "three";

// ─── Interactive 3D Retro Developer Workstation Canvas ───
const HeroRetroWorkstation3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.4, 5.2);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root Group for interactive mouse parallax
    const deskGroup = new THREE.Group();
    deskGroup.position.set(0, -0.4, 0);
    scene.add(deskGroup);

    // 1. CRT Monitor Canvas Texture (Live animated terminal screen)
    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 512;
    screenCanvas.height = 384;
    const ctx = screenCanvas.getContext("2d");
    const screenTexture = new THREE.CanvasTexture(screenCanvas);

    // Materials
    const darkChassisMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.5,
      metalness: 0.2,
    });
    const beigeBezelMat = new THREE.MeshStandardMaterial({
      color: 0x242429,
      roughness: 0.6,
      metalness: 0.1,
    });

    // Monitor Stand Base
    const baseGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.08, 32);
    const baseMesh = new THREE.Mesh(baseGeo, darkChassisMat);
    baseMesh.position.set(0, 0.04, 0);
    deskGroup.add(baseMesh);

    // Monitor Stem
    const stemGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.5, 16);
    const stemMesh = new THREE.Mesh(stemGeo, darkChassisMat);
    stemMesh.position.set(0, 0.3, 0);
    deskGroup.add(stemMesh);

    // Monitor Chassis Body
    const monitorBodyGeo = new THREE.BoxGeometry(2.3, 1.6, 0.55);
    const monitorBody = new THREE.Mesh(monitorBodyGeo, beigeBezelMat);
    monitorBody.position.set(0, 1.25, 0);
    deskGroup.add(monitorBody);

    // CRT Screen Face
    const screenGeo = new THREE.PlaneGeometry(1.95, 1.28);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 1.25, 0.28);
    deskGroup.add(screenMesh);

    // Green Power LED
    const ledGeo = new THREE.SphereGeometry(0.025, 16, 16);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
    const ledMesh = new THREE.Mesh(ledGeo, ledMat);
    ledMesh.position.set(0.9, 0.55, 0.285);
    deskGroup.add(ledMesh);

    // Sticky Note on Monitor (Think Outside The Box / Build Impact)
    const noteGeo = new THREE.PlaneGeometry(0.32, 0.32);
    const noteCanvas = document.createElement("canvas");
    noteCanvas.width = 128;
    noteCanvas.height = 128;
    const nctx = noteCanvas.getContext("2d");
    if (nctx) {
      nctx.fillStyle = "#fef08a";
      nctx.fillRect(0, 0, 128, 128);
      nctx.fillStyle = "#713f12";
      nctx.font = "bold 15px monospace";
      nctx.textAlign = "center";
      nctx.fillText("BUILD", 64, 42);
      nctx.fillText("IMPACT", 64, 72);
      nctx.fillText("// 2025", 64, 102);
    }
    const noteTexture = new THREE.CanvasTexture(noteCanvas);
    const noteMat = new THREE.MeshBasicMaterial({ map: noteTexture });
    const noteMesh = new THREE.Mesh(noteGeo, noteMat);
    noteMesh.position.set(0.85, 1.88, 0.285);
    noteMesh.rotation.z = -0.08;
    deskGroup.add(noteMesh);

    // 2. Mechanical Keyboard
    const kbBaseGeo = new THREE.BoxGeometry(1.8, 0.08, 0.7);
    const kbBase = new THREE.Mesh(kbBaseGeo, darkChassisMat);
    kbBase.position.set(0, 0.05, 1.15);
    kbBase.rotation.x = 0.08;
    deskGroup.add(kbBase);

    // Keyboard Keycaps
    const keyGeo = new THREE.BoxGeometry(0.11, 0.04, 0.09);
    const keyMatDark = new THREE.MeshStandardMaterial({ color: 0x2e2e33, roughness: 0.5 });
    const keyMatOrange = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.4 });
    const keyMatCyan = new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.4 });

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 12; c++) {
        const isEsc = r === 3 && c === 0;
        const isEnter = r === 1 && c === 11;
        const isSpace = r === 0 && (c >= 4 && c <= 7);
        if (isSpace && c !== 4) continue;
        const m = isEsc ? keyMatOrange : isEnter ? keyMatCyan : keyMatDark;
        const kGeo = isSpace ? new THREE.BoxGeometry(0.5, 0.04, 0.09) : keyGeo;
        const key = new THREE.Mesh(kGeo, m);
        const xPos = isSpace ? 0 : (c - 5.5) * 0.13;
        key.position.set(xPos, 0.08 + (3 - r) * 0.015, 0.88 + r * 0.14);
        key.rotation.x = 0.08;
        deskGroup.add(key);
      }
    }

    // 3. Mouse and Mousepad
    const padGeo = new THREE.BoxGeometry(0.7, 0.01, 0.8);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x111113, roughness: 0.8 });
    const pad = new THREE.Mesh(padGeo, padMat);
    pad.position.set(1.35, 0.005, 1.15);
    deskGroup.add(pad);

    const mouseGeo = new THREE.BoxGeometry(0.22, 0.08, 0.35);
    const mouseMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.4 });
    const mouse = new THREE.Mesh(mouseGeo, mouseMat);
    mouse.position.set(1.35, 0.045, 1.15);
    deskGroup.add(mouse);

    // 4. Yellow Rubber Duck Mascot (as shown in retro 3D portfolio reference)
    const duckGroup = new THREE.Group();
    const duckMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 });
    const duckBody = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), duckMat);
    duckBody.scale.set(1, 0.8, 1.15);
    duckGroup.add(duckBody);

    const duckHead = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), duckMat);
    duckHead.position.set(0, 0.15, 0.08);
    duckGroup.add(duckHead);

    const beak = new THREE.Mesh(
      new THREE.ConeGeometry(0.05, 0.1, 16),
      new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.4 })
    );
    beak.rotation.x = Math.PI / 2;
    beak.position.set(0, 0.14, 0.2);
    duckGroup.add(beak);

    duckGroup.position.set(-1.3, 0.14, 0.7);
    duckGroup.rotation.y = 0.45;
    deskGroup.add(duckGroup);

    // 5. Coffee Mug
    const mugGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.32, 20);
    const mugMat = new THREE.MeshStandardMaterial({ color: 0xe4e4e7, roughness: 0.3 });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.position.set(-1.35, 0.16, 1.25);
    deskGroup.add(mug);

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const screenLight = new THREE.PointLight(0x38bdf8, 1.8, 4.5);
    screenLight.position.set(0, 1.25, 0.8);
    deskGroup.add(screenLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(3, 4, 3);
    scene.add(dirLight);

    const rimLight = new THREE.PointLight(0xa855f7, 1.5, 5);
    rimLight.position.set(-3, 2, -2);
    scene.add(rimLight);

    // 7. Floating Ambient Particles
    const dustCount = 150;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 8;
      dustPos[i * 3 + 1] = Math.random() * 4;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.022,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // Animated Terminal Lines
    let frame = 0;
    const terminalLines = [
      "> DHRUV_BAJAJ.sh --mode=production",
      "> LeetCode Knight · Rating 1933 [1000+ SOLVED]",
      "> Full-Stack MERN & Next.js [INITIALIZED]",
      "> Agentic RAG & LangChain AI [ONLINE]",
      "> CleanCity SIH IoT System [READY]",
      "> Systems Operational. Ready to build_",
    ];

    // Mouse Tracking for Smooth 3D Tilt
    let targetRotY = 0;
    let targetRotX = 0;
    const onMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = normX * 0.22;
      targetRotX = -normY * 0.12;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;

      // Lerp mouse tilt
      deskGroup.rotation.y += (targetRotY - deskGroup.rotation.y) * 0.05;
      deskGroup.rotation.x += (targetRotX - deskGroup.rotation.x) * 0.05;

      // Dust float
      const positions = dustGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < dustCount * 3; i += 3) {
        positions[i] += 0.002;
        if (positions[i] > 4) positions[i] = 0;
      }
      dustGeo.attributes.position.needsUpdate = true;

      // Update Screen Canvas periodically
      if (frame % 3 === 0 && ctx) {
        ctx.fillStyle = "#090c13";
        ctx.fillRect(0, 0, 512, 384);

        // CRT Scanlines
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
        for (let y = 0; y < 384; y += 4) {
          ctx.fillRect(0, y, 512, 2);
        }

        // Window Title Bar
        ctx.fillStyle = "#38bdf8";
        ctx.font = "bold 18px monospace";
        ctx.fillText("● ● ●  bash - 80x24", 24, 34);

        ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
        ctx.beginPath();
        ctx.moveTo(20, 48);
        ctx.lineTo(492, 48);
        ctx.stroke();

        // Lines
        ctx.font = "15px monospace";
        const visibleLines = Math.min(Math.floor(frame / 40) + 1, terminalLines.length);
        for (let l = 0; l < visibleLines; l++) {
          const isPrompt = l === 0;
          const isHighlight = l === 1 || l === 3;
          ctx.fillStyle = isPrompt ? "#34d399" : isHighlight ? "#a855f7" : "#e2e8f0";
          const text = terminalLines[l];
          if (l === visibleLines - 1 && visibleLines < terminalLines.length) {
            const charCount = Math.floor(((frame % 40) / 40) * text.length);
            ctx.fillText(text.slice(0, charCount) + "█", 24, 82 + l * 34);
          } else {
            ctx.fillText(text, 24, 82 + l * 34);
          }
        }

        screenTexture.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-85 overflow-hidden"
    />
  );
};

// Roles for Typewriter Text Loop
const ROLES = [
  "Full-Stack Developer",
  "AI Engineer",
  "DSA Enthusiast",
  "Software Developer",
];

export function ActHero({
  selectedProject,
  setSelectedProject,
}: {
  selectedProject?: any;
  setSelectedProject?: (proj: any) => void;
}) {
  const RESUME_URL = "https://drive.google.com/file/d/1F0QmpaQFUWuysUn1V8pO1E9kHdVS_BCZ/view";

  // Typewriter Loop Logic
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
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
        if (currentText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, roleIndex]);

  const scrollToNext = () => {
    const nextEl = document.getElementById("about");
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between px-4 sm:px-8 md:px-16 pt-28 sm:pt-36 pb-12 overflow-hidden pointer-events-none z-10 bg-[#050505]"
    >
      {/* 3D Interactive Retro Developer Workstation Canvas */}
      <HeroRetroWorkstation3D />

      {/* Volumetric Radial Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)] blur-[160px] pointer-events-none z-0" />

      {/* Main Hero Content Layout */}
      <div className="max-w-4xl mx-auto w-full my-auto space-y-7 pt-4 text-center relative z-10">
        
        {/* Status Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#080808]/90 border border-white/10 text-xs font-semibold text-slate-300 shadow-lg pointer-events-auto backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Open to SDE Opportunities</span>
        </motion.div>

        {/* Hero Title */}
        <div className="space-y-2">
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

        {/* Description Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="font-sans text-base sm:text-xl text-[#A8A8A8] max-w-2xl mx-auto leading-relaxed"
        >
          Software engineer building production-grade full-stack web platforms and autonomous AI systems. Dedicated to algorithms, scalable architecture, and clean code.
        </motion.p>

        {/* Hero Action CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="pt-2 flex flex-wrap items-center justify-center gap-3.5 pointer-events-auto"
        >
          {/* Primary CTA: View My Work ↗ */}
          <a
            href="#projects"
            className="px-7 py-3 rounded-2xl bg-[#FFFFFF] font-sans text-sm font-bold text-black shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.7)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <span>View My Work</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Secondary CTA: Download Résumé */}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 rounded-2xl glass-panel border border-white/15 text-white font-sans text-sm font-bold hover:border-[#FFFFFF]/60 hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg bg-[#080808]"
          >
            <Download className="w-4 h-4 text-[#FFFFFF]" />
            <span>Download Résumé</span>
          </a>

          {/* Tertiary CTA: Contact */}
          <a
            href="#contact"
            className="px-6 py-3 rounded-2xl border border-white/10 text-white/70 hover:text-white font-sans text-sm font-medium hover:border-white/30 hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
          >
            <span>Let&apos;s Talk</span>
          </a>
        </motion.div>

        {/* Social Icons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pt-2 flex items-center justify-center gap-3 pointer-events-auto"
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

        {/* Stat Cards Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="pt-4 pointer-events-auto"
        >
          <div className="inline-flex flex-row items-center justify-center gap-6 sm:gap-12 px-7 py-4 rounded-3xl glass-panel border border-white/10 bg-[#080808]/90 shadow-2xl backdrop-blur-xl">
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">1,000+</div>
              <div className="font-mono text-[10px] text-[#A8A8A8] uppercase tracking-wider mt-0.5">LeetCode Solved</div>
            </div>

            <div className="w-px h-8 bg-white/10" />

            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white">6+</div>
              <div className="font-mono text-[10px] text-[#A8A8A8] uppercase tracking-wider mt-0.5">Featured Apps</div>
            </div>

            <div className="w-px h-8 bg-white/10" />

            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-[#FFFFFF]">Top 3%</div>
              <div className="font-mono text-[10px] text-[#A8A8A8] uppercase tracking-wider mt-0.5">LeetCode Knight</div>
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
