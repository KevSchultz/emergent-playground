#version 300 es

#ifdef GL_ES
precision mediump float;
#endif

in vec2 vTexCoord;
out vec4 out_col;

uniform sampler2D previousState;
uniform vec2 resolution;
uniform float pause;

const vec4 live = vec4(1, 1, 1, 1.0);
const vec4 dead = vec4(0, 0, 0, 1.0);
const vec4 dying = vec4(0, 0.14901960784313725, 1, 1.0);



void main(){
	vec2 uv = vTexCoord;
	uv.y = 1.0 - uv.y;

	vec2 offset = vec2(1.0/resolution.x, 1.0/resolution.y);

	uint live_num = uint(0);
	uint dead_num = uint(0);
	uint dying_num = uint(0);


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

			if(col == live){
				live_num++;
			}
			else if(col == dead){
				dead_num++;
			}
			else if(col == dying){
				dying_num++;
			}


		}
	}

	vec4 cell;

//CODEBEGIN
	if(curr == live){
	  cell = dying;
	} else if(curr == dying){
	  cell = dead;
	} else {
	  cell = dead;
	  if(live_num == uint(2)){
	    cell = live;
	  }
	}
//CODEEND

	if(pause == 1.0){
		cell = curr;
	}

	out_col = cell;
}
