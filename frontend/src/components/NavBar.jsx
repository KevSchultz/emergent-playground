/**
 * @file NavBar.jsx renders the top bar. 
 * @author Kevin Schultz
 * @project Emergent Playground
 */
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';

/**
 * NavBar is a functional component that wraps its children with a Box and AppBar component.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child components to be rendered inside the AppBar component.
 * @param {function} props.onMouseEnter - The function to be called when the mouse enters the Box component.
 * @param {function} props.onMouseLeave - The function to be called when the mouse leaves the Box component.
 * 
 * @returns {ReactElement} The NavBar component.
 */
function NavBar({ children, onMouseEnter, onMouseLeave }) {
    return (
        <Box
            sx={{ flexGrow: 1 }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <AppBar
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)',
                }}
                position="static"
            >
                <Toolbar>{children}</Toolbar>
            </AppBar>
        </Box>
    );
}

// This is a type check for the props of the component
NavBar.propTypes = {
    children: PropTypes.element.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
};

export default NavBar;
