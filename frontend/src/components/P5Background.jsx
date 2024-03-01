/**
 * @project Emergent Playground
 * @file P5Background.jsx
 * @overview A component for rendering the P5.js background.
 * @authors Kevin Schultz
 * @exports P5Background
 */

// React Imports
import {useContext} from 'react';
// Material UI Imports
import Box from '@mui/material/Box';

// Other Imports
import { ReactP5Wrapper } from '@p5-wrapper/react';
import P5PropertiesContext from './P5PropertiesContext';
import { sketch } from './DefaultProperties';

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
function P5Background() {
    const p5Properties = useContext(P5PropertiesContext);

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ReactP5Wrapper
                sketch={sketch.reactP5WrapperToClassInterface}
                {...p5Properties}
            ></ReactP5Wrapper>
        </Box>
    );
}

export default P5Background;
