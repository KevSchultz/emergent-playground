#version 300 es

#ifdef GL_ES
precision mediump float;
#endif

in vec2 vTexCoord;    // Texture coordinate passed from the vertex shader
out vec4 out_col;

uniform sampler2D uTex;    // Texture sampler

void main() {
    out_col = texture2D(uTex, vTexCoord);
}