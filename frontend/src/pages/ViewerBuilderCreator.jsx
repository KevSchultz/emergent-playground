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
import UserInterfaceLayer from '../components/UserInterfaceLayer';
import NavBar from '../components/NavBar';
import ButtonPanel from '../components/ButtonPanel';
import OptionsDrawer from '../components/OptionsDrawer';

// Sketch imports (P5.js)
import twoInTwo from '../sketches/twoInTwo';
import cameraGameOfLife from '../sketches/cameraGameOfLife';
import oneInOneSketch from '../sketches/oneInOneSketch';

// Material UI imports
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';

const sketches = [twoInTwo, cameraGameOfLife, oneInOneSketch];

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
