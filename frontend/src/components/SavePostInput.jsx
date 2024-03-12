/**
 * @project Emergent Playground
 * @file SavePostInput.jsx
 * @overview This file defines the SavePostInput component, which provides an input field for the title and a save button. 
 * When the save button is clicked, it uploads the current state of the cellular automata sketch to the server. 
 * It uses the P5PropertiesContext to access the current properties of the sketch and the BackendRequester to upload the post. 
 * @authors Kevin Schultz
 * @exports SavePostInput.jsx
 */

// React Imports
import { useContext } from "react";
import { useState } from "react";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";

// Custom Component Imports
import backendRequester from "./BackendRequester";
import P5PropertiesContext from "./P5PropertiesContext";
import cellularAutomataSketch from "./cellularAutomataSketch";
import LoadingDialog from "./LoadingDialog";

/**
 * @description A component that provides an input field for the title and a save button. 
 * When the save button is clicked, it uploads the current state of the cellular automata sketch to the server.
 *
 * @returns {JSX.Element} The SavePostInput component.
 */
function SavePostInput() {
  const properties = useContext(P5PropertiesContext);
  const [loading, setLoading] = useState(false);

  const savePost = async () => {
    setLoading(true);

    properties.setPause(1);

    const response = await backendRequester.uploadPost(
      properties.title,
      cellularAutomataSketch.stateToBlob(),
      properties,
    );

    if (response.status != 200) {
      alert("Save failed. Make sure you are logged in.");
    } else {
      alert("Save successful.");
    }

    setLoading(false);
  };

  return (
    <>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter title here ... "
          value={properties.title}
          onChange={(e) => properties.setTitle(e.target.value)} // Update the state when the input changes
        />
        <Button onClick={savePost}>SAVE</Button>
      </Paper>
      <LoadingDialog open={loading} />
    </>
  );
}

export default SavePostInput;
