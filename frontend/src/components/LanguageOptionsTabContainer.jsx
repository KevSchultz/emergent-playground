/**
 * @project Emergent Playground
 * @file LanguageOptionsTabContainer.jsx
 * @overview This file contains the container component for the language options including the cellular automata language code editor.
 * @authors Beckett Avary, Kevin Schultz
 * @exports LanguageOptionsTabContainer
 */

// React Imports
import { useContext, useState } from 'react';

// Material UI Imports
import { Alert, Button, Box, Grid, List, Snackbar } from '@mui/material';

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

    const [openError, setOpenError] = useState(false);

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    const handleCurrentColorChange = (newColor) => {
        setCurrentLangColor(newColor);
    };

    const handleAddColor = () => {
        if(langTupleList.some(s => s.color === currentLangColor)){
            setOpenError(true);
        } else {
            setLangTupleList([...langTupleList, {color: currentLangColor, name: ''}]);
        }
    };

    const handleErrorClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpenError(false);
    };

    const handleCompile = () => {
        console.log(langTupleList);
    };

    return (
        <Box>
            <Grid container spacing={1} padding={2}>
                <Grid item xs={12} md={6}>
                    <HexColorPicker color={currentLangColor} onChange={handleCurrentColorChange}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box style={{ maxHeight: 200, overflow: 'auto' }}>
                        <List>
                            {langTupleList.map((s) => (
                                <LanguageStateItem state={{color: s.color, name: s.name}}/>
                            ))}
                        </List>
                    </Box>
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
                    <Button 
                        variant="outlined" 
                        fullWidth
                        onClick={handleCompile}
                    > 
                        Compile 
                    </Button>
                </Grid>
            </Grid>
            <Snackbar 
                open={openError} 
                autoHideDuration={1500} 
                onClose={handleErrorClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleErrorClose}
                    severity='error'
                    variant='outlined'
                    sx={{ width: '100%' }}
                >
                    Color already in use.
                </Alert>
            </Snackbar>
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
