/**
 * @file LanguageOptionsTabContainer.jsx
 * @overview This file contains the container component for the language options including the cellular automata language code editor.
 * @project Emergent Playground
 * @authors Beckett Avary, Kevin Schultz
 * @exports LanguageOptionsTabContainer
 */

// Material UI Imports
import Box from '@mui/material/Box';

// Ace Code Editor Imports
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-plain_text';
import 'ace-builds/src-noconflict/theme-gruvbox';
import 'ace-builds/src-noconflict/ext-language_tools';

// Other Imports
import PropTypes from 'prop-types';

/**
 * @component
 * @param {Object} props
 * @returns {ReactElement} A container component that renders the language options tab.
 * @param {string} props.code The code for the cellular automata language.
 * @param {function} props.setCode A function to set the code for the cellular automata language.
 * @returns {ReactElement} A component that renders the language options tab inside RightOptionsRootContainer.jsx
 */
function LanguageOptionsTabContainer({ code, setCode }) {
    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    return (
        <Box>
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

LanguageOptionsTabContainer.propTypes = {
    code: PropTypes.string.isRequired,
    setCode: PropTypes.func.isRequired,
};

export default LanguageOptionsTabContainer;
