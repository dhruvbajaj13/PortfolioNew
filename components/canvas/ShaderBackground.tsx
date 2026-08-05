'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ShaderBackground({
  activeScene,
  mouse,
}: {
  activeScene: number;
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

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Custom Aurora Volumetric Mesh Shader
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      varying vec2 vUv;

      // Simplex Noise Function
      vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
      float snoise(vec2 v){
        const vec4 C = vec2(0.211324865405187, 0.366025403784439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xx00 - vec4(i1, 0.0, 0.0);
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ) );
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * 0.0243902439) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 st = vUv * 2.0 - 1.0;
        
        // Dynamic noise warping driven by time and mouse
        float n1 = snoise(st * 1.2 + vec2(uTime * 0.15, uTime * 0.1) + uMouse * 0.2);
        float n2 = snoise(st * 2.5 - vec2(uTime * 0.2) + n1 * 0.8);
        
        // Fluid color blending
        vec3 color = mix(uColor1, uColor2, clamp(n1 + 0.5, 0.0, 1.0));
        color = mix(color, uColor3, clamp(n2 + 0.3, 0.0, 1.0));
        
        // Soft radial vignette
        float dist = length(st);
        float vignette = smoothstep(1.4, 0.2, dist);
        
        gl_FragColor = vec4(color * vignette * 0.55, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor1: { value: new THREE.Color('#030306') }, // Deep obsidian base
        uColor2: { value: new THREE.Color('#0044ff') }, // Electric royal blue
        uColor3: { value: new THREE.Color('#7000ff') }, // Neon violet
      },
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // 3. Ambient Floating Particles (3,000 Dust Points)
    const particleCount = 3000;
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPositions[i] = (Math.random() - 0.5) * 10;
      pPositions[i + 1] = (Math.random() - 0.5) * 10;
      pPositions[i + 2] = (Math.random() - 0.5) * 5;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // 4. Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const currentMouse = mouseRef.current;
      const currentScene = activeSceneRef.current;

      material.uniforms.uTime.value = elapsedTime;
      material.uniforms.uMouse.value.set(
        currentMouse.normalizedX,
        currentMouse.normalizedY
      );

      // Dynamically transition background aurora colors based on active scene card!
      if (currentScene === 0) {
        material.uniforms.uColor2.value.lerp(new THREE.Color('#0044ff'), 0.05);
        material.uniforms.uColor3.value.lerp(new THREE.Color('#7000ff'), 0.05);
      } else if (currentScene === 1) {
        material.uniforms.uColor2.value.lerp(new THREE.Color('#00f0ff'), 0.05);
        material.uniforms.uColor3.value.lerp(new THREE.Color('#d946ef'), 0.05);
      } else if (currentScene === 4) {
        material.uniforms.uColor2.value.lerp(new THREE.Color('#ff007f'), 0.05);
        material.uniforms.uColor3.value.lerp(new THREE.Color('#00f0ff'), 0.05);
      } else {
        material.uniforms.uColor2.value.lerp(new THREE.Color('#0033aa'), 0.05);
        material.uniforms.uColor3.value.lerp(new THREE.Color('#5500cc'), 0.05);
      }

      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

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
