import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InputSlider from './InputSlider';
import PlayPauseButton from './PlayPauseButton';
import TabPanel from './TabPanel';
import EditorTabPanel from './EditorTabPanel';

//tmp
import Typography from '@mui/material/Typography';

function OptionsDrawer({
    sketch,
    zoom,
    setZoom,
    worldWidth,
    setWorldWidth,
    pause,
    setPause,
}) {
    const [value, setValue] = React.useState(0);

    var code;
    const setCode = (code) => {
        console.log(code);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                width: '20vw',
                height: '95vh',
                overflow: 'none',
                padding: '1vw',
                boxSizing: 'border-box',
            }}
        >
            <Box>
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
                <EditorTabPanel value={value} index={3} code={code} setCode={setCode} />
            </Box>
            <InputSlider
                label="Zoom"
                minValue={-10}
                maxValue={100}
                stepValue={1}
                value={zoom}
                setValue={setZoom}
            />

            <InputSlider
                label="World Width"
                minValue={1}
                maxValue={2500}
                stepValue={1}
                value={worldWidth}
                setValue={setWorldWidth}
            />
            <PlayPauseButton pause={pause} setPause={setPause} />
        </Paper>
    );
}

export default OptionsDrawer;
