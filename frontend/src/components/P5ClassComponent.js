import React from "react";
import p5 from "p5";
import vertexShader from "../shaders/gol.vert";
import fragmentShader from "../shaders/gol.frag";

class P5ReactComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.golShader = null;
    this.prevFrame = null;
  }

  Sketch = (p) => {

    p.preload = () => {
      this.golShader = p.loadShader(vertexShader, fragmentShader);
    };

    p.setup = () => {
      p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
      p.pixelDensity(1);
      p.noSmooth();

      this.prevFrame = p.createGraphics(p.width, p.height);
      this.prevFrame.pixelDensity(1);
      this.prevFrame.noSmooth();

      p.background(0);
      p.stroke(255);
      p.shader(this.golShader);
      this.golShader.setUniform("normalRes", [1.0 / p.width, 1.0 / p.height]);
    };

    p.draw = () => {
      if(p.mouseIsPressed) {
        p.line(
          p.pmouseX-p.width/2,
          p.pmouseY-p.height/2,
          p.mouseX-p.width/2,
          p.mouseY-p.height/2
        );
      }  
      
      // Copy the rendered image into our prevFrame image
      this.prevFrame.image(p.get(), 0, 0);  
      // Set the image of the previous frame into our shader
      this.golShader.setUniform('tex', this.prevFrame);
      
      // Give the shader a surface to draw on
      p.rect(-p.width/2,-p.height/2,p.width,p.height);
    };

    p.windowResized = () => {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
    };

  }

  componentDidMount() {
    if (!this.myP5) {
      this.myP5 = new p5(this.Sketch, this.myRef.current);
    }
  }

  render() {
    return (
      <div ref={this.myRef}>
      </div>
    );
  }
}

export default P5ReactComponent;
