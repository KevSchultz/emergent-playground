/**
 * @file theme.js defines the color palette for the Material-UI theme used in App.jsx and passed down to all components.
 * @author Kevin Schultz
 * @project Emergent Playground
 */
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0076EC",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      paper: "rgba(0, 0, 0, 0.5)",
    },
  },
  typography: {
    h1: {
      fontSize: "5vw",
    },
  },
});
