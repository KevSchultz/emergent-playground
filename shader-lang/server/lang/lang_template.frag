#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform sampler2D tex;
uniform vec2 normalRes;

void main(){
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y;

//COLORS

//BUCKETS

    vec4 col;
    for(float i = -1.0; i < 2.0; i++){
        for(float j = -1.0; j < 2.0; j++){
            if(i == 0.0 && j == 0.0){
                continue;
            }
            float x = uv.x + i * normalRes.x;
            float y = uv.y + j * normalRes.y;

            col = texture2D(tex, vec2(x, y));

//IDENTIFY

        }
    }

    vec4 color;

//RULES

    gl_FragColor = color;
}
