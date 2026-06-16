/* Shader Chromakey para A-Frame */
AFRAME.registerShader('chromakey', {
  schema: {
    src: { type: 'map', is: 'uniform' },
    color: { type: 'vec3', is: 'uniform', default: {x: 0.0, y: 1.0, z: 0.0} },
    threshold: { type: 'number', is: 'uniform', default: 0.4 },
    smoothing: { type: 'number', is: 'uniform', default: 0.1 }
  },

  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: `
    uniform vec3 color;
    uniform sampler2D src;
    uniform float threshold;
    uniform float smoothing;
    varying vec2 vUv;
    
    void main() {
      vec4 texColor = texture2D(src, vUv);
      
      // Diferencia entre el color actual y el verde (usando el vec3 que enviamos desde JS)
      float diff = length(texColor.rgb - color);
      
      // Calcular la transparencia. 
      // Si diff es menor que threshold, es totalmente transparente.
      float alpha = smoothstep(threshold, threshold + smoothing, diff);
      
      gl_FragColor = vec4(texColor.rgb, alpha);
    }
  `
});
