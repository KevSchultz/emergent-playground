/**
 * @file This file exports a p5 sketch that contains game of life simulation with shaders. 
 * @author Kevin Schultz
 * @project Emergent Playground
 */
import vertexShader from "../shaders/gol.vert";
import fragmentShader from "../shaders/gol.frag";

const gameOfLifeSketch = (p) => {
  var golShader;
  var prevFrame;

  p.preload = () => {
    golShader = p.loadShader(vertexShader, fragmentShader);
  };

  p.setup = () => {
    console.log("setup game of life");
    p.createCanvas(5000, 5000, p.WEBGL);
    p.pixelDensity(1);
    p.noSmooth();

    prevFrame = p.createGraphics(p.width, p.height);
    prevFrame.pixelDensity(1);
    prevFrame.noSmooth();

    p.background(0);
    p.stroke(255);
    p.shader(golShader);
    golShader.setUniform("normalRes", [1.0 / p.width, 1.0 / p.height]);
    console.log("done setup");
  };

  p.draw = () => {
    if (p.mouseIsPressed) {
        p.push();
        p.noFill();

        p.line(
            p.pmouseX - p.width / 2,
            p.pmouseY - p.height / 2,
            p.mouseX - p.width / 2,
            p.mouseY - p.height / 2
        );
        p.square(p.mouseX - p.width / 2, p.mouseY - p.height / 2, 200);
        // p.circle(p.mouseX - p.width / 2, p.mouseY - p.height / 2, 100);
        // p.rectangle(p.mouseX - p.width/2, p.mouseY - p.height/2, 10);
        p.pop();
    }

    // p.circle(p.mouseX - p.width / 2, p.mouseY - p.height / 2, 100);

    // Copy the rendered image into our prevFrame image
    prevFrame.image(p.get(), 0, 0);
    // Set the image of the previous frame into our shader
    golShader.setUniform("tex", prevFrame);

    // Give the shader a surface to draw on
    p.rect(-p.width / 2, -p.height / 2, p.width, p.height);
  };
};

export default gameOfLifeSketch;
