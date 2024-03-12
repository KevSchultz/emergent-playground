/**
 * @project Emergent Playground
 * @file PostCard.jsx
 * @overview This component is a card that displays a post for the community page.
 * @authors Kevin Schultz, Preston Nguyen, Alex Garza
 * @exports PostCard
 */

// React Imports
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Material UI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

// Custom Component Imports
import LoadingDialog from "./LoadingDialog";
import backendRequester from "./BackendRequester";
import cellularAutomataSketch from "./cellularAutomataSketch";
import P5PropertiesContext from "./P5PropertiesContext";

// Other Imports
import PropTypes from "prop-types";

function PostCard({ title, username, postid }) {
  const {
    setWorldWidth,
    setWorldHeight,
    setZoom,
    setMinZoom,
    setMaxZoom,
    setBrushType,
    setBrushSize,
    setVertexShader,
    setFragmentShader,
    setCode,
    setCurrentLangColor,
    setLangTupleList,
    setLangIncludeSelf,
    setLangRange,
    setCurrentDrawColor,
    setLangNeighborhoodType,
    setGeneration,
    setContinuousPlay,
  } = useContext(P5PropertiesContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    const post = await backendRequester.downloadPost(postid);

    if (post == undefined) {
      alert("Download failed.");
      return;
    }

    const state = post.state;
    const properties = post.properties;

    setWorldWidth(properties.worldWidth);
    setWorldHeight(properties.worldHeight);
    setZoom(properties.zoom);
    setMinZoom(properties.minZoom);
    setMaxZoom(properties.maxZoom);
    setBrushType(properties.brushType);
    setBrushSize(properties.brushSize);
    setVertexShader(properties.vertexShader);
    setFragmentShader(properties.fragmentShader);
    setCode(properties.code);
    setCurrentLangColor(properties.currentLangColor);
    setLangTupleList(properties.langTupleList);
    setLangIncludeSelf(properties.langIncludeSelf);
    setLangRange(properties.langRange);
    setCurrentDrawColor(properties.currentDrawColor);
    setLangNeighborhoodType(properties.langNeighborhoodType);
    setGeneration(properties.generation);
    setContinuousPlay(properties.continuousPlay);

    cellularAutomataSketch.initialState = state;
    cellularAutomataSketch.reactProperties = properties;

    navigate("/");

    setLoading(false);
  };

  return (
    <Box>
      <Card sx={{ marginY: 0.5 }}>
        <CardContent>
          <Link variant="h5" onClick={handleClick}>
            {title}
          </Link>
          <Typography color="text.secondary">{"By: " + username}</Typography>
        </CardContent>
      </Card>
      <LoadingDialog open={loading}></LoadingDialog>
    </Box>
  );
}

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  postid: PropTypes.string.isRequired,
};

export default PostCard;
