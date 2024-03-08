/**
 * @project Emergent Playground
 * @file LanguageColorMenuDropdown.jsx
 * @overview This file contains the dropdown menu for selecting and viewing colors
 * @authors Beckett Avary
 * @exports LanguageColorMenuDropdown
 */

// State
import { useContext } from 'react';
import P5PropertiesContext from './P5PropertiesContext';

//MUI
import { Accordion, AccordionSummary, Button, Box, List, TextField } from '@mui/material';
import { ExpandMoreOutlined } from '@mui/icons-material';

//custom
import LanguageStateItem from './LanguageStateItem';
import ResizableGrid from './ResizableGrid';

//other
import { HexColorPicker } from 'react-colorful';

/**
 * A container component that exposes langTupleList as UI. Select colors with
 * HexColorPicker and represent their state with LanguageStateItem.
 *
 * @param {object} props
 * @param {function} props.setAlertMessage - React state to change PrettyAlert message in parent.
 * @param {function} props.setOpenError - React state to display PrettyAlert in parent.
 *
 * @returns {JSX.Element} The LanguageColorMenuDropdown
 */
function LanguageColorMenuDropdown({setAlertMessage, setOpenError}){
    const {
        currentLangColor,
        setCurrentLangColor,
        langTupleList,
        setLangTupleList
    } = useContext(P5PropertiesContext);

    const handleCurrentColorChange = (newColor) => {
        setCurrentLangColor(newColor);
    };

    const handleAddColor = () => {
        if(langTupleList.some(s => s.color === currentLangColor)){
            setOpenError(true);
            setAlertMessage('Color already in use.');
        } else {
            setLangTupleList([...langTupleList, {color: currentLangColor, name: ''}]);
            if(backgroundColor === ''){
                setBackgroundColor(currentLangColor);
            }
        }
    };

    const handleColorText = (e) => {
        var t = e.target.value;
        setCurrentLangColor('#'.concat(t));
    }; 

    return(
        <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreOutlined/>}>
                State Definition
            </AccordionSummary>
            <ResizableGrid limit={400}>
                <Box>
                    <HexColorPicker color={currentLangColor} onChange={handleCurrentColorChange}/>
                    <TextField variant='standard' margin='none' onChange={handleColorText} value={currentLangColor.replace('#', '')} error={currentLangColor.length !== 7}/>
                </Box>
                <Box style={{ maxHeight: 200, overflow: 'auto' }}>
                    <List>
                        {langTupleList.map((s, index) => (
                            <LanguageStateItem key={index} state={{color: s.color, name: s.name}}/>
                        ))}
                    </List>
                </Box>
            </ResizableGrid>
            <Button 
                variant="outlined" 
                fullWidth
                onClick={handleAddColor}
            > 
                Add State
            </Button>
        </Accordion>
    );

}

export default LanguageColorMenuDropdown;
