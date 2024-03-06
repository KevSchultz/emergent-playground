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
import Button from '@mui/material/Button';


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
            {/* <Typography>EMERGENT PLAYGROUND</Typography> */}

            {/* HOME, CANVAS, and COMMUNITY buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'left', flex: 1, gap: '1vw', }}>
                {/* <a href="/welcome" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Button 
                        variant="text"
                        color="primary"
                    >
                        Home
                    </Button>
                </a> */}

                <Link href="/welcome">
                    HOME
                </Link>

                {/* <a href="/" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Button 
                        variant="text" 
                        color="primary" 
                    >
                        Canvas
                    </Button>
                </a> */}

                <Link href="/">
                    CANVAS
                </Link>

                {/* <a href="/community" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Button 
                        variant="text"  
                        color="primary"
                    >
                        Community
                    </Button>
                </a> */}

                <Link href="/community">
                    COMMUNITY
                </Link>                        
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '1vw', }}>
                {/* <a href="/login" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Button 
                        variant="text" 
                        color="primary" 
                        sx={{ 
                            marginRight: '10px', 
                        }}
                    >
                        Login
                    </Button>
                </a> */}

                <Link href="/login">
                    Login
                </Link>   
            </Box>
        </Paper>
    );
}

export default TopNavigationBar;
