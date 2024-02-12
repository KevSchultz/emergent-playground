/**
 * @file UserInterfaceLayer.jsx is a box that renders UI elements of the page in the foreground meant to contain material ui stuff.
 * @author Kevin Schultz
 * @project Emergent Playground
 */

import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

/**
 * UserInterfaceLayer is a functional component that wraps its children with a styled Box component.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.className - The CSS class to apply to the Box component.
 * @param {ReactNode} props.children - The child components to be rendered inside the Box component.
 * 
 * @returns {ReactElement} The UserInterfaceLayer component.
 */
function UserInterfaceLayer({ className, children}) {
    return (
        <Box
            className={className}
            sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: '0',
                left: '0',
                zIndex: '1',
            }}
        >
            {children}
        </Box>
    );
}

// This is a type check for the props of the component
UserInterfaceLayer.propTypes = {
    className: PropTypes.string, // needed for styling purposes with material ui
    children: PropTypes.element.isRequired,
};

export default UserInterfaceLayer;
