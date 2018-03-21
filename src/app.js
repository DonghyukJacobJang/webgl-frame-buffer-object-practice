import { AxesHelper, GridHelper } from "three";

import scene, { bufferScene } from "./webgl/scene";
import renderer from "./webgl/renderer";
import { camera } from "./webgl/cameras";

import BufferTexture from "./objects/BufferTexture/BufferTexture";

// import OrbitControls from "./lib/three/OrbitControls";
import RenderStats from "./lib/three/render-stats";

import { DEV_HELPERS, DEV_STATS } from "./util/constants";
import stats from "./util/stats";
// import { guiStats, guiHelpers } from "./util/gui";

import "./app.scss";

class App {

  mouseDown = false;

  constructor() {
    document.body.appendChild(renderer.domElement);

    // Listeners
    window.addEventListener("resize", this.onResize, false);
    window.addEventListener("mousemove", this.onMouseMove, false);
    window.addEventListener("mousedown", this.onMouseDown, false);
    window.addEventListener("mouseup", this.onMouseUp, false);

    this.setHelpers();
    this.setStats();
    this.setOrbitControls();

    // init smoke object
    this.bufferTexture = new BufferTexture();

    bufferScene.add(this.bufferTexture.bufferObject);
    scene.add(this.bufferTexture.finalObject);

    this.update();
  }

  onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  onMouseMove = ev => {
    this.bufferTexture.bufferMaterial.uniforms.smokeSource.value.x = ev.clientX;
    this.bufferTexture.bufferMaterial.uniforms.smokeSource.value.y = window.innerHeight - ev.clientY;
    this.bufferTexture.bufferMaterial.uniforms.smokeSource.value.z = 0.1;
  };

  onMouseDown = ev => {
    this.mouseDown = true;
    // this.bufferTexture.bufferMaterial.uniforms.smokeSource.value.z = 0.1;
  };

  onMouseUp = ev => {
    this.mouseDown = false;
    // this.bufferTexture.bufferMaterial.uniforms.smokeSource.value.z = 0;
  };

  setOrbitControls = () => {
    // this.controls = {
    //   main: new OrbitControls(camera, renderer.domElement)
    // };
    // this.controls.main.enableZoom = false;
    // // this.controls.main.enableLotate = false;
  };

  setHelpers = () => {
    if (DEV_HELPERS) {
      scene.add(new GridHelper(10, 10));
      scene.add(new AxesHelper());
    }
  };

  setStats = () => {
    if (DEV_STATS) {
      this.renderStats = RenderStats();
      this.renderStats.domElement.style.position = "absolute";
      this.renderStats.domElement.style.right = "0px";
      this.renderStats.domElement.style.bottom = "48px";
      document.body.appendChild(this.renderStats.domElement);
      document.body.appendChild(stats.domElement);
    }
  };

  render = (_camera, left, bottom, width, height) => {
    left *= window.innerWidth;
    bottom *= window.innerHeight;
    width *= window.innerWidth;
    height *= window.innerHeight;

    renderer.setViewport(left, bottom, width, height);
    renderer.setScissor(left, bottom, width, height);
    renderer.setClearColor(0x121212);
    // renderer.render(scene, _camera);

    // Draw bufferObject to textureB
    renderer.render(bufferScene, camera, this.bufferTexture.textureB, true);

    const tempTexture = this.bufferTexture.textureA;
    this.bufferTexture.textureA = this.bufferTexture.textureB;
    this.bufferTexture.textureB = tempTexture;
    this.bufferTexture.finalObject.material.map = this.bufferTexture.textureB;
    this.bufferTexture.bufferMaterial.uniforms.bufferTexture.value = this.bufferTexture.textureA;

    renderer.render(scene, camera);
  };

  update = () => {
    requestAnimationFrame(this.update);

    if (DEV_STATS) {
      stats.begin();
    }

    // this.controls.main.update();

    this.bufferTexture.update();

    this.render(camera, 0, 0, 1, 1);

    if (DEV_STATS) {
      this.renderStats.update(renderer);
      stats.end();
    }
  };
}

export default new App();
