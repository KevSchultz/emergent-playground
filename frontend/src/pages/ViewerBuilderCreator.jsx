/**
 * @file ViewerBuilderCreator.jsx is the container component for the main editor integrated development environment page.
 * This page is where the real magic happens. It includes the P5 canvas, the code editor, and user interface.
 * @author Beckett Avary, Kevin Schultz
 * @project Emergent Playground
 */

// Custom component imports
import TopNavigationBar from '../components/TopNavigationBar';
import LeftButtonListContainer from '../components/LeftButtonListContainer';
import RightOptionsRootContainer from '../components/RightOptionsRootContainer';
import P5Background from '../components/P5Background';
import {P5PropertiesProvider} from '../components/P5PropertiesContext';
import DefaultProperties from '../components/DefaultProperties';

// P5.js imports
// import CellularAutomataSketchClass from '../sketches/CellularAutomataSketchClass';
import TextureRuleCellularAutomataSketchClass from '../sketches/textureRuleCellularAutomataSketchClass';
// import CellularAutomataTextureRuleSketch from '../sketches/CellularAutomataTextureRuleSketch';

// Resizable Panel Imports
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// const cellularAutomataSketch = new CellularAutomataSketchClass(DefaultProperties);
const cellularAutomataSketch = new TextureRuleCellularAutomataSketchClass(DefaultProperties);

/**
 * @component
 * @returns {ReactElement} A container component that renders the main editor page.
 */
function ViewerBuilderCreator() {
    
    return (
        <P5PropertiesProvider>
            <P5Background cellularAutomataSketch={cellularAutomataSketch} />
            <TopNavigationBar />
            <PanelGroup direction="horizontal">
                <div>
                    <LeftButtonListContainer></LeftButtonListContainer>
                </div>
                <Panel></Panel>
                <PanelResizeHandle />
                <Panel defaultSize={30} minSize={10}>
                    <RightOptionsRootContainer/>
                </Panel>
                <PanelResizeHandle />
            </PanelGroup>
        </P5PropertiesProvider>
    );
}

export default ViewerBuilderCreator;
