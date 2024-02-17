/**
 * @project Emergent Playground
 * @file ButtonPanel.jsx 
 * @overview Renders the side panel of buttons.
 * @authors Alex Garza, Kevin Schultz
 * @exports LeftButtonListContainer
 */

// React Imports
import { useEffect } from 'react';
import { useContext } from 'react';

// Material UI Imports
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

// Custom Component Imports
import BrushIconButton from './BrushIconButton';
import PlayPauseButton from './PlayPauseButton';
import P5PropertiesContext from './P5PropertiesContext';

/**
 * A container component for the left button list.
 *
 * This component displays a list of BrushIconButton components and a PlayPauseButton component inside a Paper component.
 * The BrushIconButton components are created for each brush type in the listBrushTypes array from the P5PropertiesContext.
 * The PlayPauseButton component is used to control the pause state.
 * When the brush type changes, the cursor style is updated to match the current brush type.
 *
 * @returns {JSX.Element} The LeftButtonListContainer component.
 */
function LeftButtonListContainer() {
    const { brushType, setBrushType, pause, setPause, listBrushTypes, cursorStyles } =
        useContext(P5PropertiesContext);

    // Set the cursor to the current brush type when the brush type changes
    useEffect(() => {
        document.body.style.cursor = cursorStyles[brushType];
    }, [brushType, cursorStyles]);

    return (
        <Paper
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                height: '95vh',
                boxSizing: 'border-box',
                paddingLeft: '1vw',
                paddingRight: '1vw',
                borderRight: '2px solid rgb(0, 118, 236, 0.5)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <PlayPauseButton pause={pause} setPause={setPause} />

                {/* Create the button list from all the types */}
                {listBrushTypes.map((buttonBrushType) => (
                    <BrushIconButton
                        key={buttonBrushType}
                        buttonBrushType={buttonBrushType}
                        currentBrushType={brushType}
                        setCurrentBrushType={setBrushType}
                    />
                ))}
            </Box>
        </Paper>
    );
}

export default LeftButtonListContainer;
