import { PerspectiveCamera, Vector3 } from 'three';

const fov = 70;
const ratio = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 100000;

function zoom(camera, value = 1) {
  camera.position.set(0, 700, 0);
  camera.lookAt(new Vector3());
}

export const camera = new PerspectiveCamera(fov, ratio, near, far);
export default {
  camera
}

zoom(camera, 3);
