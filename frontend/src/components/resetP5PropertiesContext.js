import DefaultProperties from "./DefaultProperties"

export default function resetP5PropertiesContext(context) {

    context.setUsername(DefaultProperties.username);
    context.setWorldWidth(DefaultProperties.worldWidth);
    context.setWorldHeight(DefaultProperties.worldHeight);
    context.setPixelDensity(DefaultProperties.pixelDensity);
    context.setCameraX(DefaultProperties.cameraX);
    context.setCameraY(DefaultProperties.cameraY);
    context.setCameraZ(DefaultProperties.cameraZ);
    context.setZoom(DefaultProperties.zoom);
    context.setMinZoom(DefaultProperties.minZoom);
    context.setMaxZoom(DefaultProperties.maxZoom);
    context.setZoomSensitivity(DefaultProperties.zoomSensitivity);
    context.setPanSensitivity(DefaultProperties.panSensitivity);
    context.setBrushType(DefaultProperties.brushType);
    context.setListBrushTypes(DefaultProperties.listBrushTypes);
    context.setBrushIcons(DefaultProperties.brushIcons);
    context.setSelectedBrushIconColor(DefaultProperties.selectedBrushIconColor);
    context.setDeselectedBrushIconColor(DefaultProperties.deselectedBrushIconColor);
    context.setBrushSize(DefaultProperties.brushSize);
    context.setCursorStyles(DefaultProperties.cursorStyles);
    context.setPreviousMouseX(DefaultProperties.previousMouseX);
    context.setPreviousMouseY(DefaultProperties.previousMouseY);
    context.setVertexShader(DefaultProperties.vertexShader);
    context.setFragmentShader(DefaultProperties.fragmentShader);
    context.setPause(DefaultProperties.pause);
    context.setCode(DefaultProperties.code);
    context.setCurrentLangColor(DefaultProperties.currentLangColor);
    context.setLangTupleList(DefaultProperties.langTupleList);
    context.setLangIncludeSelf(DefaultProperties.langIncludeSelf);
    context.setLangRange(DefaultProperties.langRange);
    context.setBackgroundColor(DefaultProperties.backgroundColor);
    context.setCurrentDrawColor(DefaultProperties.currentDrawColor);
    context.setFullscreen(DefaultProperties.fullscreen);
    context.setGeneration(DefaultProperties.generation);
    context.setContinuousPlay(DefaultProperties.continuousPlay);

}