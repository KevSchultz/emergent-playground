#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;


float random(vec2 seed) {
  return fract(sin(dot(seed.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vTexCoord;
  vec2 seed = uv;
  
  uv.y = 1.0 - uv.y;

  gl_FragColor = vec4(random(seed), random(seed + 0.1), random(seed + 0.2), 1.0);
  
}