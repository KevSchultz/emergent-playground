/**
 * @file ViewerBuilderCreator.jsx is the container component for the main editor integrated development environment page.
 * This page is where the real magic happens. It includes the P5 canvas, the code editor, and user interface.
 * @author Kevin Schultz
 * @project Emergent Playground
 */

// React import
import React from 'react';

// Custom component imports
import P5Wrapper from '../components/P5Wrapper';
// import BackgroundLayer from '../components/BackgroundLayer';
import UserInterfaceLayer from '../components/UserInterfaceLayer';
import NavBar from '../components/NavBar';
import ButtonPanel from '../components/ButtonPanel';
import OptionsDrawer from '../components/OptionsDrawer';

// Sketch imports (P5.js)
// import gameOfLifeSketch from '../sketches/gameOfLife';
// import bufferScalingSketch from '../sketches/bufferScalingSketch';
// import gradientsMovingSketch from '../sketches/gradientsMovingSketch';
// import ballMovingSketch from '../sketches/ballMovingSketch';
// import particleSketch from '../sketches/particleSketch';
// import oneInOneSketch from '../sketches/oneInOneSketch';
// import randomColorsSketch from '../sketches/randomColorsSketch';
// import gameOfLifeSketchZoomTmp from '../sketches/gameOfLifeSketchZoomTmp';
import twoInTwo from '../sketches/twoInTwo';
import cameraGameOfLife from '../sketches/cameraGameOfLife';

// Material UI imports
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';

const sketches = [twoInTwo, cameraGameOfLife];

/**
 * @component
 * @returns {ReactElement} A container component that renders the main editor page.
 */
function ViewerBuilderCreator() {
    const [sketchIndex, setSketchIndex] = React.useState(0);

    function handleClick() {
        setSketchIndex((sketchIndex + 1) % sketches.length);
    }

    return (
        <>
            <UserInterfaceLayer>
                <P5Wrapper
                    sketch={sketches[sketchIndex]}
                    style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        zIndex: '-1',
                    }}
                />
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <NavBar>
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                            >
                                Emergent Playground
                            </Typography>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleClick}
                            >
                                Change Sketch
                            </Button>
                        </NavBar>
                    </Grid>
                    <Grid item xs={1}>
                        <ButtonPanel
                            sketch={sketches[sketchIndex]}
                        ></ButtonPanel>
                    </Grid>
                    <Grid item xs={11}>
                        <Box
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}
                        >
                            <OptionsDrawer />
                        </Box>
                    </Grid>
                </Grid>
            </UserInterfaceLayer>
        </>
    );
}

export default ViewerBuilderCreator;
