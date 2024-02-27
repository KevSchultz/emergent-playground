#version 300 es

#ifdef GL_ES
precision mediump float;
#endif

in vec2 vTexCoord;
out vec4 out_col;

uniform sampler2D previousState;
uniform vec2 resolution;
uniform float pause;

const vec4 g = vec4(0.0, 0.0, 0.0, 1.0);



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

	vec2 offset = vec2(1.0/resolution.x, 1.0/resolution.y);

	uint g_num = uint(0);


	vec4 curr = texture(previousState, uv);

	uint col;
	for(float i = -1.0; i < 2.0; i++){
		for(float j = -1.0; j < 2.0; j++){

			if(i==0.0 && j==0.0){
				continue;
			}


			float x = uv.x + i * offset.x;
			float y = uv.y + j * offset.y;

			col = pack(texture(previousState, vec2(x, y)));

			switch(col){
				case uint(0x01ff00FF):
					g_num++;
					break;
			}


		}
	}

	vec4 cell;

	cell = g;

	if(pause == 1.0){
		cell = curr;
	}

	out_col = cell;
}
