'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function VanillaSceneCanvas({
  activeScene,
  mouse,
}: {
  activeScene: number;
  selectedTech: string | null;
  mouse: { normalizedX: number; normalizedY: number };
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeSceneRef = useRef(activeScene);
  const mouseRef = useRef(mouse);

  useEffect(() => {
    activeSceneRef.current = activeScene;
  }, [activeScene]);

  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(new THREE.Color('#030306'), 0.025);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.2, 7.0);
    camera.rotation.x = -0.15;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. HYPER-FLUID 3D PARTICLE WAVE LANDSCAPE (Matching Screenshot)
    const cols = 160;
    const rows = 110;
    const count = cols * rows;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const initialY = new Float32Array(count);

    const colBlue = new THREE.Color('#00f0ff');   // Electric Neon Blue (Foreground)
    const colDeepBlue = new THREE.Color('#0044ff');// Royal Blue
    const colRed = new THREE.Color('#ff0055');    // Neon Red / Crimson (Horizon Edge)

    let idx = 0;
    const width = 45;
    const height = 30;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c / cols - 0.5) * width;
        const z = (r / rows - 0.5) * height - 3.0; // Extend into distance
        const y = 0;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;
        initialY[idx] = y;

        // Color interpolation based on depth (z)
        const depthRatio = r / rows; // 0 (near) to 1 (far horizon)
        const mixedCol = new THREE.Color();

        if (depthRatio < 0.5) {
          mixedCol.lerpColors(colBlue, colDeepBlue, depthRatio * 2.0);
        } else {
          mixedCol.lerpColors(colDeepBlue, colRed, (depthRatio - 0.5) * 2.0);
        }

        colors[idx * 3] = mixedCol.r;
        colors[idx * 3 + 1] = mixedCol.g;
        colors[idx * 3 + 2] = mixedCol.b;

        idx++;
      }
    }

    const waveGeo = new THREE.BufferGeometry();
    waveGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    waveGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const waveMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const waveMesh = new THREE.Points(waveGeo, waveMat);
    waveMesh.position.set(0, -2.2, 0);
    waveMesh.rotation.x = -0.35; // Tilt horizon downwards
    scene.add(waveMesh);

    // 3. DRIFTING COSMIC DUST STARS (6,000 Particles)
    const starCount = 6000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 55;
      starPositions[i + 1] = (Math.random() - 0.5) * 40;
      starPositions[i + 2] = (Math.random() - 0.5) * 50;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const starfield = new THREE.Points(starGeo, starMat);
    scene.add(starfield);

    // 4. Horizon Glow Ambient Light Line
    const horizonGlowGeo = new THREE.PlaneGeometry(50, 4);
    const horizonGlowMat = new THREE.MeshBasicMaterial({
      color: 0xff0055,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const horizonGlow = new THREE.Mesh(horizonGlowGeo, horizonGlowMat);
    horizonGlow.position.set(0, -1.8, -12);
    scene.add(horizonGlow);

    // 5. Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 6. Master 60FPS Fluid Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      const currentScene = activeSceneRef.current;
      const currentMouse = mouseRef.current;

      // Update 3D Fluid Particle Wave Vertices
      const posAttr = waveGeo.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      let pIdx = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = posArr[pIdx * 3];
          const z = posArr[pIdx * 3 + 2];

          // 3-Layer Sinusoidal Organic Wave Math
          const wave1 = Math.sin(x * 0.35 + elapsedTime * 1.6) * 0.45;
          const wave2 = Math.cos(z * 0.35 + elapsedTime * 1.3) * 0.45;
          const wave3 = Math.sin((x + z) * 0.2 + elapsedTime * 2.0) * 0.3;

          // Mouse proximity ripple effect
          const distToMouse = Math.hypot(x - currentMouse.normalizedX * 10, z - currentMouse.normalizedY * 5);
          const mouseRipple = Math.max(0, 1.2 - distToMouse * 0.3) * Math.sin(elapsedTime * 8);

          posArr[pIdx * 3 + 1] = wave1 + wave2 + wave3 + mouseRipple;
          pIdx++;
        }
      }
      posAttr.needsUpdate = true;

      // Drifting Starfield Elevation
      starfield.rotation.y += delta * 0.015;

      // Smooth Camera Glide based on Scroll Scene Index
      let targetCamY = 1.2 - currentScene * 0.15;
      let targetCamZ = 7.0 + currentScene * 0.2;
      let targetCamRotX = -0.15 - currentScene * 0.02;

      // Mouse subtle camera tilt
      camera.position.x += (currentMouse.normalizedX * 0.6 - camera.position.x) * 0.05;
      camera.position.y += (targetCamY + currentMouse.normalizedY * 0.4 - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;
      camera.rotation.x += (targetCamRotX - camera.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none w-full h-full"
    />
  );
}
