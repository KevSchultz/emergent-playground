#version 300 es

#ifdef GL_ES
precision mediump float;
#endif

in vec2 vTexCoord;
out vec4 out_col;

uniform sampler2D tex;
uniform vec2 normalRes;

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
    for(float i = -1.0; i < 2.0; i++){
        for(float j = -1.0; j < 2.0; j++){
            if(i == 0.0 && j == 0.0){
                continue;
            }
            float x = uv.x + i * normalRes.x;
            float y = uv.y + j * normalRes.y;

            col = pack(texture(tex, vec2(x, y)));

//IDENTIFY

        }
    }

    vec4 cell;

//RULES

    out_col = cell;
}
