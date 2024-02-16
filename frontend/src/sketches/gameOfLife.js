/**
 * @file gameOfLife.js contains the deprecated old version of a Game of Life simulation.
 * The simulation is rendered using a shader in a WebGL context.
 * @author Kevin Schultz
 * @project Emergent Playground
 */
import vertexShader from '../shaders/gol.vert';
import fragmentShader from '../shaders/gol.frag';

/**
 * Sets up a p5.js sketch for a Game of Life simulation.
 * @param {p5} p5 - The p5 instance.
 */
let gameOfLife = (p5) => {

    gameOfLife.brush = 'line';
    let golShader;
    let prevFrame;

    p5.preload = () => {
        golShader = p5.loadShader(vertexShader, fragmentShader);
    };

    p5.setup = () => {
        p5.createCanvas(window.innerWidth, window.innerHeight, p5.WEBGL);
        p5.pixelDensity(1);
        p5.noSmooth();

        prevFrame = p5.createGraphics(p5.width, p5.height);
        prevFrame.pixelDensity(1);
        prevFrame.noSmooth();

        p5.background(0);
        p5.stroke(255);
        p5.fill(255);
        p5.shader(golShader);
        golShader.setUniform('normalRes', [1 / p5.width, 1 / p5.height]);
    };

    p5.draw = () => {
        if (p5.mouseIsPressed) {
            p5.push();

            if (gameOfLife.brush === 'line') {
                p5.stroke(255);
                p5.line(
                    p5.mouseX - p5.width / 2,
                    p5.mouseY - p5.height / 2,
                    p5.pmouseX - p5.width / 2,
                    p5.pmouseY - p5.height / 2
                );
            } else if (gameOfLife.brush === 'circle') {
                p5.noFill();
                p5.circle(p5.mouseX - p5.width / 2, p5.mouseY - p5.height / 2, 100);
            } else if (gameOfLife.brush === 'square') {
                p5.noFill();
                p5.square(p5.mouseX - p5.width / 2, p5.mouseY - p5.height / 2, 100);
            }
            p5.pop();
        }

        // p.circle(p.mouseX - p.width / 2, p.mouseY - p.height / 2, 100);
        // Copy the rendered image into our prevFrame image
        prevFrame.image(p5.get(), 0, 0);

        // Set the image of the previous frame into our shader
        golShader.setUniform('tex', prevFrame);

        // Give the shader a surface to draw on
        p5.rect(-p5.width / 2, -p5.height / 2, p5.width, p5.height);

        // Copy the rendered image into our prevFrame image
        prevFrame.image(p5.get(), 0, 0);
    };
};

export default gameOfLife;
