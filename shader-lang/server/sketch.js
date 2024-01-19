let golShader;
let prevFrame;

let run = true;

function preload(){
//    golShader = loadShader('gol/gol.vert', 'gol/gol.frag');
    golShader = loadShader('lang/lang.vert', 'lang/lang.frag');
}

function setup() {
    createCanvas(200, 200, WEBGL);
    pixelDensity(1);
    noSmooth();

    prevFrame = createGraphics(width, height);
    prevFrame.pixelDensity(1);
    prevFrame.noSmooth();

    //NEED SET BACKGROUND TO DEFAULT COLOR
    background('#00FF00');

    stroke('#FF0000');
    shader(golShader);
    golShader.setUniform("normalRes", [1.0/width, 1.0/height]);
}

function draw() {
    if(mouseIsPressed) {
        line(
            pmouseX-width/2,
            pmouseY-height/2,
            mouseX-width/2,
            mouseY-height/2
        );
    }

    if(run){
        prevFrame.image(get(), 0, 0);
        golShader.setUniform('tex', prevFrame);
    
        rect(-width/2, -height/2, width, height);
    }
}

function keyPressed() {
    if(keyCode === 32){
        run = !run;
    }
    if(keyCode === 49){
        stroke(color('#FF0000'));
    }
    if(keyCode === 50){
        stroke(color('#00FF00'));
    }
    if(keyCode === 51){
        stroke(color('#0000FF'));
    }
}
