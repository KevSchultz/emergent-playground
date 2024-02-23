// basic.frag
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;    // texture coordinate passed from the vertex shader

uniform vec2 resolution; // determines the distance to see next cell
uniform sampler2D previousState; // texture of previousState

void main() {
  
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y; // adjust coordinates because of p5

  vec2 pixelOffset = vec2(1.0 / resolution.x, 1.0 / resolution.y);

  
  
  // Get the color of the current pixel and its neighbors
  vec4 centerColor = texture2D(previousState, uv);
  vec4 leftColor = texture2D(previousState, uv - vec2(pixelOffset.x, 0.0));
  vec4 rightColor = texture2D(previousState, uv + vec2(pixelOffset.x, 0.0));
  
  // Convert the colors to binary (black = 0, white = 1)
  float centerState = step(0.5, centerColor.r);
  float leftState = step(0.5, leftColor.r);
  float rightState = step(0.5, rightColor.r);
  
  // Calculate the new state based on rule 30
  // https://en.wikipedia.org/wiki/Rule_30
  float newState = 0.0;
  if (leftState == 1.0 && centerState == 1.0 && rightState == 1.0) {
    newState = 0.0;
  } else if (leftState == 1.0 && centerState == 1.0 && rightState == 0.0) {
    newState = 0.0;
  } else if (leftState == 1.0 && centerState == 0.0 && rightState == 1.0) {
    newState = 0.0;
  } else if (leftState == 1.0 && centerState == 0.0 && rightState == 0.0) {
    newState = 1.0;
  } else if (leftState == 0.0 && centerState == 1.0 && rightState == 1.0) {
    newState = 1.0;
  } else if (leftState == 0.0 && centerState == 1.0 && rightState == 0.0) {
    newState = 1.0;
  } else if (leftState == 0.0 && centerState == 0.0 && rightState == 1.0) {
    newState = 1.0;
  } else if (leftState == 0.0 && centerState == 0.0 && rightState == 0.0) {
    newState = 0.0;
  }
  gl_FragColor = vec4(newState, newState, newState, 1.0);
}