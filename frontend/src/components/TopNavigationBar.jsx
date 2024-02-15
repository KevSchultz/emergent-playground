/**
 * @file NavBar.jsx renders the top bar.
 * @author Kevin Schultz
 * @project Emergent Playground
 */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';

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
function NavBar() {
    return (
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '5vh',
                overflow: 'hidden',
                padding: '1vw',
                boxSizing: 'border-box',
                borderBottom: '2px solid rgb(0, 118, 236, 0.5)',
            }}
        >
            <Typography>EMERGENT PLAYGROUND</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '19vw',
                    gap: '1vw',
                    justifyContent: 'flex-end',
                }}
            >
                <Button
                    sx={{ height: '4vh', fontSize: 'calc(min(1.5vw, 1.5vh))' }}
                    variant="contained"
                >
                    Community
                </Button>
                <Avatar sx={{ height: '4vh', width: '4vh' }}>K</Avatar>
            </Box>
        </Paper>
    );
}

// This is a type check for the props of the component
NavBar.propTypes = {};

export default NavBar;
