/**
 * @project Emergent Playground
 * @file LanguageOptionsDropdown.jsx
 * @overview This file contains the Options dropdown menu in the Language tab.
 * @author Beckett Avary
 * @exports LanguageOptionsDropdown
 */

import { useContext, useState } from "react";
import { Accordion, AccordionSummary, Button, Stack } from "@mui/material";
import { ExpandMoreOutlined } from "@mui/icons-material";
import P5PropertiesContext from "./P5PropertiesContext";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-glsl";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools";

function LanguageShaderDropdown() {
  const { setCode, setFragmentShader } = useContext(P5PropertiesContext);

  const [rawShader, setRawShader] = useState("");

  const handleCodeChange = (newCode) => {
    setCode("");
    setRawShader(newCode);
  };

  const handleCodeSubmit = () => {
    setFragmentShader(rawShader);
  };

  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
        ADVANCED: CA GLSL ES 3.00 from scratch
      </AccordionSummary>
      <Stack spacing={2}>
        <Button variant="outlined" onClick={handleCodeSubmit} fullwidth>
          Submit Raw Shader
        </Button>
        <AceEditor
          width="100%"
          placeholder=""
          mode="glsl"
          theme="solarized_dark"
          name="ed"
          value={rawShader}
          onChange={handleCodeChange}
          fontSize="16px"
          highlightActiveLine={true}
          setOptions={{
            enableLiveAutocompletion: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </Stack>
    </Accordion>
  );
}

export default LanguageShaderDropdown;
