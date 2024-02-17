/**
 * @file ButtonPanel.jsx renders the side panel of buttons.
 * It is a styled container for children components of buttons.
 * @authors Alex Garza, Kevin Schultz
 * @project Emergent Playground
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
 * ButtonPanel is a functional component that wraps its children with a styled div and Paper component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.className - The CSS class to apply to the outer div.
 * @param {ReactNode} props.children - The child components to be rendered inside the Paper component.
 *
 * @returns {ReactElement} The ButtonPanel component.
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
