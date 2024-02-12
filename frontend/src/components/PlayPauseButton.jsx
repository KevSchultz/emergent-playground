import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

function PlayPauseButton({pause, setPause}) {
    const handleButtonClick = () => {

        if (pause == 1) {
            setPause(0);
        } else {
            setPause(1);
        }
    };

    return (
        <IconButton style={{width: '50px', height: '50px'}} onClick={handleButtonClick} aria-label="play/pause">
            {pause === 0 ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
    );
}

export default PlayPauseButton;
