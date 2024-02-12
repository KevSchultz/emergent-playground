/**
 * @file EditorTabPanel.jsx renders the instruction editor.
 * @author Beckett Avary
 * @project Emergent Playground
 */
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-gruvbox';
import 'ace-builds/src-noconflict/mode-plain_text';
import 'ace-builds/src-noconflict/ext-language_tools';
import TabPanel from './TabPanel';
import Button from '@mui/material/Button';

/**
 * EditorTabPanel is a functional component that wraps an AceEditor and Button in a TabPanel.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.value - The value of the currently selected tab.
 * @param {number} props.index - The id number of the TabPanel, corresponding to a Tab.
 * @param {string} props.code - The place where edited code is stored.
 * @param {function} props.setCode - A callback to ensure edited code is passed to the proper place.
 *
 * @returns {ReactElement} The EditorTabPanel component.
 */
function EditorTabPanel({value, index, code, setCode}){
    return(
        <TabPanel value={value} index={index}>
            <Button variant='contained' sx={{ width: 1 }}>
                Compile
            </Button>
            <AceEditor
                placeholder=''
                mode='plain_text'
                theme='gruvbox'
                name='ed'
                fontSize='16px'
                value={code}
                onChange={setCode}
                highlightActiveLine={true}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%'
                }}
                setOptions={{
                    enableLiveAutocompletion: false,
                    showLineNumbers: true,
                    tabSize: 4
                }}
            />
        </TabPanel>
    );
}

export default EditorTabPanel;
