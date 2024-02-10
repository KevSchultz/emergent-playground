#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord; // texture coordinate passed from the vertex shader


uniform vec2 resolution; // determines the distance to see next cell
uniform float pause; // pause the simulation
uniform sampler2D previousState; // texture of previousState

void main() {
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y; // adjust coordinates because of p5

    // Calculate pixel offset
    vec2 pixelOffset = vec2(1.0 / resolution.x, 1.0 / resolution.y);

    // Get the color of the current pixel and its neighbors
    vec4 centerColor = texture2D(previousState, uv);
    vec4 leftColor = texture2D(previousState, uv + vec2(-pixelOffset.x, 0.0));
    vec4 rightColor = texture2D(previousState, uv + vec2(pixelOffset.x, 0.0));
    vec4 centerTopColor = texture2D(previousState, uv + vec2(0.0, pixelOffset.y));
    vec4 leftTopColor = texture2D(previousState, uv + vec2(-pixelOffset.x, pixelOffset.y));
    vec4 rightTopColor = texture2D(previousState, uv + vec2(pixelOffset.x, pixelOffset.y));
    vec4 centerBottomColor = texture2D(previousState, uv + vec2(0.0, -pixelOffset.y));
    vec4 leftBottomColor = texture2D(previousState, uv + vec2(-pixelOffset.x, -pixelOffset.y));
    vec4 rightBottomColor = texture2D(previousState, uv + vec2(pixelOffset.x, -pixelOffset.y));

    // Convert the colors to binary (black = 0, white = 1)
    float centerState = step(0.5, (centerColor.r + centerColor.g + centerColor.b) / 3.0);
    float leftState = step(0.5, (leftColor.r + leftColor.g + leftColor.b) / 3.0);
    float rightState = step(0.5, (rightColor.r + rightColor.g + rightColor.b) / 3.0);
    float centerTopState = step(0.5, (centerTopColor.r + centerTopColor.g + centerTopColor.b) / 3.0);
    float leftTopState = step(0.5, (leftTopColor.r + leftTopColor.g + leftTopColor.b) / 3.0);
    float rightTopState = step(0.5, (rightTopColor.r + rightTopColor.g + rightTopColor.b) / 3.0);
    float centerBottomState = step(0.5, (centerBottomColor.r + centerBottomColor.g + centerBottomColor.b) / 3.0);
    float leftBottomState = step(0.5, (leftBottomColor.r + leftBottomColor.g + leftBottomColor.b) / 3.0);
    float rightBottomState = step(0.5, (rightBottomColor.r + rightBottomColor.g + rightBottomColor.b) / 3.0);

    float aliveNeighbors = leftState + rightState + centerTopState + leftTopState + rightTopState + centerBottomState + leftBottomState + rightBottomState;

    float newState = centerState;

    // Game of life Rules
    // Any live cell with fewer than two live neighbors dies, as if by underpopulation.
    // Any live cell with two or three live neighbors lives on to the next generation.
    // Any live cell with more than three live neighbors dies, as if by overpopulation.
    // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
    if (aliveNeighbors == 2.0) {
        newState = 1.0;
    } else {
        newState = 0.0;
    
    }


    if (pause == 1.0) {
        newState = centerState;
    }
    
    gl_FragColor = vec4(newState, newState, newState, 1.0);
}
