/**
 * @project Emergent Playground
 * @file LoadingDialog.jsx
 * @overview A dialog component that displays a loading spinner.
 * @authors Kevin Schultz
 * @exports LoadingDialog
 */

import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";


function LoadingDialog({ open }) {
  return (
    <Dialog
      open={open}
      PaperProps={{
        elevation: 0, // No shadow
        style: {
          display: "flex",
          alignItems: "center", // Align items vertically in the center
          justifyContent: "center", // Align items horizontally in the center
          backgroundColor: "rgb(0, 0, 0, 0)",
          boxShadow: "none",
          overflow: "hidden", // Prevents scrolling on the dialog
        },
      }}
    >
      <CircularProgress />
    </Dialog>
  );
}

LoadingDialog.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default LoadingDialog;
