/**
 * @project Emergent Playground
 * @file ViewerOptionsTabContainer.jsx
 * @overview This file contains the container component for the viewer options tab.
 * @authors Beckett Avary, Kevin Schultz
 * @exports ViewerOptionsTabContainer
 */

// React Imports
import { useContext } from 'react';

// Material UI Imports
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { sketch } from './DefaultProperties';

// Custom Component Imports
import InputSlider from './InputSlider';
import P5PropertiesContext from './P5PropertiesContext';


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
        zoom,
        setZoom,
        worldWidth,
        setWorldWidth,
        worldHeight,
        setWorldHeight,
        brushSize,
        setBrushSize,
    } = useContext(P5PropertiesContext);

    return (
        <Box sx={{ width: '100%' }}>

            <Button onClick={() => sketch.saveState(sketch.previousState)}>Save</Button>


            <InputSlider
                label="Zoom"
                minValue={0}
                maxValue={100}
                stepValue={1}
                value={zoom}
                setValue={setZoom}
            />
            <InputSlider
                label="World Width"
                minValue={1}
                maxValue={6000}
                stepValue={1}
                value={worldWidth}
                setValue={setWorldWidth}
            />
            <InputSlider
                label="World Height"
                minValue={1}
                maxValue={6000}
                stepValue={1}
                value={worldHeight}
                setValue={setWorldHeight}
            />
            <InputSlider
                label="Brush Size"
                minValue={1}
                maxValue={4000}
                stepValue={1}
                value={brushSize}
                setValue={setBrushSize}
            ></InputSlider>
        </Box>
    );
}

export default ViewerOptionsTabContainer;
