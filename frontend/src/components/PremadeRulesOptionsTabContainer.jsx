/**
 * @file PremadeRulesOptionsTabContainer.jsx
 * @overview This file contains the container component for the premade rules options tab.
 * @project Emergent Playground
 * @authors Kevin Schultz
 */

// Material UI imports
import Box from '@mui/material/Box';

/**
 * @component
 * @param {Object} props
 * 
 * @returns {ReactElement} A container component that renders the premade rules options tab.
 */
function PremadeRulesOptionsTabContainer() {
    return (
        <Box sx={{ width: '100%' }}>
            <h1>Premade Rules</h1>
        </Box>
    );
}

export default PremadeRulesOptionsTabContainer;
