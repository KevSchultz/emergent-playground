/**
 * @project Emergent Playground
 * @file LanguageOptionsDropdown.jsx
 * @overview This file contains the Options dropdwon menu in the Language tab.
 * @author Beckett Avary
 * @exports LanguageOptionsDropdown
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
 * A dropdown menu for setting options for langCompiler in the language options tab.
 *
 * An accordion handles the dropdown functionality, and wraps a Grid.
 * The Grid contains a FormControlLabel'd Checkbox to control the "include_self" parameter
 * of langCompiler, a Slider to control the "range" parameter, and space for Kevin's
 * component to control the "neighborhood" parameter.
 *
 * @returns {JSX.Element} The LanguageOptionsDropdown component.
 */

//TODO: reflect default state selection in langCompiler
function LanguageOptionsDropdown() {
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
                Options
            </AccordionSummary>
            <Grid container spacing={1} padding={2}>
                <Grid item xs={6}>
                    <FormControlLabel 
                        control={<Checkbox onChange={(e) => setLangIncludeSelf(e.target.checked)}/>} 
                        label='Include Self'
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom> Range </Typography>
                    <Slider
                        defaultValue={1}
                        valueLabelDisplay='auto'
                        marks
                        min={1}
                        max={5}
                        onChange={(e, value) => setLangRange(value)}
                    />
                </Grid>
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
                <Grid item xs={12}>
                    {/*Kevin's neighborhood selector goes here*/}
                </Grid>
            </Grid>
        </Accordion>
    );
}

export default LanguageOptionsDropdown;