import defaultSketchAttributes from './sketchAttributes';

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

    let sketchAttributes = defaultSketchAttributes;
    let setSketchAttributes = null;

    let pause = false;

    sketch.currentState;
    sketch.previousState;
    sketch.overlayGraphics;
    sketch.shader;

    /**
     * Updates the sketch attributes with the provided properties.
     * These properties are passed from the ReactP5Wrapper in ViewerBuilderCreator.jsx using the @p5-wrapper/react library.
     * This function must be called before the sketch is created.
     *
     * @param {Object} props - The properties to update the sketch with.
     * @param {Object} props.sketchAttributes - The new sketch attributes.
     * @param {Function} props.setSketchAttributes - The function to set the new sketch attributes.
     */
    p5.updateWithProps = (props) => {
        sketchAttributes = props.sketchAttributes;
        setSketchAttributes = props.setSketchAttributes;
    };

    /**
     * Preloads necessary resources before the sketch starts.
     *
     * In this case, it loads a shader using the provided vertex and fragment shader paths.
     * The loaded shader is then set as an attribute of the sketch.
     */
    p5.preload = () => {
        sketch.shader = p5.createShader(
            sketchAttributes.vertexShader,
            sketchAttributes.fragmentShader
        );
    };

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL); // no smooth is active by default with webgl
        p5.strokeWeight(0);
        p5.pixelDensity(PIXEL_DENSITY);

        // create off-screen graphics buffer with webgl
        sketch.currentState = p5.createGraphics(
            sketchAttributes.worldWidth,
            sketchAttributes.worldHeight,
            p5.WEBGL
        );

        sketch.currentState.shader(sketch.shader);
        sketch.currentState.background(0);

        // set shader and resolution uniform
        sketch.shader.setUniform('resolution', [
            sketchAttributes.worldWidth,
            sketchAttributes.worldHeight,
        ]);

        sketch.currentState.pixelDensity(PIXEL_DENSITY);

        // create off-screen graphics to hold the previous state of the cellular automata
        sketch.previousState = p5.createGraphics(
            sketchAttributes.worldWidth,
            sketchAttributes.worldHeight
        );

        sketch.previousState.pixelDensity(PIXEL_DENSITY);
        sketch.previousState.noSmooth();
    };

    // Handle mouse wheel for zoom
    p5.mouseWheel = (event) => {
        setSketchAttributes((previousSketchAttributes) => {
            let zoom = previousSketchAttributes.zoom;

            zoom += event.delta * previousSketchAttributes.zoomSensitivity;
            zoom = p5.constrain(
                zoom,
                previousSketchAttributes.minZoom,
                previousSketchAttributes.maxZoom
            );

            previousSketchAttributes.zoom = zoom;

            return previousSketchAttributes;
        });
    };

    p5.mouseDragged = () => {
        // Update image position based on mouse drag

        setSketchAttributes((previousSketchAttributes) => {
            let cameraX = previousSketchAttributes.cameraX;
            let cameraY = previousSketchAttributes.cameraY;

            if (p5.mouseButton === p5.CENTER) {
                cameraX -= p5.mouseX - previousSketchAttributes.previousMouseX;
                cameraY -= p5.mouseY - previousSketchAttributes.previousMouseY;
            }

            previousSketchAttributes.previousMouseX = p5.mouseX;
            previousSketchAttributes.previousMouseY = p5.mouseY;
            previousSketchAttributes.cameraX = cameraX;
            previousSketchAttributes.cameraY = cameraY;

            return previousSketchAttributes;
        });
    };

    p5.mousePressed = () => {
        // Record the mouse position when mouse is pressed
        setSketchAttributes((previousSketchAttributes) => {
            previousSketchAttributes.previousMouseX = p5.mouseX;
            previousSketchAttributes.previousMouseY = p5.mouseY;

            return previousSketchAttributes;
        });
        pause = !pause;
    };

    p5.draw = () => {
        p5.background('white');

        // make the current state the previous state for the next frame
        // Load the pixels of the current state
        sketch.currentState.loadPixels();

        // Load the pixels of the previous state
        sketch.previousState.loadPixels();

        // Copy the pixels from the current state to the previous state
        for (let i = 0; i < sketch.currentState.pixels.length; i++) {
            sketch.previousState.pixels[i] = sketch.currentState.pixels[i];
        }

        // Apply the changes to the previous state
        sketch.previousState.updatePixels();

        // if webgl is being used for the previousState then do this
        // sketch.previousState.texture(sketch.currentState.get());
        // sketch.previousState.plane(sketchAttributes.worldWidth, sketchAttributes.worldHeight);

        let worldMouse = sketch.screenToWorldP52DCoordinates(
            p5.mouseX,
            p5.mouseY
        );

        // Enable pixel manipulation

        if (p5.mouseIsPressed && p5.mouseButton === p5.LEFT) {
            sketch.previousState.set(
                worldMouse.x,
                worldMouse.y,
                p5.color(255, 255, 255)
            );
            sketch.previousState.updatePixels();
            // sketch.previousState.square(worldMouse.x, worldMouse.y, 10);
        }

        // set previousState uniform for buffer
        if (pause) {
            sketch.shader.setUniform('pause', 1);
        } else {
            sketch.shader.setUniform('pause', 0);
        }
        sketch.shader.setUniform('previousState', sketch.previousState);
        // sketch.previousState.clear();

        // shader is applied to the current state through p5 rect
        sketch.currentState.rect(
            -sketchAttributes.worldWidth / 2,
            -sketchAttributes.worldHeight / 2,
            sketchAttributes.worldWidth,
            sketchAttributes.worldHeight
        );

        p5.texture(sketch.previousState);

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

        p5.scale(sketchAttributes.zoom);
        p5.plane(sketchAttributes.worldWidth, sketchAttributes.worldHeight);

        // camera controls
        p5.ortho();
        p5.camera(
            sketchAttributes.cameraX,
            sketchAttributes.cameraY,
            sketchAttributes.cameraZ,
            sketchAttributes.cameraX,
            sketchAttributes.cameraY,
            0,
            0,
            1,
            0
        );
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    sketch.screenToWorldP52DCoordinates = function (screenX, screenY) {
        // calculate origin of the world (top left corner because of the way p5.js works without webgl)
        // in screen coordinates given offset and zoom.
        // remember that the sketch.previousState is a p5.js graphics object and not a webgl texture
        let scaledWorldWidth =
            sketchAttributes.worldWidth * sketchAttributes.zoom;
        let scaledWorldHeight =
            sketchAttributes.worldHeight * sketchAttributes.zoom;

        let worldOriginX = p5.width / 2;
        worldOriginX -= scaledWorldWidth / 2;
        worldOriginX -= sketchAttributes.cameraX;

        let worldOriginY = p5.height / 2;
        worldOriginY -= scaledWorldHeight / 2;
        worldOriginY -= sketchAttributes.cameraY;

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
            sketchAttributes.worldWidth
        );

        let cursorWorldY = screenY - worldOriginY;
        cursorWorldY = p5.map(
            cursorWorldY,
            0,
            scaledWorldHeight,
            0,
            sketchAttributes.worldHeight
        );

        return { x: cursorWorldX, y: cursorWorldY };
    };

    sketch.screenToWorldP5WebGlCoordinates = function (screenX, screenY) {
        let cursorWorld = sketch.screenToWorldP52DCoordinates(screenX, screenY);
        let p5WebglX = cursorWorld.x - sketchAttributes.worldWidth / 2;
        let p5WebglY = cursorWorld.y - sketchAttributes.worldHeight / 2;
        return { x: p5WebglX, y: p5WebglY };
    };
};

export default sketch;
