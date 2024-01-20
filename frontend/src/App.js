import * as React from "react";
import Button from '@mui/material/Button';
import P5Component from "./components/P5Component";
import gameOfLifeSketch from "./sketches/gameOfLifeSketch";
import gradientsMovingSketch from "./sketches/gradientsMovingSketch";
import ballMovingSketch from "./sketches/ballMovingSketch";
import particleSketch from "./sketches/particleSketch";

function App() {

  const [sketchIndex, setSketchIndex] = React.useState(0);

  let sketches = [
    gameOfLifeSketch,
    gradientsMovingSketch,
    ballMovingSketch,
    particleSketch,
  ];

  function handleClick() {
    setSketchIndex((sketchIndex + 1) % sketches.length);
  }

  return (
    <div>
      <P5Component sketch={sketches[sketchIndex]} />
      <Button variant="outlined" onClick={handleClick}>Change Sketch</Button>
    </div>
  );
}

export default App;