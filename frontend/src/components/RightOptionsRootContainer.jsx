/**
 * @project Emergent Playground
 * @file RightOptionsRootContainer.jsx
 * @overview The component for the right options drawer.
 * This is the right side box contains the options for the user to change the sketch attributes.
 * However, these options are actually implemented in the various TabContainer components.
 * This file holds the logic to switch between the tabs and the box that contains the tabs.
 * @authors Beckett Avary, Kevin Schultz
 * @exports RightOptionsRootContainer
 */

// React imports
import { useContext } from "react";
import { useState } from "react";

// Material UI imports
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Fab from "@mui/material/Fab";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Custom component imports
import PremadeRulesOptionsTabContainer from "./PremadeRulesOptionsTabContainer";
import ViewerOptionsTabContainer from "./ViewerOptionsTabContainer";
import LanguageOptionsTabContainer from "./LanguageOptionsTabContainer";
import P5PropertiesContext from "./P5PropertiesContext";

// Constants
const TABS = ["Premade Rules", "Viewer Options", "Language"];

/**
 * A container component for the right options root.
 *
 * This component displays a Paper that contains a Box with Tabs and conditional rendering of tab containers.
 * The Tabs are created for each tab label in the TABS array.
 * The tab containers are rendered based on the current tab index.
 * The current tab index is updated when a tab is clicked.
 *
 * @returns {JSX.Element} The RightOptionsRootContainer component.
 */
function RightOptionsRootContainer() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const { fullscreen } = useContext(P5PropertiesContext);

  const handleTabChange = (event, newTabIndex) => {
    setCurrentTabIndex(newTabIndex);
  };

  return (
    <>
      <Fab
        color="primary"
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translate(-46px, -50%)",
          // borderRadius: '0%',
          right: !isOptionsOpen ? "0" : null,
          width: 36, // Smaller width
          height: 36, // Smaller height
        }}
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
      >
        {isOptionsOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </Fab>

      {isOptionsOpen ? (
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            height: !fullscreen ? "95vh" : "100vh",
            overflow: "auto",
            padding: "1vw",
            boxSizing: "border-box",
            borderLeft: "2px solid rgb(0, 118, 236, 0.5)",
          }}
        >
          <Box>
            <Tabs
              value={currentTabIndex}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  "&.Mui-disabled": { opacity: 0.3 },
                },
              }}
            >
              {TABS.map((tabLabel, index) => (
                <Tab key={index} label={tabLabel} />
              ))}
            </Tabs>
          </Box>

          {/* The following code is conditional rendering of tabs through React. */}

          {TABS[currentTabIndex] === "Premade Rules" && (
            <PremadeRulesOptionsTabContainer />
          )}

          {TABS[currentTabIndex] === "Viewer Options" && (
            <ViewerOptionsTabContainer />
          )}

          {TABS[currentTabIndex] === "Language" && (
            <LanguageOptionsTabContainer />
          )}
        </Paper>
      ) : null}
    </>
  );
}

export default RightOptionsRootContainer;
