/**
 * @file ButtonPanel.jsx renders the side panel of buttons.
 * It is a styled container for children components of buttons.
 * @authors Alex Garza, Kevin Schultz
 * @project Emergent Playground
 */

// Material UI Imports
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

// Custom Component Imports
import BrushIconButton from './BrushIconButton';
import DefaultProperties from '../sketches/DefaultProperties';
import PlayPauseButton from './PlayPauseButton';

/**
 * ButtonPanel is a functional component that wraps its children with a styled div and Paper component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.className - The CSS class to apply to the outer div.
 * @param {ReactNode} props.children - The child components to be rendered inside the Paper component.
 *
 * @returns {ReactElement} The ButtonPanel component.
 */
function LeftButtonListContainer({ className, brushType, setBrushType, pause, setPause}) {
    const defaultListBrushTypes = DefaultProperties.listBrushTypes;

    return (
        <Paper
            className={className}
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                height: '95vh',
                boxSizing: 'border-box',
                paddingLeft: '1vw',
                paddingRight: '1vw',
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

                <PlayPauseButton pause={pause} setPause={setPause}/>

                {/* Create the button list from all the types */}
                {defaultListBrushTypes.map((buttonBrushType) => (
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

// This is a type check for the props of the component
LeftButtonListContainer.propTypes = {
    className: PropTypes.string, // needed for styling purposes with material ui
    brushType: PropTypes.string.isRequired,
    setBrushType: PropTypes.func.isRequired,
};

export default LeftButtonListContainer;
