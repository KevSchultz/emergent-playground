import * as React from "react";
import P5Component from "./components/P5Component";
import gameOfLifeSketch from "./sketches/gameOfLifeSketch";
import gradientsMovingSketch from "./sketches/gradientsMovingSketch";
import ballMovingSketch from "./sketches/ballMovingSketch";

function App() {

  return (
    <div>
      <P5Component sketch={gameOfLifeSketch} />
      <P5Component sketch={gradientsMovingSketch} />
      <P5Component sketch={ballMovingSketch} />
    </div>
  );
}

export default App;