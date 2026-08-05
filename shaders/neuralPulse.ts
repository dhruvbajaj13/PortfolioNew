export const neuralPulseShader = {
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying float vPulse;
    
    void main() {
      vUv = uv;
      vPulse = sin(uv.x * 20.0 - uTime * 6.0) * 0.5 + 0.5;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec2 vUv;
    varying float vPulse;
    
    void main() {
      float edgeFade = sin(vUv.x * 3.14159);
      vec3 glowColor = uColor * (1.2 + vPulse * 1.5);
      float alpha = edgeFade * (0.3 + vPulse * 0.7) * uOpacity;
      
      gl_FragColor = vec4(glowColor, alpha);
    }
  `,
};
