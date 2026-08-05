'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { TECH_NODES } from '../dom/ActTechStack';

export function TechNeuralNet({
  selectedTech,
  mouse,
}: {
  selectedTech: string | null;
  mouse: { normalizedX: number; normalizedY: number };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<(THREE.Mesh | null)[]>([]);

  // Generate 3D sphere positions for each tech node
  const nodePositions = useRef(
    TECH_NODES.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / TECH_NODES.length);
      const theta = Math.sqrt(TECH_NODES.length * Math.PI) * phi;
      const radius = 3.5;
      return new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
    })
  );

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x = mouse.normalizedY * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[-3, 0, -4]}>
      {/* 3D Nodes */}
      {TECH_NODES.map((tech, idx) => {
        const pos = nodePositions.current[idx];
        const isSelected = selectedTech === tech;

        return (
          <mesh
            key={tech}
            position={[pos.x, pos.y, pos.z]}
            ref={(el) => {
              nodesRef.current[idx] = el;
            }}
          >
            <sphereGeometry args={[isSelected ? 0.35 : 0.2, 16, 16]} />
            <meshStandardMaterial
              color={isSelected ? '#00f0ff' : '#7000ff'}
              emissive={isSelected ? '#00f0ff' : '#3b0764'}
              emissiveIntensity={isSelected ? 2.5 : 0.8}
              roughness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}
