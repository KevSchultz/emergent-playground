/**
 * @file This file exports a p5 sketch that contains a simple ball moving exercise.
 *  Not used in the final project, but kept for reference.
 * @author Kevin Schultz
 * @project Emergent Playground
 */

const ballMovingSketch = (p) => {
  let x = 100;
  let y = 100;

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
  };

  p.draw = () => {
    p.background(0);
    p.fill(255);
    p.circle(x, y, 50);

    x += 1;
    if (x > p.width) {
      x = 0;
    }
  };
};

export default ballMovingSketch;


