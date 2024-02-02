/**
 * @file ButtonPanel.jsx renders the side panel of buttons.
 * It is a styled container for children components of buttons.
 * @author Kevin Schultz
 * @project Emergent Playground
 */

import { useState } from 'react';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import BrushIcon from '@mui/icons-material/Brush';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleIcon from '@mui/icons-material/RadioButtonUnchecked';

function IconBrushButton({ sketch, icon, brush, setBrush }) {
    function handleOnClick() {
        sketch.brush = icon;
        setBrush(icon);
    }

    return (
        <IconButton
            sx={{ color: icon === brush ? 'yellow' : 'white' }}
            variant="contained"
            onClick={handleOnClick}
        >
            {icon === 'line' ? (
                <BrushIcon />
            ) : icon === 'circle' ? (
                <CircleIcon />
            ) : (
                <CropSquareIcon />
            )}
        </IconButton>
    );
}

/**
 * ButtonPanel is a functional component that wraps its children with a styled div and Paper component.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.className - The CSS class to apply to the outer div.
 * @param {ReactNode} props.children - The child components to be rendered inside the Paper component.
 *
 * @returns {ReactElement} The ButtonPanel component.
 */
function ButtonPanel({ className, sketch }) {
    const [brush, setBrush] = useState('line');

    return (
        <div className={className} style={{ display: 'inline-block' }}>
            <Paper
                elevation={3}
                sx={{
                    background: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    marginLeft: '10px',
                    marginTop: '10px',
                    backgroundColor: 'rgba(20, 20, 20, 0.2)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <IconBrushButton
                    sketch={sketch}
                    icon="line"
                    brush={brush}
                    setBrush={setBrush}
                />
                <IconBrushButton
                    sketch={sketch}
                    icon="square"
                    brush={brush}
                    setBrush={setBrush}
                />
                <IconBrushButton
                    sketch={sketch}
                    icon="circle"
                    brush={brush}
                    setBrush={setBrush}
                />
            </Paper>
        </div>
    );
}

// This is a type check for the props of the component
ButtonPanel.propTypes = {
    className: PropTypes.string, // needed for styling purposes with material ui
    children: PropTypes.element.isRequired,
};

export default ButtonPanel;
