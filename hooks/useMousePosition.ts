'use client';

import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    isHovered: false,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMouse({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / innerWidth) * 2 - 1,
        normalizedY: -(e.clientY / innerHeight) * 2 + 1,
        isHovered: true,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mouse;
}
