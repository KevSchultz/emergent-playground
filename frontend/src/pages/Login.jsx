/**
 * @project Emergent Playground
 * @file Login.jsx is
 * @overview The container component for the sign in page.
 * The sign in page includes a form for the user to enter their username and password.
 * As well as integration with authentication services such as Google and (TBD).
 * @authors Kevin Schultz
 * @exports Login
 */

import { useContext, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import P5Background from '../components/P5Background';
import DefaultProperties from '../components/DefaultProperties';
import TextureRuleCellularAutomataSketchClass from '../sketches/TextureRuleCellularAutomataSketchClass';
import P5PropertiesContext from '../components/P5PropertiesContext';

const TextureRuleCellularAutomataSketch = new TextureRuleCellularAutomataSketchClass(
    DefaultProperties
);

function Login() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            const body = { email: data.get('email'), password: data.get('password') };

            const response = await fetch('https://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const responseData = await response.json();

            console.log(responseData);

        } catch (error) {
            console.error(error);
        }
    };

    const { setZoom } = useContext(P5PropertiesContext);

    useEffect(() => {
        setZoom(50);
    });

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
            <P5Background cellularAutomataSketch={TextureRuleCellularAutomataSketch} />

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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
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
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Don't have an account? Register"}
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
