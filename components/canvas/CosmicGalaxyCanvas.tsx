'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { TECH_NODES } from '../dom/ActTechStack';

export function CosmicGalaxyCanvas({
  activeScene,
  selectedTech,
  mouse,
}: {
  activeScene: number;
  selectedTech: string | null;
  mouse: { normalizedX: number; normalizedY: number };
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeSceneRef = useRef(activeScene);
  const selectedTechRef = useRef(selectedTech);
  const mouseRef = useRef(mouse);

  useEffect(() => {
    activeSceneRef.current = activeScene;
  }, [activeScene]);

  useEffect(() => {
    selectedTechRef.current = selectedTech;
  }, [selectedTech]);

  useEffect(() => {
    mouseRef.current = mouse;
  }, [mouse]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer Setup (REFINED TASTEFUL MINIMAL PITCH BLACK BASE)
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(new THREE.Color('#010105'), 0.02);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup (Cyan, Sapphire Blue & Coral Red Accent Lights)
    const ambientLight = new THREE.AmbientLight(0x050510, 1.4);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x0055ff, 3.5, 35);
    blueLight.position.set(-8, -2, 4);
    scene.add(blueLight);

    const redLight = new THREE.PointLight(0xff2a55, 3.5, 35);
    redLight.position.set(8, -2, 4);
    scene.add(redLight);

    // 3. CORE 3D UNDULATING WAVE TERRAIN (Re-usable Base Mesh)
    const terrainWidth = 65;
    const terrainHeight = 35;
    const segmentsX = 120;
    const segmentsY = 80;

    const terrainGeo = new THREE.PlaneGeometry(
      terrainWidth,
      terrainHeight,
      segmentsX,
      segmentsY
    );

    const posCount = terrainGeo.attributes.position.count;
    const colors = new Float32Array(posCount * 3);

    const colBlue = new THREE.Color('#0044ff');
    const colCyan = new THREE.Color('#00f0ff');
    const colRed = new THREE.Color('#ff2a55');
    const colCrimson = new THREE.Color('#ff0044');

    const posAttr = terrainGeo.attributes.position as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;

    for (let i = 0; i < posCount; i++) {
      const vx = posArr[i * 3];
      const normX = (vx + terrainWidth / 2) / terrainWidth;

      const mixedCol = new THREE.Color();
      if (normX < 0.45) {
        mixedCol.lerpColors(colBlue, colCyan, normX / 0.45);
      } else if (normX < 0.6) {
        mixedCol.lerpColors(colCyan, colRed, (normX - 0.45) / 0.15);
      } else {
        mixedCol.lerpColors(colRed, colCrimson, (normX - 0.6) / 0.4);
      }

      colors[i * 3] = mixedCol.r;
      colors[i * 3 + 1] = mixedCol.g;
      colors[i * 3 + 2] = mixedCol.b;
    }

    terrainGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Refined wireframe material (subtle opacity 0.4 for minimal elegance)
    const terrainMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.position.set(0, -2.8, -2);
    terrainMesh.rotation.x = -Math.PI / 2.3;
    scene.add(terrainMesh);

    // Sparkling Crest Points Overlay
    const crestPointsGeo = new THREE.BufferGeometry();
    crestPointsGeo.setAttribute('position', posAttr.clone());
    crestPointsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const crestPointsMat = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const crestPoints = new THREE.Points(crestPointsGeo, crestPointsMat);
    crestPoints.position.copy(terrainMesh.position);
    crestPoints.rotation.copy(terrainMesh.rotation);
    scene.add(crestPoints);

    // 4. FLOATING ENERGY LIGHT ORBS
    const orbsGroup = new THREE.Group();
    scene.add(orbsGroup);

    const createOrb = (colorHex: number, x: number, y: number, z: number, size: number) => {
      const oGeo = new THREE.SphereGeometry(size, 32, 32);
      const oMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });
      const oMesh = new THREE.Mesh(oGeo, oMat);
      oMesh.position.set(x, y, z);
      orbsGroup.add(oMesh);
      return oMesh;
    };

    const orb1 = createOrb(0x00f0ff, -3.5, -0.8, 1.5, 0.16);
    const orb2 = createOrb(0xff2a55, 4.2, -1.2, 0.8, 0.2);
    const orb3 = createOrb(0x0055ff, -1.2, 1.5, -3.0, 0.12);
    const orb4 = createOrb(0xff0044, 2.5, 1.8, -2.5, 0.14);

    // 5. UPPER MINIMAL STAR DUST (3,000 Particles)
    const starCount = 3000;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 50;
      starPositions[i * 3 + 1] = Math.random() * 25 - 2;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;

      const isRed = Math.random() > 0.6;
      const c = isRed ? colRed : colCyan;
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const starfield = new THREE.Points(starGeo, starMat);
    scene.add(starfield);

    // 6. ACT II: 3D REFRACTIVE GLASS PRISM
    const glassGroup = new THREE.Group();
    glassGroup.position.set(3.5, 0, -2);
    const glassGeo = new THREE.DodecahedronGeometry(1.8, 0);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      transmission: 0.9,
      roughness: 0.1,
      ior: 1.5,
      thickness: 0.8,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassGroup.add(glassMesh);

    const innerGeo = new THREE.OctahedronGeometry(0.8, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xff2a55,
      wireframe: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    glassGroup.add(innerMesh);
    scene.add(glassGroup);

    // 7. ACT IV: 3D TECH STACK NEURAL NETWORK
    const neuralGroup = new THREE.Group();
    neuralGroup.position.set(-3, 0, -3);
    const nodeMeshes: THREE.Mesh[] = [];

    TECH_NODES.forEach((tech, i) => {
      const phi = Math.acos(-1 + (2 * i) / TECH_NODES.length);
      const theta = Math.sqrt(TECH_NODES.length * Math.PI) * phi;
      const radius = 3.2;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const nodeGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0x0066ff,
        emissive: 0x002288,
        emissiveIntensity: 0.8,
        roughness: 0.2,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      nodeMesh.userData = { id: tech };
      neuralGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);
    });
    scene.add(neuralGroup);

    // 8. ACT VI: HOLOGRAPHIC TARGET RINGS
    const ringGroup = new THREE.Group();
    ringGroup.position.set(3, 0, -2);
    const torusGeo = new THREE.TorusGeometry(2.5, 0.04, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const ringMesh = new THREE.Mesh(torusGeo, torusMat);
    ringGroup.add(ringMesh);
    scene.add(ringGroup);

    // 9. Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 10. Master Animation Loop (60 FPS) with Dynamic Section-by-Section Background Evolution
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      const currentScene = activeSceneRef.current;
      const currentMouse = mouseRef.current;
      const currentTech = selectedTechRef.current;

      // DYNAMIC WAVE DISPLACEMENT MATH WITH SCENE-BASED VARIATIONS
      const waveFreq = 0.35 + currentScene * 0.05;
      const waveSpeed = 1.4 + currentScene * 0.2;
      const waveAmp = 0.8 - currentScene * 0.05;

      const pAttr = terrainGeo.attributes.position as THREE.BufferAttribute;
      const pArr = pAttr.array as Float32Array;

      for (let i = 0; i < posCount; i++) {
        const x = pArr[i * 3];
        const y = pArr[i * 3 + 1];

        const zWave =
          Math.sin(x * waveFreq + elapsedTime * waveSpeed) *
            Math.cos(y * waveFreq + elapsedTime * (waveSpeed * 0.8)) *
            waveAmp +
          Math.sin((x + y) * 0.18 + elapsedTime * 1.8) * 0.35;

        pArr[i * 3 + 2] = zWave;
      }
      pAttr.needsUpdate = true;

      // Sync crest points overlay
      const crestPAttr = crestPointsGeo.attributes.position as THREE.BufferAttribute;
      crestPAttr.copy(pAttr);
      crestPAttr.needsUpdate = true;

      // Floating Orbs Animation
      orb1.position.y = -0.8 + Math.sin(elapsedTime * 1.5) * 0.25;
      orb2.position.y = -1.2 + Math.cos(elapsedTime * 1.8) * 0.3;
      orb3.position.y = 1.5 + Math.sin(elapsedTime * 1.2) * 0.2;
      orb4.position.y = 1.8 + Math.cos(elapsedTime * 1.4) * 0.25;

      // Mouse Tilt Physics
      const targetRotX = -Math.PI / 2.3 + currentMouse.normalizedY * 0.08;
      const targetRotY = currentMouse.normalizedX * 0.12;
      terrainMesh.rotation.x += (targetRotX - terrainMesh.rotation.x) * 0.05;
      terrainMesh.rotation.y += (targetRotY - terrainMesh.rotation.y) * 0.05;
      crestPoints.rotation.copy(terrainMesh.rotation);

      // Rotate Sub-geometries
      glassGroup.rotation.x += delta * 0.3;
      glassGroup.rotation.y += delta * 0.4;
      innerMesh.rotation.z -= delta * 0.5;

      neuralGroup.rotation.y += delta * 0.15;
      nodeMeshes.forEach((mesh) => {
        const isSelected = mesh.userData.id === currentTech;
        const targetScale = isSelected ? 1.8 : 1.0;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (isSelected) {
          mat.color.set('#00f0ff');
          mat.emissive.set('#00f0ff');
          mat.emissiveIntensity = 2.5;
        } else {
          mat.color.set('#0066ff');
          mat.emissive.set('#002288');
          mat.emissiveIntensity = 0.8;
        }
      });

      ringGroup.rotation.x += delta * 0.5;
      ringGroup.rotation.y += delta * 0.3;

      // SECTION-BY-SECTION VISIBILITY TRANSITIONS
      glassGroup.visible = currentScene === 1;
      neuralGroup.visible = currentScene === 3;
      ringGroup.visible = currentScene === 5;

      // DYNAMIC SCENE FOG COLOR TRANSITION (Refined Dark Palette per Section)
      const fogColor = new THREE.Color();
      if (currentScene === 0) fogColor.set('#010105'); // Hero Pitch Black / Coral Blue
      else if (currentScene === 1) fogColor.set('#030514'); // About Sapphire Void
      else if (currentScene === 2) fogColor.set('#02091c'); // Timeline Deep Cyan
      else if (currentScene === 3) fogColor.set('#0a0418'); // Tech Stack Violet Void
      else if (currentScene === 4) fogColor.set('#020d18'); // Projects Obsidian Grid
      else if (currentScene === 5) fogColor.set('#0c0703'); // CP Amber Obsidian
      else fogColor.set('#03040b'); // Contact Quantum Void

      (scene.fog as THREE.FogExp2).color.lerp(fogColor, 0.05);

      // Smooth Camera Glide per Section
      let targetCamX = currentMouse.normalizedX * 0.4;
      let targetCamY = currentMouse.normalizedY * 0.3 - currentScene * 0.12;
      let targetCamZ = 7.5 + currentScene * 0.2;

      if (currentScene === 1) targetCamX += 0.8;
      if (currentScene === 3) targetCamX -= 0.8;

      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup
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
      className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-[#010105]"
    />
  );
}
