/**
 * @file This file exports a p5 sketch that contains one dimensional cellular automata shown in one dimension.
 * @author Kevin Schultz
 * @project Emergent Playground
 */
import vertexShader from "../shaders/basic.vert";
import fragmentShader from "../shaders/1Din1D.frag";

const oneInOneSketch = (p) => {

  let shader;
  let prevFrame;
  let numberOfCellsHorizontal = 100;
  let numberOfCellsVertical = 100;
  let cellWidth;
  let cellHeight;

  p.preload = () => {
    shader = p.loadShader(vertexShader, fragmentShader);
    p.frameRate(5);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth - (window.innerWidth % 100), window.innerHeight - (window.innerHeight % 100), p.WEBGL);
    p.background(0, 0, 0);
    p.noStroke();
    p.pixelDensity(1);
    p.noSmooth();
    
    p.shader(shader);

    cellWidth = p.width / numberOfCellsHorizontal;
    cellHeight = p.height / numberOfCellsVertical;

    prevFrame = p.createGraphics(p.width, p.height);
    prevFrame.background(0, 0, 0);
    prevFrame.noStroke();
    prevFrame.pixelDensity(1);
    prevFrame.noSmooth();

  };

  p.mouseClicked = () => {
    // Check the color of the square at the mouse position in the previous frame
    // If it's black, we draw white, otherwise we draw black.
    let color = prevFrame.get(p.mouseX, p.mouseY);
    if (color[0] === 0 && color[1] == 0 && color[2] == 0) {
      prevFrame.fill(255, 255, 255);
    } else {
      prevFrame.fill(0, 0, 0);
    }

    prevFrame.square(
      Math.floor(p.mouseX / cellWidth) * cellWidth,
      Math.floor(p.mouseY / cellHeight) * cellHeight,
      cellWidth
    );
  }

  p.draw = () => {

      // p.square(p.mouseX - p.width / 2, p.mouseY - p.height / 2, 200);
      // p.circle(p.mouseX - p.width / 2, p.mouseY - p.height / 2, 100);
      // p.rectangle(p.mouseX - p.width/2, p.mouseY - p.height/2, 10);    }

    // p.circle(p.mouseX - p.width / 2, p.mouseY - p.height / 2, 100);

    // Copy the rendered image into our prevFrame image
    // Set the image of the previous frame into our shader
    // p.push();
    // p.shader(golShader);
    shader.setUniform("tex", prevFrame);
    shader.setUniform("cellWidth", cellWidth / p.width);
    p.rect(-p.width / 2, -p.height / 2, p.width, p.height);

    prevFrame.image(p.get(), 0, 0);

  };
};

export default oneInOneSketch;
