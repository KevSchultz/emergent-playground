/**
 * @project Emergent Playground
 * @file LanguageOptionsTabContainer.jsx
 * @overview This file contains the container component for the language options including the cellular automata language code editor.
 * @authors Beckett Avary, Kevin Schultz
 * @exports LanguageOptionsTabContainer
 */

// React Imports
import { useContext, useEffect, useRef, useState } from 'react';

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
import langCompiler from '../lang-data/langCompiler';
import LanguageOptionsDropdown from './LanguageOptionsDropdown';
import langVert from '../lang-data/lang.vert?raw';

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

//TODO: syntax highlighting & autocomplete for language in AceEditor
function LanguageOptionsTabContainer() {

    const { 
        code, 
        setCode, 
        currentLangColor,
        setCurrentLangColor,
        langTupleList,
        setLangTupleList,
        langIncludeSelf,
        langRange,
        setFragmentShader,
        setVertexShader
    } = useContext(P5PropertiesContext);

    const [openError, setOpenError] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [contSize, setContSize] = useState(0);
    const contRef = useRef(null);

    useEffect(() => {
        const resizeObs = new ResizeObserver(entries => {
            if(entries && entries.length > 0){
                setContSize(entries[0].contentRect.width);
            }
        });

        if(contRef.current){
            resizeObs.observe(contRef.current);
        }

        return () => {
            if(contRef.current){
                resizeObs.unobserve(contRef.current);
            }
        };
    }, [contRef, contSize]);

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    const handleCurrentColorChange = (newColor) => {
        setCurrentLangColor(newColor);
    };

    const handleAddColor = () => {
        if(langTupleList.some(s => s.color === currentLangColor)){
            setOpenError(true);
            setAlertMessage('Color already in use.');
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
        if(code !== ''){
            const newFrag = langCompiler(code, langTupleList, langIncludeSelf, langRange, 'moore');
            setFragmentShader(newFrag);
            setVertexShader(langVert);
        } else {
            setOpenError(true);
            setAlertMessage('Invalid code.');
        }
    };

    const handleDebug = () => {
        console.log(langTupleList);
    }

    return (
        <Box ref={contRef}>
            <Grid container spacing={1} padding={2}>
                <Grid item xs={contSize < 400 ? 12 : 6}>
                    <HexColorPicker color={currentLangColor} onChange={handleCurrentColorChange}/>
                </Grid>
                <Grid item xs={contSize < 400 ? 12 : 6}>
                    <Box style={{ maxHeight: 200, overflow: 'auto' }}>
                        <List>
                            {langTupleList.map((s) => (
                                <LanguageStateItem state={{color: s.color, name: s.name}}/>
                            ))}
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={contSize < 400 ? 12 : 6}>
                    <Button 
                        variant="outlined" 
                        fullWidth
                        onClick={handleAddColor}
                    > 
                        Add Color 
                    </Button>
                </Grid>
                <Grid item xs={contSize < 400 ? 12 : 6}>
                    <Button 
                        variant="outlined" 
                        fullWidth
                        onClick={handleCompile}
                    > 
                        Compile 
                    </Button>
                </Grid>
            </Grid>
            <Button onClick={handleDebug}>
                Debug
            </Button>
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
                    {alertMessage}
                </Alert>
            </Snackbar>
            <LanguageOptionsDropdown/>
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
