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
import { useState } from 'react';

// Material UI imports
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


// Custom component imports
import PremadeRulesOptionsTabContainer from './PremadeRulesOptionsTabContainer';
import ViewerOptionsTabContainer from './ViewerOptionsTabContainer';
import LanguageOptionsTabContainer from './LanguageOptionsTabContainer';

// Constants
const TABS = ['Premade Rules', 'Viewer Options', 'Language'];

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

    const handleTabChange = (event, newTabIndex) => {
        setCurrentTabIndex(newTabIndex);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                width: '100%',
                height: '95vh',
                overflow: 'auto',
                padding: '1vw',
                boxSizing: 'border-box',
                borderLeft: '2px solid rgb(0, 118, 236, 0.5)',
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
                            '&.Mui-disabled': { opacity: 0.3 },
                        },
                    }}
                >
                    {TABS.map((tabLabel, index) => (
                        <Tab key={index} label={tabLabel} />
                    ))}
                </Tabs>
            </Box>

            {/* The following code is conditional rendering of tabs through React. */}

            {TABS[currentTabIndex] === 'Premade Rules' && (
                <PremadeRulesOptionsTabContainer />
            )}

            {TABS[currentTabIndex] === 'Viewer Options' && (
                <ViewerOptionsTabContainer/>
            )}

            {TABS[currentTabIndex] === 'Language' && (
                <LanguageOptionsTabContainer />
            )}
        </Paper>
    );
}

export default RightOptionsRootContainer;