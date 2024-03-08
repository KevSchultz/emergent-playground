/**
 * @project Emergent Playground
 * @file NavBar.jsx
 * @overview This component renders a top navigation bar.
 * @authors Kevin Schultz
 * @exports TopNavigationBar
 */

import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';

// Custom Imports
import P5PropertiesContext from './P5PropertiesContext';
import TextInput from './TextInput';
import LoginLink from './LoginLink';

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

    const generation = useContext(P5PropertiesContext).generation;

    const location = useLocation();
    const currentPage = location.pathname;

    console.log(currentPage);

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
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                    flexBasis: '33%',
                    gap: '1vw',
                }}
            >
                {/* <a href="/welcome" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Button 
                        variant="text"
                        color="primary"
                    >
                        Home
                    </Button>
                </a> */}

                <Link href="/welcome">HOME</Link>

                {/* <a href="/" rel="noimport Button from '@mui/material/Button';
opener noreferrer" style={{ textDecoration: 'none' }}>
                    <Button 
                        variant="text" 
                        color="primary" 
                    >
                        Canvas
                    </Button>
                </a> */}

                <Link href="/">CANVAS</Link>

                {/* <a href="/community" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Button 
                        variant="text"  
                        color="primary"
                    >
                        Community
                    </Button>
                </a> */}

                <Link href="/community">COMMUNITY</Link>

                { currentPage == '/' ? <Typography>{"GENERATION: " + generation}</Typography> : null}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexBasis: '33%',
                    padding: '10px',
                    boxSizing: 'border-box',
                    marginTop: '10px',
                    marginBottom: '10px',
                }}
            >
                { currentPage == '/' ? <TextInput /> : null }
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexBasis: '33%',
                    gap: '1vw',
                }}
            >
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

                <LoginLink/>
            </Box>
        </Paper>
    );
}

export default TopNavigationBar;
