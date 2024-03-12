/**
 * @project Emergent Playground
 * @file LanguageHelpDropdown.jsx
 * @overview This file contains the Help dropdwon menu in the Language tab.
 * @author Beckett Avary
 * @exports LanguageHelpDropdown
 */

// React Imports
import { useContext, useState } from "react";

// Material UI Imports
import {
  Accordion,
  AccordionSummary,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

import { Brightness1, ExpandMoreOutlined } from "@mui/icons-material";

// Other Imports
import P5PropertiesContext from "./P5PropertiesContext";

/**
 * A dropdown menu for help with writing the language. Displays active variables.
 *
 * @returns {JSX.Element} The LanguageHelpDropdown component.
 */

function LanguageHelpDropdown() {
  const { langTupleList, langNeighborhoodType } =
    useContext(P5PropertiesContext);

  const [infoPage, setInfoPage] = useState("Variables");
  const infoPages = ["Help", "Variables", "Example"];

  const golExample = `
    if(curr == live){
        if(live_num < 2){
            next = dead;
        }
        if(live_num == 2 || live_num == 3){
            next = live;
        }
        if(live_num > 3){
            next = dead;
        }
    } else {
        if(curr == dead && live_num == 3){
            next = live;
        }
    }`;

  const helpText = [
    `Welcome to the Cellular Automata (CA) creator! You can define your own rules for CA here.`,
    `You will be writing a segment of GLSL ES 3.00 code, which has almost identical syntax to C.`,
    `There are a variety of built-in variables to expedite CA creation.`,
    `The most important are "curr" and "next". "curr" refers to the current cell being examined, and "next" is the state it will assume after it is processed. So, if you want every cell to be in "state0", your entire program would read "next = state0", after you define "state0" in the State Definition section.`,
    `The states you defined above can be referenced by name, and are represented internally as a color. You can reference the number of cells in a neighborhood that belong to a certain state by adding the "_num" suffix to the state name.`,
    `Depending on the neighborhood, you can also reference each individual cell in the neighborhood with the scheme [top/bottom][left/right]. So, the top left neighbor would be called "tl". Such combinations of position are only available to the Moore neighborhood, which looks at the eight cells surrounding the current cell. The von Neumann neighborhood only looks at the top, bottom, left, and right cells (t, b, l, r).`,
    `All of the comparisons you would expect are available, but it is very important to use the eq() function to compare two states. You may still use == to perform an equality comparison, but the eq() function will be far more accurate.`,
    `Check out the Premade Rules to see how they are implemented in the language! By clicking on a given Premade Rule, you will be able to view its implementation in this tab.`,
    `The Variables Page has a quick reference page of all available built-in variables with a short explanation.`,
  ];

  const makeTableRow = (n0, d0, n1, d1) => {
    return (
      <TableRow>
        <TableCell sx={{ fontFamily: "monospace" }}>{n0}</TableCell>
        <TableCell>{d0}</TableCell>
        <TableCell sx={{ fontFamily: "monospace" }}>{n1}</TableCell>
        <TableCell>{d1}</TableCell>
      </TableRow>
    );
  };

  return (
    <Accordion disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
        Information
      </AccordionSummary>
      <Grid container spacing={1} padding={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="Page Selector">Page Select</InputLabel>
            <Select
              labelId="infoPageSelect"
              value={infoPage}
              label="Info Select"
              onChange={(e) => {
                setInfoPage(e.target.value);
              }}
            >
              {infoPages.map((p, index) => (
                <MenuItem key={index} value={p}>
                  {p}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {infoPage == "Help" && (
            <>
              {helpText.map((s, index) => (
                <h4 key={index}>
                  {s}
                  <p></p>
                </h4>
              ))}
            </>
          )}
          {infoPage === "Variables" && (
            <TableContainer>
              <Table>
                <TableRow>
                  <TableCell sx={{ fontFamily: "monospace" }}>curr</TableCell>
                  <TableCell>current cell state</TableCell>
                  <TableCell sx={{ fontFamily: "monospace" }}>next</TableCell>
                  <TableCell>next cell state</TableCell>
                </TableRow>
                {langTupleList.map((s, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ fontFamily: "monospace" }}>
                      {s.name}
                    </TableCell>
                    <TableCell>
                      <Brightness1 sx={{ color: s.color }} />
                    </TableCell>
                    <TableCell sx={{ fontFamily: "monospace" }}>
                      {s.name + "_num"}
                    </TableCell>
                    <TableCell># in neighborhood</TableCell>
                  </TableRow>
                ))}
                {langNeighborhoodType === "moore" && (
                  <>
                    {makeTableRow("tl", "top left", "t", "top")}
                    {makeTableRow("tr", "top right", "l", "left")}
                    {makeTableRow("r", "right", "bl", "bottom left")}
                    {makeTableRow("b", "bottom", "br", "bottom right")}
                  </>
                )}
                {langNeighborhoodType === "von_neumann" && (
                  <>
                    {makeTableRow("t", "top", "l", "left")}
                    {makeTableRow("r", "right", "b", "bottom")}
                  </>
                )}
              </Table>
            </TableContainer>
          )}
          {infoPage === "Example" && (
            <>
              <Typography>{"Conway's Game of Life"}</Typography>
              <Typography sx={{ fontFamily: "monospace" }} noWrap>
                <pre>
                  <code>{golExample}</code>
                </pre>
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </Accordion>
  );
}

export default LanguageHelpDropdown;
