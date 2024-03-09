/**
 * @project Emergent Playground
 * @file Login.jsx is
 * @overview The container component for the sign in page.
 * The sign in page includes a form for the user to enter their username and password.
 * As well as integration with authentication services such as Google and (TBD).
 * @authors Kevin Schultz
 * @exports Login
 */

import { useContext } from 'react';
import { useCallback } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import P5PropertiesContext from '../components/P5PropertiesContext';
import Logo from '../emergent_playground_logo.svg';

// Custom Imports
import backendRequester from '../components/BackendRequester';

function Login() {
    const navigate = useNavigate(); // Get the navigate function

    const navigateRegister = useCallback(() => navigate('/register'), [navigate]);
    const navigateHome = useCallback(() => navigate('/'), [navigate]);


    const { setUsername } = useContext(P5PropertiesContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get('email').toLowerCase();
        const password = data.get('password');

        const jsonResponse = await backendRequester.login(email, password);

        if (jsonResponse) {
            setUsername(jsonResponse.username);
            navigate('/');
        } else {
            alert('Invalid email or password.');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Container component="main" maxWidth="xs">
                <Paper
                    sx={{
                        padding: 2,
                        boxSizing: 'border-box',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img src={Logo} alt="Emergent Playground Logo" style={{ width: '150px' }} />

                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Login
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link onClick={navigateRegister} variant="body2">
                                        {"Don't have an account? Register."}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item>
                                    <Link onClick={navigateHome} variant="body2">
                                        {'Continue without an account.'}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default Login;
