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


void main(){
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;

    vec2 offset = vec2(1.0/resolution.x, 1.0/resolution.y);

//BUCKETS

    vec4 curr = texture(previousState, uv);

    vec4 col;
//RANGE
//INCLUDE_SELF
//NEIGHBORHOOD
            float x = uv.x + i * offset.x;
            float y = uv.y + j * offset.y;

            col = texture(previousState, vec2(x, y));

//IDENTIFY

        }
    }

    vec4 cell;

//RULES

    if(pause == 1.0){
        cell = curr;
    }

    out_col = cell;
}
