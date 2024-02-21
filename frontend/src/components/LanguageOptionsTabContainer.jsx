/**
 * @project Emergent Playground
 * @file LanguageOptionsTabContainer.jsx
 * @overview This file contains the container component for the language options including the cellular automata language code editor.
 * @authors Beckett Avary, Kevin Schultz
 * @exports LanguageOptionsTabContainer
 */

// React Imports
import { useContext } from 'react';

// Material UI Imports
import { Button, Box, Grid, List } from '@mui/material';

// Ace Code Editor Imports
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-plain_text';
import 'ace-builds/src-noconflict/theme-gruvbox';
import 'ace-builds/src-noconflict/ext-language_tools';

// Other Imports
import P5PropertiesContext from './P5PropertiesContext';
import { HexColorPicker } from 'react-colorful';
import LanguageStateItem from './LanguageStateItem';

/**
 * A container component for that shows on the language options tab.
 *
 * This component displays an AceEditor inside a Box.
 * The AceEditor is used to display and edit the code.
 * The code is retrieved from the P5PropertiesContext.
 * When the code in the AceEditor changes, the new code is saved to the P5PropertiesContext.
 *
 * @returns {JSX.Element} The LanguageOptionsTabContainer component.
 */
function LanguageOptionsTabContainer() {

    const { code, setCode } = useContext(P5PropertiesContext);
    const { currentLangColor, setCurrentLangColor } = useContext(P5PropertiesContext);
    const { langTupleList, setLangTupleList } = useContext(P5PropertiesContext);

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    const handleCurrentColorChange = (newColor) => {
        setCurrentLangColor(newColor);
    };

    const handleAddColor = () => {
        setLangTupleList([...langTupleList, currentLangColor]);
    };

    //TODO: GRID BREAKPOINTS!
    return (
        <Box>
            <Grid container spacing={1} padding={2}>
                <Grid item xs={12} md={6}>
                    <HexColorPicker color={currentLangColor} onChange={handleCurrentColorChange}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <List>
                        {langTupleList.map((color) => (
                            <LanguageStateItem color={color}/>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button 
                        variant="outlined" 
                        fullWidth
                        onClick={handleAddColor}
                    > 
                        Add Color 
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Button variant="outlined" fullWidth> Compile </Button>
                </Grid>
            </Grid>
            <AceEditor
                width="100%"
                placeholder=""
                mode="plain_text"
                theme="gruvbox"
                name="ed"
                value={code}
                onChange={handleCodeChange}
                fontSize="16px"
                highlightActiveLine={true}
                setOptions={{
                    enableLiveAutocompletion: false,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
            />
        </Box>
    );
}

export default LanguageOptionsTabContainer;
