import vertexShader from '../shaders/golZoomTmp.vert';
import fragmentShader from '../shaders/golZoomTmp.frag';

let twoInTwo = function(p5) {

    // gameOfLifeSketch.js changes cursor so this fixes cursor when leaving that game
    document.body.style.cursor = 'auto';

    twoInTwo.worldWidth = 1000;
    twoInTwo.worldHeight = 1000;
    twoInTwo.squareSize = 500;

    twoInTwo.shader2Din2D;
    twoInTwo.buffer;
    twoInTwo.previousState;
    twoInTwo.isFirstGeneration = true;

    p5.preload = () => {
        twoInTwo.shader2Din2D = p5.loadShader(vertexShader, fragmentShader);
    }

    p5.setup = () => {

        // create canvas with webgl
        // no smooth is active by default with webgl
        p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
        p5.strokeWeight(0);

        // create off-screen graphics buffer with webgl
        twoInTwo.buffer = p5.createGraphics(twoInTwo.worldWidth, twoInTwo.worldHeight, p5.WEBGL);

        // set shader and resolution uniform
        twoInTwo.buffer.shader(twoInTwo.shader2Din2D);
        twoInTwo.shader2Din2D.setUniform('resolution', [twoInTwo.worldWidth, twoInTwo.worldHeight]);

        // create off-screen graphics to hold the previous state of the cellular automata
        twoInTwo.previousState = p5.createGraphics(twoInTwo.worldWidth, twoInTwo.worldHeight);

        twoInTwo.previousState.noSmooth();
        twoInTwo.previousState.push();
        twoInTwo.previousState.stroke(255);
        twoInTwo.previousState.strokeWeight(10);
        twoInTwo.previousState.noFill();
        twoInTwo.previousState.square(
            twoInTwo.worldWidth / 2 - twoInTwo.squareSize / 2,
            twoInTwo.worldHeight / 2 - twoInTwo.squareSize / 2,
            twoInTwo.squareSize
        );
        twoInTwo.previousState.pop();

    };

    p5.draw = () => {
        p5.background('black');

        // copy buffer into previousState unless it's the first run then keep initial state
        if (!twoInTwo.isFirstGeneration) {
            twoInTwo.previousState.image(twoInTwo.buffer, 0, 0);
        } else {
            twoInTwo.isFirstGeneration = false;
        }

        // set previousState uniform for buffer
        twoInTwo.shader2Din2D.setUniform('previousState', twoInTwo.previousState);
        twoInTwo.buffer.rect(
            -twoInTwo.buffer.width / 2,
            twoInTwo.buffer.height / 2,
            twoInTwo.buffer.width,
            twoInTwo.buffer.height
        );

        // Display nextState on the plane
        // let bufferImage = p5.image(buffer, -worldWidth/2, -worldHeight/2, worldWidth, worldHeight);
        // let bufferTexture = canvas.getTexture(bufferImage);
        // bufferTexture.setInterpolation(p5.LINEAR, p5.LINEAR);

        p5.texture(twoInTwo.buffer);

        // The following is weird code to set the texture filtering to nearest instead of linear
        // This code was created by chatgpt and is not documented in the p5.js reference
        // It reaches into the internals of the p5.js library. 
        // It essentially prevents smoothing on the texture. 
        p5._renderer.GL.texParameteri(p5._renderer.GL.TEXTURE_2D, p5._renderer.GL.TEXTURE_MIN_FILTER, p5._renderer.GL.NEAREST);
        p5._renderer.GL.texParameteri(p5._renderer.GL.TEXTURE_2D, p5._renderer.GL.TEXTURE_MAG_FILTER, p5._renderer.GL.NEAREST);

        //console.log(bufferTexture);
        // p5.rotateX(p5.frameCount * 0.01);
        // p5.rotateY(p5.frameCount * 0.01);
        p5.plane(twoInTwo.worldWidth, twoInTwo.worldHeight);
        p5.orbitControl();
        // const cam = p5._renderer._curCamera;
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };
}

export default twoInTwo;
