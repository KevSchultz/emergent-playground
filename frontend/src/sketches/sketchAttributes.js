/**
 * @file sketchAttributes.js is a file that contains an object that is meant to be passed as prop through ReactP5Wrapper 
 * containing all the presets and changeable attributes for a sketch.
 * @project Emergent Playground
 * @author Kevin Schultz
 */
import PropTypes from 'prop-types';
import vertexShader from '../shaders/cellularAutomata.vert?raw';
import fragmentShader from '../shaders/cellularAutomata.frag?raw';

export const sketchAttributes = {
    worldWidth: 500,
    worldHeight: 500,
    cameraX: 0,
    cameraY: 0,
    cameraZ: 1,
    zoom: 10,
    minZoom: 0.1,
    maxZoom: 10,
    zoomSensitivity: 0.001,
    panSensitivity: 1,
    brushType: 'line',
    brushSize: 10,
    previousMouseX: 0,
    previousMouseY: 0,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
}

sketchAttributes.PropTypes = {
    worldWidth: PropTypes.number,
    worldHeight: PropTypes.number,
    cameraX: PropTypes.number,
    cameraY: PropTypes.number,
    cameraZ: PropTypes.number,
    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    zoomSensitivity: PropTypes.number,
    panSensitivity: PropTypes.number,
    brushType: PropTypes.string,
    brushSize: PropTypes.number,
    previousMouseX: PropTypes.number,
    previousMouseY: PropTypes.number,
    vertexShader: PropTypes.string,
    fragmentShader: PropTypes.string,
};


export default sketchAttributes;