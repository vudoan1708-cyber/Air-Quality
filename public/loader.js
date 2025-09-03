class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = random(4, 10);
    this.alpha = 220;
  }

  update() {
    // subtle floating motion
    this.x += random(-0.5, 0.5);
    this.y += random(-0.5, 0.5);
  }

  show() {
    fill(200, this.alpha);
    ellipse(this.x, this.y, this.r);
  }
}
