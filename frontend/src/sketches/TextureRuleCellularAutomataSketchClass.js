import CellularAutomataSketchClass from './CellularAutomataSketchClass';

const PIXEL_DENSITY = 1;

/**
 * @class TextureRuleCellularAutomataSketchClass
 * @classdesc Extends CellularAutomataSketchClass to implement a texture-based rule for cellular automata.
 * This class introduces the concept of states and neighbors into the cellular automata, allowing for more complex patterns and behaviors.
 * It randomly generates states and rules for cellular automata, then applies these by passing a texture to the shader.
 * The class is designed for use with p5.js and integrates seamlessly with React through the ReactP5Wrapper component, allowing for dynamic property updates and interactive sketch manipulation.
 * @property {number} numberOfStates - The number of unique states each cell can have.
 * @property {number} numberOfNeighbors - The number of neighbors considered for each cell's next state.
 * @property {p5.Graphics} ruleGraphics - A p5.js graphics buffer storing the visualization of the rule set.
 * @property {p5.Graphics} statesGraphics - A p5.js graphics buffer for visual representation of each state.
 * @property {Array.<p5.Color>} states - An array of p5.js color objects representing the color of each state.
 * @constructor
 * @param {Object} defaultReactProperties - Initial properties for the sketch, typically passed from a React component.
 */
class TextureRuleCellularAutomataSketchClass extends CellularAutomataSketchClass {
    constructor(defaultReactProperties) {
        super(defaultReactProperties);

        this.numberOfStates = 2;
        this.numberOfNeighbors = 2;
        this.generation = 0;
        this.ruleGraphics;
        this.statesGraphics;
        this.states;

        // bind the this to methods
        this.generateRandomStates = this.generateRandomStates.bind(this);
        this.setupStateGraphics = this.setupStateGraphics.bind(this);
        this.setupRuleGraphics = this.setupRuleGraphics.bind(this);
        this.generateRandomRuleGraphics = this.generateRandomRuleGraphics.bind(this);
        this.setup = this.setup.bind(this);
        this.draw = this.draw.bind(this);
    }

    /**
     * Generates random states for the sketch.
     *
     * This method clears the current states array and then fills it with new random colors.
     * Each color is a p5 color object with random red, green, and blue values and an alpha value of 255.
     */
    generateRandomStates() {
        this.states = [];

        for (let i = 0; i < this.numberOfStates; i++) {
            const red = Math.floor(Math.random() * 255);
            const green = Math.floor(Math.random() * 255);
            const blue = Math.floor(Math.random() * 255);
            const alpha = 255;

            this.states.push(this.p5.color(red, green, blue, alpha));
        }
    }

    generateRule30() {
        this.ruleGraphics = this.p5.createGraphics(8, 1);

        this.ruleGraphics.loadPixels();
        for (let i = 0; i < 8; i++) {
            let randomState = this.states[i % 2];

            this.ruleGraphics.set(i, 0, randomState);
        }
        this.ruleGraphics.updatePixels();
    }

    /**
     * Generates random rule graphics for the sketch.
     *
     * This method creates a new p5 graphics object with a width equal to the number of states raised to the power of the number of neighbors plus one and a height of one.
     * It then fills the graphics object with random states.
     */
    generateRandomRuleGraphics() {
        let width = Math.pow(this.numberOfStates, this.numberOfNeighbors + 1);

        this.ruleGraphics = this.p5.createGraphics(width, 1);

        this.ruleGraphics.loadPixels();
        for (let i = 0; i < width; i++) {
            let randomState = this.states[this.p5.floor(this.p5.random() * this.numberOfStates)];

            this.ruleGraphics.set(i, 0, randomState);
        }
        this.ruleGraphics.updatePixels();
    }

    /**
     * Sets up the state graphics for the sketch.
     *
     * This method creates a new p5 graphics object with a width equal to the number of states and a height of one.
     * It then fills the graphics object with the colors of the states.
     */
    setupStateGraphics() {
        this.stateGraphics = this.p5.createGraphics(this.numberOfStates, 1);

        this.stateGraphics.loadPixels();
        for (let i = 0; i < this.numberOfStates; i++) {
            this.stateGraphics.set(i, 0, this.states[i]);
        }
        this.stateGraphics.updatePixels();
    }

    /**
     * Sets up the rule graphics for the sketch.
     *
     * This method calls the generateRandomRuleGraphics method to create a new rule graphics.
     */
    setupRuleGraphics() {
        this.generateRandomRuleGraphics();
    }

    /**
     * Sets up the current state graphics buffer which is eventually drawn as a texture to a plane in the main canvas.
     * @returns None
     */
    setupCurrentStateGraphicsBuffer(worldWidth, worldHeight) {
        this.currentState = this.p5.createGraphics(worldWidth, worldHeight, this.p5.WEBGL);

        this.currentState.shader(this.shader);
        this.shader.setUniform('resolution', [worldWidth, worldHeight]);

        this.currentState.pixelDensity(PIXEL_DENSITY);
        this.currentState.background(this.states[0]);
    }

    /**
     * Sets up the sketch.
     *
     */
    setup() {

        this.generateRandomStates();

        super.setup();

        this.setupStateGraphics();

        this.setupRuleGraphics();
    }

    /**
     * Draws the sketch.
     *
     */
    draw() {
        // If the sketch is not set up, do nothing
        this.generation += 1;

        if (this.isSketchSetup == false) {
            return;
        }

        this.p5.clear();

        this.copyGraphicsBufferImageDataToAnotherGraphicsBuffer(
            this.previousState,
            this.currentState,
            0,
            0
        );

        let mouseWorldLocation = this.screenToWorldP52DCoordinates(this.p5.mouseX, this.p5.mouseY);
        let mouseWorldX = mouseWorldLocation.x;
        let mouseWorldY = mouseWorldLocation.y;

        this.brushDrawOnGraphics(this.previousState, mouseWorldX, mouseWorldY, this.states[1]);

        this.shader.setUniform('generation', this.generation);
        this.shader.setUniform('pause', this.reactProperties.pause);
        this.shader.setUniform('previousState', this.previousState);
        this.shader.setUniform('states', this.stateGraphics);
        this.shader.setUniform('rule', this.ruleGraphics);

        // shader is applied to the currentState by drawing a rectangle the size of the world
        this.currentState.rect(
            -this.reactProperties.worldWidth / 2,
            -this.reactProperties.worldHeight / 2,
            this.reactProperties.worldWidth,
            this.reactProperties.worldHeight
        );

        this.p5.scale(this.reactProperties.zoom);

        // ----- Draw the CurrentState to the a Canvas Plane -----
        this.drawTexturePlane(
            this.currentState,
            this.reactProperties.worldWidth,
            this.reactProperties.worldHeight
        );

        // Camera Settings
        this.p5.ortho();
        this.p5.camera(
            this.reactProperties.cameraX,
            this.reactProperties.cameraY,
            this.reactProperties.cameraZ,
            this.reactProperties.cameraX,
            this.reactProperties.cameraY,
            0,
            0,
            1,
            0
        );
    }
}

export default TextureRuleCellularAutomataSketchClass;