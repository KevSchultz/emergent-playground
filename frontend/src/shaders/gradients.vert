attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 pos;

void main() {
  pos = aTexCoord;
  
  vec4 position = vec4(aPosition, 1.0);
  
  // remapping p5 coordinates to shader coordinates
  position.xy = position.xy * 2.0 - 1.0;
  
  gl_Position = position;
}