import CellularAutomataSketchClass from './CellularAutomataSketchClass';

export default class TextureRuleCellularAutomataSketchClass extends CellularAutomataSketchClass {
    constructor(defaultReactProperties) {
        super(defaultReactProperties);

        this.numberOfStates = 20;
        this.numberOfNeighbors = 2;
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

    setupStateGraphics() {
        this.stateGraphics = this.p5.createGraphics(this.numberOfStates, 1);

        this.stateGraphics.loadPixels();
        for (let i = 0; i < this.numberOfStates; i++) {
            this.stateGraphics.set(i, 0, this.states[i]);
        }
        this.stateGraphics.updatePixels();
    }

    setupRuleGraphics() {
        this.generateRandomRuleGraphics();
    }

    setup() {
        super.setup();

        this.generateRandomStates();

        this.setupStateGraphics();

        this.setupRuleGraphics();
    }

    /**
     * Handles the drawing of the cellular automata sketch with p5.
     * This includes clearing the sketch, updating the previous state with the current state,
     * handling mouse interactions, setting shader uniforms, applying the shader to the current state,
     * scaling the sketch based on zoom level, drawing the current state and overlay graphics to the canvas,
     * and setting the camera settings.
     * If the sketch is not set up, the function will return early and do nothing.
     *
     * @returns None
     */
    draw() {
        // If the sketch is not set up, do nothing
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

        this.brushDrawOnGraphics(this.previousState, mouseWorldX, mouseWorldY);

        
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
