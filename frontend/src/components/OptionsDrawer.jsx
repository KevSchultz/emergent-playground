import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InputSlider from './InputSlider';

function OptionsDrawer({ sketch, zoom, setZoom, worldWidth, setWorldWidth}) {
    const [value, setValue] = React.useState(0);

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
                    <Tab label="Premade" style={{ color: 'white' }} />
                    <Tab label="Viewer Options" style={{ color: 'white' }} />
                    <Tab label="CA Rules" style={{ color: 'white' }} />
                    <Tab label="Language" style={{ color: 'white' }} />
                </Tabs>
            </Box>
            <InputSlider
                label="Zoom"
                minValue={0.1}
                maxValue={100}
                stepValue={0.1}
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
        </Paper>
    );
}

export default OptionsDrawer;
