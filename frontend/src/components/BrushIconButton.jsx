/**
 * @file BrushIconButton.jsx
 * @overview This component is a button that changes the brush type in the editor.
 * @project Emergent Playground
 * @authors Kevin Schultz, Preston Nguyen
 */

// Material UI Imports
import IconButton from '@mui/material/IconButton';

// Other imports
import PropTypes from 'prop-types';
import DefaultProperties from './DefaultProperties';

/**
 * @component
 * @param {Object} props
 * @returns {ReactElement} A button that changes the brush type in the editor.
 */
function BrushIconButton({ buttonBrushType, currentBrushType, setCurrentBrushType }) {

    const brushIcons = DefaultProperties.brushIcons;

    // Get the color of the button based on the current brush type
    function getColor() {
        if (buttonBrushType === currentBrushType) {
            return DefaultProperties.selectedBrushIconColor;
        } else {
            return DefaultProperties.deselectedBrushIconColor;
        }
    }

    // Handle the button click to change the brush type
    function handleOnClick() {
        setCurrentBrushType(buttonBrushType);
    }

    return (
        <IconButton
            sx={{ color: getColor() }}
            variant="contained"
            onClick={handleOnClick}
        >
            {brushIcons[buttonBrushType]}
        </IconButton>
    );
}

BrushIconButton.propTypes = {
    buttonBrushType: PropTypes.string.isRequired,
    currentBrushType: PropTypes.string.isRequired,
    setCurrentBrushType: PropTypes.func.isRequired,
};

export default BrushIconButton;
