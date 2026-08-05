'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshTransmissionMaterial } from '@react-three/drei';

export function AboutPrism({ mouse }: { mouse: { normalizedX: number; normalizedY: number } }) {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.2;
      outerRef.current.rotation.y += delta * 0.3;
      outerRef.current.position.x = mouse.normalizedX * 0.5;
      outerRef.current.position.y = mouse.normalizedY * 0.5;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.4;
      innerRef.current.rotation.y -= delta * 0.5;
    }
  });

  return (
    <group position={[3.5, 0, -3]}>
      {/* Refractive Outer Glass Dodecahedron */}
      <mesh ref={outerRef}>
        <dodecahedronGeometry args={[2.0, 0]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          resolution={512}
          transmission={0.95}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.4}
          chromaticAberration={0.08}
          anisotropy={0.2}
          distortion={0.3}
          distortionScale={0.2}
          temporalDistortion={0.1}
          color="#00f0ff"
        />
      </mesh>

      {/* Glowing Inner Pulsing Core */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshBasicMaterial color="#7000ff" wireframe />
      </mesh>
    </group>
  );
}
