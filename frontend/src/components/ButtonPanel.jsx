/**
 * @file ButtonPanel.jsx renders the side panel of buttons.
 * It is a styled container for children components of buttons.
 * @author Kevin Schultz
 * @project Emergent Playground
 */

import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

/**
 * ButtonPanel is a functional component that wraps its children with a styled div and Paper component.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.className - The CSS class to apply to the outer div.
 * @param {ReactNode} props.children - The child components to be rendered inside the Paper component.
 * 
 * @returns {ReactElement} The ButtonPanel component.
 */
function ButtonPanel({ className, children }) {
    return (
        <div className={className} style={{ display: 'inline-block' }}>
            <Paper
                elevation={3}
                sx={{
                    background: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                {children}
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
