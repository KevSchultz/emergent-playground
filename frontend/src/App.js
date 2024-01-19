import * as React from "react";
import P5Component from "./components/P5Component";
import gameOfLifeSketch from "./sketches/gameOfLifeSketch";

function App() {

  return (<div>
    <P5Component sketch={gameOfLifeSketch} />
  </div>);
}

export default App;