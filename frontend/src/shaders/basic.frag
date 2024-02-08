// basic.frag
#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;    // Texture coordinate passed from the vertex shader
uniform sampler2D uTex;    // Texture sampler

void main() {
    gl_FragColor = texture2D(uTex, vTexCoord);
}
