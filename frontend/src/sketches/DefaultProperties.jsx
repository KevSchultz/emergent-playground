/**
 * @file sketchAttributes.js is a file that contains an object that is meant to be passed as prop through ReactP5Wrapper
 * containing all the presets and changeable attributes for a sketch.
 * @project Emergent Playground
 * @author Kevin Schultz
 */
import vertexShader from '../shaders/basic.vert?raw';
import fragmentShader from '../shaders/gol.frag?raw';
import SquareIcon from '@mui/icons-material/Square';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleIcon from '@mui/icons-material/RadioButtonUnchecked';

export const DefaultProperties = {
    worldWidth: 1000,
    worldHeight: 1000,
    cameraX: 0,
    cameraY: 0,
    cameraZ: 1,
    scaleOffset: 1,
    zoom: 1,
    minZoom: 0,
    maxZoom: 100,
    zoomSensitivity: 0.001,
    panSensitivity: 0.001,
    brushType: 'pixel',
    listBrushTypes: ['pixel', 'square', 'circle'],
    brushIcons: { pixel: <SquareIcon />, square: <CropSquareIcon />, circle: <CircleIcon /> },
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
};

export default DefaultProperties;
