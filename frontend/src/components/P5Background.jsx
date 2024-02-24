/**
 * @project Emergent Playground
 * @file P5Background.jsx
 * @overview A component for rendering the P5.js background. 
 * @authors Kevin Schultz
 * @exports P5Background
 */

// React Imports
import { useContext } from 'react';
// Material UI Imports
import Box from '@mui/material/Box';

// Other Imports
import { ReactP5Wrapper } from '@p5-wrapper/react';
import P5PropertiesContext from './P5PropertiesContext';
import PropTypes from 'prop-types';

/**
 * A component for rendering the P5.js background.
 *
 * This component uses the P5PropertiesContext to get and set various properties related to the P5.js sketch.
 * These properties include the world dimensions, camera position, zoom level, brush type and size, shaders, pause state, and code.
 * The component renders a Box that contains a ReactP5Wrapper.
 * The ReactP5Wrapper is passed the cellular automata sketch and all the properties from the P5PropertiesContext.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Object} props.cellularAutomataSketch - The cellular automata sketch.
 * 
 * @returns {JSX.Element} The P5Background component.
 */
function P5Background({ cellularAutomataSketch }) {
    const {
        // State variables
        worldWidth,
        worldHeight,
        cameraX,
        cameraY,
        cameraZ,
        scaleOffset,
        zoom,
        minZoom,
        maxZoom,
        zoomSensitivity,
        panSensitivity,
        brushType,
        brushSize,
        previousMouseX,
        previousMouseY,
        vertexShader,
        fragmentShader,
        pause,
        code,
        // Setters
        setWorldWidth,
        setWorldHeight,
        setCameraX,
        setCameraY,
        setCameraZ,
        setScaleOffset,
        setZoom,
        setMinZoom,
        setMaxZoom,
        setZoomSensitivity,
        setPanSensitivity,
        setBrushType,
        setBrushSize,
        setPreviousMouseX,
        setPreviousMouseY,
        setVertexShader,
        setFragmentShader,
        setPause,
        setCode,
    } = useContext(P5PropertiesContext);

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '-1',
            }}
        >
            <ReactP5Wrapper
                sketch={cellularAutomataSketch.reactP5WrapperToClassInterface}
                worldWidth={worldWidth}
                worldHeight={worldHeight}
                cameraX={cameraX}
                cameraY={cameraY}
                cameraZ={cameraZ}
                scaleOffset={scaleOffset}
                zoom={zoom}
                minZoom={minZoom}
                maxZoom={maxZoom}
                zoomSensitivity={zoomSensitivity}
                panSensitivity={panSensitivity}
                brushType={brushType}
                brushSize={brushSize}
                previousMouseX={previousMouseX}
                previousMouseY={previousMouseY}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                pause={pause}
                code={code}
                setWorldWidth={setWorldWidth}
                setWorldHeight={setWorldHeight}
                setCameraX={setCameraX}
                setCameraY={setCameraY}
                setCameraZ={setCameraZ}
                setScaleOffset={setScaleOffset}
                setZoom={setZoom}
                setMinZoom={setMinZoom}
                setMaxZoom={setMaxZoom}
                setZoomSensitivity={setZoomSensitivity}
                setPanSensitivity={setPanSensitivity}
                setBrushType={setBrushType}
                setBrushSize={setBrushSize}
                setPreviousMouseX={setPreviousMouseX}
                setPreviousMouseY={setPreviousMouseY}
                setVertexShader={setVertexShader}
                setFragmentShader={setFragmentShader}
                setPause={setPause}
                setCode={setCode}
            ></ReactP5Wrapper>
        </Box>
    );
}

P5Background.propTypes = {
    cellularAutomataSketch: PropTypes.object.isRequired,
};

export default P5Background;
