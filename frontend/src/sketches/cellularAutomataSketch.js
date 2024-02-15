// import { generateRandomStates } from '../cellular_automata';
import DefaultProperties from './DefaultProperties';

/**
 *
 *
 * @param p5 p5.js instance
 *
 * @returns None
 */
let sketch = function (p5) {
    // constants
    const PIXEL_DENSITY = 1;
    const DEBUG_MODE = false;
    const DRAW_DEBUG_MODE = false;

    // TODO delete this and move it into react properties
    const NUMBER_OF_STATES = 20;
    const NUMBER_OF_NEIGHBORS = 2;

    sketch.reactProperties = {};

    sketch.currentState;
    sketch.previousState;
    sketch.overlayGraphics;
    sketch.ruleGraphics;
    sketch.stateGraphics;
    sketch.states;
    sketch.shader;
    sketch.isSketchSetup = false;

    /**
     * Updates the sketch attributes with the provided properties.
     * These properties are passed from the ReactP5Wrapper in ViewerBuilderCreator.jsx using the @p5-wrapper/react library.
     * This function must be called before the sketch is created.
     *
     * @param {Object} newReactProperties - The properties to update the sketch with.
     */
    sketch.updateReactProperties = (newReactProperties) => {
        sketch.reactProperties = newReactProperties;

        // console.log(sketch.reactProperties);

        // if (sketch.isSketchSetup == false) {
        //     sketch.setupSketchWithReactProperties();
        // }

        DEBUG_MODE ? console.log('sketch.updateReactProperties') : null;
    };

    /**
     * Sets up the main webgl canvas for p5.
     * @returns None
     */
    sketch.setupMainCanvas = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL); // no smooth is active by default with webgl
        p5.pixelDensity(PIXEL_DENSITY);
        p5.noStroke();

        DEBUG_MODE ? console.log('sketch.setupMainCanvas') : null;
    };

    /**
     * Sets up the current state graphics buffer which is eventually drawn as a texture to a plane in the main canvas.
     * @returns None
     */
    sketch.setupCurrentStateGraphicsBuffer = () => {
        sketch.currentState = p5.createGraphics(
            DefaultProperties.worldWidth,
            DefaultProperties.worldHeight,
            p5.WEBGL
        );

        sketch.currentState.shader(sketch.shader);
        sketch.shader.setUniform('resolution', [
            DefaultProperties.worldWidth,
            DefaultProperties.worldHeight,
        ]);

        sketch.currentState.pixelDensity(PIXEL_DENSITY);

        DEBUG_MODE ? console.log('sketch.setupCurrentStateGraphicsBuffer') : null;
    };

    /**
     * Sets up the previous state graphics buffer which will be drawn on and feed into the shader as a texture.
     * @returns None
     */
    sketch.setupPreviousStateGraphicsBuffer = () => {
        sketch.previousState = p5.createGraphics(
            DefaultProperties.worldWidth,
            DefaultProperties.worldHeight
        );

        sketch.previousState.pixelDensity(PIXEL_DENSITY);
        sketch.previousState.noSmooth();
        sketch.previousState.background(0);

        DEBUG_MODE ? console.log('sketch.setupPreviousStateGraphicsBuffer') : null;
    };

    /**
     * Sets up the overlay graphics buffer which draws on top of the cellular automata.
     * @returns None
     */
    sketch.setupOverlayGraphicsBuffer = () => {
        let overlayGraphicsWidth = p5.round(
            DefaultProperties.worldWidth * DefaultProperties.scaleOffset
        );
        let overlayGraphicsHeight = p5.round(
            DefaultProperties.worldHeight * DefaultProperties.scaleOffset
        );

        sketch.overlayGraphics = p5.createGraphics(overlayGraphicsWidth, overlayGraphicsHeight);

        sketch.overlayGraphics.pixelDensity(PIXEL_DENSITY);
        sketch.overlayGraphics.noSmooth();

        DEBUG_MODE ? console.log('sketch.setupOverlayGraphicsBuffer') : null;
    };

    sketch.generateRandomStates = (numberOfStates) => {
        sketch.states = [];

        for (let i = 0; i < numberOfStates; i++) {
            const red = Math.floor(Math.random() * 255);
            const green = Math.floor(Math.random() * 255);
            const blue = Math.floor(Math.random() * 255);
            const alpha = 255;

            sketch.states.push(p5.color(red, green, blue, alpha));
        }

        return sketch.states;
    };

    sketch.generateRandomRuleGraphics = (numberOfStates, numberOfNeighbors) => {
        let width = Math.pow(numberOfStates, numberOfNeighbors + 1);

        sketch.ruleGraphics = p5.createGraphics(width, 1);

        sketch.ruleGraphics.loadPixels();
        for (let i = 0; i < width; i++) {
            let randomState = sketch.states[p5.floor(p5.random() * NUMBER_OF_STATES)];

            sketch.ruleGraphics.set(i, 0, randomState);
        }
        sketch.ruleGraphics.updatePixels();
    };

    sketch.setupRuleGraphics = () => {
        sketch.generateRandomRuleGraphics(NUMBER_OF_STATES, NUMBER_OF_NEIGHBORS);
    };

    sketch.setupStateGraphics = () => {
        sketch.stateGraphics = p5.createGraphics(NUMBER_OF_STATES, 1);

        sketch.stateGraphics.loadPixels();
        for (let i = 0; i < NUMBER_OF_STATES; i++) {
            sketch.stateGraphics.set(i, 0, sketch.states[i]);
        }
        sketch.stateGraphics.updatePixels();
    };

    /**
     * Sets up the cellular automata sketch with the necessary react properties.
     * Once setup is complete, the `isSketchSetup` flag is set to true.
     * This function replaces the `setup` function in the p5.js sketch lifecycle.
     * This function should only be called when sketch.reactProperties is defined and complete.
     * @returns None
     */
    sketch.setupSketchWithReactProperties = () => {
        // ----- Cellular Automata Shader Setup -----
        // sketch.shader = p5.createShader(
        //     sketch.reactProperties.vertexShader,
        //     sketch.reactProperties.fragmentShader
        // );

        // ----- Main Canvas Setup -----
        sketch.setupMainCanvas();

        // ----- Cellular Automata Current State Graphics Buffer Setup -----
        sketch.setupCurrentStateGraphicsBuffer();

        // ----- Cellular Automata Previous State Graphics Buffer Setup -----
        sketch.setupPreviousStateGraphicsBuffer();

        // ----- Overlay Graphics Buffer Setup -----
        // sketch.setupOverlayGraphicsBuffer();

        sketch.states = sketch.generateRandomStates(NUMBER_OF_STATES);

        console.log(sketch.states);

        // ----- Rule Graphics Buffer Setup -----
        sketch.setupRuleGraphics();

        // ----- State Graphics Buffer Setup -----
        sketch.setupStateGraphics();

        sketch.isSketchSetup = true;

        DEBUG_MODE ? console.log('sketch.setupSketchWithReactProperties') : null;
    };

    sketch.setup = () => {
        // ----- Main Canvas Setup -----
        sketch.setupMainCanvas();

        // ----- Cellular Automata Current State Graphics Buffer Setup -----
        sketch.setupCurrentStateGraphicsBuffer();

        // ----- Cellular Automata Previous State Graphics Buffer Setup -----
        sketch.setupPreviousStateGraphicsBuffer();

        // ----- Overlay Graphics Buffer Setup -----
        // sketch.setupOverlayGraphicsBuffer();

        sketch.states = sketch.generateRandomStates(NUMBER_OF_STATES);

        console.log(sketch.states);

        // ----- Rule Graphics Buffer Setup -----
        sketch.setupRuleGraphics();

        // ----- State Graphics Buffer Setup -----
        sketch.setupStateGraphics();

        sketch.isSketchSetup = true;

        DEBUG_MODE ? console.log('sketch.setup') : null;
    };

    sketch.preload = () => {
        sketch.shader = p5.createShader(
            DefaultProperties.vertexShader,
            DefaultProperties.fragmentShader
        );
    };

    sketch.isBrushDrawingActive = () => {
        return p5.mouseIsPressed && p5.mouseButton === p5.LEFT;
    };

    /**
     * Draws the current brush shape on the given graphics buffer at the specified coordinates.
     * This function checks if brush drawing is active and if the cursor is within the world bounds before drawing.
     *
     * @param {p5.Graphics} graphicsBuffer - The p5.js graphics buffer where the brush will draw.
     * @param {number} x - The x-coordinate on the graphics buffer where the brush starts drawing.
     * @param {number} y - The y-coordinate on the graphics buffer where the brush starts drawing.
     *
     * @returns None
     */
    sketch.brushDrawOnGraphics = (graphicsBuffer, x, y) => {
        // If the brush is not drawing, do nothing
        // If the cursor is not on the world, do nothing
        if (!sketch.isBrushDrawingActive() || !sketch.cursorIsOnWorld(p5.mouseX, p5.mouseY)) {
            return;
        }

        graphicsBuffer.push();
        if (sketch.reactProperties.brushType === 'pixel') {
            graphicsBuffer.loadPixels();
            graphicsBuffer.set(x, y, p5.color(255));
            graphicsBuffer.updatePixels();
        } else if (sketch.reactProperties.brushType === 'square') {
            graphicsBuffer.stroke(255);
            graphicsBuffer.strokeWeight(1);
            graphicsBuffer.noFill(255);
            graphicsBuffer.rect(
                x,
                y,
                sketch.reactProperties.brushSize,
                sketch.reactProperties.brushSize
            );
        } else if (sketch.reactProperties.brushType === 'circle') {
            graphicsBuffer.stroke(255);
            graphicsBuffer.strokeWeight(1);
            graphicsBuffer.noFill();
            graphicsBuffer.ellipse(x, y, sketch.reactProperties.brushSize);
        }
        graphicsBuffer.pop();
    };

    /**
     * Handles the drawing of the cellular automata sketch with p5.
     * This includes clearing the sketch, updating the previous state with the current state,
     * handling mouse interactions, setting shader uniforms, applying the shader to the current state,
     * scaling the sketch based on zoom level, drawing the current state and overlay graphics to the canvas,
     * and setting the camera settings.
     * If the sketch is not set up, the function will return early and do nothing.
     * @returns None
     */
    sketch.draw = () => {
        // If the sketch is not set up, do nothing
        if (sketch.isSketchSetup == false) {
            console.log('Sketch is not set up yet');

            return;
        }

        p5.clear();

        sketch.previousState.image(sketch.currentState, 0, 0);

        let mouseWorldLocation = sketch.screenToWorldP52DCoordinates(p5.mouseX, p5.mouseY);

        let mouseWorldX = mouseWorldLocation.x;
        let mouseWorldY = mouseWorldLocation.y;

        sketch.brushDrawOnGraphics(sketch.previousState, mouseWorldX, mouseWorldY);

        // let randomStates = generateRandomStates(4);
        // let randomRule = generateRandomRule(4, 2);

        // console.log(randomRule);

        sketch.shader.setUniform('pause', sketch.reactProperties.pause);
        sketch.shader.setUniform('previousState', sketch.previousState);
        sketch.shader.setUniform('states', sketch.stateGraphics);
        sketch.shader.setUniform('rule', sketch.ruleGraphics);

        // shader is applied to the currentState by drawing a rectangle the size of the world
        sketch.currentState.rect(
            -sketch.reactProperties.worldWidth / 2,
            -sketch.reactProperties.worldHeight / 2,
            sketch.reactProperties.worldWidth,
            sketch.reactProperties.worldHeight
        );

        p5.scale(sketch.reactProperties.scaleOffset + sketch.reactProperties.zoom);

        // ----- Draw the CurrentState to the Canvas Plane -----
        sketch.drawTexturePlane(
            sketch.currentState,
            sketch.reactProperties.worldWidth,
            sketch.reactProperties.worldHeight
        );

        // console.log(gl.getParameter(gl.MAX_TEXTURE_SIZE));

        sketch.drawTexturePlane(sketch.stateGraphics, 4, 1);

        // sketch.drawTexturePlane(
        //     sketch.ruleGraphics,
        //     64,
        //     1
        // );

        // ----- Draw the Overlay Graphics Buffer to a Main Canvas Plane -----
        // sketch.drawTexturePlane(
        //     sketch.overlayGraphics,
        //     sketch.reactProperties.worldWidth,
        //     sketch.reactProperties.worldHeight
        // );

        // Camera Settings
        p5.ortho();
        p5.camera(
            sketch.reactProperties.cameraX,
            sketch.reactProperties.cameraY,
            sketch.reactProperties.cameraZ,
            sketch.reactProperties.cameraX,
            sketch.reactProperties.cameraY,
            0,
            0,
            1,
            0
        );

        DRAW_DEBUG_MODE ? console.log('sketch.draw') : null;
    };

    /**
     * Draws a texture plane with the specified texture, width, and height.
     * The texture filtering is set to nearest instead of linear, which prevents smoothing on the texture.
     * This is done by reaching into the internals of the p5.js library, which is not documented in the p5.js reference.
     *
     * @param {p5.Texture} texture - The texture to apply to the plane.
     * @param {number} width - The width of the plane.
     * @param {number} height - The height of the plane.
     */
    sketch.drawTexturePlane = (texture, width, height) => {
        p5.texture(texture);

        // The following is weird code to set the texture filtering to nearest instead of linear
        // This code was created by chatgpt and is not documented in the p5.js reference
        // It reaches into the internals of the p5.js library.
        // It essentially prevents smoothing on the texture.
        p5._renderer.GL.texParameteri(
            p5._renderer.GL.TEXTURE_2D,
            p5._renderer.GL.TEXTURE_MIN_FILTER,
            p5._renderer.GL.NEAREST
        );
        p5._renderer.GL.texParameteri(
            p5._renderer.GL.TEXTURE_2D,
            p5._renderer.GL.TEXTURE_MAG_FILTER,
            p5._renderer.GL.NEAREST
        );

        p5.plane(width, height);

        DRAW_DEBUG_MODE ? console.log('sketch.drawTexturePlane') : null;
    };

    /**
     * Handles the mouse wheel event for zooming in and out of the sketch.
     * The zoom level is updated based on the delta of the mouse wheel event and the zoom sensitivity.
     * The new zoom level is constrained between the minimum and maximum zoom levels.
     *
     * @param {object} event - The mouse wheel event.
     * @returns None
     */
    sketch.mouseWheel = (event) => {
        sketch.reactProperties.setZoom((previousZoom) => {
            previousZoom -= event.delta * sketch.reactProperties.zoomSensitivity;
            previousZoom = p5.constrain(
                previousZoom,
                sketch.reactProperties.minZoom,
                sketch.reactProperties.maxZoom
            );
            return previousZoom;
        });

        DEBUG_MODE ? console.log('sketch.mouseWheel') : null;
    };

    /**
     * Handles the mouse dragged event to pan the camera over the sketch.
     * The camera's X and Y positions are updated based on the mouse's X and Y positions.
     * The new camera positions are calculated by subtracting the difference between the current and previous mouse position from the current mouse position.
     * The camera is only moved if the center mouse button is pressed.
     *
     * @returns None
     */
    sketch.mouseDragged = () => {
        // Update the camera's X position

        let mouseX = p5.mouseX;
        let mouseY = p5.mouseY;

        if (mouseX == 0) {
            return;
        }

        console.log(mouseX, mouseY);

        sketch.reactProperties.setCameraX((previousCameraX) => {
            if (p5.mouseButton === p5.CENTER) {

                // console.log(p5.mouseX - sketch.reactProperties.previousMouseX);

                previousCameraX -= mouseX - sketch.reactProperties.previousMouseX;
            }

            return previousCameraX;
        });

        // Update the camera's Y position
        sketch.reactProperties.setCameraY((previousCameraY) => {
            if (p5.mouseButton === p5.CENTER) {
                previousCameraY -= mouseY - sketch.reactProperties.previousMouseY;
            }

            return previousCameraY;
        });

        DEBUG_MODE ? console.log('sketch.mouseDragged') : null;
    };

    /**
     * Handles the mouse pressed event.
     * The previous mouse X and Y positions are updated with the current mouse X and Y positions.
     * If the cursor is on the world (i.e., within the bounds of the sketch), the sketch is paused to allow for drawing in draw function.
     *
     * @returns None
     */
    sketch.mousePressed = () => {
        sketch.reactProperties.setPreviousMouseX(p5.mouseX);
        sketch.reactProperties.setPreviousMouseY(p5.mouseY);

        if (sketch.cursorIsOnWorld(p5.mouseX, p5.mouseY)) {
            sketch.reactProperties.setPause(1);
        }

        DEBUG_MODE ? console.log('sketch.mousePressed') : null;
    };

    /**
     * Handles the window resized event.
     * The canvas is resized to match the new window width and height.
     */
    sketch.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);

        DEBUG_MODE ? console.log('sketch.windowResized') : null;
    };

    /**
     * Converts screen coordinates to world coordinates inside the cellular automata in a p5.js 2D context.
     * This function takes into account the current scaleOffset, zoom, and camera position.
     * If the screen coordinates are outside the world boundaries, it returns null for the world coordinates.
     *
     * @param {number} screenX - The X coordinate on the screen.
     * @param {number} screenY - The Y coordinate on the screen.
     * @returns {object} An object with the world X and Y coordinates, or null if the screen coordinates are outside the world boundaries.
     */
    sketch.screenToWorldP52DCoordinates = (screenX, screenY) => {
        // calculate origin of the world (top left corner because of the way p5.js works without webgl)
        // in screen coordinates given offset and zoom.
        // remember that the sketch.previousState is a p5.js graphics object and not a webgl texture

        let scaledWorldWidth =
            sketch.reactProperties.worldWidth *
            (sketch.reactProperties.scaleOffset + sketch.reactProperties.zoom);
        let scaledWorldHeight =
            sketch.reactProperties.worldHeight *
            (sketch.reactProperties.scaleOffset + sketch.reactProperties.zoom);

        let worldOriginX = p5.width / 2;
        worldOriginX -= scaledWorldWidth / 2;
        worldOriginX -= sketch.reactProperties.cameraX;

        let worldOriginY = p5.height / 2;
        worldOriginY -= scaledWorldHeight / 2;
        worldOriginY -= sketch.reactProperties.cameraY;

        let leftWorldBoundary = worldOriginX;
        let rightWorldBoundary = worldOriginX + scaledWorldWidth;
        let topWorldBoundary = worldOriginY;
        let bottomWorldBoundary = worldOriginY + scaledWorldHeight;

        // cursor is outside on the left or right of the world
        if (screenX < leftWorldBoundary || screenX > rightWorldBoundary) {
            return { x: null, y: null };
        }

        // cursor is outside on the top or bottom of the world
        if (screenY < topWorldBoundary || screenY > bottomWorldBoundary) {
            return { x: null, y: null };
        }

        // cursor is inside the world, let's calculate where
        let cursorWorldX = screenX - worldOriginX;
        cursorWorldX = p5.map(
            cursorWorldX,
            0,
            scaledWorldWidth,
            0,
            sketch.reactProperties.worldWidth
        );

        let cursorWorldY = screenY - worldOriginY;
        cursorWorldY = p5.map(
            cursorWorldY,
            0,
            scaledWorldHeight,
            0,
            sketch.reactProperties.worldHeight
        );

        DEBUG_MODE
            ? console.log(
                  'sketch.screenToWorldP52DCoordinates -> cursorWorldX: ' +
                      cursorWorldX +
                      ' cursorWorldY: ' +
                      cursorWorldY
              )
            : null;

        return { x: cursorWorldX, y: cursorWorldY };
    };

    /**
     * Converts screen coordinates to world coordinates in a p5.js WebGL context.
     * This function first converts the screen coordinates to p5.js 2D world coordinates,
     * then adjusts them for the WebGL context by subtracting half the world width and height.
     * If the screen coordinates are outside the world boundaries, it returns null for the world coordinates.
     *
     * @param {number} screenX - The X coordinate on the screen.
     * @param {number} screenY - The Y coordinate on the screen.
     * @returns {object} An object with the world X and Y coordinates in the WebGL context, or null if the screen coordinates are outside the world boundaries.
     */
    sketch.screenToWorldP5WebGlCoordinates = (screenX, screenY) => {
        let cursorWorld = sketch.screenToWorldP52DCoordinates(screenX, screenY);
        let p5WebglX = cursorWorld.x - sketch.reactProperties.worldWidth / 2;
        let p5WebglY = cursorWorld.y - sketch.reactProperties.worldHeight / 2;

        DEBUG_MODE ? console.log('sketch.screenToWorldP5WebGlCoordinates -> ') : null;

        return { x: p5WebglX, y: p5WebglY };
    };

    /**
     * Checks if the cursor is on the world (i.e., within the bounds of the cellular automata plane).
     * This function first converts the screen coordinates to world coordinates,
     * then checks if the world coordinates are not null to determine if the cursor is on the world.
     *
     * @param {number} screenX - The X coordinate on the screen.
     * @param {number} screenY - The Y coordinate on the screen.
     * @returns {boolean} true if the cursor is on the world, false otherwise.
     */
    sketch.cursorIsOnWorld = (screenX, screenY) => {
        let cursorWorld = sketch.screenToWorldP52DCoordinates(screenX, screenY);

        DEBUG_MODE ? console.log('sketch.cursorIsOnWorld') : null;

        return cursorWorld.x !== null && cursorWorld.y !== null;
    };

    /**
     * Draws a grid for each cell size in the world.
     *
     * @param {number} cellSize - The size of each cell in the grid.
     */
    sketch.drawGrid = (cellSize, width, height) => {
        // Set the stroke color to light gray and the stroke weight to 1
        sketch.overlayGraphics.stroke('grey');
        sketch.overlayGraphics.strokeWeight(1);

        // Calculate the number of columns and rows
        let cols = width / cellSize;
        let rows = height / cellSize;

        // Draw the vertical lines
        for (let i = 1; i < cols; i++) {
            let x = p5.round(i * cellSize); // Adjust for p5 2D coordinates
            // console.log(x);
            sketch.overlayGraphics.line(x, 0, x, height); // Adjust for p5 2D coordinates
        }

        // Draw the horizontal lines
        for (let i = 1; i < rows; i++) {
            let y = p5.round(i * cellSize); // Adjust for p5 2D coordinates
            sketch.overlayGraphics.line(0, y, width, y); // Adjust for p5 2D coordinates
        }

        DEBUG_MODE ? console.log('sketch.drawGrid') : null;
    };

    // Map p5 functions to sketch functions
    p5.updateWithProps = sketch.updateReactProperties;
    p5.preload = sketch.preload;
    p5.setup = sketch.setup;
    p5.draw = sketch.draw;
    p5.mouseWheel = sketch.mouseWheel;
    p5.mouseDragged = sketch.mouseDragged;
    p5.mousePressed = sketch.mousePressed;
    p5.windowResized = sketch.windowResized;
};

export default sketch;
