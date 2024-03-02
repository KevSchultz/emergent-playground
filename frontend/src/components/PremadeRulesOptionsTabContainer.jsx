/**
 * @project Emergent Playground
 * @file PremadeRulesOptionsTabContainer.jsx
 * @overview A container component that renders the premade rules options tab.
 * @authors Kevin Schultz, Beckett Avary
 * @exports PremadeRulesOptionsTabContainer
 */

// Shader Imports (for the premade rules)
import premadeConstants from '../lang-data/premadeConstants';

// Other Imports
import PremadeRuleCard from './PremadeRuleCard';
import ResizableGrid from './ResizableGrid';

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
        <ResizableGrid limit={400}>
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
        </ResizableGrid>
    );
}

export default PremadeRulesOptionsTabContainer;
