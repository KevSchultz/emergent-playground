/**
 * @file sketchAttributes.js is a file that contains an object that is meant to be passed as prop through ReactP5Wrapper
 * containing all the presets and changeable attributes for a sketch.
 * @project Emergent Playground
 * @author Kevin Schultz
 */
import vertexShader from '../shaders/cellularAutomata.vert?raw';
import fragmentShader from '../shaders/seeds.frag?raw';

export const defaultSketchAttributes = {
    worldWidth: 100,
    worldHeight: 100,
    cameraX: 0,
    cameraY: 0,
    cameraZ: 1,
    scaleOffset: 0,
    zoom: 1,
    minZoom: 0,
    maxZoom: 100,
    zoomSensitivity: 0.001,
    panSensitivity: 1,
    brushType: 'line',
    brushSize: 10,
    previousMouseX: 0,
    previousMouseY: 0,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    pause: 0,
};

export default defaultSketchAttributes;
