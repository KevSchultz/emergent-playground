import vertexShader from '../shaders/golZoomTmp.vert';
import fragmentShader from '../shaders/golZoomTmp.frag';

var gameOfLifeSketchZoomTmp = function(p5) {

    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    let worldWidth = 1000;
    let worldHeight = 1000;
    let squareSize = 700;
    let zoom = 1;

    let shader2Din2D;
    let buffer;
    let previousState;
    let isFirstGeneration = true;

    p5.preload = () => {
        shader2Din2D = p5.loadShader(vertexShader, fragmentShader);
    }

    p5.setup = () => {
        p5.createCanvas(canvasWidth, canvasHeight, p5.WEBGL);
        p5.noSmooth();

        // create off-screen graphics buffer with webgl
        buffer = p5.createGraphics(worldWidth, worldHeight, p5.WEBGL);
        buffer.noSmooth();

        // set shader and resolution uniform
        buffer.shader(shader2Din2D);
        shader2Din2D.setUniform('resolution', [worldWidth, worldHeight]);

        // create off-screen graphics to hold the previous state of the cellular automata
        previousState = p5.createGraphics(worldWidth, worldHeight);
        previousState.noSmooth();
        previousState.push();
        previousState.stroke(255);
        previousState.strokeWeight(10);
        previousState.noFill();
        previousState.square(
            worldWidth / 2 - squareSize / 2,
            worldHeight / 2 - squareSize / 2,
            squareSize
        );
        previousState.pop();

    }

        p5.mouseWheel = (event) => {
            // Adjust scalar based on mouse wheel
            zoom += event.delta * -0.001;
            // Constrain the scalar to prevent too much zoom in or out
            zoom = p5.constrain(zoom, 0.1, 500);
        };

        p5.draw = () => {
        p5.background(0);

        // copy buffer into previousState unless it's the first run then keep initial state
        if (!isFirstGeneration) {
            previousState.image(buffer, 0, 0);
        } else {
            console.log('first generation');
            isFirstGeneration = false;
        }

        if (p5.mouseIsPressed) {
            // Map mouse coordinates to previousState coordinates
            let mappedX = (p5.mouseX - p5.width / 2) / zoom + worldWidth / 2;
            let mappedY = (p5.mouseY - p5.height / 2) / zoom + worldHeight / 2;

            mappedX = Math.floor(mappedX);
            mappedY = Math.floor(mappedY);

            console.log('mappedX ' + mappedX);
            console.log('mappedY ' + mappedY);
            // Draw on previousState
            previousState.push(); // Save current state
            previousState.noFill();
            previousState.strokeWeight(1);
            previousState.stroke(255);
            previousState.square(mappedX, mappedY, 100);
            previousState.pop(); // Restore state
        }

        // set previousState uniform for buffer
        shader2Din2D.setUniform('previousState', previousState);
        buffer.rect(
            -buffer.width / 2,
            buffer.height / 2,
            buffer.width,
            buffer.height
        );

        // Display nextState on the plane
        p5.noSmooth();
        p5.scale(zoom);
        p5.texture(buffer);
        p5.rotateX(p5.frameCount * 0.01);
        p5.rotateY(p5.frameCount * 0.01);
        p5.plane(worldWidth, worldHeight);
    }
}

export default gameOfLifeSketchZoomTmp;
