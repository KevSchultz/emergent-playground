/**
 * @project Emergent Playground
 * @file P5PropertiesContext.jsx
 * @overview This file exports both the P5PropertiesContext and P5PropertiesProvider components for managing p5 property state.
 * @authors Kevin Schultz
 * @exports P5PropertiesContext P5PropertiesProvider
 */

// React Imports
import { createContext } from 'react';
import { useState } from 'react';

// Other Imports
import DefaultProperties from './DefaultProperties';
import PropTypes from 'prop-types';

const P5PropertiesContext = createContext();

/**
 * P5PropertiesProvider is a React component that provides a context for managing state related to P5 properties.
 * It uses React's useState hook to create state variables for each property, and provides a context that makes these
 * state variables and their associated setters available to child components.
 *
 * The properties managed by this context can be found in DefaultProperties.jsx
 *
 * Child components can access these state variables and setters by using React's useContext hook with P5PropertiesContext.
 *
 * @param {object} props - The properties passed to this component. Expected to include 'children', the child components.
 *
 * @returns {JSX.Element} A P5PropertiesContext.Provider that wraps the child components and provides them with access to the P5 properties context.
 */
export function P5PropertiesProvider({ children }) {
    const [sketchClass, setSketchClass] = useState(DefaultProperties.sketchClass);
    const [worldWidth, setWorldWidth] = useState(DefaultProperties.worldWidth);
    const [worldHeight, setWorldHeight] = useState(DefaultProperties.worldHeight);
    const [pixelDensity, setPixelDensity] = useState(DefaultProperties.pixelDensity);
    const [cameraX, setCameraX] = useState(DefaultProperties.cameraX);
    const [cameraY, setCameraY] = useState(DefaultProperties.cameraY);
    const [cameraZ, setCameraZ] = useState(DefaultProperties.cameraZ);
    const [zoom, setZoom] = useState(DefaultProperties.zoom);
    const [minZoom, setMinZoom] = useState(DefaultProperties.minZoom);
    const [maxZoom, setMaxZoom] = useState(DefaultProperties.maxZoom);
    const [zoomSensitivity, setZoomSensitivity] = useState(DefaultProperties.zoomSensitivity);
    const [panSensitivity, setPanSensitivity] = useState(DefaultProperties.panSensitivity);
    const [brushType, setBrushType] = useState(DefaultProperties.brushType);
    const [listBrushTypes, setListBrushTypes] = useState(DefaultProperties.listBrushTypes);
    const [brushIcons, setBrushIcons] = useState(DefaultProperties.brushIcons);
    const [selectedBrushIconColor, setSelectedBrushIconColor] = useState(
        DefaultProperties.selectedBrushIconColor
    );
    const [deselectedBrushIconColor, setDeselectedBrushIconColor] = useState(
        DefaultProperties.deselectedBrushIconColor
    );
    const [brushSize, setBrushSize] = useState(DefaultProperties.brushSize);
    const [cursorStyles, setCursorStyles] = useState(DefaultProperties.cursorStyles);
    const [previousMouseX, setPreviousMouseX] = useState(DefaultProperties.previousMouseX);
    const [previousMouseY, setPreviousMouseY] = useState(DefaultProperties.previousMouseY);
    const [vertexShader, setVertexShader] = useState(DefaultProperties.vertexShader);
    const [fragmentShader, setFragmentShader] = useState(DefaultProperties.fragmentShader);
    const [pause, setPause] = useState(DefaultProperties.pause);
    const [alwaysOn, setAlwaysOn] = useState(DefaultProperties.alwaysOn);
    const [code, setCode] = useState(DefaultProperties.code);
    const [currentLangColor, setCurrentLangColor] = useState(DefaultProperties.currentLangColor);
    const [langTupleList, setLangTupleList] = useState(DefaultProperties.langTupleList);

    const value = {
        sketchClass,
        setSketchClass,
        worldWidth,
        setWorldWidth,
        worldHeight,
        setWorldHeight,
        pixelDensity,
        setPixelDensity,
        cameraX,
        setCameraX,
        cameraY,
        setCameraY,
        cameraZ,
        setCameraZ,
        zoom,
        setZoom,
        minZoom,
        setMinZoom,
        maxZoom,
        setMaxZoom,
        zoomSensitivity,
        setZoomSensitivity,
        panSensitivity,
        setPanSensitivity,
        brushType,
        setBrushType,
        listBrushTypes,
        setListBrushTypes,
        brushIcons,
        setBrushIcons,
        selectedBrushIconColor,
        setSelectedBrushIconColor,
        deselectedBrushIconColor,
        setDeselectedBrushIconColor,
        brushSize,
        setBrushSize,
        cursorStyles,
        setCursorStyles,
        previousMouseX,
        setPreviousMouseX,
        previousMouseY,
        setPreviousMouseY,
        vertexShader,
        setVertexShader,
        fragmentShader,
        setFragmentShader,
        pause,
        setPause,
        alwaysOn,
        setAlwaysOn,
        code,
        setCode,
        currentLangColor,
        setCurrentLangColor,
        langTupleList,
        setLangTupleList,
    };

    return <P5PropertiesContext.Provider value={value}>{children}</P5PropertiesContext.Provider>;
}

P5PropertiesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default P5PropertiesContext;
