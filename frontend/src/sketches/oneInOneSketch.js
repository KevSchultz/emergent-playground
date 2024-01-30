/**
 * @file This file exports a p5 sketch that contains one dimensional cellular automata shown in one dimension.
 * @author Kevin Schultz
 * @project Emergent Playground
 */
import vertexShader from '../shaders/basic.vert';
import fragmentShader from '../shaders/1Din1D.frag';

const oneInOneSketch = (p) => {
    // size dimension variables
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    let worldWidth = 100;
    let worldHeight = 0.5;
    let scalar = 25;

    // other sketch globals
    let shader1Din1D;
    let buffer;
    let previousState;
    let isFirstGeneration = true;
    let bufferX = 0;
    let bufferY = 0;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let backgroundColor = '#696969';

    p.preload = ()  => {
        shader1Din1D = p.loadShader(vertexShader, fragmentShader);
    };

    p.setup = () => {
        // main canvas used to render scaled image webgl buffer (canvas must also be webgl)
        p.createCanvas(canvasWidth, canvasHeight);
        p.noSmooth();
        p.background(backgroundColor);

        // create off-screen graphics buffer with webgl
        buffer = p.createGraphics(worldWidth, worldHeight, p.WEBGL);
        buffer.noSmooth();
        p.frameRate(24);

        // set shader,resolution unifrom and draw white background to buffer
        buffer.shader(shader1Din1D);
        shader1Din1D.setUniform('resolution', 1.0 / worldWidth);

        // create off-screen graphics buffer to hold the previous state of the cellular automata
        previousState = p.createGraphics(worldWidth, worldHeight);
        previousState.noSmooth();
        previousState.stroke(255);
        previousState.line(0, 0, 0, 0);

        console.log(buffer.webglVersion);
    }

    p.mouseWheel = (event) => {
        // Adjust scalar based on mouse wheel
        scalar += event.delta * -0.01;
        // Constrain the scalar to prevent too much zoom in or out
        scalar = p.constrain(scalar, 1, 500);
    }

    p.mousePressed = () => {
        if (p.mouseButton == p.CENTER) {
            previousMouseX = p.mouseX;
            previousMouseY = p.mouseY;
        }
    }

    p.mouseDragged = () => {
        //update buffer image location based on mouse drag of middle mouse click
        if (p.mouseButton == p.CENTER) {
            bufferX += p.mouseX - previousMouseX;
            bufferY += p.mouseY - previousMouseY;

            // update previous mouse positions
            previousMouseX = p.mouseX;
            previousMouseY = p.mouseY;
        }
    }

    p.draw = () => {
        p.background(backgroundColor);

        // copy buffer into previousState unless it's the first run then keep initial state
        if (!isFirstGeneration) {
            previousState.image(buffer, 0, 0);
        } else {
            console.log('first generation');
            isFirstGeneration = false;
        }

        // set previousState uniform for buffer
        shader1Din1D.setUniform('previousState', previousState);
        buffer.rect(
            -buffer.width / 2,
            buffer.height / 2,
            buffer.width,
            buffer.height
        );

        // begin buffer drawing process
        p.translate(bufferX, bufferY);
        p.scale(scalar);

        // find coordinates to the center of the screen given scalar and webgl
        let x = p.width / (2 * scalar) - buffer.width / 2;
        let y = p.height / (2 * scalar) - buffer.height / 2;

        // draw buffer image to main canvas
        p.image(buffer, x, y);
    }
};

export default oneInOneSketch;
