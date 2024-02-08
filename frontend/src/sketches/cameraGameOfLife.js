/**
 * @file cameraGameOfLife.js contains the implementation of a Game of Life simulation that interacts with a live webcam feed.
 * The simulation is rendered using a shader in a WebGL context.
 * @author Kevin Schultz
 * @project Emergent Playground
 */
import vertexShader from '../shaders/golZoomTmp.vert';
import fragmentShader from '../shaders/golZoomTmp.frag';

/**
 * Function that encapsulates a p5.js sketch for a Game of Life simulation that interacts with a live webcam feed.
 * 
 * @param {p5} p5 - The p5 instance.
 */
let cameraGameOfLife = function (p5) {
    let worldWidth = 1000;
    let worldHeight = 1000;
    let video;

    let shader2Din2D;
    let buffer;
    let previousState;
    let isFirstGeneration = true;

    /**
     * Preloads necessary resources before the p5.js sketch starts.
     * Specifically, it loads the vertex and fragment shaders.
     */
    p5.preload = () => {
        shader2Din2D = p5.loadShader(vertexShader, fragmentShader);
    };

    /**
     * Sets up the p5.js sketch.
     * It creates the main canvas and an off-screen graphics buffer with WebGL context.
     * The canvas is used to render the scaled image, and the buffer is used for shader rendering.
     * It also initializes the webcam feed and hides it from the display.
     * Additionally, it creates an off-screen graphics buffer to hold the previous state of the cellular automata.
     */
    p5.setup = () => {
        // create canvas with webgl
        // no smooth is active by default with webgl
        p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
        p5.strokeWeight(0);

        // create off-screen graphics buffer with webgl
        buffer = p5.createGraphics(worldWidth, worldHeight, p5.WEBGL);

        // set shader and resolution uniform
        buffer.shader(shader2Din2D);
        shader2Din2D.setUniform('resolution', [worldWidth, worldHeight]);

        // create off-screen graphics to hold the previous state of the cellular automata
        previousState = p5.createGraphics(worldWidth, worldHeight);
        previousState.noSmooth();

        video = p5.createCapture(p5.VIDEO); //access live webcam
        video.size(worldWidth, worldHeight);
        video.hide(); // hide the video feed
    };

    /**
     * Converts an image to black and white.
     * It does this by calculating the brightness of each pixel (average of red, green, and blue values),
     * and then setting the red, green, and blue values to either 0 (black) or 255 (white) depending on whether the brightness is above or below the threshold (128).
     *
     * @param {p5.Image} img - The image to convert.
     */
    let convertToBlackAndWhite = (img) => {
        // Load the pixel data from the image
        img.loadPixels();

        // Loop over each pixel in the image
        for (let y = 0; y < img.height; y++) {
            for (let x = 0; x < img.width; x++) {
                // Calculate the index of this pixel in the pixel array
                let index = (x + y * img.width) * 4;

                // Get the red, green, and blue values of this pixel
                let r = img.pixels[index + 0];
                let g = img.pixels[index + 1];
                let b = img.pixels[index + 2];

                // Calculate the brightness of this pixel
                let brightness = (r + g + b) / 3;

                // Determine the new color of this pixel: black if the brightness is below the threshold, white if it's above
                let color = brightness > 128 ? 255 : 0;

                // Set the red, green, and blue values of this pixel to the new color
                img.pixels[index + 0] = color;
                img.pixels[index + 1] = color;
                img.pixels[index + 2] = color;
            }
        }

        // Update the pixel data in the image
        img.updatePixels();
    };

    /**
     * Blends two images together by averaging the color values of corresponding pixels.
     * The blending is done in-place on the first image.
     *
     * @param {p5.Image} img1 - The first image. This image will be modified.
     * @param {p5.Image} img2 - The second image.
     */
    let blendImages = (img1, img2) => {
        // Load the pixel data from both images
        img1.loadPixels();
        img2.loadPixels();

        // Loop over each pixel in the images
        for (let y = 0; y < img1.height; y++) {
            for (let x = 0; x < img1.width; x++) {
                // Calculate the index of this pixel in the pixel arrays
                let index = (x + y * img1.width) * 4;

                // Blend the red, green, and blue values of the corresponding pixels by averaging them
                img1.pixels[index] =
                    (img1.pixels[index] + img2.pixels[index]) / 2; // Red
                img1.pixels[index + 1] =
                    (img1.pixels[index + 1] + img2.pixels[index + 1]) / 2; // Green
                img1.pixels[index + 2] =
                    (img1.pixels[index + 2] + img2.pixels[index + 2]) / 2; // Blue

                // Optionally blend the alpha channel: img1.pixels[index + 3]
            }
        }

        // Update the pixel data in the first image
        img1.updatePixels();
    };

    /**
     * Draws the p5.js sketch for each frame.
     */
    p5.draw = () => {
        p5.background('black');

        // copy buffer into previousState unless it's the first run then keep initial state
        if (!isFirstGeneration) {
            let capture = video.get();
            convertToBlackAndWhite(capture);
            blendImages(capture, buffer.get());
            previousState.image(capture, 0, 0);
        } else {
            previousState.image(video, 0, 0);
            isFirstGeneration = false;
        }

        // set previousState uniform for buffer
        shader2Din2D.setUniform('previousState', previousState);
        buffer.rect(
            -buffer.width / 2,
            buffer.height / 2,
            buffer.width,
            buffer.height
        );

        p5.texture(buffer);

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

        p5.plane(worldWidth, worldHeight);
        p5.orbitControl({ freeRotation: false });
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };
};

export default cameraGameOfLife;
