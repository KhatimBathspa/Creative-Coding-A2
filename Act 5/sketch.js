let patternType;
let patternColor;

function setup() {
  createCanvas(400, 400);
  background(255);
  patternType = floor(random(3));
  noLoop();


  patternColor = color(random(50, 255), random(50, 255), random(50, 255));

  if (patternType === 0) {
    drawConcentricCircles();
  } else if (patternType === 1) {
    drawRotatedLineGrid();
  } else if (patternType === 2) {
    drawNoiseWaves();
  }
}

function drawConcentricCircles() {
  noFill();
  stroke(patternColor);
  let cx = width / 2;
  let cy = height / 2;
  for (let r = 20; r <= 200; r += 20) {
    ellipse(cx, cy, r * 2, r * 2);
  }
}

function drawRotatedLineGrid() {
  background(240);
  stroke(patternColor);
  strokeWeight(2);
  let spacing = 40;
  for (let y = spacing / 2; y < height; y += spacing) {
    for (let x = spacing / 2; x < width; x += spacing) {
      push();
      translate(x, y);
      rotate(radians((x * y) % 90));
      line(-10, 0, 10, 0);
      pop();
    }
  }
}

function drawNoiseWaves() {
  background(30);
  stroke(patternColor);
  noFill();
  for (let y = 0; y < height; y += 10) {
    beginShape();
    for (let x = 0; x < width; x += 5) {
      let yOffset = noise(x * 0.01, y * 0.01) * 50;
      vertex(x, y + yOffset);
    }
    endShape();
  }
}
