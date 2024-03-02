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
import { Button, Box, List } from '@mui/material';

// Ace Code Editor Imports
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-glsl';
import 'ace-builds/src-noconflict/theme-gruvbox';
import 'ace-builds/src-noconflict/ext-language_tools';

// Other Imports
import P5PropertiesContext from './P5PropertiesContext';
import { HexColorPicker } from 'react-colorful';
import LanguageStateItem from './LanguageStateItem';
import langCompiler from '../lang-data/langCompiler';
import LanguageOptionsDropdown from './LanguageOptionsDropdown';
import LanguageHelpDropdown from './LanguageHelpDropdown';
import PrettyAlert from './PrettyAlert';
import ResizableGrid from './ResizableGrid';

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
//TODO: UPDATE PALETTE WHEN COLOR BECOMES UNAVAILABLE
//TODO: help page (dropdown style) -- just show available variables
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
        backgroundColor,
        setBackgroundColor,
        fragmentShader
    } = useContext(P5PropertiesContext);

    const [openError, setOpenError] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

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
            if(backgroundColor === ''){
                setBackgroundColor(currentLangColor);
            }
        }
    };

    const handleCompile = () => {
        if(code !== ''){
            const newFrag = langCompiler(code, langTupleList, langIncludeSelf, langRange, 'moore');
            setFragmentShader(newFrag);
        } else {
            setOpenError(true);
            setAlertMessage('Invalid code.');
        }
    };

    const handleDebug = () => {
        console.log(fragmentShader);
        console.log(langTupleList);
    };

    const handleSave = () => {
        console.log('saved :^)');
    };

    return (
        <Box>
            <ResizableGrid limit={400}>
                <HexColorPicker color={currentLangColor} onChange={handleCurrentColorChange}/>
                <Box style={{ maxHeight: 200, overflow: 'auto' }}>
                    <List>
                        {langTupleList.map((s, index) => (
                            <LanguageStateItem key={index} state={{color: s.color, name: s.name}}/>
                        ))}
                    </List>
                </Box>
                <Button 
                    variant="outlined" 
                    fullWidth
                    onClick={handleAddColor}
                > 
                    Add Color 
                </Button>
                <Button 
                    variant="outlined" 
                    fullWidth
                    onClick={handleCompile}
                > 
                    Compile 
                </Button>
            </ResizableGrid>
            <Button 
                variant="contained"
                fullWidth
                onClick={handleSave}
                sx={{ mt: 0, mb: 2 }}
            >
                Save
            </Button>
            <Button 
                variant="contained"
                fullWidth
                onClick={handleDebug}
                sx={{ mt: 0, mb: 2 }}
            >
                Debug
            </Button>
            <PrettyAlert
                openAlert={openError}
                setOpenAlert={setOpenError}
                alertDuration={1500}
                alertSeverity='error'
                alertMessage={alertMessage}
                anchorOriginV='top'
                anchorOriginH='right'
            />
            <LanguageOptionsDropdown/>
            <LanguageHelpDropdown/>
            <AceEditor
                width="100%"
                placeholder=""
                mode="glsl"
                theme="gruvbox"
                name="ed"
                value={code}
                onChange={handleCodeChange}
                fontSize="16px"
                highlightActiveLine={true}
                setOptions={{
                    enableLiveAutocompletion: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
            />
        </Box>
    );
}

export default LanguageOptionsTabContainer;
