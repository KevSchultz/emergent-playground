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
import BackgroundLayer from '../components/BackgroundLayer';
import UserInterfaceLayer from '../components/UserInterfaceLayer';
import NavBar from '../components/NavBar';
import ButtonPanel from '../components/ButtonPanel';

// Sketch imports (P5.js)
import gameOfLifeSketch from '../sketches/gameOfLifeSketch';
import gradientsMovingSketch from '../sketches/gradientsMovingSketch';
import ballMovingSketch from '../sketches/ballMovingSketch';
import particleSketch from '../sketches/particleSketch';
import oneInOneSketch from '../sketches/oneInOneSketch';
import randomColorsSketch from '../sketches/randomColorsSketch';

// Material UI imports
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import BrushIcon from '@mui/icons-material/Brush';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleIcon from '@mui/icons-material/RadioButtonUnchecked';

/**
 * @component
 * @returns {ReactElement} A container component that renders the main editor page.
 */
function ViewerBuilderCreator() {
    const [sketchIndex, setSketchIndex] = React.useState(0);

    let sketches = [
        gameOfLifeSketch,
        oneInOneSketch,
        randomColorsSketch,
        gameOfLifeSketch,
        gradientsMovingSketch,
        ballMovingSketch,
        particleSketch,
    ];

    function handleClick() {
        setSketchIndex((sketchIndex + 1) % sketches.length);
    }

    function userInterfaceInFocus() {
        gameOfLifeSketch.noDraw = true;
    }

    function userInterfaceOutOfFocus() {
        gameOfLifeSketch.noDraw = false;
    }

    return (
        <>
            <UserInterfaceLayer>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <NavBar
                            onMouseEnter={userInterfaceInFocus}
                            onMouseLeave={userInterfaceOutOfFocus}
                        >
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
                    <Grid item xs="1">
                        <ButtonPanel>
                            <IconButton
                                onClick={() => {
                                    gameOfLifeSketch.brush = 'line';
                                }}
                            >
                                <BrushIcon sx={{ color: 'white' }} />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    gameOfLifeSketch.brush = 'circle';
                                }}
                            >
                                <CircleIcon sx={{ color: 'white' }} />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    gameOfLifeSketch.brush = 'square';
                                }}
                            >
                                <CropSquareIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </ButtonPanel>
                    </Grid>
                    <Grid item xs="11"></Grid>
                </Grid>
            </UserInterfaceLayer>
            <BackgroundLayer>
                <P5Wrapper sketch={sketches[sketchIndex]} />
            </BackgroundLayer>
        </>
    );
}

export default ViewerBuilderCreator;
