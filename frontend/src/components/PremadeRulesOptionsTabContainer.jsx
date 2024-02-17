// Material UI imports
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

/**
 * @component
 * @param {Object} props
 *
 * @returns {ReactElement} A container component that renders the premade rules options tab.
 */
function PremadeRulesOptionsTabContainer() {
    return (
        <Box sx={{ width: '100%', paddingTop: '10px' }}>
            <List>
                <ListItem>
                    <Link href="#rule1">Rule 1</Link>
                </ListItem>
                <ListItem>
                    <Link href="#rule2">Rule 2</Link>
                </ListItem>
                <ListItem>
                    <Link href="#rule3">Rule 3</Link>
                </ListItem>
                {/* Add more links as needed */}
            </List>
        </Box>
    );
}

export default PremadeRulesOptionsTabContainer;
