/**
 * @project Emergent Playground
 * @file ViewerOptionsTabContainer.jsx
 * @overview This file contains the container component for the viewer options tab.
 * @authors Beckett Avary, Kevin Schultz
 * @exports ViewerOptionsTabContainer
 */

// React Imports
import { useContext } from "react";

// Material UI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

// Custom Component Imports
import InputSlider from "./InputSlider";
import P5PropertiesContext from "./P5PropertiesContext";
import cellularAutomataSketch from "./cellularAutomataSketch";
// import { downloadPost } from '../backendRequester';

/**
 * A container component for the viewer options tab.
 *
 * This component displays a Box that contains four InputSlider components.
 * The InputSlider components are used to control the zoom level, world width, world height, and brush size.
 * The current values and the functions to update these values are retrieved from the P5PropertiesContext.
 *
 * @returns {JSX.Element} The ViewerOptionsTabContainer component.
 */
function ViewerOptionsTabContainer() {
  const {
    title,
    zoom,
    setZoom,
    worldWidth,
    setWorldWidth,
    worldHeight,
    setWorldHeight,
    brushSize,
    setBrushSize,
    continuousPlay,
    setContinuousPlay,
    setPause,
  } = useContext(P5PropertiesContext);

  return (
    <Box sx={{ width: "100%" }}>
      <InputSlider
        label="Zoom"
        minValue={0.1}
        maxValue={100}
        stepValue={1}
        value={zoom}
        setValue={setZoom}
      />
      <InputSlider
        label="World Width"
        minValue={1}
        maxValue={5000}
        stepValue={1}
        value={worldWidth}
        setValue={setWorldWidth}
      />
      <InputSlider
        label="World Height"
        minValue={1}
        maxValue={5000}
        stepValue={1}
        value={worldHeight}
        setValue={setWorldHeight}
      />
      <InputSlider
        label="Brush Size"
        minValue={2}
        maxValue={5000}
        stepValue={1}
        value={brushSize}
        setValue={setBrushSize}
      ></InputSlider>

      <FormGroup>
        <FormControlLabel
          checked={continuousPlay}
          onChange={(event) => {
            setContinuousPlay(event.target.checked);
            setPause(0);
          }}
          control={<Checkbox />}
          label="Continuous Play"
        />
      </FormGroup>

      <Button
        variant="contained"
        onClick={() => {
          cellularAutomataSketch.exportStateToPNG(title);
        }}
      >
        EXPORT
      </Button>
    </Box>
  );
}

export default ViewerOptionsTabContainer;
