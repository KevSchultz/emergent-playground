#version 300 es

#ifdef GL_ES
precision mediump float;
#endif

in vec2 vTexCoord;
out vec4 out_col;

uniform sampler2D tex;
uniform vec2 normalRes;
uniform float pause;

//CONSTS

uint pack(vec4 v){
    uint o = uint(0x0);
    o |= uint(round(clamp(v.r, 0.0, 1.0) * 255.0)) << 24;
    o |= uint(round(clamp(v.g, 0.0, 1.0) * 255.0)) << 16;
    o |= uint(round(clamp(v.b, 0.0, 1.0) * 255.0)) << 8;
    o |= uint(round(clamp(v.a, 0.0, 1.0) * 255.0));
    return o;
}

void main(){
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;

//BUCKETS

    vec4 curr = texture(tex, uv);

    uint col;
//RANGE
//INCLUDE_SELF
//NEIGHBORHOOD
            float x = uv.x + i * normalRes.x;
            float y = uv.y + j * normalRes.y;

            col = pack(texture(tex, vec2(x, y)));

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
