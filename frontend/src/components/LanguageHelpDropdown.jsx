/**
 * @project Emergent Playground
 * @file LanguageHelpDropdown.jsx
 * @overview This file contains the Help dropdwon menu in the Language tab.
 * @author Beckett Avary
 * @exports LanguageHelpDropdown
 */

// React Imports
import { useContext, useState } from 'react';

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
    Typography 
} from '@mui/material';

import { Brightness1, ExpandMoreOutlined } from '@mui/icons-material';

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

    const [infoPage, setInfoPage] =  useState('Variables');
    const infoPages = ['Help', 'Variables', 'Example'];

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

    return(
        <Accordion disableGutters> 
            <AccordionSummary
                expandIcon={<ExpandMoreOutlined/>}
            >
                Information
            </AccordionSummary>
            <Grid container spacing={1} padding={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id='Page Selector'>Page Select</InputLabel>
                        <Select
                            labelId='infoPageSelect'
                            value={infoPage}
                            label='Info Select'
                            onChange={(e) => {setInfoPage(e.target.value)}}
                        >
                            {infoPages.map((p, index) => (
                                <MenuItem key={index} value={p}>{p}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    {infoPage=='Help' && (
                        <Typography>
                            Eighteen naked cowboys in the showers at Ram Ranch
                            Big hard throbbing cocks wanting to be sucked
                            Eighteen naked cowboys wanting to be fucked
                            Cowboys in the showers at Ram Ranch
                            On their knees wanting to suck cowboy cocks
                            Ram Ranch really rocks
                            
                            Hot hard buff cowboys, their cocks throbbing hard
                            Eighteen more wild cowboys out in the yard
                            Big bulging cocks ever so hard
                            
                            Orgy in the showers at Ram Ranch
                            Big hard throbbing cocks ramming cowboy butt
                            Like a breeding ram wanting to rut
                            
                            Big hard throbbing cocks getting sucked real deep
                            Cowboys even getting fucked in their sleep
                            Ram Ranch, it rocks
                            Cowboys love big hard throbbing cocks
                            
                            Eighteen naked cowboys in the showers at Ram Ranch
                            Big hard throbbing cocks wanting to be sucked
                            Eighteen naked cowboys wanting to be fucked
                            Cowboys in the showers at Ram Ranch
                            On their knees wanting to suck cowboy cocks
                            Ram Ranch really rocks
                            
                            Hot hard buff cowboys, their cocks throbbing hard
                            Eighteen more wild cowboys out in the yard
                            Big bulging cocks ever so hard
                            
                            Orgy in the showers at Ram Ranch
                            Big hard throbbing cocks ramming cowboy butt
                            Like a breeding ram wanting to rut
                            
                            Eighteen naked cowboys in the showers at Ram Ranch
                            Big hard throbbing cocks wanting to be sucked
                            Eighteen naked cowboys wanting to be fucked
                            Cowboys in the showers at Ram Ranch
                            On their knees wanting to suck cowboy cocks
                            Ram Ranch really rocks
                            
                            Big hard throbbing cocks, getting sucked real deep
                            Cowboys even getting fucked in their sleep
                            Ram Ranch, it rocks
                            Cowboys love big hard throbbing cocks
                        </Typography>
                    )}
                    {infoPage==='Variables' && (
                        <TableContainer>
                            <Table>
                                <TableRow>
                                    <TableCell sx={{ fontFamily:'monospace' }}>curr</TableCell>
                                    <TableCell>current cell state</TableCell>
                                    <TableCell sx={{ fontFamily:'monospace' }}>next</TableCell>
                                    <TableCell>next cell state</TableCell>
                                </TableRow>
                                {langTupleList.map((s, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ fontFamily:'monospace' }}>{s.name}</TableCell>
                                        <TableCell><Brightness1 sx={{ color: s.color }}/></TableCell>
                                        <TableCell sx={{ fontFamily:'monospace' }}>{s.name+'_num'}</TableCell>
                                        <TableCell># occurrences in neighborhood</TableCell>
                                    </TableRow>
                                ))}
                            </Table>
                        </TableContainer>
                    )}
                    {infoPage === 'Example' && (
                        <>
                        <Typography>{"Conway\'s Game of Life"}</Typography>
                        <Typography sx={{ fontFamily:'monospace' }} noWrap>
                            <pre><code>{golExample}</code></pre>
                        </Typography>
                        </>
                    )}
                </Grid>
            </Grid>
        </Accordion>
    );
}

export default LanguageHelpDropdown;
