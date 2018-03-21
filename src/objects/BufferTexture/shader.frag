/**
 * Set the colour to a lovely pink.
 * Note that the color is a 4D Float
 * Vector, R,G,B and A and each part
 * runs from 0.0 to 1.0
 */

uniform vec2 res;
uniform vec3 smokeSource;
uniform sampler2D bufferTexture;

void main() {

  //// step 3-2.
  float dist = distance(smokeSource.xy, gl_FragCoord.xy);

  vec2 pixel = gl_FragCoord.xy / res.xy;
  gl_FragColor = texture2D(bufferTexture, pixel);
  gl_FragColor.rgb += smokeSource.z * max(15.0 - dist, 0.0);

  float xPixel = 1.0/res.x;
  float yPixel = 1.0/res.y;

  vec4 rightColor = texture2D(bufferTexture, vec2(pixel.x + xPixel, pixel.y));
  vec4 leftColor = texture2D(bufferTexture, vec2(pixel.x - xPixel, pixel.y));
  vec4 upColor = texture2D(bufferTexture, vec2(pixel.x, pixel.y - yPixel));
  vec4 downColor = texture2D(bufferTexture, vec2(pixel.x, pixel.y + yPixel));

  float factor = 8.0 * 0.016 * (
    rightColor.r +
    leftColor.r +
    upColor.r * 3.0 +
    downColor.r -
    6.0 * gl_FragColor.r
  );

  float minumum = 0.003;

  if (factor >= -minumum && factor < 0.0) factor = -minumum;

  gl_FragColor.rgb += factor;

  //// step 3-1.
  /*
  float dist = distance(smokeSource.xy, gl_FragCoord.xy);

  vec2 pixel = gl_FragCoord.xy / res.xy;
  gl_FragColor = texture2D(bufferTexture, pixel);
  gl_FragColor.rgb += smokeSource.z * max(15.0 - dist, 0.0);

  float xPixel = 1.0/res.x;
  float yPixel = 1.0/res.y;

  vec4 rightColor = texture2D(bufferTexture, vec2(pixel.x + xPixel, pixel.y));
  vec4 leftColor = texture2D(bufferTexture, vec2(pixel.x - xPixel, pixel.y));
  vec4 upColor = texture2D(bufferTexture, vec2(pixel.x, pixel.y - yPixel));
  vec4 downColor = texture2D(bufferTexture, vec2(pixel.x, pixel.y + yPixel));

  gl_FragColor.rgb += 14.0 * 0.016 * (
    rightColor.rgb +
    leftColor.rgb +
    upColor.rgb +
    downColor.rgb -
    4.0 * gl_FragColor.rgb
  );
  */
  ////


  //// step 2-2.
  /*
  float dist = distance(smokeSource.xy, gl_FragCoord.xy);

  vec2 pixel = gl_FragCoord.xy / res.xy;
  gl_FragColor = texture2D(bufferTexture, pixel);
  gl_FragColor.rgb += smokeSource.z * max(15.0 - dist, 0.0);
  */
  ////

  //// step 2-1.
  // Get the distance of this pixel from the center of the screen
  /*
    float dist = distance(gl_FragCoord.xy, res.xy/2.0);

    if(dist < 15.0){ //Create a circle with a radius of 15 pixels
      vec2 pixel = gl_FragCoord.xy / res.xy;
      gl_FragColor = texture2D(bufferTexture, pixel);
      gl_FragColor.rgb += 0.01;
    }
  */
  ////

  //// step 1.
  /*
    vec2 pixel = gl_FragCoord.xy / res.xy;

    gl_FragColor = texture2D(bufferTexture, pixel);
    gl_FragColor.r += pixel.x * 0.1;
    gl_FragColor.b += pixel.y * 0.1;
  */
  ////
}
