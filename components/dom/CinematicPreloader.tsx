'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 3D Canvas Component using Native Three.js WebGL Engine
const ThreeCanvas3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3D Particle Swarm Sphere
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00e5ff);
    const color2 = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + (Math.random() - 0.5) * 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const mixColor = Math.random() > 0.5 ? color1 : color2;
      colors[i * 3] = mixColor.r;
      colors[i * 3 + 1] = mixColor.g;
      colors[i * 3 + 2] = mixColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.042,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Inner 3D Wireframe Torus Knot Core
    const knotGeo = new THREE.TorusKnotGeometry(0.8, 0.25, 100, 16);
    const knotMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const torusKnot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(torusKnot);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      particles.rotation.y += 0.005;
      particles.rotation.x += 0.003;

      torusKnot.rotation.y -= 0.008;
      torusKnot.rotation.x -= 0.005;

      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
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
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-72 h-72 sm:w-96 sm:h-96" />;
};

export function CinematicPreloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 6;
      });
    }, 110);

    return () => clearInterval(interval);
  }, [onComplete]);

  const getStatusText = (p: number) => {
    if (p < 30) return 'INITIALIZING 3D SPATIAL ENGINE...';
    if (p < 65) return 'RENDERING WEBGL PARTICLES...';
    if (p < 90) return 'COMPILING SHADERS...';
    return 'CREATIVE EXPERIENCE READY 🚀';
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between py-12 px-6 bg-[#030303] text-white overflow-hidden"
    >
      {/* Background Ambient Volumetric Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0%,rgba(8,8,8,0.8)_60%,#030303_100%)] pointer-events-none" />

      {/* Top Header Title */}
      <div className="z-10 text-center space-y-1 pt-4">
        <span className="font-mono text-xs text-[#FFFFFF] font-bold uppercase tracking-widest block">
          // THREE.JS / WEBGL 3D ENGINE
        </span>
        <h2 className="font-display font-black text-2xl text-white tracking-widest">
          DHRUV BAJAJ
        </h2>
      </div>

      {/* Center 3D Three.js WebGL Canvas Animation */}
      <div className="relative my-auto z-10 flex items-center justify-center">
        <ThreeCanvas3D />
      </div>

      {/* Bottom Progress Bar Section */}
      <div className="z-10 w-full max-w-md text-center space-y-4 pb-4">
        {/* Status Message */}
        <div className="font-mono text-xs font-bold text-[#FFFFFF] tracking-widest">
          {getStatusText(progress)}
        </div>

        {/* Energy Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#0A0A0A] p-0.5 border border-white/10 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FFFFFF] via-blue-500 to-white rounded-full shadow-[0_0_15px_#FFFFFF]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Count-Up Percentage */}
        <div className="flex items-center justify-between font-mono text-xs font-bold px-1 text-[#A8A8A8]">
          <span>WEBGL 3D LOAD</span>
          <span className="text-2xl font-black text-[#FFFFFF] tracking-wider">
            {Math.min(progress, 100)}%
          </span>
          <span>EST. 2027</span>
        </div>
      </div>

    </motion.div>
  );
}
