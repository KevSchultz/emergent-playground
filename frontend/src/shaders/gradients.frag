precision mediump float;

varying vec2 pos;

uniform float millis;

bool inBox(vec2 uv) {
  
  if (uv.x > 0.75) {
    return false;
  } else if (uv.x < 0.25) {
    return false;
  } else if (uv.y > 0.75) {
    return false;
  } else if (uv.y < 0.25) {
    return false;
  }
  
  
  return true;
}


void main() {
  // Just make it white
  vec2 uv = pos.xy;
  
  float x = (sin(pos.x * 16.0 + millis/1000.0) + 1.0) / 2.0;
  float y = (cos(pos.y * 16.0 + millis/1000.0) + 1.0) / 2.0;
  
  if (inBox(uv)) {
    gl_FragColor = vec4(x, 0.8, 0.5, 1);
  } else {
    gl_FragColor = vec4(0.5, y, 1, 1);
  }  
  
}