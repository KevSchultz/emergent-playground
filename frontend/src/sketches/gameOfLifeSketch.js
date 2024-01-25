/**
 * @file This file exports a p5 sketch that contains game of life simulation with shaders.
 * @author Kevin Schultz
 * @project Emergent Playground
 */
import vertexShader from '../shaders/gol.vert';
import fragmentShader from '../shaders/gol.frag';

var gameOfLifeSketch = (p) => {
    gameOfLifeSketch.noDraw = false;
    gameOfLifeSketch.brush = 'line';

    var golShader;
    var prevFrame;

    p.preload = () => {
        golShader = p.loadShader(vertexShader, fragmentShader);
    };

    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        p.pixelDensity(1);
        p.noSmooth();

        prevFrame = p.createGraphics(p.width, p.height);
        prevFrame.pixelDensity(1);
        prevFrame.noSmooth();

        p.background(0);
        p.stroke(255);
        p.fill(255);
        p.shader(golShader);
        golShader.setUniform('normalRes', [1 / p.width, 1 / p.height]);
    };

    p.draw = () => {
        if (p.mouseIsPressed && !gameOfLifeSketch.noDraw) {
            console.log(gameOfLifeSketch.noDraw);
            p.push();

            if (gameOfLifeSketch.brush === 'line') {
                p.stroke(255);
                p.line(
                    p.mouseX - p.width / 2,
                    p.mouseY - p.height / 2,
                    p.pmouseX - p.width / 2,
                    p.pmouseY - p.height / 2
                );
            } else if (gameOfLifeSketch.brush === 'circle') {
                p.noFill();
                p.circle(p.mouseX - p.width / 2, p.mouseY - p.height / 2, 100);
            } else if (gameOfLifeSketch.brush === 'square') {
                p.noFill();
                p.square(p.mouseX - p.width / 2, p.mouseY - p.height / 2, 100);
            }
            p.pop();
        }

        // p.circle(p.mouseX - p.width / 2, p.mouseY - p.height / 2, 100);
        // Copy the rendered image into our prevFrame image
        prevFrame.image(p.get(), 0, 0);

        // Set the image of the previous frame into our shader
        golShader.setUniform('tex', prevFrame);

        // Give the shader a surface to draw on
        p.rect(-p.width / 2, -p.height / 2, p.width, p.height);

        // Copy the rendered image into our prevFrame image
        prevFrame.image(p.get(), 0, 0);
    };
};

export default gameOfLifeSketch;
