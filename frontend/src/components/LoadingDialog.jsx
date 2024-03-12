import React from "react";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingDialog({ open }) {
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
