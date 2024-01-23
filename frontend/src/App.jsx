import * as React from 'react'
import Button from '@mui/material/Button'
import P5Wrapper from './components/P5Wrapper'
import gameOfLifeSketch from './sketches/gameOfLifeSketch'
import gradientsMovingSketch from './sketches/gradientsMovingSketch'
import ballMovingSketch from './sketches/ballMovingSketch'
import particleSketch from './sketches/particleSketch'
import oneInOneSketch from './sketches/oneInOneSketch'
import randomColorsSketch from './sketches/randomColorsSketch'
import { styled } from '@mui/system'
import NavBar from './components/NavBar'
import Typography from '@mui/material/Typography'
import ButtonPanel from './components/ButtonPanel'
import IconButton from '@mui/material/IconButton'
import BrushIcon from '@mui/icons-material/Brush'
import CropSquareIcon from '@mui/icons-material/CropSquare';
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';


const BackgroundP5Layer = styled(P5Wrapper)(() => ({
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '-1',
}));

const WhiteIconButton = styled(IconButton)(() => ({
    color: 'white',
}));

function App() {
    const [sketchIndex, setSketchIndex] = React.useState(0)

    let sketches = [
        oneInOneSketch,
        randomColorsSketch,
        gameOfLifeSketch,
        gradientsMovingSketch,
        ballMovingSketch,
        particleSketch,
    ]

    function handleClick() {
        setSketchIndex((sketchIndex + 1) % sketches.length)
    }

    return (
        <div>
            <ButtonPanel>
                <WhiteIconButton color='success'>
                    <BrushIcon />
                </WhiteIconButton>
                <WhiteIconButton>
                    <CircleIcon/>
                </WhiteIconButton>
                <WhiteIconButton>
                    <CropSquareIcon />
                </WhiteIconButton>
                <WhiteIconButton>
                    <AddIcon/>
                </WhiteIconButton>
            </ButtonPanel>
            <BackgroundP5Layer sketch={sketches[sketchIndex]} />
            <NavBar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Emergent Playground
                </Typography>
                <Button variant="contained" color="error" onClick={handleClick}>
                    Change Sketch
                </Button>
            </NavBar>
        </div>
    )
}

export default App
