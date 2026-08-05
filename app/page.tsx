'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

import { useLenis } from '@/hooks/useLenis';
import { useMousePosition } from '@/hooks/useMousePosition';

import { CustomCursor } from '@/components/dom/CustomCursor';
import { CinematicPreloader } from '@/components/dom/CinematicPreloader';
import { Navigation } from '@/components/dom/Navigation';

import { ActHero } from '@/components/dom/ActHero';
import { ActAbout } from '@/components/dom/ActAbout';
import { ActExperience } from '@/components/dom/ActExperience';
import { ActTechStack } from '@/components/dom/ActTechStack';
import { ActProjects } from '@/components/dom/ActProjects';
import { ActCPStats } from '@/components/dom/ActCPStats';
import { ActContact } from '@/components/dom/ActContact';

const CosmicGalaxyCanvas = dynamic(
  () => import('@/components/canvas/CosmicGalaxyCanvas').then((m) => m.CosmicGalaxyCanvas),
  { ssr: false }
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeScene, setActiveScene] = useState(0);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  // Initialize Lenis smooth scroll
  useLenis();

  // Track normalized mouse coordinates
  const mouse = useMousePosition();

  // Track active scene in viewport
  useEffect(() => {
    const handleScroll = () => {
      const sceneIds = ['hero', 'about', 'experience', 'skills', 'projects', 'cp-stats', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (let i = 0; i < sceneIds.length; i++) {
        const el = document.getElementById(sceneIds[i]);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveScene(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative bg-[#050505] bg-noise min-h-screen text-white overflow-x-hidden selection:bg-[#00E5FF]/30 selection:text-[#00E5FF]">
      {/* Preloader */}
      <AnimatePresence>
        {isLoading && (
          <CinematicPreloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Premium Magnetic Cursor */}
      <CustomCursor />

      {/* Top Floating Pill Navigation */}
      <Navigation activeScene={activeScene} />

      {/* Minimal Elegant Cosmic Galaxy Canvas */}
      <CosmicGalaxyCanvas
        activeScene={activeScene}
        selectedTech={selectedTech}
        mouse={mouse}
      />

      {/* Natural Filmlike Continuous Layout */}
      <div className="relative z-10 space-y-8 md:space-y-12">
        <ActHero />
        <ActAbout />
        <ActExperience />
        <ActTechStack
          selectedTech={selectedTech}
          setSelectedTech={setSelectedTech}
        />
        <ActProjects
          activeProjectIndex={activeProjectIndex}
          setActiveProjectIndex={setActiveProjectIndex}
        />
        <ActCPStats />
        <ActContact />
      </div>
    </main>
  );
}
