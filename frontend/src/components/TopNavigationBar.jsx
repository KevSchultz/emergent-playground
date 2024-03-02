/**
 * @project Emergent Playground
 * @file NavBar.jsx
 * @overview This component renders a top navigation bar.
 * @authors Kevin Schultz
 * @exports TopNavigationBar
 */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';

/**
 * A functional component that renders a top navigation bar.
 *
 * This component displays a Paper component that contains a Typography component and a Box component.
 * The Typography component displays the title of the application.
 * The Box component contains a Link component that navigates to the community page.
 *
 * @returns {JSX.Element} The TopNavigationBar component.
 */
function TopNavigationBar() {
    return (
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '5vh',
                overflow: 'hidden',
                padding: '1vw',
                boxSizing: 'border-box',
                borderBottom: '2px solid rgb(0, 118, 236, 0.5)',
            }}
        >
            <Typography>EMERGENT PLAYGROUND</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '19vw',
                    gap: '1vw',
                    justifyContent: 'flex-end',
                }}
            >
                <Link href="community">
                    Community
                </Link>
                <Link href="login">
                    Login
                </Link>
            </Box>
        </Paper>
    );
}

export default TopNavigationBar;
