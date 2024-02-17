/**
 * @file RightOptionsRootContainer.jsx is the component for the right options drawer.
 * This is the right side box contains the options for the user to change the sketch attributes.
 * However, these options are actually implemented in the various TabContainer components.
 * This file holds the logic to switch between the tabs and the box that contains the tabs.
 * @project Emergent Playground
 * @authors Beckett Avary, Kevin Schultz
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
                height: '100%',
                overflow: 'none',
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

            {TABS[currentTabIndex] === 'Premade Rules' && <PremadeRulesOptionsTabContainer />}

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
