/**
 * @file This file exports a p5 sketch that contains a gradients moving over squares done with shaders.
 *  Not used in the final project, but kept for reference.
 * @author Kevin Schultz
 * @project Emergent Playground
 */
import vertexShader from "../shaders/gradients.vert";
import fragmentShader from "../shaders/gradients.frag";

const gradientsMovingSketch = (p) => {
  let exampleShader;

  p.preload = () => {
    exampleShader = p.loadShader(
      vertexShader,
      fragmentShader
    );
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.shader(exampleShader);
    p.noStroke();
  };

  p.draw = () => {
    p.clear();
    p.background(0);
    exampleShader.setUniform("millis", p.millis());
    p.rect(0, 0, p.width, p.height);
  };
};

export default gradientsMovingSketch;
