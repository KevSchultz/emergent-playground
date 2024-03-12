/**
 * @project Emergent Playground
 * @file Welcome.jsx
 * @overview The container component for the welcome page.
 * The welcome page includes a brief description of the project and a button to get started.
 * @author Preston Nguyen, Kevin Schultz
 * @project Emergent Playground
 */

import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TopNavigationBar from "../components/TopNavigationBar";
import Logo from "../emergent_playground_logo.svg";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

function Welcome() {
  const navigate = useNavigate(); // Get the navigate function

  const navigateRoot = useCallback(() => navigate("/"), [navigate]);

  return (
    <>
      <TopNavigationBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Play Button Box */}
        <Box
          sx={{
            padding: "40px",
            borderRadius: "4px",
          }}
        >
          <ButtonBase onClick={navigateRoot}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                border: "2px solid rgb(0, 118, 236, 0.5)",
                padding: "50px",
                height: "50vh",
                width: "50vw",
                transition: "opacity 0.3s", // add transition for smooth effect
                "&:hover": {
                  opacity: 0.7, // change opacity on hover
                },
              }}
            >
              <img
                src={Logo}
                alt="Emergent Playground Logo"
                style={{ width: "50%" }}
              />
              <Typography variant="h4" gutterBottom>
                EMERGENT PLAYGROUND
              </Typography>

              <Typography variant="h6" gutterBottom>
                A web platform to animate, build, and share cellular automata.
              </Typography>
            </Paper>
          </ButtonBase>
        </Box>

        {/* About Box */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              padding: "40px",
              borderRadius: "4px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <Typography variant="h4" gutterBottom>
                ABOUT
              </Typography>

              <Typography variant="h5" gutterBottom sx={{ marginTop: "30px" }}>
                What is a cellular automaton?
              </Typography>

              <Typography
                variant="body1"
                gutterBottom
                sx={{ width: "70vh", marginTop: "15px" }}
              >
                A cellular automaton is a mathematical model consisting of a
                grid of cells, each governed by simple rules dictating their
                state changes based on neighboring cells. These rules typically
                involve replication, destruction, or state transitions, leading
                to dynamic and emergent behaviors within the system. Cellular
                automata find applications in various fields, from generating
                intricate patterns in art and design to modeling complex
                phenomena in physics, biology, and computer science.
              </Typography>

              <Typography variant="h5" gutterBottom sx={{ marginTop: "30px" }}>
                CSE115A Winter 2023 Project
              </Typography>

              <Typography
                variant="body1"
                gutterBottom
                sx={{ width: "70vh", marginTop: "15px" }}
              >
                This site is meant to serve as a platform to view, create, and
                share cellular automata. Done over an 8 week period, our team
                employed SCRUM techniques learned in class to collaborate on
                this project.
              </Typography>
            </div>
          </Box>
        </div>
      </Box>
    </>
  );
}

export default Welcome;
