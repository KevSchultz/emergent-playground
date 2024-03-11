const PIXEL_DENSITY = 1;

/**
 * @class CellularAutomataSketchClass
 * @classdesc This class represents a cellular automata sketch, integrating p5.js functionalities with custom shader operations and React properties.
 * It manages the lifecycle of a cellular automata sketch, including setup, drawing operations, event handling, and dynamic property updates.
 * The class is designed to work within a React environment, utilizing the ReactP5Wrapper for seamless integration.
 * @property {p5} p5 - An instance of the p5 library, used for drawing and event handling.
 * @property {p5.Graphics} currentState - A graphics buffer representing the current state of the automata.
 * @property {p5.Graphics} previousState - A graphics buffer storing the previous state of the automata for calculations.
 * @property {Object} reactProperties - Dynamic properties passed from React, used to control sketch parameters.
 * @property {Object} defaultReactProperties - Default properties for the sketch, set upon instantiation.
 * @property {p5.Shader} shader - A p5.js Shader object for custom rendering effects.
 * @property {boolean} isSketchSetup - Flag to check if the initial setup has been completed.
 * @constructor
 * @param {Object} defaultReactProperties - Initial properties for the sketch, typically passed from a React component.
 */
class CellularAutomataSketchClass {
    constructor(defaultReactProperties) {
        this.p5;
        this.currentState;
        this.previousState;
        this.staticOverlayGraphics;
        this.dynamicOverlayGraphics;
        this.shader;
        this.canvas;
        this.initialState;

        this.reactProperties = defaultReactProperties
        this.shouldCopy = false;
        this.isSketchSetup = false;
        this.debugMode = false;
        this.cursorIsOnCanvas = false;

        // Bind 'this' to all functions
        this.updateWorldWidth = this.updateWorldWidth.bind(this);
        this.updateWorldHeight = this.updateWorldHeight.bind(this);
        this.updateShader = this.updateShader.bind(this);
        this.updateBackgroundColor = this.updateBackgroundColor.bind(this);
        this.reactP5WrapperToClassInterface = this.reactP5WrapperToClassInterface.bind(this);
        this.updateReactProperties = this.updateReactProperties.bind(this);
        this.setupMainCanvas = this.setupMainCanvas.bind(this);
        this.setupCurrentStateGraphicsBuffer = this.setupCurrentStateGraphicsBuffer.bind(this);
        this.setupPreviousStateGraphicsBuffer = this.setupPreviousStateGraphicsBuffer.bind(this);
        this.setup = this.setup.bind(this);
        this.isBrushDrawingActive = this.isBrushDrawingActive.bind(this);
        this.pixelDrawOnGraphics = this.pixelDrawOnGraphics.bind(this);
        this.squareDrawOnGraphics = this.squareDrawOnGraphics.bind(this);
        this.circleDrawOnGraphics = this.circleDrawOnGraphics.bind(this);
        this.brushDrawOnGraphics = this.brushDrawOnGraphics.bind(this);
        this.draw = this.draw.bind(this);
        this.drawTexturePlane = this.drawTexturePlane.bind(this);
        this.mouseWheel = this.mouseWheel.bind(this);
        this.mouseDragged = this.mouseDragged.bind(this);
        this.mousePressed = this.mousePressed.bind(this);
        this.windowResized = this.windowResized.bind(this);
        this.screenToWorldP52DCoordinates = this.screenToWorldP52DCoordinates.bind(this);
        this.screenToWorldP5WebGlCoordinates = this.screenToWorldP5WebGlCoordinates.bind(this);
        this.cursorIsOnWorld = this.cursorIsOnWorld.bind(this);
        this.stateToBlob = this.stateToBlob.bind(this);
        this.loadPixelsArray = this.loadPixelsArray.bind(this);

        this.debugMode ? console.log('CellularAutomataSketchClass.constructor') : null;
    }

    /**
     * @description Updates the world width of the sketch.
     * This method clears the current and previous states, sets the pause state to 1, updates the shader's resolution uniform, and resizes the canvas of the current and previous states.
     *
     * @param {number} newWorldWidth - The new world width.
     */
    updateWorldWidth(newWorldWidth) {

        const previousStateCopy = this.previousState.get();

        this.currentState.clear();
        this.previousState.clear();
        this.overlayGraphics.clear();

        this.shader.setUniform('resolution', [
            this.reactProperties.worldWidth,
            this.reactProperties.worldHeight,
        ]);

        this.currentState.resizeCanvas(newWorldWidth, this.reactProperties.worldHeight);
        this.previousState.resizeCanvas(newWorldWidth, this.reactProperties.worldHeight);
        this.overlayGraphics.resizeCanvas(newWorldWidth, this.reactProperties.worldHeight);

        this.currentState.background(this.reactProperties.backgroundColor);
        this.previousState.background(this.reactProperties.backgroundColor);

        this.copyGraphicsBufferImageDataToAnotherGraphicsBuffer(
            this.previousState,
            previousStateCopy,
            0,
            0
        );
        this.shouldCopy = false;

        this.debugMode ? console.log('CellularAutomataSketchClass.updateWorldWidth') : null;
    }

    /**
     * Updates the world height of the sketch.
     *
     * This method clears the current and previous states, sets the pause state to 1, updates the shader's resolution uniform, and resizes the canvas of the current and previous states.
     *
     * @param {number} newWorldHeight - The new world height.
     */
    updateWorldHeight(newWorldHeight) {
        const previousStateCopy = this.previousState.get();

        this.currentState.clear();
        this.previousState.clear();
        this.overlayGraphics.clear();

        this.shader.setUniform('resolution', [
            this.reactProperties.worldWidth,
            this.reactProperties.worldHeight,
        ]);

        this.currentState.resizeCanvas(this.reactProperties.worldWidth, newWorldHeight);
        this.previousState.resizeCanvas(this.reactProperties.worldWidth, newWorldHeight);
        this.overlayGraphics.resizeCanvas(this.reactProperties.worldWidth, newWorldHeight);

        this.currentState.background(this.reactProperties.backgroundColor);
        this.previousState.background(this.reactProperties.backgroundColor);

        this.copyGraphicsBufferImageDataToAnotherGraphicsBuffer(
            this.previousState,
            previousStateCopy,
            0,
            0
        );
        this.shouldCopy = false;

        this.debugMode ? console.log('CellularAutomataSketchClass.updateWorldHeight') : null;
    }

    checkShaderError(shaderObj, shaderText){
        let gl = shaderObj._renderer.GL;
        let glFragShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(glFragShader, shaderText);
        gl.compileShader(glFragShader);
        if (!gl.getShaderParameter(glFragShader, gl.COMPILE_STATUS)) {
            return gl.getShaderInfoLog(glFragShader);
        }
        return 'no error';
    }


    /**
     * Updates the shader of the sketch.
     *
     * This method clears the current and previous states, resets the shader of the current state,
     * creates a new shader with the new vertex and fragment shaders,
     * sets the shader of the current state to the new shader, and updates the pause and resolution uniforms of the new shader.
     *
     * @param {string} newVertexShader - The new vertex shader.
     * @param {string} newFragmentShader - The new fragment shader.
     */
    updateShader(newVertexShader, newFragmentShader) {
        this.currentState.resetShader();
        this.shader = null;
        this.shader = this.p5.createShader(newVertexShader, newFragmentShader);
        this.currentState.shader(this.shader);
        this.shader.setUniform('pause', 0);
        this.shader.setUniform('resolution', [
            this.reactProperties.worldWidth,
            this.reactProperties.worldHeight,
        ]);

        this.debugMode ? console.log('CellularAutomataSketchClass.updateShader') : null;
        this.debugMode ? console.log(this.checkShaderError(this.shader, newFragmentShader)) : null;
    }

    /**
     * Updates the 'default CA state' color according to a given value.
     * Sets the background attribute of the texture's currentState and previousState.
     *
     * @param {string} newBackgroundColor - The new background color in hex format.
     */
    updateBackgroundColor(newBackgroundColor) {

        if (!this.shouldCopy) {
            return;
        }

        this.reactProperties.setPause(1);
        this.currentState.clear();
        this.previousState.clear();
        this.overlayGraphics.clear();
        this.currentState.background(newBackgroundColor);
        this.previousState.background(newBackgroundColor);
        this.overlayGraphics.background(newBackgroundColor);
    }

    /**
     * Maps the p5.js event handlers to the corresponding class methods.
     * This function is used to integrate the p5.js library and ReactP5Wrapper with the class-based structure of this component.
     * It assigns the class methods to the p5.js event handlers, allowing the class to handle these events.
     *
     * @param {object} p5 - The p5 instance associated with the sketch.
     */
    reactP5WrapperToClassInterface(p5) {
        this.p5 = p5;
        this.p5.updateWithProps = this.updateReactProperties;
        this.p5.setup = this.setup;
        this.p5.draw = this.draw;
        this.p5.mouseWheel = this.mouseWheel;
        this.p5.mouseDragged = this.mouseDragged;
        this.p5.mousePressed = this.mousePressed;
        this.p5.windowResized = this.windowResized;

        this.debugMode
            ? console.log('CellularAutomataSketchClass.reactP5WrapperToClassInterface')
            : null;
    }

    /**
     * Updates the sketch attributes with the provided properties.
     * These properties are passed from the ReactP5Wrapper in ViewerBuilderCreator.jsx using the @p5-wrapper/react library.
     * This function must be called before the sketch is created.
     *
     * @param {Object} newReactProperties - The properties to update the sketch with.
     */
    updateReactProperties(newReactProperties) {
        const oldReactProperties = this.reactProperties;
        this.reactProperties = newReactProperties;

        if (oldReactProperties == undefined) {
            return;
        }

        if (oldReactProperties.worldHeight !== newReactProperties.worldHeight) {
            console.log('world height changed');
            this.updateWorldHeight(newReactProperties.worldHeight);
        }

        if (oldReactProperties.worldWidth !== newReactProperties.worldWidth) {
            console.log('world width changed');
            this.updateWorldWidth(newReactProperties.worldWidth);
        }

        if (
            oldReactProperties.vertexShader !== newReactProperties.vertexShader ||
            oldReactProperties.fragmentShader !== newReactProperties.fragmentShader
        ) {
            console.log('shader changed');
            this.updateShader(newReactProperties.vertexShader, newReactProperties.fragmentShader);
        }

        if (oldReactProperties.backgroundColor !== newReactProperties.backgroundColor) {
            console.log('background color changed');
            this.updateBackgroundColor(newReactProperties.backgroundColor);
        }

        this.debugMode ? console.log('CellularAutomataSketchClass.updateReactProperties') : null;
    }

    /**
     * Sets up the main webgl canvas for p5.
     * @returns None
     */
    setupMainCanvas() {
        this.canvas = this.p5.createCanvas(
            this.p5.windowWidth,
            this.p5.windowHeight,
            this.p5.WEBGL
        ); // no smooth is active by default with webgl
        this.p5.pixelDensity(PIXEL_DENSITY);
        this.p5.noStroke();

        this.debugMode ? console.log('CellularAutomataSketchClass.setupMainCanvas') : null;
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
        this.currentState.background(0);

        this.debugMode
            ? console.log('CellularAutomataSketchClass.setupCurrentStateGraphicsBuffer')
            : null;
    }

    /**
     * Sets up the previous state graphics buffer which will be drawn on and feed into the shader as a texture.
     * @returns None
     */
    setupPreviousStateGraphicsBuffer(worldWidth, worldHeight) {
        let oldPreviousState = undefined;

        if (this.previousState != undefined) {
            console.log("old state exists");
            oldPreviousState = this.previousState.get();
        }

        this.previousState = this.p5.createGraphics(worldWidth, worldHeight);

        this.previousState.pixelDensity(PIXEL_DENSITY);
        this.previousState.noSmooth();
        this.previousState.background(0);

        if (this.initialState) {
            this.loadPixelsArray(this.initialState);
            this.initialState = null;
            return;
        }

        if (oldPreviousState) {
            this.copyGraphicsBufferImageDataToAnotherGraphicsBuffer(
                this.previousState,
                oldPreviousState,
                0,
                0
            );
            this.shouldCopy = false;
        }

        this.debugMode
            ? console.log('CellularAutomataSketchClass.setupPreviousStateGraphicsBuffer')
            : null;
    }

    setupOverlayGraphicsBuffer(worldWidth, worldHeight) {
        this.overlayGraphics = this.p5.createGraphics(worldWidth, worldHeight);

        this.overlayGraphics.pixelDensity(PIXEL_DENSITY);
        this.overlayGraphics.noSmooth();

        this.overlayGraphics.noStroke();
    }

    /**
     * Sets up a shader using the provided vertex and fragment shaders.
     *
     * @param {string} vertexShader - The GLSL source code for the vertex shader.
     * @param {string} fragmentShader - The GLSL source code for the fragment shader.
     */
    setupShader(vertexShader, fragmentShader) {
        this.shader = this.p5.createShader(vertexShader, fragmentShader);

        this.debugMode ? console.log('CellularAutomataSketchClass.setupShader') : null;
    }

    /**
     * Sets up the cellular automata sketch with the necessary react properties.
     * Once setup is complete, the `isSketchSetup` flag is set to true.
     * @returns None
     */
    setup() {


        // ----- Shader Setup -----
        this.setupShader(
            this.reactProperties.vertexShader,
            this.reactProperties.fragmentShader
        );

        // ----- Main Canvas Setup -----
        this.setupMainCanvas(
            this.reactProperties.worldWidth,
            this.reactProperties.worldHeight
        );

        // ----- Cellular Automata Current State Graphics Buffer Setup -----
        this.setupCurrentStateGraphicsBuffer(
            this.reactProperties.worldWidth,
            this.reactProperties.worldHeight
        );

        // ----- Cellular Automata Previous State Graphics Buffer Setup -----
        this.setupPreviousStateGraphicsBuffer(
            this.reactProperties.worldWidth,
            this.reactProperties.worldHeight
        );

        // ------ Overlay Graphics ------
        this.setupOverlayGraphicsBuffer(
            this.reactProperties.worldWidth,
            this.reactProperties.worldHeight,
        );

        this.isSketchSetup = true;

        this.canvas.mouseOver(() => {
            this.cursorIsOnCanvas = true;
        });

        this.canvas.mouseOut(() => {
            this.cursorIsOnCanvas = false;
        });

        this.keepDimensions = false;
        this.debugMode ? console.log('CellularAutomataSketchClass.setup') : null;
    }

    /**
     * Checks if the brush is currently drawing.
     *
     * @returns Boolean - True if the brush is drawing, false otherwise.
     */
    isBrushDrawingActive() {
        // this.debugMode ? console.log('CellularAutomataSketchClass.isBrushDrawingActive') : null;

        return (
            this.p5.mouseIsPressed && this.p5.mouseButton === this.p5.LEFT && this.cursorIsOnCanvas
        );
    }

    /**
     * Draws a pixel on the given graphics buffer at the specified coordinates.
     *
     * @param {p5.Graphics} graphicsBuffer - The graphics buffer on which to draw the pixel.
     * @param {number} x - The x-coordinate of the pixel.
     * @param {number} y - The y-coordinate of the pixel.
     * @param {p5.Color} color - The color of the pixel.
     *
     * @returns None
     */
    pixelDrawOnGraphics(graphicsBuffer, x, y, color) {
        graphicsBuffer.loadPixels();
        graphicsBuffer.set(x, y, color);
        graphicsBuffer.updatePixels();

        this.debugMode ? console.log('CellularAutomataSketchClass.pixelDrawOnGraphics') : null;
    }

    /**
     * Draws a square outline on the given graphics buffer at the specified coordinates for the top left of the square.
     *
     * @param {p5.Graphics} graphicsBuffer - The graphics buffer on which to draw the square.
     * @param {number} x - The x-coordinate of the top-left corner of the square.
     * @param {number} y - The y-coordinate of the top-left corner of the square.
     * @param {p5.Color} color - The color of the square.
     * @param {number} size - The size of the square.
     *
     * @returns None
     */
    squareDrawOnGraphics(graphicsBuffer, x, y, color, size) {
        graphicsBuffer.push();
        graphicsBuffer.noStroke(); // Remove the stroke
        graphicsBuffer.fill(color); // Fill the square with the color
        graphicsBuffer.rectMode(graphicsBuffer.CENTER); // Set the rectMode to CENTER
        graphicsBuffer.imageMode(graphicsBuffer.CENTER); // Set the imageMode to CENTER
        graphicsBuffer.rect(x, y, size, size);
        graphicsBuffer.pop();

        this.debugMode ? console.log('CellularAutomataSketchClass.squareDrawOnGraphics') : null;
    }

    /**
     * Draws a circle outline on the given graphics buffer at the specified coordinates.
     *
     * @param {p5.Graphics} graphicsBuffer - The graphics buffer on which to draw the circle.
     * @param {number} x - The x-coordinate of the center of the circle.
     * @param {number} y - The y-coordinate of the center of the circle.
     * @param {p5.Color} color - The color of the circle.
     * @param {number} size - The diameter of the circle.
     * @param {number} borderSize - The thickness of the circle's border.
     *
     * @returns None
     */
    circleDrawOnGraphics(graphicsBuffer, x0, y0, color, diameter) {
        let radius = diameter / 2;
        let x = radius;
        let y = 0;
        let err = 0;

        graphicsBuffer.loadPixels();

        while (x >= y) {
            graphicsBuffer.set(x0 + x, y0 + y, color);
            graphicsBuffer.set(x0 + y, y0 + x, color);
            graphicsBuffer.set(x0 - y, y0 + x, color);
            graphicsBuffer.set(x0 - x, y0 + y, color);
            graphicsBuffer.set(x0 - x, y0 - y, color);
            graphicsBuffer.set(x0 - y, y0 - x, color);
            graphicsBuffer.set(x0 + y, y0 - x, color);
            graphicsBuffer.set(x0 + x, y0 - y, color);

            if (err <= 0) {
                y += 1;
                err += 2 * y + 1;
            }
            if (err > 0) {
                x -= 1;
                err -= 2 * x + 1;
            }
        }

        graphicsBuffer.updatePixels();

        this.debugMode ? console.log('CellularAutomataSketchClass.circleDrawOnGraphics') : null;
    }

    /**
     * Draws the current brush shape on the given graphics buffer at the specified coordinates.
     * This function checks if brush drawing is active and if the cursor is within the world bounds before drawing.
     *
     * @param {p5.Graphics} graphicsBuffer - The p5.js graphics buffer where the brush will draw.
     * @param {number} x - The x-coordinate on the graphics buffer where the brush starts drawing.
     * @param {number} y - The y-coordinate on the graphics buffer where the brush starts drawing.
     * @param {p5.Color} color - The color of the brush.
     *
     * @returns None
     */
    brushDrawOnGraphics(graphicsBuffer, x, y, color) {
        switch (this.reactProperties.brushType) {
            case 'pixel':
                this.pixelDrawOnGraphics(graphicsBuffer, x, y, color);
                break;

            case 'square':
                this.squareDrawOnGraphics(
                    graphicsBuffer,
                    x,
                    y,
                    color,
                    this.reactProperties.brushSize,
                    2
                );
                break;

            case 'circle':
                this.circleDrawOnGraphics(
                    graphicsBuffer,
                    x,
                    y,
                    this.p5.color(255),
                    this.reactProperties.brushSize,
                    1
                );
                break;

            case 'camera':
                this.cameraDrawOnGraphics(
                    graphicsBuffer,
                    x,
                    y,
                    this.reactProperties.worldWidth,
                    this.reactProperties.worldHeight
                );
                break;

            default:
                break;
        }

        // this.debugMode ? console.log('CellularAutomataSketchClass.brushDrawOnGraphics') : null;
    }

    /**
     * Copies the image data from one graphics buffer to another at the specified coordinates.
     *
     * @param {p5.Graphics} source - The graphics buffer from which to copy the image data.
     * @param {p5.Graphics} destination - The graphics buffer to which to copy the image data.
     * @param {number} x - The x-coordinate at which to start copying the image data.
     * @param {number} y - The y-coordinate at which to start copying the image data.
     */
    copyGraphicsBufferImageDataToAnotherGraphicsBuffer(source, destination, x, y) {
        source.image(destination.get(), x, y);

        // this.debugMode ? console.log('CellularAutomataSketchClass.copyGraphicsBufferImageDataToAnotherGraphicsBuffer') : null;
    }

    drawOverlay() {
        this.overlayGraphics.clear();
        this.brushDrawOnGraphics(this.overlayGraphics);
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
        // this.saveState(this.previousState);

        if (this.reactProperties.pause == 0) {
            this.reactProperties.setGeneration((previousGeneration) => {
                return previousGeneration + 1;
            });
        }

        // If the sketch is not set up, do nothing
        if (this.isSketchSetup == false) {
            console.log('Sketch not set up');
            return;
        }

        this.p5.clear();
        this.overlayGraphics.clear();

        if (this.shouldCopy) {
            this.copyGraphicsBufferImageDataToAnotherGraphicsBuffer(
                this.previousState,
                this.currentState,
                0,
                0
            );
        }
        this.shouldCopy = true;

        let mouseWorldLocation = this.screenToWorldP52DCoordinates(this.p5.mouseX, this.p5.mouseY);
        let mouseWorldX = mouseWorldLocation.x;
        let mouseWorldY = mouseWorldLocation.y;

        if (this.isBrushDrawingActive() && this.cursorIsOnWorld()) {
            this.brushDrawOnGraphics(
                this.previousState,
                mouseWorldX,
                mouseWorldY,
                this.p5.color(this.reactProperties.currentDrawColor)
            );
        }

        if (this.cursorIsOnWorld()) {
            this.brushDrawOnGraphics(
                this.overlayGraphics,
                mouseWorldX,
                mouseWorldY,
                this.p5.color(255, 255, 255, 100)
            );
        }

        this.shader.setUniform('pause', this.reactProperties.pause);
        this.shader.setUniform('previousState', this.previousState);

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

        this.drawTexturePlane(
            this.overlayGraphics,
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

    /**
     * Draws a texture plane with the specified texture, width, and height.
     * The texture filtering is set to nearest instead of linear, which prevents smoothing on the texture.
     * This is done by reaching into the internals of the p5.js library, which is not documented in the p5.js reference.
     *
     * @param {p5.Texture} texture - The texture to apply to the plane.
     * @param {number} width - The width of the plane.
     * @param {number} height - The height of the plane.
     */
    drawTexturePlane(texture, width, height) {
        this.p5.texture(texture);

        // The following is weird code to set the texture filtering to nearest instead of linear
        // This code was created by chatgpt and is not documented in the p5.js reference
        // It reaches into the internals of the p5.js library.
        // It essentially prevents smoothing on the texture.
        this.p5._renderer.GL.texParameteri(
            this.p5._renderer.GL.TEXTURE_2D,
            this.p5._renderer.GL.TEXTURE_MIN_FILTER,
            this.p5._renderer.GL.NEAREST
        );
        this.p5._renderer.GL.texParameteri(
            this.p5._renderer.GL.TEXTURE_2D,
            this.p5._renderer.GL.TEXTURE_MAG_FILTER,
            this.p5._renderer.GL.NEAREST
        );

        this.p5.plane(width, height);
    }

    /**
     * Handles the mouse wheel event for zooming in and out of the sketch.
     * The zoom level is updated based on the delta of the mouse wheel event and the zoom sensitivity.
     * The new zoom level is constrained between the minimum and maximum zoom levels.
     *
     * @param {object} event - The mouse wheel event.
     * @returns None
     */
    mouseWheel(event) {
        if (!this.cursorIsOnCanvas) {
            return;
        }

        this.reactProperties.setZoom((previousZoom) => {
            previousZoom -= event.delta * this.reactProperties.zoomSensitivity;
            previousZoom = this.p5.constrain(
                previousZoom,
                this.reactProperties.minZoom,
                this.reactProperties.maxZoom
            );
            return previousZoom;
        });

        this.debugMode ? console.log('CellularAutomataSketchClass.mouseWheel') : null;
    }

    /**
     * Handles the mouse dragged event to pan the camera over the sketch.
     * The camera's X and Y positions are updated based on the mouse's X and Y positions.
     * The new camera positions are calculated by subtracting the difference between the current and previous mouse position from the current mouse position.
     * The camera is only moved if the center mouse button is pressed.
     *
     * @returns None
     */
    mouseDragged() {
        // Update the camera's X position
        this.reactProperties.setCameraX((previousCameraX) => {
            if (this.p5.mouseButton === this.p5.CENTER) {
                previousCameraX -= this.p5.mouseX - this.reactProperties.previousMouseX;
            }

            this.reactProperties.setPreviousMouseX(this.p5.mouseX);
            return previousCameraX;
        });

        // Update the camera's Y position
        this.reactProperties.setCameraY((previousCameraY) => {
            if (this.p5.mouseButton === this.p5.CENTER) {
                previousCameraY -= this.p5.mouseY - this.reactProperties.previousMouseY;
            }

            this.reactProperties.setPreviousMouseY(this.p5.mouseY);
            return previousCameraY;
        });

        this.debugMode ? console.log('CellularAutomataSketchClass.mouseDragged') : null;
    }

    /**
     * Handles the mouse pressed event.
     * The previous mouse X and Y positions are updated with the current mouse X and Y positions.
     * If the cursor is on the world (i.e., within the bounds of the sketch), the sketch is paused to allow for drawing in draw function.
     *
     * @returns None
     */
    mousePressed() {
        this.reactProperties.setPreviousMouseX(this.p5.mouseX);
        this.reactProperties.setPreviousMouseY(this.p5.mouseY);

        if (this.cursorIsOnWorld() && this.reactProperties.continuousPlay == false) {
            this.reactProperties.setPause(1);
        }

        this.debugMode ? console.log('CellularAutomataSketchClass.mousePressed') : null;
    }

    /**
     * Handles the window resized event.
     * The canvas is resized to match the new window width and height.
     */
    windowResized() {
        this.p5.resizeCanvas(this.p5.windowWidth, this.p5.windowHeight);

        this.debugMode ? console.log('CellularAutomataSketchClass.windowResized') : null;
    }

    /**
     * Converts screen coordinates to world coordinates inside the cellular automata in a p5.js 2D context.
     * This function takes into account the current scaleOffset, zoom, and camera position.
     * If the screen coordinates are outside the world boundaries, it returns null for the world coordinates.
     *
     * @param {number} screenX - The X coordinate on the screen.
     * @param {number} screenY - The Y coordinate on the screen.
     * @returns {object} An object with the world X and Y coordinates, or null if the screen coordinates are outside the world boundaries.
     */
    screenToWorldP52DCoordinates(screenX, screenY) {
        // calculate origin of the world (top left corner because of the way p5.js works without webgl)
        // in screen coordinates given offset and zoom.
        // remember that the sketch.previousState is a p5.js graphics object in 2D and not webgl
        let scaledWorldWidth = this.reactProperties.worldWidth * this.reactProperties.zoom;
        let scaledWorldHeight = this.reactProperties.worldHeight * this.reactProperties.zoom;

        let worldOriginX = this.p5.width / 2;
        worldOriginX -= scaledWorldWidth / 2;
        worldOriginX -= this.reactProperties.cameraX;

        let worldOriginY = this.p5.height / 2;
        worldOriginY -= scaledWorldHeight / 2;
        worldOriginY -= this.reactProperties.cameraY;

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
        cursorWorldX = this.p5.map(
            cursorWorldX,
            0,
            scaledWorldWidth,
            0,
            this.reactProperties.worldWidth
        );

        let cursorWorldY = screenY - worldOriginY;
        cursorWorldY = this.p5.map(
            cursorWorldY,
            0,
            scaledWorldHeight,
            0,
            this.reactProperties.worldHeight
        );

        return { x: this.p5.round(cursorWorldX), y: this.p5.round(cursorWorldY) };
    }

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
    screenToWorldP5WebGlCoordinates(screenX, screenY) {
        let cursorWorld = this.screenToWorldP52DCoordinates(screenX, screenY);
        let p5WebglX = cursorWorld.x - this.reactProperties.worldWidth / 2;
        let p5WebglY = cursorWorld.y - this.reactProperties.worldHeight / 2;
        return { x: p5WebglX, y: p5WebglY };
    }

    /**
     * Checks if the cursor is on the world (i.e., within the bounds of the cellular automata plane).
     * This function first converts the screen coordinates to world coordinates,
     * then checks if the world coordinates are not null to determine if the cursor is on the world.
     *
     * @returns {boolean} true if the cursor is on the world, false otherwise.
     */
    cursorIsOnWorld() {
        let cursorWorld = this.screenToWorldP52DCoordinates(this.p5.mouseX, this.p5.mouseY);
        return cursorWorld.x !== null && cursorWorld.y !== null && this.cursorIsOnCanvas;
    }

    exportStateToPNG(filename) {
        this.currentState.save(filename + '.png');
    }

    stateToBlob() {
        this.currentState.loadPixels();
        const blob = new Blob([this.currentState.pixels.buffer], { type: 'application/octet-stream' });
        return blob;
    }

    loadPixelsArray(pixels) {
        this.previousState.loadPixels();
        for (let x = 0; x < this.previousState.width; x++) {
            for (let y = 0; y < this.previousState.height; y++) {
                const index = (x + y * this.previousState.width) * 4;
                const color = [
                    pixels[index],
                    pixels[index + 1],
                    pixels[index + 2],
                    pixels[index + 3],
                ];
                this.previousState.set(x, y, color);
            }
        }
        this.previousState.updatePixels();
        this.shouldCopy = false;
    }
}

export default CellularAutomataSketchClass;
