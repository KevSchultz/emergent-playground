import React from 'react';

// Material UI Imports
import Box from '@mui/material/Box';

// Other Imports
import {ReactP5Wrapper} from '@p5-wrapper/react';
import P5PropertiesContext from './P5PropertiesContext';
import PropTypes from 'prop-types';

function P5Background({cellularAutomataSketch}) {

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
    } = React.useContext(P5PropertiesContext);

    return (
            <Box
                sx={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    zIndex: '0',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
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
