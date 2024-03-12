/**
 * @project Emergent Playground
 * @file PlayPauseButton.jsx
 * @overview Button to play or pause the cellular automata sketch.
 * @authors Alex Garza, Kevin Schultz
 * @exports PlayPauseButton
 */

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import PropTypes from "prop-types";
import Fab from "@mui/material/Fab";

/**
 * A button component for controlling the pause state.
 *
 * This component displays an IconButton with either a PlayArrowIcon or a PauseIcon, depending on the current pause state.
 * When the button is clicked, the pause state is toggled.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.pause - The current pause state. 0 for play, 1 for pause.
 * @param {Function} props.setPause - The function to update the pause state.
 *
 * @returns {JSX.Element} The PlayPauseButton component.
 */
function PlayPauseButton({ pause, setPause }) {
  const handleButtonClick = () => {
    if (pause == 1) {
      setPause(0);
    } else {
      setPause(1);
    }
  };

  return (
    <Fab color="primary" onClick={handleButtonClick} aria-label="play/pause">
      {pause === 0 ? <PauseIcon /> : <PlayArrowIcon />}
    </Fab>
  );
}

PlayPauseButton.propTypes = {
  pause: PropTypes.number.isRequired,
  setPause: PropTypes.func.isRequired,
};

export default PlayPauseButton;
