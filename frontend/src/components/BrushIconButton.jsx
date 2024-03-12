/**
 * @project Emergent Playground
 * @file BrushIconButton.jsx
 * @overview This component is a button that changes the brush type in the editor.
 * @authors Kevin Schultz, Preston Nguyen
 * @exports BrushIconButton
 */

// Material UI Imports
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import SquareIcon from "@mui/icons-material/Square";
import CircleIcon from "@mui/icons-material/RadioButtonUnchecked";

// Other imports
import PropTypes from "prop-types";

/**
 * @description A button component for selecting a brush type.
 * This component displays an icon button with a brush icon.
 * The color of the icon changes based on whether the brush type of the button matches the current brush type.
 * When the button is clicked, the current brush type is updated to the brush type of the button.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.buttonBrushType - The brush type of the button.
 * @param {string} props.currentBrushType - The current brush type.
 * @param {Function} props.setCurrentBrushType - The function to update the current brush type.
 *
 * @returns {JSX.Element} The BrushIconButton component.
 */
function BrushIconButton({
  buttonBrushType,
  currentBrushType,
  setCurrentBrushType,
}) {
  // Get the color of the button based on the current brush type
  function getColor() {
    if (buttonBrushType === currentBrushType) {
      return "yellow";
    } else {
      return "white";
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
      {buttonBrushType === "pixel" ? (
        <EditIcon />
      ) : buttonBrushType === "square" ? (
        <SquareIcon />
      ) : (
        <CircleIcon />
      )}
    </IconButton>
  );
}

BrushIconButton.propTypes = {
  buttonBrushType: PropTypes.string.isRequired,
  currentBrushType: PropTypes.string.isRequired,
  setCurrentBrushType: PropTypes.func.isRequired,
};

export default BrushIconButton;
