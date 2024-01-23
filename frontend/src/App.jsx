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

const BackgroundP5Layer = styled(P5Wrapper)(() => ({
  position: 'absolute',
  top: '0',
  left: '0',
}))

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
      <BackgroundP5Layer sketch={sketches[sketchIndex]} />
        <Button variant="outlined" onClick={handleClick}>
        Change Sketch
      </Button>
    </div>
  )
}

export default App
