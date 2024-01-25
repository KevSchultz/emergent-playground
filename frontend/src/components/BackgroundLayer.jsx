/**
 * @file BackgroundLayer.jsx is a box that renders in the background of the page meant to contain P5 canvas.
 * @author Kevin Schultz
 * @project Emergent Playground
 */

import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

/**
 * BackgroundLayer is a React component that provides a styled container for children components.
 * It positions itself absolutely at the top left corner of its parent and has a zIndex of -1, 
 * meaning it will be drawn beneath other elements.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.className - The CSS class to apply to the Box.
 * @param {ReactNode} props.children - The child components to render inside the Box.
 * @returns {ReactElement} A Box component with specific styling and children.
 */
function BackgroundLayer({ className, children }) {
    return (
        <Box
            className={className}
            sx={{
                background: 'linear-gradient(0deg, #e66465, #9198e5)',
                backgroundSize: '200% 200%',
                animation: 'Gradient 3s ease infinite',
                position: 'absolute',
                top: '0',
                left: '0',
                zIndex: '-1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                '@keyframes Gradient': {
                    '0%': {
                        backgroundPosition: '0% 0%',
                    },
                    '50%': {
                        backgroundPosition: '0% 100%',
                    },
                    '100%': {
                        backgroundPosition: '0% 0%',
                    },
                },
            }}
        >
            {children}
        </Box>
    );
}

// This is a type check for the props of the component
BackgroundLayer.propTypes = {
    className: PropTypes.string, // needed for styling purposes with material ui
    children: PropTypes.element.isRequired,
};

export default BackgroundLayer;
