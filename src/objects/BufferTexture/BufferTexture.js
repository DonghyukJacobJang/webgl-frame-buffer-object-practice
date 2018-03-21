import {
  PlaneBufferGeometry,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  NearestFilter,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderTarget
} from "three";

const simpleFrag = require("./shader.frag");
const simpleVert = require("./shader.vert");

const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;

class BufferTexture {

  constructor() {
    // Create Textures
    this.textureA = new WebGLRenderTarget(WINDOW_WIDTH, WINDOW_HEIGHT, {
      minFilter: LinearFilter,
      magFilter: NearestFilter
    });
    this.textureB = new WebGLRenderTarget(WINDOW_WIDTH, WINDOW_HEIGHT, {
      minFilter: LinearFilter,
      magFilter: NearestFilter
    });

    // Initiate Frame Buffer Object
    const geometry = new PlaneBufferGeometry(WINDOW_WIDTH, WINDOW_HEIGHT);
    geometry.rotateX(-Math.PI / 2);

    this.bufferMaterial = new ShaderMaterial({
      uniforms: {
        bufferTexture: {
          type: "t",
          value: this.textureA
        },
        res: {
          type: "v2",
          value: new Vector2(window.innerWidth, window.innerHeight)
        },
        smokeSource: {
          type: "v3",
          value: new Vector3(0.0)
        }
      },
      vertexShader: simpleVert,
      fragmentShader: simpleFrag
    });

    this.bufferObject = new Mesh(geometry, this.bufferMaterial);

    // Initiate Object that renders to screen
    this.finalMaterial = new MeshBasicMaterial({ map: this.textureB });
    this.finalObject = new Mesh(geometry, this.finalMaterial);
  }

  update = () => {
  };

}

export default BufferTexture;
