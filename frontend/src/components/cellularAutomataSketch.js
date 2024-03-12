/**
 * @project Emergent Playground
 * @file cellularAutomataSketch.js
 * @overview This file initializes a new instance of the CellularAutomataSketchClass with default properties. 
 * The instance is then exported for use in other parts of the application.
 * @authors Kevin Schultz
 * @exports cellularAutomataSketch
 */

import CellularAutomataSketchClass from "../sketches/CellularAutomataSketchClass";
import DefaultProperties from "./DefaultProperties";

const cellularAutomataSketch = new CellularAutomataSketchClass(
  DefaultProperties,
);

export default cellularAutomataSketch;
