#version 300 es

#ifdef GL_ES
precision mediump float;
#endif

in vec2 vTexCoord;    // texture coordinate passed from the vertex shader
out vec4 out_col;

uniform float resolution; // determines the distance to see next cell
uniform sampler2D previousState; // texture of previousState

void main() {
  
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y; // adjust coordinates because of p5
  
  
  // Get the color of the current pixel and its neighbors
  vec4 centerColor = texture(previousState, uv);
  vec4 leftColor = texture(previousState, uv - vec2(resolution, 0.0));
  vec4 rightColor = texture(previousState, uv + vec2(resolution, 0.0));
  
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
  out_col = vec4(newState, newState, newState, 1.0);
}