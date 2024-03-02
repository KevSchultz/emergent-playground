/**
 * @project Emergent Playground
 * @file PremadeRulesOptionsTabContainer.jsx
 * @overview A container component that renders the premade rules options tab.
 * @authors Kevin Schultz, Beckett Avary
 * @exports PremadeRulesOptionsTabContainer
 */

// Material UI imports
import Box from '@mui/material/Box';

import PremadeRuleCard from './PremadeRuleCard';

// Shader Imports (for the premade rules)
import premadeConstants from '../lang-data/premadeConstants';


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
            {premadeConstants.map((p, index) => (
                <PremadeRuleCard
                    key={index}
                    newFragmentShader={p.shader}
                    newTupleList={p.tupleList}
                    newDefaultDraw={p.defaultDraw}
                    newDefaultBackground={p.defaultBackground}
                    premadeRuleName={p.name}
                    imageUrl={p.url}
                />
            ))}
        </Box>
    );
}

export default PremadeRulesOptionsTabContainer;
