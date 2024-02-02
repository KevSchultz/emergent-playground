/**
 * @file ballMovingSketch.js exports a p5 sketch that contains a simple ball moving exercise.
 *  Not used in the final project, but kept for reference.
 * @author Kevin Schultz
 * @project Emergent Playground
 */

// Define a p5.js sketch that moves a ball across the screen
let ballMoving = (p5) => {
  // Initialize the ball's position
  let x = 100;
  let y = 100;

  // Set up the sketch
  p5.setup = () => {
    // Create a canvas that fills the window
    p5.createCanvas(window.innerWidth, window.innerHeight);
  };

  // Draw the sketch for each frame
  p5.draw = () => {
    // Clear the background
    p5.background(0);

    // Set the fill color for the ball
    p5.fill(255);

    // Draw the ball at the current position
    p5.circle(x, y, 50);

    // Move the ball to the right
    x += 1;

    // If the ball has moved off the right edge of the canvas, reset its position to the left edge
    if (x > p5.width) {
      x = 0;
    }
  };
};

// Export the sketch
export default ballMoving;


