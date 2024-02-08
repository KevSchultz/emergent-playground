/**
 * @file bufferScalingSketch.js exports a p5 sketch that contains a scalable webgl buffer image.
 * @author Kevin Schultz
 * @project Emergent Playground
 */
import vertexShader from "../shaders/basic.vert";
import fragmentShader from "../shaders/randomColors.frag";

/**
 * A p5.js sketch that uses a shader to render a scaled image on a buffer.
 * The image can be zoomed in and out with the mouse wheel and moved by dragging the mouse.
 * 
 * @param {p5} p5 - The p5 instance.
 */
let bufferScaling = (p5) => {
    let myShader;
    let buffer;
    let zoom = 100;
    let imgX = 0;
    let imgY = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;

    /**
     * Preloads necessary resources before the p5.js sketch starts.
     * Specifically, it loads the vertex and fragment shaders.
     */
    p5.preload = () => {
        myShader = p5.loadShader(vertexShader, fragmentShader);
    };

    /**
     * Sets up the p5.js sketch.
     * It creates the main canvas and an off-screen graphics buffer.
     * The canvas is used to render the scaled image,
     * and the buffer is used for WebGL rendering with the shader.
     */
    p5.setup = () => {
        // Create the main canvas to render scaled image
        p5.createCanvas(600, 600);
        p5.background('black');
        p5.noSmooth();

        // Create an off-screen graphics buffer with WEBGL mode
        buffer = p5.createGraphics(5, 5, p5.WEBGL);
        buffer.noSmooth();
    };

    /**
     * Draws the p5.js sketch for each frame.
     */
    p5.draw = () => {
        // Clear the background each frame
        p5.background(0);

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
        p5.translate(imgX, imgY);
        p5.scale(zoom);
        p5.image(
            buffer,
            p5.width / (2 * zoom) - buffer.width / 2,
            p5.height / (2 * zoom) - buffer.height / 2
        );
        p5.resetMatrix(); // Reset the transformation matrix after translate and scale
    };

    /**
     * Handles the mouse wheel event for the p5.js sketch.
     * It adjusts the zoom level based on the mouse wheel delta.
     * The zoom level is constrained to prevent too much zoom in or out.
     *
     * @param {Object} event - The mouse wheel event.
     */
    p5.mouseWheel = (event) => {
        // Adjust scalar based on mouse wheel
        zoom += event.delta * -0.1;
        // Constrain the scalar to prevent too much zoom in or out
        zoom = p5.constrain(zoom, 1, 500);
    };

    /**
     * Handles the mouse dragged event for the p5.js sketch.
     * It updates the image position based on the mouse drag distance.
     * The previous mouse positions are also updated for the next drag event.
     */
    p5.mouseDragged = () => {
        // Update image position based on mouse drag
        imgX += p5.mouseX - prevMouseX;
        imgY += p5.mouseY - prevMouseY;

        // Update previous mouse positions
        prevMouseX = p5.mouseX;
        prevMouseY = p5.mouseY;
    };

    /**
     * Handles the mouse pressed event for the p5.js sketch.
     * It records the mouse position when the mouse button is pressed.
     * These positions are used in the mouseDragged function to calculate the drag distance.
     */
    p5.mousePressed = () => {
        // Record the mouse position when mouse is pressed
        prevMouseX = p5.mouseX;
        prevMouseY = p5.mouseY;
    };
};

export default bufferScaling;