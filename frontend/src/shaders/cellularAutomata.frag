#ifdef GL_ES
precision mediump float;
#endif

// Constants
const int RULE_SIZE = 8000;
const int NUMBER_OF_STATES = 20;
const int NUMBER_OF_NEIGHBORS = 2;
const int RADIUS_OF_NEIGHBORS = 1;

varying vec2 vTexCoord; // texture coordinate passed from the vertex shader

uniform vec2 resolution; // determines the distance to see next cell
uniform float pause; // pause the simulation
uniform sampler2D previousState; // texture of previousState
uniform sampler2D rule;
uniform sampler2D states;

int baseNumberOfStatesToDecimalIndexConversion(int ruleIndexInBaseNumberOfStates[NUMBER_OF_NEIGHBORS + 1]) {
    int ruleIndexDecimal = 0;

    for (int i = 0; i < NUMBER_OF_NEIGHBORS; i++) {
        ruleIndexDecimal += ruleIndexInBaseNumberOfStates[i] * int(pow(float(NUMBER_OF_STATES), float(i)));
    }
    
    return ruleIndexDecimal;
}

int colorToState(vec4 color) {

    float statePixelSize = 1.0 / float(NUMBER_OF_STATES);

    float halfStatePixelSize = statePixelSize * 0.5;

    for (int state = 0; state < NUMBER_OF_STATES; state++) {

        float pixelOffset = halfStatePixelSize + statePixelSize * float(state);

        vec4 stateColor = texture2D(states, vec2(pixelOffset, 0.0));

        if (length(color.rgb - stateColor.rgb) < 0.01) {
            return state;
        }
    }

    // If no state is found, return first state
    return 0;

}

vec4 ruleColor(int ruleIndexDecimal) {
    float rulePixelSize = 1.0 / float(RULE_SIZE);
    float halfRulePixelSize = rulePixelSize * 0.5;

    float pixelOffset = halfRulePixelSize + (rulePixelSize * float(ruleIndexDecimal));

    return texture2D(rule, vec2(pixelOffset, 0.0));
}


void main() {
    vec2 uv = vTexCoord;
    uv.y = 1.0 - uv.y; // adjust coordinates because of p5

    // Calculate pixel offset
    vec2 pixelOffset = vec2(1.0 / resolution.x, 1.0 / resolution.y);

    int ruleIndexInBaseNumberOfStates[NUMBER_OF_NEIGHBORS + 1];

    for (int indexOffset = -RADIUS_OF_NEIGHBORS; indexOffset <= RADIUS_OF_NEIGHBORS; indexOffset++) {

        float xOffset = float(indexOffset) * pixelOffset.x;

        vec4 previousStateColor = texture2D(previousState, uv + vec2(xOffset, 0.0));

        int state = colorToState(previousStateColor);

        ruleIndexInBaseNumberOfStates[indexOffset + RADIUS_OF_NEIGHBORS] = state;
    }

    int ruleIndexDecimal = baseNumberOfStatesToDecimalIndexConversion(ruleIndexInBaseNumberOfStates);

    gl_FragColor = ruleColor(ruleIndexDecimal);



    // float rulePixelSize = 1.0 / float(RULE_SIZE);
    // float pixelOffset = -1.0 + (rulePixelSize * float(0));

    // vec4 firstRuleColor = texture2D(rule, vec2(0.0, 0.0));

    // int state = colorToState(firstRuleColor);

    // if (state == 0) {
    //     gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    // } else {
    //     gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    // }
}