#version 300 es

#ifdef GL_ES
precision mediump float;
#endif

in vec2 vTexCoord;
out vec4 out_col;

uniform sampler2D previousState;
uniform vec2 resolution;
uniform float pause;

const vec4 empty = vec4(0, 0, 0, 1.0);
const vec4 electron_head = vec4(0, 0.7568627450980392, 1, 1.0);
const vec4 electron_tail = vec4(1, 0, 0, 1.0);
const vec4 conductor = vec4(1, 0.9333333333333333, 0, 1.0);



void main(){
	vec2 uv = vTexCoord;
	uv.y = 1.0 - uv.y;

	vec2 offset = vec2(1.0/resolution.x, 1.0/resolution.y);

	uint empty_num = uint(0);
	uint electron_head_num = uint(0);
	uint electron_tail_num = uint(0);
	uint conductor_num = uint(0);


	vec4 curr = texture(previousState, uv);

	vec4 col;
	for(float i = -1.0; i < 2.0; i++){
		for(float j = -1.0; j < 2.0; j++){

			if(i==0.0 && j==0.0){
				continue;
			}


			float x = uv.x + i * offset.x;
			float y = uv.y + j * offset.y;

			col = texture(previousState, vec2(x, y));

			if(col == empty){
				empty_num++;
			}
			else if(col == electron_head){
				electron_head_num++;
			}
			else if(col == electron_tail){
				electron_tail_num++;
			}
			else if(col == conductor){
				conductor_num++;
			}


		}
	}

	vec4 next;

	if(curr == empty){
	  next = empty;
	} else if(curr == electron_head){
	  next = electron_tail;
	} else if(curr == electron_tail){
	  next = conductor;
	} else {
	  next = conductor;
	  if(electron_head_num < uint(3)){
	    next = electron_head;
	  }
	}

	if(pause == 1.0){
		next = curr;
	}

	out_col = next;
}
