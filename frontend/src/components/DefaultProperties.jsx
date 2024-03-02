/**
 * @project Emergent Playground
 * @file DefaultProperties.jsx
 * @overview Contains an object with default properties to be used in p5 and react. 
 * Containing all the presets and changeable attributes for a cellular automata sketch.
 * @authors Kevin Schultz
 * @exports DefaultProperties
 */

// Material-UI Imports
import SquareIcon from '@mui/icons-material/Square';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleIcon from '@mui/icons-material/RadioButtonUnchecked';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

// Custom Imports
import vertexShader from '../shaders/basic.vert?raw';
import fragmentShader from '../shaders/gameOfLife.frag?raw';
import CellularAutomataSketchClass from '../sketches/CellularAutomataSketchClass';

let DefaultProperties = {
    sketchClassType: "CellularAutomataSketchClass",
    worldWidth: 300,
    worldHeight: 300,
    pixelDensity: 1,
    cameraX: 0,
    cameraY: 0,
    cameraZ: 1,
    zoom: 1,
    minZoom: 0.1,
    maxZoom: 100,
    zoomSensitivity: 0.001,
    panSensitivity: 0.001,
    brushType: 'pixel',
    listBrushTypes: ['pixel', 'square', 'circle', 'camera'],
    brushIcons: {
        pixel: <SquareIcon />,
        square: <CropSquareIcon />,
        circle: <CircleIcon />,
        camera: <CameraAltIcon />,
    },
    selectedBrushIconColor: 'yellow',
    deselectedBrushIconColor: 'white',
    brushSize: 10,
    cursorStyles: {
        pixel: 'auto',
        square: `auto`,
        circle: `auto`,
        default: 'auto',
    },
    previousMouseX: 0,
    previousMouseY: 0,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    pause: 1,
    code: '', // for shader lang
    currentLangColor: '#ffffff',
    langTupleList: [],
    langIncludeSelf: false,
    langRange: 1,
    backgroundColor: '',
    currentDrawColor: '',
    langNeighborhoodType: 'moore',
    fullscreen: false,
};

export const sketch = new CellularAutomataSketchClass(DefaultProperties);

export default DefaultProperties;
