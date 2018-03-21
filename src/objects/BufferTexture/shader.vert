/**
 * Multiply each vertex by the
 * model-view matrix and the
 * projection matrix (both provided
 * by Three.js) to get a final
 * vertex position
 */

uniform vec2 res;

varying vec2 vRes;

void main() {
  vRes = res;

  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
}
