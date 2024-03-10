// React Imports
import { useContext } from 'react';
import { useState } from 'react';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';

// Custom Component Imports
import backendRequester from './BackendRequester';
import P5PropertiesContext from './P5PropertiesContext';
import cellularAutomataSketch from './cellularAutomataSketch';
import LoadingDialog from './LoadingDialog';

export default function SavePostInput() {
    const properties = useContext(P5PropertiesContext);
    const [title, setTitle] = useState('untitled');
    const [loading, setLoading] = useState(false);

    const savePost = async () => {
        setLoading(true);

        properties.setPause(1);

        console.log(cellularAutomataSketch.stateToBlob());
        console.log(title);
        console.log(properties);

        const response = await backendRequester.uploadPost(title, cellularAutomataSketch.stateToBlob(), properties);

        if (response.status != 200) {
            alert("Save failed. Make sure you are logged in.");
        } else {
            alert("Save successful.");
        }

        console.log(response);

        setLoading(false);
    };

    return (
        <>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Enter title here ... "
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Update the state when the input changes
                />
                <Button onClick={savePost}>SAVE</Button>
            </Paper>
            <LoadingDialog open={loading} />
        </>
    );
}
