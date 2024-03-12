/**
 * @project Emergent Playground
 * @file ViewerBuilderCreator.jsx
 * @overview The container component for the main editor integrated development environment page.
 * This page is where the real magic happens. It includes the P5 canvas, the code editor, and user interface.
 * @authors Beckett Avary, Kevin Schultz
 * @exports ViewerBuilderCreator
 */

// Material-UI Imports
import Box from "@mui/material/Box";

// Custom component imports
import TopNavigationBar from "../components/TopNavigationBar";
import LeftButtonListContainer from "../components/LeftButtonListContainer";
import RightOptionsRootContainer from "../components/RightOptionsRootContainer";
import P5Background from "../components/P5Background";


// Resizable Panel Imports
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

/**
 * @description A functional component that renders the Viewer Builder Creator page.
 * This component displays a P5PropertiesProvider that contains a P5Background, a TopNavigationBar, and a PanelGroup.
 * The PanelGroup contains a LeftButtonListContainer, a Panel, a PanelResizeHandle, and a RightOptionsRootContainer.
 *
 * @returns {JSX.Element} The ViewerBuilderCreator component.
 */
function ViewerBuilderCreator() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        overflow: "hidden",
        background:
          "linear-gradient(109.6deg, rgb(36, 45, 57) 11.2%, rgb(16, 37, 60) 51.2%, rgb(0, 0, 0) 98.6%)",
        height: "100vh",
      }}
    >
      <P5Background />
      <TopNavigationBar />
      <LeftButtonListContainer></LeftButtonListContainer>
      <PanelGroup direction="horizontal">
        <Panel></Panel>
        <PanelResizeHandle />
        <Panel defaultSize={30} minSize={10}>
          <RightOptionsRootContainer />
        </Panel>
      </PanelGroup>
    </Box>
  );
}

export default ViewerBuilderCreator;
