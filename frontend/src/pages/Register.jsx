/**
 * @project Emergent Playground
 * @file Register.jsx
 * @overview The container component for the Register page.
 * The Register page includes a form for the user to enter their new username, password, and retype password.
 * @authors Kevin Schultz
 * @exports Register
 */
import { useContext, useCallback } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import P5PropertiesContext from "../components/P5PropertiesContext";
import { useNavigate } from "react-router-dom";
import Logo from "../emergent_playground_logo.svg";

import backendRequester from "../components/BackendRequester";

/**
 * @description A functional component that renders the Register page.
 *
 * @returns {JSX.Element} The Register component.
 */
function Register() {
  const navigate = useNavigate(); // Get the navigate function

  const navigateLogin = useCallback(() => navigate("/login"), [navigate]);
  const navigateHome = useCallback(() => navigate("/"), [navigate]);

  const { setUsername } = useContext(P5PropertiesContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const username = data.get("username").toLowerCase();
    const email = data.get("email").toLowerCase();
    const retypePassword = data.get("retype-password");
    const password = data.get("password");

    if (
      username === "" ||
      email === "" ||
      retypePassword === "" ||
      password === ""
    ) {
      alert("Please fill out all fields.");
      return;
    }

    if (password !== retypePassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    const jsonResponse = await backendRequester.register(
      username,
      email,
      password,
    );

    console.log("jsonResponse: " + jsonResponse);

    if (jsonResponse) {
      setUsername(jsonResponse.username);
      navigate("/login");
    } else {
      alert("Username or Email already in use. Please try again.");
      return;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper
          sx={{
            padding: 2,
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={Logo}
              alt="Emergent Playground Logo"
              style={{ width: "150px" }}
            />
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="retype-password"
                label="Retype Password"
                type="password"
                id="retype-password"
                autoComplete="retype-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                <Grid item>
                  <Link onClick={navigateLogin} variant="body2">
                    {"Already have an account? Login."}
                  </Link>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item>
                  <Link onClick={navigateHome} variant="body2">
                    {"Continue without an account."}
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

export default Register;
