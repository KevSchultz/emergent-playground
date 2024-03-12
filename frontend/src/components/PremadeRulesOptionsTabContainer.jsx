/**
 * @project Emergent Playground
 * @file PremadeRulesOptionsTabContainer.jsx
 * @overview A container component that renders the premade rules options tab.
 * @authors Kevin Schultz, Beckett Avary
 * @exports PremadeRulesOptionsTabContainer
 */

// Shader Imports (for the premade rules)
import premadeConstants from "../lang-data/premadeConstants";

// Other Imports
import PremadeRuleCard from "./PremadeRuleCard";
import ResizableGrid from "./ResizableGrid";

/**
 * @description A container component for the premade rules options tab.
 * This component displays a Box that contains PremadeRuleCard components.
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
          newNeighborhood={p.neighborhood}
          newRange={p.range}
          newIncludeSelf={p.includeSelf}
        />
      ))}
    </ResizableGrid>
  );
}

export default PremadeRulesOptionsTabContainer;
