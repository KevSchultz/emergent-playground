import vertShader from '../shaders/golZoomTmp.vert';
import fragShader from '../shaders/golZoomTmp.frag';

var gameOfLifeSketchZoomTmp = (p) => {
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;
    var worldWidth = window.innerWidth;
    var worldHeight = window.innerHeight;
    var scalar = 1;

    var golShader;
    var buffer;
    var prevState;
    var isFirstGen = true;
    var translateX = 0;
    var translateY = 0;
    var prevMouseX = 0;
    var prevMouseY = 0;
    var squareSize = 2000;

    p.preload = () => {
        golShader = p.loadShader('golZoomTmp.vert', 'golZoomTmp.frag');
    };

    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        p.noSmooth();

        buffer = p.createGraphics(worldWidth, worldHeight, WEBGL);
        buffer.noSmooth();

        buffer.shader(golShader);
        golShader.setUniform("resolution", [worldWidth, worldHeight]);

        prevState = createGraphics(worldWidth, worldHeight);
        prevState.noSmooth();
        prevState.stroke(255);
        prevState.square(worldWidth/2 - squareSize/2, worldHeight/2 - squareSize/2, squareSize);
    };

    p.mouseWheel = (event) => {
        scalar += event.delta * -0.01;
        scalar = constrain(scalar, 0.1, 500);
    };

    p.mousePressed = () => {
        prevMouseX = mouseX;
        prevMouseY = mouseY;
    };

    p.mouseDragged = () => {
        if(keyIsPressed && key == 'Control') {
            translateX += mouseX - prevMouseX;
            translateY += mouseY - prevMouseY;
        }
        prevMouseX = mouseX;
        prevMouseY = mouseY;
    };

    p.draw = () => {
        p.background('pink');

        if(!isFirstGen){
            previousState.image(buffer, 0, 0);
        } else {
            console.log('first generation');
            isFirstGen = false;
        }

        golShader.setUniform('previousState', prevState);
        buffer.rect(-buffer.width/2, buffer.height/2, buffer.width, buffer.height);

        p.translate(translateX, translateY);
        p.scale(scalar);

        let x = width / (2 * scalar) - (buffer.width / 2);
        let y = height / (2 * scalar) - (buffer.height / 2);

        p.image(buffer, x, y);
    };
};

export default gameOfLifeSketchZoomTmp;
