import vertexShader from '../shaders/golZoomTmp.vert';
import fragmentShader from '../shaders/golZoomTmp.frag';

var gameOfLifeSketchZoomTmp = function(p5) {

    let worldWidth = 1000;
    let worldHeight = 1000;
    let squareSize = 500;
    let frame = 0;
    let captureLimit = 5;
    let video;

    let shader2Din2D;
    let buffer;
    let previousState;
    let isFirstGeneration = true;

    p5.preload = () => {
        shader2Din2D = p5.loadShader(vertexShader, fragmentShader);
    }

    p5.setup = () => {

        // create canvas with webgl
        // no smooth is active by default with webgl
        p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
        p5.strokeWeight(0);

        // create off-screen graphics buffer with webgl
        buffer = p5.createGraphics(worldWidth, worldHeight, p5.WEBGL);

        // set shader and resolution uniform
        buffer.shader(shader2Din2D);
        shader2Din2D.setUniform('resolution', [worldWidth, worldHeight]);

        // create off-screen graphics to hold the previous state of the cellular automata
        previousState = p5.createGraphics(worldWidth, worldHeight);

        video = p5.createCapture(p5.VIDEO); //access live webcam
        video.size(worldWidth, worldHeight);
        video.hide(); // hide the video feed

        previousState.noSmooth();
        previousState.push();
        previousState.stroke(255);
        previousState.strokeWeight(10);
        previousState.noFill();
        // previousState.fill(255);
        previousState.square(
            worldWidth / 2 - squareSize / 2,
            worldHeight / 2 - squareSize / 2,
            squareSize
        );
        previousState.pop();

    };

    const convertToBlackAndWhite = (img) => {
        img.loadPixels();
        for (let y = 0; y < img.height; y++) {
            for (let x = 0; x < img.width; x++) {
                let index = (x + y * img.width) * 4;
                let r = img.pixels[index + 0];
                let g = img.pixels[index + 1];
                let b = img.pixels[index + 2];
    
                let brightness = (r + g + b) / 3;
                let color = brightness > 128 ? 255 : 0;
    
                img.pixels[index + 0] = color;
                img.pixels[index + 1] = color;
                img.pixels[index + 2] = color;
            }
        }
        img.updatePixels();
    }

    const blendImages = (img1, img2) => {
        img1.loadPixels();
        img2.loadPixels();
      
        for (let y = 0; y < img1.height; y++) {
          for (let x = 0; x < img1.width; x++) {
            let index = (x + y * img1.width) * 4;
            // Blend the pixels however you like
            img1.pixels[index] = (img1.pixels[index] + img2.pixels[index]) / 2; // Red
            img1.pixels[index + 1] = (img1.pixels[index + 1] + img2.pixels[index + 1]) / 2; // Green
            img1.pixels[index + 2] = (img1.pixels[index + 2] + img2.pixels[index + 2]) / 2; // Blue
            // Optionally blend the alpha channel: img1.pixels[index + 3]
          }
        }
      
        img1.updatePixels();
    }

    p5.draw = () => {
        p5.background('black');

        // copy buffer into previousState unless it's the first run then keep initial state
        if (!isFirstGeneration) {
            frame++;
            if (frame > captureLimit) {
                frame = 0;
                let capture = video.get();
                convertToBlackAndWhite(capture);
                blendImages(capture, buffer.get());
                previousState.image(capture, 0, 0);
            } else {
                previousState.image(buffer, 0, 0);
            }
        } else {
            previousState.image(video, 0, 0);
            isFirstGeneration = false;
        }

        // if (p5.mouseIsPressed) {
        //     // Map mouse coordinates to previousState coordinates
        //     let mappedX = (p5.mouseX - p5.width / 2) / worldWidth / 2;
        //     let mappedY = (p5.mouseY - p5.height / 2) / worldHeight / 2;

        //     mappedX = Math.floor(mappedX);
        //     mappedY = Math.floor(mappedY);

        //     // Draw on previousState
        //     previousState.push(); // Save current state
        //     previousState.noFill();
        //     previousState.strokeWeight(1);
        //     previousState.stroke(255);
        //     previousState.square(mappedX, mappedY, 100);
        //     previousState.pop(); // Restore state
        // }

        // set previousState uniform for buffer
        shader2Din2D.setUniform('previousState', previousState);
        buffer.rect(
            -buffer.width / 2,
            buffer.height / 2,
            buffer.width,
            buffer.height
        );

        // Display nextState on the plane
        // let bufferImage = p5.image(buffer, -worldWidth/2, -worldHeight/2, worldWidth, worldHeight);
        // let bufferTexture = canvas.getTexture(bufferImage);
        // bufferTexture.setInterpolation(p5.LINEAR, p5.LINEAR);

        p5.texture(buffer);

        // The following is weird code to set the texture filtering to nearest instead of linear
        // This code was created by chatgpt and is not documented in the p5.js reference
        // It reaches into the internals of the p5.js library. 
        // It essentially prevents smoothing on the texture. 
        p5._renderer.GL.texParameteri(p5._renderer.GL.TEXTURE_2D, p5._renderer.GL.TEXTURE_MIN_FILTER, p5._renderer.GL.NEAREST);
        p5._renderer.GL.texParameteri(p5._renderer.GL.TEXTURE_2D, p5._renderer.GL.TEXTURE_MAG_FILTER, p5._renderer.GL.NEAREST);

        //console.log(bufferTexture);
        // p5.rotateX(p5.frameCount * 0.01);
        // p5.rotateY(p5.frameCount * 0.01);
        p5.plane(worldWidth, worldHeight);
        p5.orbitControl();
        // const cam = p5._renderer._curCamera;
    };

    p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };
}

export default gameOfLifeSketchZoomTmp;
