/**
 * @file ViewerOptionsTabContainer.jsx
 * @overview This file contains the container component for the viewer options tab.
 * @project Emergent Playground
 * @authors Beckett Avary, Kevin Schultz
 * @exports ViewerOptionsTabContainer
 */

// Material UI Imports
import Box from '@mui/material/Box';

// Custom Component Imports
import InputSlider from './InputSlider';

// Other Imports
import PropTypes from 'prop-types';

/**
 * @component
 *
 * @returns
 */
function ViewerOptionsTabContainer({
    zoom,
    worldWidth,
    brushSize,
    setZoom,
    setWorldWidth,
    setBrushSize,
}) {
    return (
        <Box sx={{ width: '100%' }}>
            <InputSlider
                label="Zoom"
                min={0}
                max={100}
                stepValue={1}
                value={zoom}
                setValue={setZoom}
            />
            <InputSlider
                label="World Width"
                min={0}
                max={100}
                stepValue={1}
                value={worldWidth}
                setValue={setWorldWidth}
            />
            <InputSlider
                label="Brush Size"
                min={1}
                max={500}
                stepValue={1}
                value={brushSize}
                setValue={setBrushSize}
            ></InputSlider>
        </Box>
    );
}

ViewerOptionsTabContainer.propTypes = {
    zoom: PropTypes.number.isRequired,
    worldWidth: PropTypes.number.isRequired,
    brushSize: PropTypes.number.isRequired,
    setZoom: PropTypes.func.isRequired,
    setWorldWidth: PropTypes.func.isRequired,
    setBrushSize: PropTypes.func.isRequired,
};

export default ViewerOptionsTabContainer;
