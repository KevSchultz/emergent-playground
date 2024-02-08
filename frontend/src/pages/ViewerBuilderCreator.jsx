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
// import NavBar from '../components/NavBar';
// import ButtonPanel from '../components/ButtonPanel';
// import OptionsDrawer from '../components/OptionsDrawer';
// import { ZoomProvider } from '../components/ZoomContext';

// P5.js imports
import { ReactP5Wrapper } from '@p5-wrapper/react';
import twoInTwoSketch from '../sketches/twoInTwoSketch';
import defaultSketchAttributes from '../sketches/sketchAttributes';

// Material UI imports
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';

/**
 * @component
 * @returns {ReactElement} A container component that renders the main editor page.
 */
function ViewerBuilderCreator() {
    const [sketchAttributes, setSketchAttributes] = useState(
        defaultSketchAttributes
    );

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
                    sketchAttributes={sketchAttributes}
                    setSketchAttributes={setSketchAttributes}
                ></ReactP5Wrapper>
            </Box>
        </>
    );
}

export default ViewerBuilderCreator;
