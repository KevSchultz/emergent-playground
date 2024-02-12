import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// code editor import
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-gruvbox';
import 'ace-builds/src-noconflict/mode-plain_text';
import 'ace-builds/src-noconflict/ext-language_tools';

const Input = styled(MuiInput)`
    width: 42px;
    color: white;
`;

function InputSlider({label}) {
    const [value, setValue] = React.useState(30);

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography id="input-slider" gutterBottom>
                {label}
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    {/* <VolumeUp /> */}
                </Grid>
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                    />
                </Grid>
                <Grid item>
                    <Input
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 10,
                            min: 0,
                            max: 100,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

function TabPanel({children, value, index}){
    return(
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`tabpanel-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function OptionsDrawer({code, setCode}) {
    const [value, setValue] = React.useState(0);

    function handleCodeChange(val) {
        setCode(val);
    }

    const handleChange = (event, newValue) => {
          setValue(newValue);
    };

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '30vw',
                marginTop: '10px',
                padding: '10px',
                backgroundColor: 'rgba(20, 20, 20, 0.2)',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Box
                sx={{
                    marginBottom: '10px',
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    aria-label="scrollable auto tabs example"
                    sx={{
                        [`& .${tabsClasses.scrollButtons}`]: {
                            '&.Mui-disabled': { opacity: 0.3 },
                        },
                    }}
                >
                    <Tab label="Premade" style={{ color: 'white' }} id='tabpanel-0' />
                    <Tab label="Viewer Options" style={{ color: 'white' }} id='tabpanel-1' />
                    <Tab label="CA Rules" style={{ color: 'white' }} id='tabpanel-2' />
                    <Tab label="Language" style={{ color: 'white' }} id='tabpanel-3' />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Typography> premade contents </Typography>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Typography> viewer options contents </Typography>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Typography> CA rules contents </Typography>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <AceEditor
                         placeholder=''
                         mode='plain_text'
                         theme='gruvbox'
                         name='ed'
                         value={code}
                         onChange={handleCodeChange}
                         fontSize='16px'
                         highlightActiveLine={true}
                         setOptions={{
                             enableLiveAutocompletion: false,
                             showLineNumbers: true,
                             tabSize: 4
                         }}
                    />
                </TabPanel>

            </Box>
            <InputSlider label="Zoom" />
        </Box>
    );
}

export default OptionsDrawer;
