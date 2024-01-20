const particleSketch = (p) => {
  let particles = [];

  p.setup = () => {
    p.createCanvas(500, 500);
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle(p));
    }
  };

  p.draw = () => {
    p.background(21, 8, 50);
    particles.forEach((particle, idx) => {
      particle.update();
      particle.display();
      particle.checkParticles(particles.slice(idx));
    });
  };

  class Particle {
    constructor(p) {
      this.pos = p.createVector(p.random(p.width), p.random(p.height));
      this.vel = p.createVector(p.random(-2, 2), p.random(-2, 2));
      this.size = 10;
    }

    update() {
      this.pos.add(this.vel);
      this.edges();
    }

    display() {
      p.noStroke();
      p.fill("rgba(255,255,255,0.5)");
      p.circle(this.pos.x, this.pos.y, this.size);
    }

    edges() {
      if (this.pos.x < 0 || this.pos.x > p.width) {
        this.vel.x *= -1;
      }

      if (this.pos.y < 0 || this.pos.y > p.height) {
        this.vel.y *= -1;
      }
    }

    checkParticles(particles) {
      particles.forEach((particle) => {
        const d = this.pos.dist(particle.pos);
        if (d < 120) {
          const alpha = p.map(d, 0, 120, 0, 0.25);
          p.stroke(`rgba(255,255,255,${alpha})`);
          p.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
        }
      });
    }
  }
};

export default particleSketch;