/**
 * @project Emergent Playground
 * @file PremadeRuleCard.jsx
 * @overview Card Button to display a premade rule and set the fragment shader to the new rule when clicked.
 * @authors Beckett Avary, Kevin Schultz
 * @exports PremadeRuleCard
 */

// React Imports
import { useContext } from "react";

// Material UI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";

// Custom Component Imports
import P5PropertiesContext from "./P5PropertiesContext";

/**
 * @description A component that displays a card for a premade rule. When clicked, it updates the P5 properties context with the properties of the premade rule.
 *
 * @param {Object} props - The properties passed to this component.
 * @param {string} props.premadeRuleName - The name of the premade rule.
 * @param {string} props.newFragmentShader - The fragment shader of the premade rule.
 * @param {string} props.imageUrl - The URL of the image to display on the card.
 * @param {Array} props.newTupleList - The tuple list of the premade rule.
 * @param {string} props.newDefaultDraw - The default draw color of the premade rule.
 * @param {string} props.newDefaultBackground - The default background color of the premade rule.
 * @param {string} props.newNeighborhood - The neighborhood type of the premade rule.
 * @param {number} props.newRange - The range of the premade rule.
 * @param {boolean} props.newIncludeSelf - Whether the premade rule includes itself in the neighborhood.
 * @returns {JSX.Element} The PremadeRuleCard component.
 */
function PremadeRuleCard({
  premadeRuleName,
  newFragmentShader,
  imageUrl,
  newTupleList,
  newDefaultDraw,
  newDefaultBackground,
  newNeighborhood,
  newRange,
  newIncludeSelf,
}) {
  const {
    setFragmentShader,
    setLangTupleList,
    setCurrentDrawColor,
    setBackgroundColor,
    setLangNeighborhoodType,
    setLangRange,
    setLangIncludeSelf,
    setCode,
  } = useContext(P5PropertiesContext);

  const handleCardClick = () => {
    setFragmentShader(newFragmentShader);
    setLangTupleList(newTupleList);
    setCurrentDrawColor(newDefaultDraw);
    setBackgroundColor(newDefaultBackground);
    setLangNeighborhoodType(newNeighborhood);
    setLangRange(newRange);
    setLangIncludeSelf(newIncludeSelf);
    setCode(
      newFragmentShader
        .match(/\/\/CODEBEGIN([\s\S]*?)\/\/CODEEND/g)[0]
        .replace("//CODEBEGIN", "")
        .replace("//CODEEND", "")
        .replace(/^(\t)/gm, "")
        .replace(/uint\((\d+)\)/g, "$1")
        .trim(),
    );
  };

  return (
    <Card sx={{ maxWidth: 245 }}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          alt="Thumbnail"
          height="140"
          image={imageUrl}
          title="Thumbnail"
        />
        <CardContent>
          <Typography>{premadeRuleName}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PremadeRuleCard;
