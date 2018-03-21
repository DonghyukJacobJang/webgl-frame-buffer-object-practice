import { WebGLRenderer } from 'three';

const renderer = new WebGLRenderer({
  antialias: true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setScissorTest(true);

export default renderer;
