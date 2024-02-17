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

function PremadeRuleCard({ premadeRuleName, newFragmentShader, imageUrl }) {

    const { setFragmentShader } = useContext(P5PropertiesContext);

    const handleCardClick = () => {
        setFragmentShader(newFragmentShader);
    }

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
