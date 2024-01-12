import React from "react";
import p5 from "p5";

class P5ReactComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.columns = 0;
    this.rows = 0;
    this.board = [];
    this.next = [];
  }

  Sketch = (p) => {
    p.setup = () => {
      p.createCanvas(720, 400);
      this.columns = p.width / 10;
      this.rows = p.height / 10;

      // Initialize the array
      for (let i = 0; i < this.columns; i++) {
        this.board[i] = [];
        this.next[i] = [];
        for (let j = 0; j < this.rows; j++) {
          this.board[i][j] = Math.floor(p.random(2));
          this.next[i][j] = 0;
        }
      }
    };

    p.draw = () => {
      p.background(255);
      for (let i = 0; i < this.columns; i++) {
        for (let j = 0; j < this.rows; j++) {
          if (this.board[i][j] === 1) {
            p.fill(0);
          } else {
            p.fill(255);
          }
          p.stroke(0);
          p.rect(i * 10, j * 10, 10, 10);
        }
      }

      // Compute next based on current
      for (let i = 0; i < this.columns; i++) {
        for (let j = 0; j < this.rows; j++) {
          let neighbors = this.countNeighbors(i, j);
          if ((this.board[i][j] === 1) && (neighbors < 2 || neighbors > 3)) {
            this.next[i][j] = 0;
          } else if (this.board[i][j] === 0 && neighbors === 3) {
            this.next[i][j] = 1;
          } else {
            this.next[i][j] = this.board[i][j];
          }
        }
      }

      // Swap
      [this.board, this.next] = [this.next, this.board];
    };
  }

  countNeighbors(x, y) {
    let sum = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let col = (x + i + this.columns) % this.columns;
        let row = (y + j + this.rows) % this.rows;
        sum += this.board[col][row];
      }
    }
    sum -= this.board[x][y];
    return sum;
  }

  componentDidMount() {
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
    return (
      <div ref={this.myRef}>
      </div>
    );
  }
}

export default P5ReactComponent;
