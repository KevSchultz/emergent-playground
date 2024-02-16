/**
 * @file ViewerBuilderCreator.jsx is the container component for the main editor integrated development environment page.
 * This page is where the real magic happens. It includes the P5 canvas, the code editor, and user interface.
 * @author Beckett Avary, Kevin Schultz
 * @project Emergent Playground
 */

// React import
import { useState } from 'react';

// Custom component imports
import TopNavigationBar from '../components/TopNavigationBar';
import LeftButtonListContainer from '../components/LeftButtonListContainer';
import RightOptionsRootContainer from '../components/RightOptionsRootContainer';

// P5.js imports
import { ReactP5Wrapper } from '@p5-wrapper/react';
import cellularAutomataSketch from '../sketches/cellularAutomataSketch';
import DefaultProperties from '../sketches/DefaultProperties';

// Resizable Panel Imports
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// Material UI imports
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';

/**
 * @component
 * @returns {ReactElement} A container component that renders the main editor page.
 */
function ViewerBuilderCreator() {
    const [worldWidth, setWorldWith] = useState(DefaultProperties.worldWidth);
    const [worldHeight, setWorldHeight] = useState(DefaultProperties.worldHeight);
    const [cameraX, setCameraX] = useState(DefaultProperties.cameraX);
    const [cameraY, setCameraY] = useState(DefaultProperties.cameraY);
    const [cameraZ, setCameraZ] = useState(DefaultProperties.cameraZ);
    const [scaleOffset, setScaleOffset] = useState(DefaultProperties.scaleOffset);
    const [zoom, setZoom] = useState(DefaultProperties.zoom);
    const [minZoom, setMinZoom] = useState(DefaultProperties.minZoom);
    const [maxZoom, setMaxZoom] = useState(DefaultProperties.maxZoom);
    const [zoomSensitivity, setZoomSensitivity] = useState(DefaultProperties.zoomSensitivity);
    const [panSensitivity, setPanSensitivity] = useState(DefaultProperties.panSensitivity);
    const [brushType, setBrushType] = useState(DefaultProperties.brushType);
    const [brushSize, setBrushSize] = useState(DefaultProperties.brushSize);
    const [previousMouseX, setPreviousMouseX] = useState(DefaultProperties.previousMouseX);
    const [previousMouseY, setPreviousMouseY] = useState(DefaultProperties.previousMouseY);
    const [vertexShader, setVertexShader] = useState(DefaultProperties.vertexShader);
    const [fragmentShader, setFragmentShader] = useState(DefaultProperties.fragmentShader);
    const [pause, setPause] = useState(DefaultProperties.pause);
    const [code, setCode] = useState(DefaultProperties.code); // for shader lang

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
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ReactP5Wrapper
                    sketch={cellularAutomataSketch}
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
                    setCode={setCode}
                ></ReactP5Wrapper>
            </Box>
            {/* <Grid
                container
                sx={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100vw',
                }}
            >
                <Grid item xs={12} md={12}>
                    <TopNavigationBar />
                </Grid>
                <Grid item xs={1}>
                    <LeftButtonListContainer
                        brushType={brushType}
                        setBrushType={setBrushType}
                        pause={pause}
                        setPause={setPause}
                    ></LeftButtonListContainer>
                </Grid>
                <Grid item xs={11}>
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <RightOptionsRootContainer
                            zoom={zoom}
                            setZoom={setZoom}
                            worldWidth={worldWidth}
                            setWorldWidth={setWorldWith}
                            brushSize={brushSize}
                            setBrushSize={setBrushSize}
                            code={code}
                            setCode={setCode}
                        />
                    </Box>
                </Grid>
            </Grid> */}

            <TopNavigationBar />
            <PanelGroup direction="horizontal">
                <div>
                    <LeftButtonListContainer
                        brushType={brushType}
                        setBrushType={setBrushType}
                        pause={pause}
                        setPause={setPause}
                    ></LeftButtonListContainer>
                </div>
                <Panel>
                </Panel>
                <PanelResizeHandle />
                <Panel defaultSize={30} minSize={10}>
                    <RightOptionsRootContainer
                        zoom={zoom}
                        setZoom={setZoom}
                        worldWidth={worldWidth}
                        setWorldWidth={setWorldWith}
                        brushSize={brushSize}
                        setBrushSize={setBrushSize}
                        code={code}
                        setCode={setCode}
                    />
                </Panel>
                <PanelResizeHandle />
            </PanelGroup>
        </>
    );
}

export default ViewerBuilderCreator;
