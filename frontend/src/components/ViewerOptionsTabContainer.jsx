/**
 * @file ViewerOptionsTabContainer.jsx
 * @overview This file contains the container component for the viewer options tab.
 * @project Emergent Playground
 * @authors Beckett Avary, Kevin Schultz
 * @exports ViewerOptionsTabContainer
 */

// React Imports
import { useContext } from 'react';

// Material UI Imports
import Box from '@mui/material/Box';

// Custom Component Imports
import InputSlider from './InputSlider';
import P5PropertiesContext from './P5PropertiesContext';

/**
 * @component
 *
 * @returns
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
