/**
 * @project Emergent Playground
 * @file PremadeRuleCard.jsx
 * @overview Card Button to display a premade rule and set the fragment shader to the new rule when clicked.
 * @authors Kevin Schultz
 * @exports PremadeRuleCard
 */

// React Imports
import { useContext } from 'react';

// Material UI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';

// Custom Component Imports
import P5PropertiesContext from './P5PropertiesContext';
import PropTypes from 'prop-types';

/**
 * A card component for displaying a premade rule.
 *
 * This component displays a Card with an image and the name of the premade rule.
 * When the Card is clicked, the fragment shader is updated to the new fragment shader of the premade rule.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.premadeRuleName - The name of the premade rule.
 * @param {string} props.newFragmentShader - The new fragment shader of the premade rule.
 * @param {string} props.imageUrl - The URL of the image to display on the Card.
 * 
 * @returns {JSX.Element} The PremadeRuleCard component.
 */
function PremadeRuleCard({ premadeRuleName, newFragmentShader, imageUrl }) {
    const { setFragmentShader } = useContext(P5PropertiesContext);

    const handleCardClick = () => {
        setFragmentShader(newFragmentShader);
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

PremadeRuleCard.propTypes = {
    premadeRuleName: PropTypes.string.isRequired,
    newFragmentShader: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};

export default PremadeRuleCard;
