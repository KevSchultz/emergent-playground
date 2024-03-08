#version 300 es

#ifdef GL_ES
precision mediump float;
#endif

in vec2 vTexCoord;
out vec4 out_col;

uniform sampler2D previousState;
uniform vec2 resolution;
uniform float pause;

const vec4 empty = vec4(0.0, 0.0, 0.0, 1.0);
const vec4 electron_head = vec4(0.0, 1.0, 1.0, 1.0);
const vec4 electron_tail = vec4(1.0, 0.0, 0.0, 1.0);
const vec4 conductor = vec4(1.0, 1.0, 0.0, 1.0);


bool eq(vec4 c1, vec4 c2){
	return all(lessThanEqual(abs(c1 - c2), vec4(0.01)));
}

void main(){
	vec2 uv = vTexCoord;
	uv.y = 1.0 - uv.y;

	int empty_num = 0;
	int electron_head_num = 0;
	int electron_tail_num = 0;
	int conductor_num = 0;

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
		if(eq(n[idx], empty)){
			empty_num++;
		}
		if(eq(n[idx], electron_head)){
			electron_head_num++;
		}
		if(eq(n[idx], electron_tail)){
			electron_tail_num++;
		}
		if(eq(n[idx], conductor)){
			conductor_num++;
		}
	}


	vec4 next = vec4(0.0, 0.0, 0.0, 1.0);

//CODEBEGIN
if(eq(curr, empty)){
  next = empty;
} 
if(eq(curr, electron_head)){
  next = electron_tail;
} 
if(eq(curr, electron_tail)){
  next = conductor;
}
if(eq(curr, conductor)){
  next = conductor;
  if(electron_head_num == 1 || electron_head_num == 2){
    next = electron_head;
  }
}
//CODEEND

	if(pause == 1.0){
		next = c;
	}

	out_col = next;
}
