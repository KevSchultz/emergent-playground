#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord; // texture coordinate passed from the vertex shader

uniform vec2 resolution; // determines the distance to see next cell
uniform sampler2D previousState; // texture of previousState
uniform float rule;  // 8 bit number corresponding to rule 0 - 255
uniform bool paused;  // pause status

void main() {
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y; // adjust coordinates because of p5

    // Calculate pixel offset
    vec2 pixelOffset = vec2(1.0 / resolution.x, 1.0 / resolution.y);

    // If paused, no change to the pixel from its last state
    if (paused) {
        vec4 prevColor = texture2D(previousState, uv);  // Color of pixel
        float prevState = step(0.5, (prevColor.r + prevColor.g + prevColor.b) / 3.0);  // Color in binary
        gl_FragColor = vec4(prevState, prevState, prevState, 1.0);
    } else {

        // Get the color above three cells
        vec4 selfColor = texture2D(previousState, uv);
        vec4 leftTopColor = texture2D(previousState, uv + vec2(-pixelOffset.x, -pixelOffset.y));
        vec4 centerTopColor = texture2D(previousState, uv + vec2(0.0, -pixelOffset.y));
        vec4 rightTopColor = texture2D(previousState, uv + vec2(pixelOffset.x, -pixelOffset.y));
 
        // Convert the colors to binary (black = 0, white = 1)
        float selfState = step(0.5, (selfColor.r + selfColor.g + selfColor.b) / 3.0);
        float leftTopState = step(0.5, (leftTopColor.r + leftTopColor.g + leftTopColor.b) / 3.0);
        float centerTopState = step(0.5, (centerTopColor.r + centerTopColor.g + centerTopColor.b) / 3.0);
        float rightTopState = step(0.5, (rightTopColor.r + rightTopColor.g + rightTopColor.b) / 3.0);

        float newState = 0.0;        

        // Rule 30 Rules
        if (selfState == 1.0) {
            newState = 1.0;
        } else 
        if (leftTopState == 1.0 && centerTopState == 1.0 && rightTopState == 1.0) {
            newState = 0.0;
        } else if (leftTopState == 1.0 && centerTopState == 1.0 && rightTopState == 0.0) {
            newState = 0.0;
        } else if (leftTopState == 1.0 && centerTopState == 0.0 && rightTopState == 1.0) {
            newState = 0.0;
        } else if (leftTopState == 1.0 && centerTopState == 0.0 && rightTopState == 0.0) {
            newState = 1.0;
        } else if (leftTopState == 0.0 && centerTopState == 1.0 && rightTopState == 1.0) {
            newState = 1.0;
        } else if (leftTopState == 0.0 && centerTopState == 1.0 && rightTopState == 0.0) {
            newState = 1.0;
        } else if (leftTopState == 0.0 && centerTopState == 0.0 && rightTopState == 1.0) {
            newState = 1.0;
        } else if (leftTopState == 0.0 && centerTopState == 0.0 && rightTopState == 0.0) {
            newState = 0.0;
        }

        gl_FragColor = vec4(newState, newState, newState, 1.0);
    }
}
