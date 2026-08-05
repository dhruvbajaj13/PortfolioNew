'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { Vector2 } from 'three';
import { HeroCore } from './HeroCore';
import { AboutPrism } from './AboutPrism';
import { TechNeuralNet } from './TechNeuralNet';

export function SceneCanvas({
  activeScene,
  selectedTech,
  mouse,
}: {
  activeScene: number;
  selectedTech: string | null;
  mouse: { normalizedX: number; normalizedY: number };
}) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

        {/* Ambient & Volumetric Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#7000ff" />

        <Suspense fallback={null}>
          {/* Scene 1 — Hero Core */}
          {activeScene === 0 && <HeroCore mouse={mouse} />}

          {/* Scene 2 — About Prism */}
          {activeScene === 1 && <AboutPrism mouse={mouse} />}

          {/* Scene 4 — Tech Neural Net */}
          {activeScene === 3 && (
            <TechNeuralNet selectedTech={selectedTech} mouse={mouse} />
          )}

          {/* Global Post Processing Bloom */}
          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
