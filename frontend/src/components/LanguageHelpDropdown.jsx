/**
 * @project Emergent Playground
 * @file LanguageHelpDropdown.jsx
 * @overview This file contains the Help dropdwon menu in the Language tab.
 * @author Beckett Avary
 * @exports LanguageHelpDropdown
 */

// React Imports
import { useContext } from 'react';

// Material UI Imports
import { 
    Accordion, 
    AccordionSummary, 
    Checkbox, 
    FormControl, 
    FormControlLabel, 
    Grid, 
    InputLabel, 
    MenuItem, 
    Select, 
    Slider, 
    Typography 
} from '@mui/material';

import { ExpandMoreOutlined } from '@mui/icons-material';

// Other Imports
import P5PropertiesContext from './P5PropertiesContext';

/**
 * A dropdown menu for help with writing the language. Displays active variables.
 *
 * @returns {JSX.Element} The LanguageHelpDropdown component.
 */

function LanguageHelpDropdown() {
    const { 
        setLangIncludeSelf, 
        setLangRange, 
        backgroundColor, 
        setBackgroundColor,
        langTupleList
    } = useContext(P5PropertiesContext);

    return(
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreOutlined/>}
            >
                Help
            </AccordionSummary>
            <Grid container spacing={1} padding={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id='backgroundSelectLabel'>Default State</InputLabel>
                        <Select
                            labelId='backgroundSelectLabel'
                            value={backgroundColor}
                            label='Default State'
                            onChange={(e) => {setBackgroundColor(e.target.value)}}
                        >
                            {langTupleList.map((s, index) => (
                                <MenuItem key={index} value={s.color}>{s.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Accordion>
    );
}

export default LanguageHelpDropdown;
