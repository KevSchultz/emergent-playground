/**
 * @file This file exports a p5 sketch that contains a random colored canvas with shaders.
 *  Not used in the final project, but kept for reference.
 * @author Kevin Schultz
 * @project Emergent Playground
 */
import vertexShader from "../shaders/basic.vert";
import fragmentShader from "../shaders/randomColors.frag";

const randomColorsSketch = (p) => {
  let exampleShader;

  p.preload = () => {
    exampleShader = p.loadShader(vertexShader, fragmentShader);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
    p.shader(exampleShader);
    p.noStroke();
  };

  p.draw = () => {
    p.clear();
    p.background(0);
    p.rect(0, 0, p.width, p.height);
  };
};

export default randomColorsSketch;
