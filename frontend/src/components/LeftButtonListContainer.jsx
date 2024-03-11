/**
 * @project Emergent Playground
 * @file ButtonPanel.jsx
 * @overview Renders the side panel of buttons.
 * @authors Alex Garza, Kevin Schultz
 * @exports LeftButtonListContainer
 */

// React Imports
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';

// Material UI Imports
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Popover from '@mui/material/Popover';
import Brightness1 from '@mui/icons-material/Brightness1';
import Brush from '@mui/icons-material/Brush';
import FormatColorFill from '@mui/icons-material/FormatColorFill';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';

// Custom Component Imports
import BrushIconButton from './BrushIconButton';
import PlayPauseButton from './PlayPauseButton';
import P5PropertiesContext from './P5PropertiesContext';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

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
    const {
        brushType,
        setBrushType,
        pause,
        setPause,
        langTupleList,
        currentDrawColor,
        setCurrentDrawColor,
        fullscreen,
        setFullscreen,
        setBackgroundColor
    } = useContext(P5PropertiesContext);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        function handleFullScreenChange() {
            setFullscreen(!!document.fullscreenElement);
        }

        document.addEventListener('fullscreenchange', handleFullScreenChange);

        // Clean up event listener on component unmount
        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    });

    const handleFullScreen = () => {
        if (!document.fullscreenElement) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                /* Firefox */
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                /* Chrome, Safari and Opera */
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                /* IE/Edge */
                document.documentElement.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                /* IE/Edge */
                document.msExitFullscreen();
            }
        }
        setFullscreen(!fullscreen);
    };

    return (
        <>
            <Box
                sx={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: '100vh', // or the height of the parent container
                    pointerEvents: 'none', // allow clicks to go "through" the Box
                }}
            >
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px',
                        boxSizing: 'border-box',
                        border: '2px solid rgb(0, 118, 236, 0.5)',
                        pointerEvents: 'auto', // make the Paper and its contents respond to pointer events
                    }}
                >
                    <PlayPauseButton pause={pause} setPause={setPause} />
                    <Fab color="primary" aria-label="edit" onClick={handleClickOpen}>
                        <Brush/>
                    </Fab>
                    <Fab color="primary" aria-label="fullscreen" onClick={handleFullScreen}>
                        {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                    </Fab>
                </Paper>
            </Box>

            <Popover
                elevation={0}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                style={{ transform: 'translate(36px, 0px)' }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '20px',
                        boxSizing: 'border-box',
                        border: '2px solid rgb(0, 118, 236, 0.5)',
                    }}
                >

                    <BrushIconButton
                        buttonBrushType="pixel"
                        currentBrushType={brushType}
                        setCurrentBrushType={setBrushType}
                    />
                    <BrushIconButton
                        buttonBrushType="square"
                        currentBrushType={brushType}
                        setCurrentBrushType={setBrushType}
                    />
                    <BrushIconButton
                        buttonBrushType="circle"
                        currentBrushType={brushType}
                        setCurrentBrushType={setBrushType}
                    />
                    <IconButton
                        onClick={() => {
                            setBackgroundColor(currentDrawColor);
                        }}
                    >
                        <FormatColorFill/>
                    </IconButton>
                    <FormControl fullWidth>
                        <Select
                            value={currentDrawColor}
                            onChange={(e) => {
                                setCurrentDrawColor(e.target.value);
                            }}
                            variant="standard"
                        >
                            {langTupleList.map((s, index) => (
                                <MenuItem key={index} value={s.color}>
                                    <Brightness1 sx={{ color: s.color }} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Paper>
            </Popover>
        </>
    );
}

export default LeftButtonListContainer;
