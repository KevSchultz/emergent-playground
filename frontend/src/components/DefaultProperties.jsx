/**
 * @project Emergent Playground
 * @file DefaultProperties.jsx
 * @overview Contains an object with default properties to be used in p5 and react. 
 * Containing all the presets and changeable attributes for a cellular automata sketch.
 * @authors Kevin Schultz
 * @exports DefaultProperties
 */

// Custom Imports
import vertexShader from '../shaders/basic.vert?raw';
import fragmentShader from '../shaders/gameOfLife.frag?raw';

let DefaultProperties = {
    username: undefined,
    worldWidth: 500,
    worldHeight: 500,
    cameraX: 0,
    cameraY: 0,
    cameraZ: 1,
    zoom: 1,
    minZoom: 0.1,
    maxZoom: 100,
    zoomSensitivity: 0.001,
    panSensitivity: 0.001,
    brushType: 'pixel',
    brushSize: 10,
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
    backgroundColor: '#000000',
    currentDrawColor: '',
    langNeighborhoodType: 'moore',
    fullscreen: false,
    generation: 0,
    continuousPlay: false,
};

export default DefaultProperties;
