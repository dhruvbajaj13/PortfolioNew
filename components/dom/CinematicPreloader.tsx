'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Lightweight Ambient Geometric & Particle Background for Preloader
const PreloaderGeometricBackground = () => {
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

    // Subtle Central Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.14,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(0, 0, -1.2);
    scene.add(icoMesh);

    // Subtle Outer Orbiting Ring
    const ringGeo = new THREE.TorusGeometry(3.2, 0.015, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.08,
      wireframe: true,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ringMesh);

    // Delicate Floating Particle Constellation
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const cyan = new THREE.Color(0x00e5ff);
    const white = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const c = Math.random() > 0.4 ? cyan : white;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      icoMesh.rotation.y += 0.002;
      icoMesh.rotation.x += 0.0015;
      ringMesh.rotation.x += 0.001;
      ringMesh.rotation.y -= 0.0015;
      particles.rotation.y += 0.0004;
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
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
      icoGeo.dispose();
      icoMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-75" />;
};

export function CinematicPreloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth, gradual progression from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 450);
          return 100;
        }
        // Steady, gradual increment
        const increment = Math.floor(Math.random() * 4) + 2;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  const getStatusText = (p: number) => {
    if (p < 25) return 'INITIALIZING ENVIRONMENT';
    if (p < 55) return 'DHRUV BAJAJ · SOFTWARE ENGINEER';
    if (p < 85) return 'LOADING PROJECTS & ARCHITECTURE';
    if (p < 100) return 'PREPARING EXPERIENCE';
    return 'READY';
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-12 bg-black text-white select-none overflow-hidden"
    >
      {/* 3D Geometric Wireframe & Particle Ambient Background */}
      <PreloaderGeometricBackground />

      {/* Subtle Ambient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_65%)] pointer-events-none z-[1]" />

      {/* Top Bar Indicators */}
      <div className="w-full flex items-center justify-between font-mono text-[10px] text-white/40 tracking-widest uppercase z-10">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
          DHRUV BAJAJ
        </span>
        <span>PORTFOLIO // 2025</span>
      </div>

      {/* Dead-Center Minimalist 0-100 Counter */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-5">
        {/* Large Cinematic Number */}
        <div className="flex items-baseline justify-center">
          <motion.span
            key={progress}
            className="font-display font-black text-7xl sm:text-9xl text-white tracking-tighter tabular-nums"
          >
            {progress < 10 ? `0${progress}` : progress}
          </motion.span>
          <span className="font-mono text-2xl sm:text-4xl text-white/40 font-light ml-1 sm:ml-2">
            %
          </span>
        </div>

        {/* Minimalist Glowing Progress Line */}
        <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative shadow-inner">
          <motion.div
            className="h-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtitle / Status Text */}
        <motion.p
          key={getStatusText(progress)}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="font-mono text-[11px] sm:text-xs text-white/60 tracking-[0.25em] uppercase text-center"
        >
          {getStatusText(progress)}
        </motion.p>
      </div>

      {/* Bottom Bar Indicators */}
      <div className="w-full flex items-center justify-between font-mono text-[10px] text-white/40 tracking-widest uppercase z-10">
        <span>NSUT // DELHI</span>
        <span>SYSTEM: {progress === 100 ? 'ONLINE' : 'BOOTING'}</span>
      </div>
    </motion.div>
  );
}
