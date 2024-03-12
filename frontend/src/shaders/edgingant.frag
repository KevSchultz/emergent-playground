#version 300 es

#ifdef GL_ES
precision mediump float;
#endif

in vec2 vTexCoord;
out vec4 out_col;

uniform sampler2D previousState;
uniform vec2 resolution;
uniform float pause;

const vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
const vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
const vec4 b_t = vec4(1.0, 0.0, 0.0, 1.0);
const vec4 b_l = vec4(1.0, 1.0, 0.0, 1.0);
const vec4 b_r = vec4(1.0, 0.0, 1.0, 1.0);
const vec4 b_b = vec4(0.0, 1.0, 1.0, 1.0);
const vec4 w_t = vec4(0.0, 1.0, 0.0, 1.0);
const vec4 w_l = vec4(0.0, 0.0, 1.0, 1.0);
const vec4 w_r = vec4(1.0, 0.5254901960784314, 0.9568627450980393, 1.0);
const vec4 w_b = vec4(0.0392156862745098, 0.43529411764705883, 0.0, 1.0);


bool eq(vec4 c1, vec4 c2){
	return all(lessThanEqual(abs(c1 - c2), vec4(0.01)));
}

void main(){
	vec2 uv = vTexCoord;
	uv.y = 1.0 - uv.y;

	int white_num = 0;
	int black_num = 0;
	int b_t_num = 0;
	int b_l_num = 0;
	int b_r_num = 0;
	int b_b_num = 0;
	int w_t_num = 0;
	int w_l_num = 0;
	int w_r_num = 0;
	int w_b_num = 0;

	vec4 c = texture(previousState, uv);
	vec4 curr = c;
	vec4 n[4];
	vec4 t = textureOffset(previousState, uv, ivec2(0, -1));
	vec4 l = textureOffset(previousState, uv, ivec2(-1, 0));
	vec4 r = textureOffset(previousState, uv, ivec2(1, 0));
	vec4 b = textureOffset(previousState, uv, ivec2(0, 1));
	n = vec4[4](t, l, r, b);


	for(int idx=0; idx<4; idx++){
		if(eq(n[idx], white)){
			white_num++;
		}
		if(eq(n[idx], black)){
			black_num++;
		}
		if(eq(n[idx], b_t)){
			b_t_num++;
		}
		if(eq(n[idx], b_l)){
			b_l_num++;
		}
		if(eq(n[idx], b_r)){
			b_r_num++;
		}
		if(eq(n[idx], b_b)){
			b_b_num++;
		}
		if(eq(n[idx], w_t)){
			w_t_num++;
		}
		if(eq(n[idx], w_l)){
			w_l_num++;
		}
		if(eq(n[idx], w_r)){
			w_r_num++;
		}
		if(eq(n[idx], w_b)){
			w_b_num++;
		}
	}


	vec4 next = vec4(1.0, 1.0, 1.0, 1.0);

//CODEBEGIN
	if(eq(curr, white)){
	  next = white;
	  if(eq(l, b_r) || eq(l, w_r)){
	    next = b_b;
	  }
	  if(eq(t, b_b) || eq(t, w_b)){
	    next = b_l;
	  }
	  if(eq(r, b_l) || eq(r, w_l)){
	    next = b_t;
	  }
	  if(eq(b, b_t) || eq(b, w_t)){
	    next = b_r;
	  }
	}
	if(eq(curr, black)){
	  next = black;
	  if(eq(l, b_r) || eq(l, w_r)){
	    next = w_t;
	  }
	  if(eq(t, b_b) || eq(t, w_b)){
	    next = w_r;
	  }
	  if(eq(r, b_l) || eq(r, w_l)){
	    next = w_b;
	  }
	  if(eq(b, b_t) || eq(b, w_t)){
	    next = w_l;
	  }
	}
	if(eq(curr, b_t) || eq(curr, b_l) || eq(curr, b_r) || eq(curr, b_b)){
	  next = white;
	}
	if(eq(curr, w_t) || eq(curr, w_l) || eq(curr, w_r) || eq(curr, w_b)){
	  next = black;
	}
//CODEEND

	if(pause == 1.0){
		next = c;
	}

	out_col = next;
}
