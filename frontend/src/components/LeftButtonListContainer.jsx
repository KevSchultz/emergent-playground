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

import {
    FormControl,
    MenuItem,
    Paper,
    Select,
    Popover,
} from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import { Brightness1 } from '@mui/icons-material';

import Fab from '@mui/material/Fab';

// Custom Component Imports
import BrushIconButton from './BrushIconButton';
import PlayPauseButton from './PlayPauseButton';
import P5PropertiesContext from './P5PropertiesContext';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

import Draggable from 'react-draggable';

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
        listBrushTypes,
        cursorStyles,
        langTupleList,
        currentDrawColor,
        setCurrentDrawColor,
        cameraX,
        cameraY,
        worldWidth,
        worldHeight,
        zoom,
        fullscreen,
        setFullscreen,
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

    // Set the cursor to the current brush type when the brush type changes
    useEffect(() => {
        document.body.style.cursor = cursorStyles[brushType];
    }, [brushType, cursorStyles]);

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
            <Draggable>
                <Paper
                    sx={{
                        position: 'fixed',
                        top: `calc(50% - ${cameraY}px)`,
                        right: `calc(75% + ${cameraX}px)`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px',
                        boxSizing: 'border-box',
                        border: '2px solid rgb(0, 118, 236, 0.5)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <Fab color="primary" aria-label="add">
                        <PlayPauseButton pause={pause} setPause={setPause} />
                    </Fab>
                    <Fab color="primary" aria-label="edit" onClick={handleClickOpen}>
                        <BrushIcon />
                    </Fab>
                    <Fab color="primary" aria-label="fullscreen" onClick={handleFullScreen}>
                        {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                    </Fab>

                    {/* Create the button list from all the types */}
                    {/* {listBrushTypes.map((buttonBrushType) => (
                    <BrushIconButton
                        key={buttonBrushType}
                        buttonBrushType={buttonBrushType}
                        currentBrushType={brushType}
                        setCurrentBrushType={setBrushType}
                    />
                ))} */}
                    {/* <FormControl fullWidth>
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
            </FormControl> */}
                </Paper>
            </Draggable>

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
                    {/* Create the button list from all the types */}
                    {listBrushTypes.map((buttonBrushType) => (
                        <BrushIconButton
                            key={buttonBrushType}
                            buttonBrushType={buttonBrushType}
                            currentBrushType={brushType}
                            setCurrentBrushType={setBrushType}
                        />
                    ))}
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
                    {/* <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose} style={{ marginLeft: '10px' }}>
                            Save
                        </Button>
                    </Box> */}
                </Paper>
            </Popover>
        </>
    );
}

export default LeftButtonListContainer;
