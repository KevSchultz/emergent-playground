#version 300 es

#ifdef GL_ES
precision mediump float;
#endif

in vec2 vTexCoord;
out vec4 out_col;

uniform sampler2D previousState;
uniform vec2 resolution;
uniform float pause;

const vec4 live = vec4(1.0, 1.0, 1.0, 1.0);
const vec4 dead = vec4(0.0, 0.0, 0.0, 1.0);


bool eq(vec4 c1, vec4 c2){
	return all(lessThanEqual(abs(c1 - c2), vec4(0.01)));
}

void main(){
	vec2 uv = vTexCoord;
	uv.y = 1.0 - uv.y;

	int live_num = 0;
	int dead_num = 0;

	vec4 c = texture(previousState, uv);
	vec4 curr = c;
	vec4 n[8];
	vec4 tl = textureOffset(previousState, uv, ivec2(-1, -1));
	vec4 t = textureOffset(previousState, uv, ivec2(0, -1));
	vec4 tr = textureOffset(previousState, uv, ivec2(1, -1));
	vec4 l = textureOffset(previousState, uv, ivec2(-1, 0));
	vec4 r = textureOffset(previousState, uv, ivec2(1, 0));
	vec4 bl = textureOffset(previousState, uv, ivec2(-1, 1));
	vec4 b = textureOffset(previousState, uv, ivec2(0, 1));
	vec4 br = textureOffset(previousState, uv, ivec2(1, 1));
	n = vec4[8](tl, t, tr, l, r, bl, b, br);


	for(int idx=0; idx<8; idx++){
		if(eq(n[idx], live)){
			live_num++;
		}
		if(eq(n[idx], dead)){
			dead_num++;
		}
	}


	vec4 next = vec4(0.0, 0.0, 0.0, 1.0);

//CODEBEGIN
	if(curr == dead && live_num == 2){
	  next = live;
	} else {
	  next = dead;
	}
//CODEEND

	if(pause == 1.0){
		next = c;
	}

	out_col = next;
}
