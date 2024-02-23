/**
 * @project Emergent Playground
 * @file ViewerBuilderCreator.jsx
 * @overview The container component for the main editor integrated development environment page.
 * This page is where the real magic happens. It includes the P5 canvas, the code editor, and user interface.
 * @authors Beckett Avary, Kevin Schultz
 * @exports ViewerBuilderCreator
 */

// Custom component imports
import TopNavigationBar from '../components/TopNavigationBar';
import LeftButtonListContainer from '../components/LeftButtonListContainer';
import RightOptionsRootContainer from '../components/RightOptionsRootContainer';
import P5Background from '../components/P5Background';
import DefaultProperties from '../components/DefaultProperties';

// P5.js imports
import CellularAutomataSketchClass from '../sketches/CellularAutomataSketchClass';
import TextureRuleCellularAutomataSketchClass from '../sketches/TextureRuleCellularAutomataSketchClass';

// Resizable Panel Imports
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// const cellularAutomataSketch = new CellularAutomataSketchClass(DefaultProperties);
const TextureRuleCellularAutomataSketch = new TextureRuleCellularAutomataSketchClass(DefaultProperties);

/**
 * A functional component that renders the Viewer Builder Creator page.
 *
 * This component displays a P5PropertiesProvider that contains a P5Background, a TopNavigationBar, and a PanelGroup.
 * The PanelGroup contains a LeftButtonListContainer, a Panel, a PanelResizeHandle, and a RightOptionsRootContainer.
 *
 * @returns {JSX.Element} The ViewerBuilderCreator component.
 */
function ViewerBuilderCreator() {
    return (
        <>
            <P5Background cellularAutomataSketch={TextureRuleCellularAutomataSketch} />
            <TopNavigationBar />
            <PanelGroup direction="horizontal">
                <div>
                    <LeftButtonListContainer></LeftButtonListContainer>
                </div>
                <Panel></Panel>
                <PanelResizeHandle />
                <Panel defaultSize={30} minSize={10}>
                    <RightOptionsRootContainer />
                </Panel>
                <PanelResizeHandle />
            </PanelGroup>
        </>
    );
}

export default ViewerBuilderCreator;
