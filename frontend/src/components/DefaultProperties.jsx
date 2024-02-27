/**
 * @project Emergent Playground
 * @file DefaultProperties.jsx
 * @overview Contains an object with default properties to be used in p5 and react. 
 * Containing all the presets and changeable attributes for a cellular automata sketch.
 * @authors Kevin Schultz
 * @exports DefaultProperties
 */

import vertexShader from '../shaders/basic.vert?raw';
import fragmentShader from '../shaders/gameOfLife.frag?raw';
import SquareIcon from '@mui/icons-material/Square';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleIcon from '@mui/icons-material/RadioButtonUnchecked';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const DefaultProperties = {
    worldWidth: 1000,
    worldHeight: 1000,
    pixelDensity: 1,
    cameraX: 0,
    cameraY: 0,
    cameraZ: 1,
    zoom: 0.5,
    minZoom: 0.1,
    maxZoom: 100,
    zoomSensitivity: 0.001,
    panSensitivity: 0.001,
    brushType: 'pixel',
    listBrushTypes: ['pixel', 'square', 'circle', 'camera'],
    brushIcons: { pixel: <SquareIcon />, square: <CropSquareIcon />, circle: <CircleIcon />, camera: <CameraAltIcon />},
    selectedBrushIconColor: 'yellow',
    deselectedBrushIconColor: 'white',
    brushSize: 10,
    cursorStyles: {
        pixel: 'crosshair',
        square: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" style="fill:none;stroke:white;stroke-width:2;"/><circle cx="2" cy="2" r="6" style="fill:white;"/></svg>'), auto`,
        circle: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" style="fill:none;stroke:white;stroke-width:2;"/><circle cx="50" cy="50" r="4" style="fill:white;"/></svg>') 50 50, auto`,
        default: 'auto',
    },
    previousMouseX: 0,
    previousMouseY: 0,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    pause: 0,
    code: '', // for shader lang
    currentLangColor: '#ffffff',
    langTupleList: [],
    langIncludeSelf: false,
    langRange: 1,
    backgroundColor: '',
    currentDrawColor: ''
};

export default DefaultProperties;
