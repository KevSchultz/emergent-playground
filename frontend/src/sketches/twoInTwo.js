import vertexShader from '../shaders/golZoomTmp.vert';
import fragmentShader from '../shaders/golZoomTmp.frag';

let twoInTwo = function (p5) {
    twoInTwo.worldWidth = 2500;
    twoInTwo.worldHeight = 2500;
    twoInTwo.squareSize = 2000;
    twoInTwo.cameraX = 0;
    twoInTwo.cameraY = 0;
    twoInTwo.cameraZ = 1;
    twoInTwo.zoom = 1;

    // Additional properties for pan and zoom
    twoInTwo.zoomSensitivity = 0.0005;
    twoInTwo.panSensitivity = 1;
    twoInTwo.minZoom = 0.01;
    twoInTwo.maxZoom = 100;
    twoInTwo.prevMouseX = 0;
    twoInTwo.prevMouseY = 0;

    twoInTwo.shader2Din2D;
    twoInTwo.buffer;
    twoInTwo.previousState;
    twoInTwo.isFirstGeneration = true;
    twoInTwo.brush = 'line';
    twoInTwo.brushSize = 100;
    twoInTwo.paused = false;

    p5.preload = () => {
        twoInTwo.shader2Din2D = p5.loadShader(vertexShader, fragmentShader);
    };

    p5.setup = () => {
        // create canvas with webgl
        // no smooth is active by default with webgl
        p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);
        p5.strokeWeight(0);
        p5.pixelDensity(1);

        // create off-screen graphics buffer with webgl
        twoInTwo.buffer = p5.createGraphics(
            twoInTwo.worldWidth,
            twoInTwo.worldHeight,
            p5.WEBGL
        );

        // set shader and resolution uniform
        twoInTwo.buffer.shader(twoInTwo.shader2Din2D);
        twoInTwo.shader2Din2D.setUniform('resolution', [
            twoInTwo.worldWidth,
            twoInTwo.worldHeight,
        ]);
        twoInTwo.buffer.pixelDensity(1);

        // create off-screen graphics to hold the previous state of the cellular automata
        twoInTwo.previousState = p5.createGraphics(
            twoInTwo.worldWidth,
            twoInTwo.worldHeight
        );

        twoInTwo.previousState.noSmooth();
        twoInTwo.previousState.pixelDensity(1);
        twoInTwo.previousState.push();
        twoInTwo.previousState.stroke(255);
        twoInTwo.previousState.strokeWeight(10);
        twoInTwo.previousState.noFill();
        twoInTwo.previousState.square(
            twoInTwo.worldWidth / 2 - twoInTwo.squareSize / 2,
            twoInTwo.worldHeight / 2 - twoInTwo.squareSize / 2,
            twoInTwo.squareSize
        );

        twoInTwo.previousState.pop();
    };

    // Handle arrow keys for panning
    p5.keyPressed = () => {
        if (p5.keyCode === p5.LEFT_ARROW) {
            twoInTwo.cameraX -= twoInTwo.panSensitivity;
        } else if (p5.keyCode === p5.RIGHT_ARROW) {
            twoInTwo.cameraX += twoInTwo.panSensitivity;
        } else if (p5.keyCode === p5.UP_ARROW) {
            twoInTwo.cameraY -= twoInTwo.panSensitivity;
        } else if (p5.keyCode === p5.DOWN_ARROW) {
            twoInTwo.cameraY += twoInTwo.panSensitivity;
        }
    };

    // Handle mouse wheel for zoom
    p5.mouseWheel = (event) => {
        twoInTwo.zoom -= event.delta * twoInTwo.zoomSensitivity;
        twoInTwo.zoom = p5.constrain(
            twoInTwo.zoom,
            twoInTwo.minZoom,
            twoInTwo.maxZoom
        );
    };

    p5.mouseDragged = () => {
        // Update image position based on mouse drag
        if (
            p5.mouseButton === p5.CENTER ||
            (p5.keyIsPressed && p5.key === 'Control')
        ) {
            twoInTwo.cameraX -= p5.mouseX - twoInTwo.prevMouseX;
            twoInTwo.cameraY -= p5.mouseY - twoInTwo.prevMouseY;
        }

        // Update previous mouse positions
        twoInTwo.prevMouseX = p5.mouseX;
        twoInTwo.prevMouseY = p5.mouseY;
    };

    p5.mousePressed = () => {
        // Record the mouse position when mouse is pressed
        twoInTwo.prevMouseX = p5.mouseX;
        twoInTwo.prevMouseY = p5.mouseY;
    };

    twoInTwo.screenToWorldP5Coordinates = function (screenX, screenY) {
        // calculate origin of the world (top left corner because of the way p5.js works without webgl)
        // in screen coordinates given offset and zoom.
        // remember that the twoInTwo.previousState is a p5.js graphics object and not a webgl texture
        let scaledWorldWidth = twoInTwo.worldWidth * twoInTwo.zoom;
        let scaledWorldHeight = twoInTwo.worldHeight * twoInTwo.zoom;

        let worldOriginX = p5.width / 2;
        worldOriginX -= scaledWorldWidth / 2;
        worldOriginX -= twoInTwo.cameraX;

        let worldOriginY = p5.height / 2;
        worldOriginY -= scaledWorldHeight / 2;
        worldOriginY -= twoInTwo.cameraY;

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
            twoInTwo.worldWidth
        );

        let cursorWorldY = screenY - worldOriginY;
        cursorWorldY = p5.map(
            cursorWorldY,
            0,
            scaledWorldHeight,
            0,
            twoInTwo.worldHeight
        );

        return { x: cursorWorldX, y: cursorWorldY };
    };

    p5.draw = () => {

        // Set pause uniform to whether pause is active or not
        if (twoInTwo.paused) {
            twoInTwo.shader2Din2D.setUniform('paused', true);
        } else {
            twoInTwo.shader2Din2D.setUniform('paused', false);
        }

        p5.background('black');

        // copy buffer into previousState unless it's the first run then keep initial state
        if (!twoInTwo.isFirstGeneration) {
            twoInTwo.previousState.image(twoInTwo.buffer, 0, 0);
        } else {
            twoInTwo.isFirstGeneration = false;
        }

        twoInTwo.previousState.push();
        let worldMouse = twoInTwo.screenToWorldP5Coordinates(
            p5.mouseX,
            p5.mouseY
        );
        let worldPMouse = twoInTwo.screenToWorldP5Coordinates(
            p5.pmouseX,
            p5.pmouseY
        );

        twoInTwo.previousState.stroke(255);
        twoInTwo.previousState.strokeWeight(5);

        if (
            !p5.keyIsPressed &&
            p5.mouseIsPressed &&
            p5.mouseButton === p5.LEFT &&
            twoInTwo.brush === 'line'
        ) {
            twoInTwo.previousState.line(
                worldMouse.x,
                worldMouse.y,
                worldPMouse.x,
                worldPMouse.y
            );
        } else if (
            !p5.keyIsPressed &&
            p5.mouseIsPressed &&
            p5.mouseButton === p5.LEFT &&
            twoInTwo.brush === 'circle'
        ) {
            twoInTwo.previousState.noFill();
            twoInTwo.previousState.circle(
                worldMouse.x,
                worldMouse.y,
                twoInTwo.brushSize
            );
        } else if (
            !p5.keyIsPressed &&
            p5.mouseIsPressed &&
            p5.mouseButton === p5.LEFT &&
            twoInTwo.brush === 'square'
        ) {
            twoInTwo.previousState.noFill();
            twoInTwo.previousState.square(
                worldMouse.x,
                worldMouse.y,
                twoInTwo.brushSize
            );
        }
        twoInTwo.previousState.pop();

        // set previousState uniform for buffer
        twoInTwo.shader2Din2D.setUniform(
            'previousState',
            twoInTwo.previousState
        );
        twoInTwo.buffer.rect(
            -twoInTwo.buffer.width / 2,
            twoInTwo.buffer.height / 2,
            twoInTwo.buffer.width,
            twoInTwo.buffer.height
        );

        // Display nextState on the plane
        // let bufferImage = p5.image(buffer, -worldWidth/2, -worldHeight/2, worldWidth, worldHeight);
        // let bufferTexture = canvas.getTexture(bufferImage);
        // bufferTexture.setInterpolation(p5.LINEAR, p5.LINEAR);

        p5.texture(twoInTwo.buffer);

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
        // console.log("zoom : " + twoInTwo.zoom);
        p5.scale(twoInTwo.zoom);
        p5.plane(twoInTwo.worldWidth, twoInTwo.worldHeight);

        // camera controls
        p5.ortho();
        p5.camera(
            twoInTwo.cameraX,
            twoInTwo.cameraY,
            twoInTwo.cameraZ,
            twoInTwo.cameraX,
            twoInTwo.cameraY,
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

export default twoInTwo;
