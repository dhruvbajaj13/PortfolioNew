'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { morphingCoreShader } from '@/shaders/morphingCore';

export function HeroCore({ mouse }: { mouse: { normalizedX: number; normalizedY: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Create 10,000 particle positions
  const particleCount = 8000;
  const particlePositions = useRef(new Float32Array(particleCount * 3));

  if (particlePositions.current[0] === 0) {
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions.current[i] = (Math.random() - 0.5) * 45;
      particlePositions.current[i + 1] = (Math.random() - 0.5) * 45;
      particlePositions.current[i + 2] = (Math.random() - 0.5) * 45;
    }
  }

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * 0.8;
      materialRef.current.uniforms.uMouse.value.set(mouse.normalizedX, mouse.normalizedY, 0);
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x = mouse.normalizedY * 0.2;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <group>
      {/* 3D Morphing GLSL Core Sphere */}
      <mesh ref={meshRef} position={[0, 0, -2]}>
        <icosahedronGeometry args={[2.2, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={morphingCoreShader.vertexShader}
          fragmentShader={morphingCoreShader.fragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uDistortion: { value: 0.6 },
            uMouse: { value: new THREE.Vector3(0, 0, 0) },
            uColorA: { value: new THREE.Color('#00f0ff') },
            uColorB: { value: new THREE.Color('#7000ff') },
            uColorC: { value: new THREE.Color('#0066ff') },
          }}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 8,000 Interactive Starfield Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions.current, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#00f0ff"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
