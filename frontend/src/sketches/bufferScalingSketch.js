/**
 * @file bufferScalingSketch.js exports a p5 sketch that contains scalable webgl buffer image.
 * @author Kevin Schultz
 * @project Emergent Playground
 */
import vertexShader from "../shaders/basic.vert";
import fragmentShader from "../shaders/randomColors.frag";

const bufferScalingSketch = (p) => {

    let myShader;
    let buffer;
    let scalar = 100;
    let imgX = 0;
    let imgY = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;

    p.preload = () => {
        // Load the shader files
        myShader = p.loadShader(vertexShader, fragmentShader);
    };

    p.setup = () => {
        // Create the main canvas to render scaled image
        p.createCanvas(600, 600);
        p.background('black');
        p.noSmooth();

        // Create an off-screen graphics buffer with WEBGL mode
        buffer = p.createGraphics(5, 5, p.WEBGL);
        buffer.noSmooth();
    };

    p.draw = () => {
        // Clear the background each frame
        p.background(0);

        // Set the shader for the buffer
        buffer.shader(myShader);

        // Draw a rectangle on the buffer
        buffer.rect(
            -buffer.width / 2,
            -buffer.height / 2,
            buffer.width,
            buffer.height
        );

        // Apply scaling and position
        p.translate(imgX, imgY);
        p.scale(scalar);
        p.image(
            buffer,
            p.width / (2 * scalar) - buffer.width / 2,
            p.height / (2 * scalar) - buffer.height / 2
        );
        p.resetMatrix(); // Reset the transformation matrix after drawing
    };

    p.mouseWheel = (event) => {
        // Adjust scalar based on mouse wheel
        scalar += event.delta * -0.1;
        // Constrain the scalar to prevent too much zoom in or out
        scalar = p.constrain(scalar, 1, 500);
    }

    p.mouseDragged = () => {
        // Update image position based on mouse drag
        imgX += p.mouseX - prevMouseX;
        imgY += p.mouseY - prevMouseY;

        // Update previous mouse positions
        prevMouseX = p.mouseX;
        prevMouseY = p.mouseY;
    };

    p.mousePressed = () => {
        // Record the mouse position when mouse is pressed
        prevMouseX = p.mouseX;
        prevMouseY = p.mouseY;
    };


};

export default bufferScalingSketch;