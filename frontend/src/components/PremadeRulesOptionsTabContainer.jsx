/**
 * @project Emergent Playground
 * @file PremadeRulesOptionsTabContainer.jsx
 * @overview A container component that renders the premade rules options tab.
 * @authors Kevin Schultz
 * @exports PremadeRulesOptionsTabContainer
 */

// Material UI imports
import Box from '@mui/material/Box';

import PremadeRuleCard from './PremadeRuleCard';

// Shader Imports (for the premade rules)
import gameOfLife from '../shaders/gameOfLife.frag?raw';
import seeds from '../shaders/seeds.frag?raw';

/**
 * A container component for the premade rules options tab.
 *
 * This component displays a Box that contains two PremadeRuleCard components.
 * The PremadeRuleCard components are passed the new fragment shader, the name of the premade rule, and the URL of the image to display on the Card.
 *
 * @returns {JSX.Element} The PremadeRulesOptionsTabContainer component.
 */
function PremadeRulesOptionsTabContainer() {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                paddingTop: '10px',
                rowGap: '10px',
                columnGap: '10px',
            }}
        >
            <PremadeRuleCard
                newFragmentShader={gameOfLife}
                premadeRuleName={'Game of Life'}
                imageUrl={
                    'https://lh3.googleusercontent.com/iZwB2p3rX7D7h-4QWSmKXy-_4FBRVCB8A8vrGwQduZzqfU-1ZMewoumgw3HOTiOsrN3Ax_vnOuUGRFnWuIbGoOWpAnpCoxGqvxg'
                }
            />
            <PremadeRuleCard
                newFragmentShader={seeds}
                premadeRuleName={'Seeds'}
                imageUrl={
                    'https://upload.wikimedia.org/wikipedia/commons/e/e1/Seeds_140_generations.gif'
                }
            />
        </Box>
    );
}

export default PremadeRulesOptionsTabContainer;
