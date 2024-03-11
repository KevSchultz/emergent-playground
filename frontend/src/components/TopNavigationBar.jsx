/**
 * @project Emergent Playground
 * @file NavBar.jsx
 * @overview This component renders a top navigation bar.
 * @authors Kevin Schultz
 * @exports TopNavigationBar
 */

import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';

// Custom Imports
import P5PropertiesContext from './P5PropertiesContext';
import SavePostInput from './SavePostInput';
import LoginLink from './LoginLink';
import LogoutLink from './LogoutLink';
import Logo from '../emergent_playground_logo.svg';
import ButtonBase from '@mui/material/ButtonBase';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';

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

    const navigate = useNavigate();

    const location = useLocation();
    const currentPage = location.pathname;

    const navigateCommunity = useCallback(() => navigate('/community'), [navigate]);
    const navigateWelcome = useCallback(() => navigate('/welcome'), [navigate]);
    const navigateCanvas = useCallback(() => navigate('/'), [navigate]);

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

            {/* HOME, CANVAS, and COMMUNITY Links */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                    flexBasis: '33%',
                    gap: '1vw',
                }}
            >
                <ButtonBase onClick={navigateWelcome}>
                    <Card
                        sx={{
                            transition: 'opacity 0.3s', // add transition for smooth effect
                            '&:hover': {
                                opacity: 0.7, // change opacity on hover
                            },
                        }}
                    >
                        <img src={Logo} alt="Emergent Playground Logo" style={{ width: '64px' }} />
                    </Card>
                </ButtonBase>

                <Link onClick={navigateCanvas}>CANVAS</Link>

                <Link onClick={navigateCommunity}>COMMUNITY</Link>

                {currentPage == '/' ? <Typography>{'GENERATION: ' + generation}</Typography> : null}
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
                {currentPage == '/' ? <SavePostInput /> : null}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flexBasis: '33%',
                    gap: '1vw',
                }}
            >
                <LoginLink />
                <LogoutLink />
            </Box>
        </Paper>
    );
}

export default TopNavigationBar;
