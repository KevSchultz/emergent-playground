/**
 * @file Welcome.jsx is the container component for the welcome landing page.
 * The welcome page includes a brief description of the project and a button to get started.
 * @author Preston Nguyen, Kevin Schultz
 * @project Emergent Playground
 */

import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';


// import { ReactP5Wrapper } from '@p5-wrapper/react';
// import cellularAutomataSketch from '../sketches/cellularAutomataSketch';
// import DefaultProperties from '../sketches/DefaultProperties';


/**
 * @component
 * @returns {ReactElement} A container component that renders the welcome page.
 */
function Welcome() {
    return (
        <>  
            {/* Custom Top Nav Bar */}
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
                    // borderBottom: '2px solid rgba(0, 0, 0, 0.5)',
                    position: 'relative',
                }}
            >
                {/* HOME, CANVAS, and COMMUNITY buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <a href="/welcome" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <Button 
                            variant="text"
                            color="primary"

                        >
                            Home
                        </Button>
                    </a>
                    <a href="/" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <Button 
                            variant="text" 
                            color="primary" 
                        >
                            Canvas
                        </Button>
                    </a>
                    <a href="/community" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <Button 
                            variant="text"  
                            color="primary"
                        >
                            Community
                        </Button>
                    </a>
                </Box>

                {/* LOGIN and SIGN UP buttons */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <a href="/login" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <Button 
                            variant="text" 
                            color="primary" 
                            sx={{ 
                                marginRight: '10px', 
                            }}
                        >
                            Login
                        </Button>
                    </a>
                    <a href="/register" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                        >
                            Sign Up
                        </Button>
                    </a>
                </Box>
            </Paper>

            {/* Play Button Box */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <Box
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '40px', 
                        borderRadius: '4px',
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <Typography variant="h4" gutterBottom>
                            Welcome to
                            <br />
                            EMERGENT PLAYGROUND
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            A web platform to animate, build, and share cellular automata.
                        </Typography>

                        <a href="/" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <Button 
                                variant="contained" 
                                color="primary"
                                sx={{ 
                                    marginTop: '15px', 
                                }}
                            >
                                PLAY
                            </Button>
                        </a>
                    </div>
                </Box>
            </div>

            {/* About Box */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Box
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '40px', 
                        borderRadius: '4px',
                        marginTop: '300px'
                    }}
                >
                    <div style={{ textAlign: 'center' }}>
                        <Typography variant="h4" gutterBottom>
                            ABOUT
                        </Typography>

                        <Typography 
                            variant="h5" 
                            gutterBottom
                            sx={{ marginTop: '30px'}}
                        >
                            What is a cellular automaton?
                        </Typography>

                        <Typography 
                            variant="body1" 
                            gutterBottom
                            sx={{width: '70vh', marginTop: '15px'}}
                        >
                            A cellular automaton is a mathematical model consisting of a grid of cells, each governed by simple rules dictating their state changes based on neighboring cells. 
                            These rules typically involve replication, destruction, or state transitions, leading to dynamic and emergent behaviors within the system. 
                            Cellular automata find applications in various fields, from generating intricate patterns in art and design to modeling complex phenomena in physics, biology, and computer science.
                        </Typography>

                        <Typography 
                            variant="h5" 
                            gutterBottom 
                            sx={{ marginTop: '30px'}}
                        >
                            CSE115A Winter 2023 Project
                        </Typography>

                        <Typography 
                            variant="body1" 
                            gutterBottom
                            sx={{width: '70vh', marginTop: '15px'}}
                        >
                            This site is meant to serve as a platform to view, create, and share cellular automata. 
                            Done over an 8 week period, our team employed SCRUM techniques learned in class to collaborate on this project.
                        </Typography>

                        {/* Avatar list */}
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                            <Avatar 
                                sx={{ height: '10vh', width: '10vh', marginRight: '10px' }}
                            >
                                Kevin
                            </Avatar>
                            <Typography variant="body2" gutterBottom>
                                I am the product manager
                            </Typography>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                            <Avatar 
                                sx={{ height: '10vh', width: '10vh', marginRight: '10px' }}
                            >
                                Beckett
                            </Avatar>
                            <Typography variant="body2" gutterBottom>
                                Text here
                            </Typography>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                            <Avatar 
                                sx={{ height: '10vh', width: '10vh', marginRight: '10px' }}
                            >
                                Alex
                            </Avatar>
                            <Typography variant="body2" gutterBottom>
                                Text here
                            </Typography>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                            <Avatar 
                                sx={{ height: '10vh', width: '10vh', marginRight: '10px' }}
                            >
                                Ethan
                            </Avatar>
                            <Typography variant="body2" gutterBottom>
                                Text here
                            </Typography>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '30px' }}>
                            <Avatar 
                                sx={{ height: '10vh', width: '10vh', marginRight: '10px' }}
                            >
                                Preston
                            </Avatar>
                            <Typography variant="body2" gutterBottom>
                                Text here
                            </Typography>
                        </div>
                    </div>
                </Box>
            </div>
        </>
    );
}

export default Welcome;