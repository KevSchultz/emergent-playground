#version 300 es

#ifdef GL_ES
precision mediump float;
#endif

in vec2 vTexCoord;
out vec4 out_col;

uniform sampler2D previousState;
uniform vec2 resolution;
uniform float pause;

//CONSTS

bool eq(vec4 c1, vec4 c2){
    return all(lessThanEqual(abs(c1 - c2), vec4(0.01)));
}

void main(){
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;

//BUCKETS
    vec4 c = texture(previousState, uv);
    vec4 curr = c;
//POSITIONS

//IDENTIFY

//DEFAULTCOLOR

//CODEBEGIN
//RULES
//CODEEND

    if(pause == 1.0){
        next = c;
    }

    out_col = next;
}
