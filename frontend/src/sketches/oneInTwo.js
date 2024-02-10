import vertexShader from '../shaders/1Din2D.vert';
import fragmentShader from '../shaders/1Din2D.frag';

let oneInTwo = function (p5) {
    oneInTwo.worldWidth = 2500;
    oneInTwo.worldHeight = 2500;
    oneInTwo.squareSize = 2000;
    oneInTwo.cameraX = 0;
    oneInTwo.cameraY = 0;
    oneInTwo.cameraZ = 1;
    oneInTwo.zoom = 1;

    // Additional properties for pan and zoom
    oneInTwo.zoomSensitivity = 0.0005;
    oneInTwo.panSensitivity = 1;
    oneInTwo.minZoom = 0.01;
    oneInTwo.maxZoom = 100;
    oneInTwo.prevMouseX = 0;
    oneInTwo.prevMouseY = 0;

    oneInTwo.shader1Din2D;
    oneInTwo.buffer;
    oneInTwo.previousState;
    oneInTwo.isFirstGeneration = true;
    oneInTwo.brush = 'line';
    oneInTwo.brushSize = 10;
    oneInTwo.paused = false;

    p5.preload = () => {
        oneInTwo.shader1Din2D = p5.loadShader(vertexShader, fragmentShader);
    };

    p5.setup = () => {
        // create canvas with webgl
        // no smooth is active by default with webgl
        p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);
        p5.strokeWeight(0);
        p5.pixelDensity(1);

        // create off-screen graphics buffer with webgl
        oneInTwo.buffer = p5.createGraphics(
            oneInTwo.worldWidth,
            oneInTwo.worldHeight,
            p5.WEBGL
        );

        // set shader and resolution uniform
        oneInTwo.buffer.shader(oneInTwo.shader1Din2D);
        oneInTwo.shader1Din2D.setUniform('resolution', [
            oneInTwo.worldWidth,
            oneInTwo.worldHeight,
        ]);
        oneInTwo.buffer.pixelDensity(1);

        // create off-screen graphics to hold the previous state of the cellular automata
        oneInTwo.previousState = p5.createGraphics(
            oneInTwo.worldWidth,
            oneInTwo.worldHeight
        );

        oneInTwo.previousState.noSmooth();
        oneInTwo.previousState.pixelDensity(1);
        oneInTwo.previousState.push();
        oneInTwo.previousState.stroke(255);
        oneInTwo.previousState.strokeWeight(10);
        oneInTwo.previousState.noFill();

        oneInTwo.previousState.pop();
    };

    // Handle arrow keys for panning
    p5.keyPressed = () => {
        if (p5.keyCode === p5.LEFT_ARROW) {
            oneInTwo.cameraX -= oneInTwo.panSensitivity;
        } else if (p5.keyCode === p5.RIGHT_ARROW) {
            oneInTwo.cameraX += oneInTwo.panSensitivity;
        } else if (p5.keyCode === p5.UP_ARROW) {
            oneInTwo.cameraY -= oneInTwo.panSensitivity;
        } else if (p5.keyCode === p5.DOWN_ARROW) {
            oneInTwo.cameraY += oneInTwo.panSensitivity;
        }
    };

    // Handle mouse wheel for zoom
    p5.mouseWheel = (event) => {
        oneInTwo.zoom -= event.delta * oneInTwo.zoomSensitivity;
        oneInTwo.zoom = p5.constrain(
            oneInTwo.zoom,
            oneInTwo.minZoom,
            oneInTwo.maxZoom
        );
    };

    p5.mouseDragged = () => {
        // Update image position based on mouse drag
        if (
            p5.mouseButton === p5.CENTER ||
            (p5.keyIsPressed && p5.key === 'Control')
        ) {
            oneInTwo.cameraX -= p5.mouseX - oneInTwo.prevMouseX;
            oneInTwo.cameraY -= p5.mouseY - oneInTwo.prevMouseY;
        }

        // Update previous mouse positions
        oneInTwo.prevMouseX = p5.mouseX;
        oneInTwo.prevMouseY = p5.mouseY;
    };

    p5.mousePressed = () => {
        // Record the mouse position when mouse is pressed
        oneInTwo.prevMouseX = p5.mouseX;
        oneInTwo.prevMouseY = p5.mouseY;
    };

    oneInTwo.screenToWorldP5Coordinates = function (screenX, screenY) {
        // calculate origin of the world (top left corner because of the way p5.js works without webgl)
        // in screen coordinates given offset and zoom.
        // remember that the oneInTwo.previousState is a p5.js graphics object and not a webgl texture
        let scaledWorldWidth = oneInTwo.worldWidth * oneInTwo.zoom;
        let scaledWorldHeight = oneInTwo.worldHeight * oneInTwo.zoom;

        let worldOriginX = p5.width / 2;
        worldOriginX -= scaledWorldWidth / 2;
        worldOriginX -= oneInTwo.cameraX;

        let worldOriginY = p5.height / 2;
        worldOriginY -= scaledWorldHeight / 2;
        worldOriginY -= oneInTwo.cameraY;

        let leftWorldBoundary = worldOriginX;
        let rightWorldBoundary = worldOriginX + scaledWorldWidth;
        let topWorldBoundary = worldOriginY;
        let bottomWorldBoundary = worldOriginY + scaledWorldHeight;

        // cursor is outside on the left or right of the world
        if (screenX < leftWorldBoundary || screenX > rightWorldBoundary) {
            return { x: -1, y: -1 };
        }

        // cursor is outside on the top or bottom of the world
        if (screenY < topWorldBoundary || screenY > bottomWorldBoundary) {
            return { x: -1, y: -1 };
        }

        // cursor is inside the world, let's calculate where
        let cursorWorldX = screenX - worldOriginX;
        cursorWorldX = p5.map(
            cursorWorldX,
            0,
            scaledWorldWidth,
            0,
            oneInTwo.worldWidth
        );

        let cursorWorldY = screenY - worldOriginY;
        cursorWorldY = p5.map(
            cursorWorldY,
            0,
            scaledWorldHeight,
            0,
            oneInTwo.worldHeight
        );

        return { x: cursorWorldX, y: cursorWorldY };
    };

    p5.draw = () => {

        // Set pause uniform to whether pause is active or not
        if (oneInTwo.paused) {
            oneInTwo.shader1Din2D.setUniform('paused', true);
        } else {
            oneInTwo.shader1Din2D.setUniform('paused', false);
        }

        p5.background('black');

        // copy buffer into previousState unless it's the first run then keep initial state
        if (!oneInTwo.isFirstGeneration) {
            oneInTwo.previousState.image(oneInTwo.buffer, 0, 0);
        } else {
            oneInTwo.isFirstGeneration = false;
        }

        oneInTwo.previousState.push();
        let worldMouse = oneInTwo.screenToWorldP5Coordinates(
            p5.mouseX,
            p5.mouseY
        );
        let worldPMouse = oneInTwo.screenToWorldP5Coordinates(
            p5.pmouseX,
            p5.pmouseY
        );

        oneInTwo.previousState.stroke(255);
        oneInTwo.previousState.strokeWeight(5);

        if (
            !p5.keyIsPressed &&
            p5.mouseIsPressed &&
            p5.mouseButton === p5.LEFT &&
            oneInTwo.brush === 'line'
        ) {
            oneInTwo.previousState.line(
                worldMouse.x,
                worldMouse.y,
                worldPMouse.x,
                worldPMouse.y
            );
        } else if (
            !p5.keyIsPressed &&
            p5.mouseIsPressed &&
            p5.mouseButton === p5.LEFT &&
            oneInTwo.brush === 'circle'
        ) {
            oneInTwo.previousState.noFill();
            oneInTwo.previousState.circle(
                worldMouse.x,
                worldMouse.y,
                oneInTwo.brushSize
            );
        } else if (
            !p5.keyIsPressed &&
            p5.mouseIsPressed &&
            p5.mouseButton === p5.LEFT &&
            oneInTwo.brush === 'square'
        ) {
            oneInTwo.previousState.noFill();
            oneInTwo.previousState.square(
                worldMouse.x,
                worldMouse.y,
                oneInTwo.brushSize
            );
        }
        oneInTwo.previousState.pop();

        // set previousState uniform for buffer
        oneInTwo.shader1Din2D.setUniform(
            'previousState',
            oneInTwo.previousState
        );
        oneInTwo.buffer.rect(
            -oneInTwo.buffer.width / 2,
            oneInTwo.buffer.height / 2,
            oneInTwo.buffer.width,
            oneInTwo.buffer.height
        );

        // Display nextState on the plane
        // let bufferImage = p5.image(buffer, -worldWidth/2, -worldHeight/2, worldWidth, worldHeight);
        // let bufferTexture = canvas.getTexture(bufferImage);
        // bufferTexture.setInterpolation(p5.LINEAR, p5.LINEAR);

        p5.texture(oneInTwo.buffer);

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

        //console.log(bufferTexture);
        // p5.rotateX(p5.frameCount * 0.01);
        // p5.rotateY(p5.frameCount * 0.01);
        // console.log("zoom : " + oneInTwo.zoom);
        p5.scale(oneInTwo.zoom);
        p5.plane(oneInTwo.worldWidth, oneInTwo.worldHeight);

        // camera controls
        p5.ortho();
        p5.camera(
            oneInTwo.cameraX,
            oneInTwo.cameraY,
            oneInTwo.cameraZ,
            oneInTwo.cameraX,
            oneInTwo.cameraY,
            0,
            0,
            1,
            0
        );
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };
};

export default oneInTwo;
