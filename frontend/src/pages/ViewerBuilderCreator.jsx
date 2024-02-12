/**
 * @file ViewerBuilderCreator.jsx is the container component for the main editor integrated development environment page.
 * This page is where the real magic happens. It includes the P5 canvas, the code editor, and user interface.
 * @author Kevin Schultz
 * @project Emergent Playground
 */

// React import
import { useState } from 'react';

// Custom component imports
// import UserInterfaceLayer from '../components/UserInterfaceLayer';
import NavBar from '../components/NavBar';
import ButtonPanel from '../components/ButtonPanel';
import OptionsDrawer from '../components/OptionsDrawer';
// import { ZoomProvider } from '../components/ZoomContext';

// P5.js imports
import { ReactP5Wrapper } from '@p5-wrapper/react';
import twoInTwoSketch from '../sketches/twoInTwoSketch';
import defaultSketchAttributes from '../sketches/defaultSketchAttributes';

// Material UI imports
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';

/**
 * @component
 * @returns {ReactElement} A container component that renders the main editor page.
 */
function ViewerBuilderCreator() {
    const [worldWidth, setWorldWith] = useState(
        defaultSketchAttributes.worldWidth
    );
    const [worldHeight, setWorldHeight] = useState(
        defaultSketchAttributes.worldHeight
    );
    const [cameraX, setCameraX] = useState(defaultSketchAttributes.cameraX);
    const [cameraY, setCameraY] = useState(defaultSketchAttributes.cameraY);
    const [cameraZ, setCameraZ] = useState(defaultSketchAttributes.cameraZ);
    const [scaleOffset, setScaleOffset] = useState(defaultSketchAttributes.scaleOffset);
    const [zoom, setZoom] = useState(defaultSketchAttributes.zoom);
    const [minZoom, setMinZoom] = useState(defaultSketchAttributes.minZoom);
    const [maxZoom, setMaxZoom] = useState(defaultSketchAttributes.maxZoom);
    const [zoomSensitivity, setZoomSensitivity] = useState(
        defaultSketchAttributes.zoomSensitivity
    );
    const [panSensitivity, setPanSensitivity] = useState(
        defaultSketchAttributes.panSensitivity
    );
    const [brushType, setBrushType] = useState(
        defaultSketchAttributes.brushType
    );
    const [brushSize, setBrushSize] = useState(
        defaultSketchAttributes.brushSize
    );
    const [previousMouseX, setPreviousMouseX] = useState(
        defaultSketchAttributes.previousMouseX
    );
    const [previousMouseY, setPreviousMouseY] = useState(
        defaultSketchAttributes.previousMouseY
    );
    const [vertexShader, setVertexShader] = useState(
        defaultSketchAttributes.vertexShader
    );
    const [fragmentShader, setFragmentShader] = useState(
        defaultSketchAttributes.fragmentShader
    );
    const [pause, setPause] = useState(defaultSketchAttributes.pause);

    return (
        <>
            <Box
                sx={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    zIndex: '0',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                <ReactP5Wrapper
                    sketch={twoInTwoSketch}
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
                    setWorldWidth={setWorldWith}
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
                ></ReactP5Wrapper>
            </Box>
            <Grid
                container
                sx={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100vw',
                }}
            >
                <Grid item xs={12} md={12}>
                    <NavBar />
                </Grid>
                <Grid item xs={1}>
                    <ButtonPanel sketch={twoInTwoSketch}></ButtonPanel>
                </Grid>
                <Grid item xs={11}>
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <OptionsDrawer
                            sketch={twoInTwoSketch}
                            zoom={zoom}
                            setZoom={setZoom}
                            worldWidth={worldWidth}
                            setWorldWidth={setWorldWith}
                            pause={pause}
                            setPause={setPause}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default ViewerBuilderCreator;
