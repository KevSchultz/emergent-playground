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
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/ext-language_tools';

// Dropdown Imports
import LanguageOptionsDropdown from './LanguageOptionsDropdown';
import LanguageHelpDropdown from './LanguageHelpDropdown';
import LanguageColorMenuDropdown from './LanguageColorMenuDropdown';

// Other Imports
import P5PropertiesContext from './P5PropertiesContext';
import langCompiler from '../lang-data/langCompiler';
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

//TODO: autocomplete for language in AceEditor
//TODO: implement custom neighborhood selection
function LanguageOptionsTabContainer() {
    const { 
        code, 
        setCode, 
        langTupleList,
        langIncludeSelf,
        langRange,
        setFragmentShader,
        fragmentShader,
        langNeighborhoodType,
        backgroundColor
    } = useContext(P5PropertiesContext);

    const [openError, setOpenError] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    const handleCompile = () => {
        if(code !== ''){
            const newFrag = langCompiler(code, langTupleList, langIncludeSelf, langRange, langNeighborhoodType, backgroundColor);
            setFragmentShader(newFrag);
        } else {
            setOpenError(true);
            setAlertMessage('Invalid code.');
        }
    };

    const handleViewShader = () => {
        alert(fragmentShader);
    };

    return (
        <Box>
            <LanguageColorMenuDropdown setOpenError={setOpenError} setAlertMessage={setAlertMessage}/>
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
            <ResizableGrid limit={400}>
                <Button
                    variant='outlined'
                    onClick={handleViewShader}
                    fullWidth
                >
                    View Full Shader
                </Button>
                 <Button
                    variant='outlined'
                    onClick={handleCompile}
                    fullWidth
                >
                    Compile
                </Button>
            </ResizableGrid>
            <AceEditor
                width="100%"
                placeholder=""
                mode="glsl"
                theme="solarized_dark"
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
