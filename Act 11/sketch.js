let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(10);
  noStroke();
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  fill(0, 0, 0, 10);
  rect(0, 0, width, height);

  // Create new shapes based on mouse movement
  if (mouseIsPressed) {
    for (let i = 0; i < 3; i++) {
      shapes.push(new FlowShape(mouseX, mouseY));
    }
  }

  // Update and display shapes
  for (let i = shapes.length - 1; i >= 0; i--) {
    shapes[i].update();
    shapes[i].display();
    if (shapes[i].isDead()) {
      shapes.splice(i, 1);
    }
  }
}

class FlowShape {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(random(0.5, 2));
    this.size = random(5, 20);
    this.lifetime = 255;
    this.hue = random(360);
  }

  update() {
    this.pos.add(this.vel);
    this.lifetime -= 2;
  }

  display() {
    fill(this.hue, 80, 100, this.lifetime * 0.4);
    
    // Draw symmetrical patterns
    ellipse(this.pos.x, this.pos.y, this.size);
    ellipse(width - this.pos.x, this.pos.y, this.size);
    ellipse(this.pos.x, height - this.pos.y, this.size);
    ellipse(width - this.pos.x, height - this.pos.y, this.size);
  }

  isDead() {
    return this.lifetime < 0;
  }
}
