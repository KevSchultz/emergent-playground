/**
 * @file TabPanel.jsx renders the contents of a Tab in the OptionsDrawer.
 * @author Beckett Avary
 * @project Emergent Playground
 */
import Box from '@mui/material/Box'

/**
 * TabPanel is a functional component that wraps its children in a Box with conditional visibility.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child components to be rendered within the TabPanel.
 * @param {number} props.value - The value of the currently selected tab.
 * @param {number} props.index - The id number of the TabPanel, corresponding to a Tab in the OptionsDrawer.
 *
 * @returns {ReactElement} The TabPanel component.
 */
function TabPanel({children, value, index}){
    return(
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`tabpanel-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3, position: 'relative' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default TabPanel;
