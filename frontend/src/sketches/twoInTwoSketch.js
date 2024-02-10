import defaultSketchAttributes from './defaultSketchAttributes';

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

    // default sketch attributes
    sketch.worldWidth = defaultSketchAttributes.worldWidth;
    sketch.worldHeight = defaultSketchAttributes.worldHeight;
    sketch.cameraX = defaultSketchAttributes.cameraX;
    sketch.cameraY = defaultSketchAttributes.cameraY;
    sketch.cameraZ = defaultSketchAttributes.cameraZ;
    sketch.scaleOffset = defaultSketchAttributes.scaleOffset;
    sketch.zoom = defaultSketchAttributes.zoom;
    sketch.minZoom = defaultSketchAttributes.minZoom;
    sketch.maxZoom = defaultSketchAttributes.maxZoom;
    sketch.zoomSensitivity = defaultSketchAttributes.zoomSensitivity;
    sketch.panSensitivity = defaultSketchAttributes.panSensitivity;
    sketch.brushType = defaultSketchAttributes.brushType;
    sketch.brushSize = defaultSketchAttributes.brushSize;
    sketch.previousMouseX = defaultSketchAttributes.previousMouseX;
    sketch.previousMouseY = defaultSketchAttributes.previousMouseY;
    sketch.vertexShader = defaultSketchAttributes.vertexShader;
    sketch.fragmentShader = defaultSketchAttributes.fragmentShader;
    sketch.pause = defaultSketchAttributes.pause;

    // sketch attribute set function for react
    sketch.setWorldWidth = null;
    sketch.setWorldHeight = null;
    sketch.setCameraX = null;
    sketch.setCameraY = null;
    sketch.setScaleOffset = null;
    sketch.setZoom = null;
    sketch.setMinZoom = null;
    sketch.setMaxZoom = null;
    sketch.setZoomSensitivity = null;
    sketch.setPanSensitivity = null;
    sketch.setBrushType = null;
    sketch.setBrushSize = null;
    sketch.setPreviousMouseX = null;
    sketch.setPreviousMouseY = null;
    sketch.setVertexShader = null;
    sketch.setFragmentShader = null;
    sketch.setPause = null;

    sketch.currentState;
    sketch.previousState;
    sketch.overlayGraphics;
    sketch.shader;
    sketch.setup = false;

    /**
     * Updates the sketch attributes with the provided properties.
     * These properties are passed from the ReactP5Wrapper in ViewerBuilderCreator.jsx using the @p5-wrapper/react library.
     * This function must be called before the sketch is created.
     *
     * @param {Object} props - The properties to update the sketch with.
     */
    p5.updateWithProps = (props) => {
        // console.log('update props ' + props);
        sketch.worldWidth = props.worldWidth;
        sketch.worldHeight = props.worldHeight;
        sketch.cameraX = props.cameraX;
        sketch.cameraY = props.cameraY;
        sketch.cameraZ = props.cameraZ;
        sketch.scaleOffset = props.scaleOffset;
        sketch.zoom = props.zoom;
        sketch.minZoom = props.minZoom;
        sketch.maxZoom = props.maxZoom;
        sketch.zoomSensitivity = props.zoomSensitivity;
        sketch.panSensitivity = props.panSensitivity;
        sketch.brushType = props.brushType;
        sketch.brushSize = props.brushSize;
        sketch.previousMouseX = props.previousMouseX;
        sketch.previousMouseY = props.previousMouseY;
        sketch.vertexShader = props.vertexShader;
        sketch.fragmentShader = props.fragmentShader;
        sketch.pause = props.pause;

        sketch.setWorldWidth = props.setWorldWidth;
        sketch.setWorldHeight = props.setWorldHeight;
        sketch.setCameraX = props.setCameraX;
        sketch.setCameraY = props.setCameraY;
        sketch.setScaleOffset = props.setScaleOffset;
        sketch.setZoom = props.setZoom;
        sketch.setMinZoom = props.setMinZoom;
        sketch.setMaxZoom = props.setMaxZoom;
        sketch.setZoomSensitivity = props.setZoomSensitivity;
        sketch.setPanSensitivity = props.setPanSensitivity;
        sketch.setBrushType = props.setBrushType;
        sketch.setBrushSize = props.setBrushSize;
        sketch.setPreviousMouseX = props.setPreviousMouseX;
        sketch.setPreviousMouseY = props.setPreviousMouseY;
        sketch.setVertexShader = props.setVertexShader;
        sketch.setFragmentShader = props.setFragmentShader;
        sketch.setPause = props.setPause;

        if (!sketch.setup) {
            sketch.setupWithProps();
        }
    };

    /**
     * Preloads necessary resources before the sketch starts.
     *
     * In this case, it loads a shader using the provided vertex and fragment shader paths.
     * The loaded shader is then set as an attribute of the sketch.
     */
    p5.preload = () => {
        sketch.shader = p5.createShader(
            sketch.vertexShader,
            sketch.fragmentShader
        );
    };

    sketch.setupWithProps = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL); // no smooth is active by default with webgl
        p5.strokeWeight(0);

        p5.blendMode(p5.OVERLAY);

        sketch.scaleOffset = p5.round(
            Math.min(
                p5.windowWidth / sketch.worldWidth,
                p5.windowHeight / sketch.worldHeight
            )
        );

        sketch.setScaleOffset(
            p5.round(
                Math.min(
                    p5.windowWidth / sketch.worldWidth,
                    p5.windowHeight / sketch.worldHeight
                )
            )
        );

        sketch.setMinZoom(-sketch.scaleOffset + 0.1);

        // create off-screen graphics buffer with webgl
        sketch.currentState = p5.createGraphics(
            sketch.worldWidth,
            sketch.worldHeight,
            p5.WEBGL
        );

        sketch.currentState.shader(sketch.shader);
        sketch.currentState.background(0);

        // set shader and resolution uniform
        sketch.shader.setUniform('resolution', [
            sketch.worldWidth,
            sketch.worldHeight,
        ]);

        sketch.currentState.pixelDensity(PIXEL_DENSITY);

        // create off-screen graphics to hold the previous state of the cellular automata
        sketch.previousState = p5.createGraphics(
            sketch.worldWidth,
            sketch.worldHeight
        );

        sketch.previousState.pixelDensity(PIXEL_DENSITY);
        sketch.previousState.noSmooth();
        sketch.previousState.background(0);

        // sketch.previousState.push();
        // sketch.previousState.noFill();
        // sketch.previousState.stroke(255);
        // sketch.previousState.strokeWeight(10);
        // sketch.previousState.square(100, 100, 100);
        // sketch.previousState.pop();

        console.log(sketch.scaleOffset);

        let overlayGraphicsWidth = p5.round(
            sketch.worldWidth * sketch.scaleOffset
        );
        let overlayGraphicsHeight = p5.round(
            sketch.worldHeight * sketch.scaleOffset
        );

        console.log(overlayGraphicsWidth);
        console.log(overlayGraphicsHeight);
        sketch.overlayGraphics = p5.createGraphics(
            overlayGraphicsWidth,
            overlayGraphicsHeight
        );
        sketch.overlayGraphics.pixelDensity(PIXEL_DENSITY);
        sketch.overlayGraphics.noSmooth();

        sketch.drawGrid(
            sketch.scaleOffset,
            overlayGraphicsWidth,
            overlayGraphicsHeight
        );

        sketch.setup = true;
    };

    // Handle mouse wheel for zoom
    p5.mouseWheel = (event) => {
        sketch.setZoom((previousZoom) => {
            previousZoom -= event.delta * sketch.zoomSensitivity;
            previousZoom = p5.constrain(
                previousZoom,
                sketch.minZoom,
                sketch.maxZoom
            );
            return previousZoom;
        });
    };

    p5.mouseDragged = () => {
        // Update image position based on mouse drag

        sketch.setCameraX((previousCameraX) => {
            if (p5.mouseButton === p5.CENTER) {
                previousCameraX -= p5.mouseX - sketch.previousMouseX;
            }

            sketch.setPreviousMouseX(p5.mouseX);
            return previousCameraX;
        });

        // Update the camera's Y position
        sketch.setCameraY((previousCameraY) => {
            if (p5.mouseButton === p5.CENTER) {
                previousCameraY -= p5.mouseY - sketch.previousMouseY;
            }

            sketch.setPreviousMouseY(p5.mouseY);
            return previousCameraY;
        });
    };

    p5.mousePressed = () => {
        // Record the mouse position when mouse is pressed
        sketch.setPreviousMouseX(p5.mouseX);
        sketch.setPreviousMouseY(p5.mouseY);

        if (sketch.cursorIsOnWorld(p5.mouseX, p5.mouseY)) {
            sketch.setPause(1);
        }
    };

    p5.draw = () => {
        if (!sketch.setup) {
            console.log('not setup');
            return;
        }

        p5.clear();

        // make the current state the previous state for the next frame
        // Load the pixels of the current state
        // sketch.currentState.loadPixels();

        // // Load the pixels of the previous state
        // sketch.previousState.loadPixels();

        // // Copy the pixels from the current state to the previous state
        // for (let i = 0; i < sketch.currentState.pixels.length; i++) {
        //     sketch.previousState.pixels[i] = sketch.currentState.pixels[i];
        // }

        // sketch.previousState.set(sketch.currentState);
        sketch.previousState.image(sketch.currentState, 0, 0);

        // sketch.previousState.blendMode(p5.REMOVE);

        // Apply the changes to the previous state

        let worldMouse = sketch.screenToWorldP52DCoordinates(
            p5.mouseX,
            p5.mouseY
        );

        if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
            sketch.previousState.loadPixels();
            sketch.previousState.set(
                worldMouse.x,
                worldMouse.y,
                p5.color(255, 255, 255)
            );
            sketch.previousState.updatePixels();
        }

        // // Copy the pixels from the current state to the previous state
        // for (let i = 0; i < sketch.currentState.pixels.length; i++) {
        //     sketch.previousState.pixels[i] = sketch.currentState.pixels[i];
        // }

        // // Apply the changes to the previous state
        // sketch.previousState.updatePixels();

        // if webgl is being used for the previousState then do this
        // sketch.previousState.texture(sketch.currentState.get());
        // sketch.previousState.plane(sketch.worldWidth, sketch.worldHeight);

        // Enable pixel manipulation

        // if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
        //     sketch.previousState.set(
        //         worldMouse.x,
        //         worldMouse.y,
        //         p5.color(255, 255, 255)
        //     );
        //     sketch.previousState.updatePixels();

        // sketch.previousState.push();
        // sketch.previousState.noFill();
        // sketch.previousState.stroke(255);
        // sketch.previousState.strokeWeight(10);
        // sketch.previousState.square(worldMouse.x, worldMouse.y, 4000);
        // sketch.previousState.pop();

        // sketch.previousState.square(worldMouse.x, worldMouse.y, 10);
        // }

        sketch.shader.setUniform('pause', sketch.pause);
        sketch.shader.setUniform('previousState', sketch.previousState);

        // shader is applied to the current state through p5 rect
        sketch.currentState.rect(
            -sketch.worldWidth / 2,
            -sketch.worldHeight / 2,
            sketch.worldWidth,
            sketch.worldHeight
        );

        p5.texture(sketch.currentState);

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

        // console.log(p5._renderer.GL.TEXTURE_2D);

        p5.scale(sketch.scaleOffset + sketch.zoom);
        p5.plane(sketch.worldWidth, sketch.worldHeight);

        p5.texture(sketch.overlayGraphics);

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
        p5.plane(sketch.worldWidth, sketch.worldHeight);

        // // draw overlay graphics
        // p5.image(
        //     sketch.overlayGraphics,
        //     -sketch.worldWidth / 2,
        //     -sketch.worldHeight / 2,
        //     sketch.worldWidth,
        //     sketch.worldHeight
        // );

        // draw the overlay graphics on top of the current state
        // p5.texture(sketch.overlayGraphics);

        // camera controls
        p5.ortho();
        p5.camera(
            sketch.cameraX,
            sketch.cameraY,
            sketch.cameraZ,
            sketch.cameraX,
            sketch.cameraY,
            0,
            0,
            1,
            0
        );
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);

        sketch.setScaleOffset((previousScaleOffset) => {
            previousScaleOffset = Math.min(
                p5.windowWidth / sketch.worldWidth,
                p5.windowHeight / sketch.worldHeight
            );
            return previousScaleOffset;
        });
    };

    sketch.screenToWorldP52DCoordinates = function (screenX, screenY) {
        // calculate origin of the world (top left corner because of the way p5.js works without webgl)
        // in screen coordinates given offset and zoom.
        // remember that the sketch.previousState is a p5.js graphics object and not a webgl texture
        let scaledWorldWidth =
            sketch.worldWidth * (sketch.scaleOffset + sketch.zoom);
        let scaledWorldHeight =
            sketch.worldHeight * (sketch.scaleOffset + sketch.zoom);

        let worldOriginX = p5.width / 2;
        worldOriginX -= scaledWorldWidth / 2;
        worldOriginX -= sketch.cameraX;

        let worldOriginY = p5.height / 2;
        worldOriginY -= scaledWorldHeight / 2;
        worldOriginY -= sketch.cameraY;

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
            sketch.worldWidth
        );

        let cursorWorldY = screenY - worldOriginY;
        cursorWorldY = p5.map(
            cursorWorldY,
            0,
            scaledWorldHeight,
            0,
            sketch.worldHeight
        );

        return { x: cursorWorldX, y: cursorWorldY };
    };

    sketch.screenToWorldP5WebGlCoordinates = function (screenX, screenY) {
        let cursorWorld = sketch.screenToWorldP52DCoordinates(screenX, screenY);
        let p5WebglX = cursorWorld.x - sketch.worldWidth / 2;
        let p5WebglY = cursorWorld.y - sketch.worldHeight / 2;
        return { x: p5WebglX, y: p5WebglY };
    };

    sketch.cursorIsOnWorld = function (screenX, screenY) {
        let cursorWorld = sketch.screenToWorldP52DCoordinates(screenX, screenY);
        return cursorWorld.x !== null && cursorWorld.y !== null;
    };

    /**
     * Draws a grid for each cell size in the world.
     *
     * @param {number} cellSize - The size of each cell in the grid.
     */
    sketch.drawGrid = function (cellSize, width, height) {
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
    };

    sketch.updateValue = (value, setValue) => {
        setValue(value);
    };
};

export default sketch;
