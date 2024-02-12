/**
 * @file Lang.jsx is the component for shader-lang compilation. It inherits
 * heavily from LangPage.jsx
 * @author Beckett Avary, Kevin Schultz
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
import twoInTwo from '../sketches/twoInTwoSketch';
import oneInOneSketch from '../sketches/oneInOneSketch';

// Material UI imports
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';


// testing imports
import Stack from '@mui/material/Stack';

const sketches = [twoInTwo, oneInOneSketch];

/**
 * @component
 * @returns {ReactElement} A container component that renders the main editor page.
 */
function LangPage() {
    const [sketchIndex, setSketchIndex] = React.useState(0);

    const [code, setCode] = React.useState(0);

    function handleChangeSketch() {
        setSketchIndex((sketchIndex + 1) % sketches.length);
    }

    function handleCompile() {
        alert(code);
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
                                onClick={handleCompile}
                            >
                                Compile
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleChangeSketch}
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
                            <OptionsDrawer code={code} setCode={(val) => setCode(val)}/>
                        </Box>
                    </Grid>
                </Grid>
            </UserInterfaceLayer>
        </>
    );
}

export default LangPage;

